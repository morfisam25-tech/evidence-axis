(() => {
  const roots = document.querySelectorAll('[data-delivery-tracking]');
  if (!roots.length) return;

  const FORM_ENDPOINT = 'https://formsubmit.co/sai@evidenceaxis.com';
  const scannerPattern = /(proofpoint|mimecast|barracuda|safelinks|microsoft office|defender|googleimageproxy|urlscan|crawler|spider|bot\b|headless|phantom|curl|wget|python-requests|axios|httpclient|linkcheck|security scanner)/i;
  const debug = window.__eaTrackingV4 = { emitted: [], submitted: [], errors: [] };

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
  let ipPromise;

  const getPublicIp = () => {
    if (!ipPromise) {
      const lookup = fetch('https://api64.ipify.org?format=json', { cache: 'no-store', credentials: 'omit' })
        .then(r => r.ok ? r.json() : null)
        .then(v => v?.ip || '')
        .catch(() => '');
      const timeout = new Promise(resolve => setTimeout(() => resolve(''), 1200));
      ipPromise = Promise.race([lookup, timeout]);
    }
    return ipPromise;
  };

  const classify = (eventName) => {
    const ua = navigator.userAgent || '';
    if (scannerPattern.test(ua)) return ['likely_scanner', 'scanner_user_agent'];
    if (navigator.webdriver === true) return ['likely_scanner', 'webdriver_true'];
    if (eventName === 'human-presence-5s' && document.visibilityState === 'visible' && document.hasFocus()) return ['likely_human', 'focused_visible_5s'];
    return ['unknown', 'insufficient_signal'];
  };

  const nativeSubmit = (payload) => {
    try {
      const frameName = `ea-track-${randomId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
      const iframe = document.createElement('iframe');
      iframe.name = frameName;
      iframe.hidden = true;
      iframe.setAttribute('aria-hidden', 'true');
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = FORM_ENDPOINT;
      form.target = frameName;
      form.hidden = true;
      const fields = {
        _subject: `Evidence Axis tracking v4 — ${payload.company}`,
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
      debug.submitted.push({ event: payload.event, token: payload.delivery_token, at: Date.now(), action: form.action });
      form.submit();
      setTimeout(() => { form.remove(); iframe.remove(); }, 20000);
    } catch (error) { debug.errors.push(String(error)); }
  };

  const emit = async (root, eventName) => {
    const company = root.dataset.deliveryCompany || 'Unknown company';
    const slug = root.dataset.deliverySlug || 'unknown';
    const key = `ea:v4:${slug}:${eventName}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {}
    const [classification, classificationReason] = classify(eventName);
    debug.emitted.push({ event: eventName, token: deliveryToken, at: Date.now(), classification });
    const ip = await getPublicIp();
    nativeSubmit({
      source: 'intelligence-delivery-tracking-v4',
      event: eventName,
      company,
      delivery_slug: slug,
      delivery_token: deliveryToken,
      visitor_id: visitorId,
      session_id: sessionId,
      timestamp_utc: new Date().toISOString(),
      dwell_ms: Date.now() - startedAt,
      classification,
      classification_reason: classificationReason,
      ip,
      user_agent: navigator.userAgent || '',
      referrer: document.referrer || '',
      page_url: location.href,
      visibility_state: document.visibilityState,
      has_focus: document.hasFocus(),
      webdriver: navigator.webdriver === true,
      language: navigator.language || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      screen: `${screen?.width || 0}x${screen?.height || 0}`,
      viewport: `${innerWidth || 0}x${innerHeight || 0}`,
    });
  };

  roots.forEach(root => {
    emit(root, 'delivery-page-viewed');
    const timer = setTimeout(() => {
      if (document.visibilityState === 'visible' && document.hasFocus()) emit(root, 'human-presence-5s');
    }, 5000);
    addEventListener('pagehide', () => clearTimeout(timer), { once: true });
    root.querySelectorAll('[data-delivery-event]').forEach(el => {
      el.addEventListener('click', () => {
        const eventName = el.dataset.deliveryEvent;
        if (eventName) emit(root, eventName);
      });
    });
  });
})();
