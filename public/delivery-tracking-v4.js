(() => {
  const start = () => {
    const roots = document.querySelectorAll('[data-delivery-tracking]');
    if (!roots.length) return;

    const debug = window.__eaTrackingV4 = {
      emitted: [],
      submitted: [],
      responses: [],
      emailSubmitted: [],
      emailSkipped: [],
      errors: [],
    };

    const randomId = () => {
      try { if (crypto?.randomUUID) return crypto.randomUUID(); } catch {}
      return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    };

    const getStored = (storage, key) => {
      try {
        let value = storage.getItem(key);
        if (!value) { value = randomId(); storage.setItem(key, value); }
        return value;
      } catch { return randomId(); }
    };

    const visitorId = getStored(localStorage, 'ea:visitor-id');
    const sessionId = getStored(sessionStorage, 'ea:session-id');
    const deliveryToken = new URLSearchParams(location.search).get('d') || '';
    const startedAt = Date.now();

    const emailCopy = (payload) => {
      try {
        const frameName = `ea-mail-${randomId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
        const iframe = document.createElement('iframe');
        iframe.name = frameName;
        iframe.hidden = true;
        iframe.setAttribute('aria-hidden', 'true');

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://formsubmit.co/sai@evidenceaxis.com';
        form.target = frameName;
        form.hidden = true;

        const fields = {
          _subject: `Evidence Axis delivery event — ${payload.company}`,
          _template: 'table',
          _captcha: 'false',
          ...payload,
        };

        for (const [name, value] of Object.entries(fields)) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = String(value ?? '');
          form.appendChild(input);
        }

        document.body.append(iframe, form);
        debug.emailSubmitted.push({ event: payload.event, token: payload.delivery_token, at: Date.now() });
        form.submit();
        setTimeout(() => { form.remove(); iframe.remove(); }, 15000);
      } catch (error) {
        debug.errors.push({ event: payload.event, error: `email-copy: ${String(error)}` });
      }
    };

    const send = async (root, eventName) => {
      const company = root.dataset.deliveryCompany || 'Unknown company';
      const slug = root.dataset.deliverySlug || 'unknown';
      const key = `ea:v4:${slug}:${eventName}`;
      try {
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, '1');
      } catch {}

      const payload = {
        event: eventName,
        company,
        delivery_slug: slug,
        delivery_token: deliveryToken,
        visitor_id: visitorId,
        session_id: sessionId,
        client_timestamp_utc: new Date().toISOString(),
        dwell_ms: Date.now() - startedAt,
        page_url: location.href,
        referrer: document.referrer || '',
        visibility_state: document.visibilityState,
        has_focus: document.hasFocus(),
        webdriver: navigator.webdriver === true,
        language: navigator.language || '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        screen: `${screen?.width || 0}x${screen?.height || 0}`,
        viewport: `${innerWidth || 0}x${innerHeight || 0}`,
      };

      debug.emitted.push({ event: eventName, token: deliveryToken, at: Date.now() });
      try {
        const response = await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
          credentials: 'omit',
        });
        let result = null;
        try { result = await response.json(); } catch {}
        debug.submitted.push({ event: eventName, token: deliveryToken, at: Date.now() });
        debug.responses.push({ event: eventName, status: response.status, result });

        if (response.ok && result?.ok && result?.recorded) {
          if (result.classification === 'likely_scanner') {
            debug.emailSkipped.push({ event: eventName, token: deliveryToken, at: Date.now(), reason: 'likely_scanner' });
          } else {
            emailCopy({
              source: 'intelligence-delivery-tracking-v4',
              ...payload,
              server_timestamp_utc: result.server_timestamp_utc || '',
              classification: result.classification || 'unknown',
              classification_reason: result.classification_reason || '',
              ip: result.ip || '',
              user_agent: result.user_agent || navigator.userAgent || '',
            });
          }
        }
      } catch (error) {
        debug.errors.push({ event: eventName, error: String(error) });
      }
    };

    roots.forEach(root => {
      send(root, 'delivery-page-viewed');
      const timer = setTimeout(() => {
        if (document.visibilityState === 'visible' && document.hasFocus()) send(root, 'human-presence-5s');
      }, 5000);
      addEventListener('pagehide', () => clearTimeout(timer), { once: true });
      root.querySelectorAll('[data-delivery-event]').forEach(el => {
        el.addEventListener('click', () => {
          const eventName = el.dataset.deliveryEvent;
          if (eventName) send(root, eventName);
        });
      });
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
