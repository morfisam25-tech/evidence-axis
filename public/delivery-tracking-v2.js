(() => {
  const roots = document.querySelectorAll('[data-delivery-tracking]');
  if (!roots.length) return;

  const FORM_ENDPOINT = 'https://formsubmit.co/ajax/sai@evidenceaxis.com';
  const scannerPattern = /(proofpoint|mimecast|barracuda|safelinks|microsoft office|defender|googleimageproxy|urlscan|crawler|spider|bot\b|headless|phantom|curl|wget|python-requests|axios|httpclient|linkcheck|security scanner)/i;

  const safeStorage = (storage, key, fallback) => {
    try {
      const existing = storage.getItem(key);
      if (existing) return existing;
      storage.setItem(key, fallback);
      return fallback;
    } catch {
      return fallback;
    }
  };

  const randomId = () => {
    try {
      if (crypto?.randomUUID) return crypto.randomUUID();
    } catch {}
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  };

  const visitorId = safeStorage(localStorage, 'ea:visitor-id', randomId());
  const sessionId = safeStorage(sessionStorage, 'ea:session-id', randomId());
  const deliveryToken = new URLSearchParams(location.search).get('d') || '';
  const startedAt = Date.now();
  let cachedIpPromise;

  const getPublicIp = async () => {
    if (!cachedIpPromise) {
      cachedIpPromise = fetch('https://api64.ipify.org?format=json', { cache: 'no-store', credentials: 'omit' })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => data?.ip || '')
        .catch(() => '');
    }
    return cachedIpPromise;
  };

  const classifyClient = (eventName) => {
    const ua = navigator.userAgent || '';
    if (scannerPattern.test(ua)) return { classification: 'likely_scanner', reason: 'scanner_user_agent' };
    if (navigator.webdriver === true) return { classification: 'likely_scanner', reason: 'webdriver_true' };
    if (eventName === 'human-presence-5s' && document.visibilityState === 'visible' && document.hasFocus()) {
      return { classification: 'likely_human', reason: 'focused_visible_5s' };
    }
    return { classification: 'unknown', reason: 'insufficient_signal' };
  };

  const clientContext = (eventName) => {
    const verdict = classifyClient(eventName);
    return {
      visitor_id: visitorId,
      session_id: sessionId,
      delivery_token: deliveryToken,
      page_url: location.href,
      referrer: document.referrer || '',
      client_timestamp_utc: new Date().toISOString(),
      dwell_ms: Date.now() - startedAt,
      classification: verdict.classification,
      classification_reason: verdict.reason,
      user_agent: navigator.userAgent || '',
      visibility_state: document.visibilityState,
      has_focus: document.hasFocus(),
      webdriver: navigator.webdriver === true,
      language: navigator.language || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      viewport: `${window.innerWidth || 0}x${window.innerHeight || 0}`,
    };
  };

  const fallbackToFormSubmit = async (payload) => {
    const ip = await getPublicIp();
    const enriched = {
      _subject: `Evidence Axis tracking v2 — ${payload.company}`,
      _template: 'table',
      ...payload,
      ip,
      server_endpoint_available: 'false',
    };
    try {
      const body = new URLSearchParams();
      Object.entries(enriched).forEach(([key, value]) => body.set(key, String(value ?? '')));
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body,
        keepalive: true,
        credentials: 'omit',
        mode: 'no-cors',
      });
    } catch {}
  };

  const send = async (root, eventName) => {
    const company = root.dataset.deliveryCompany || 'Unknown company';
    const slug = root.dataset.deliverySlug || 'unknown';
    const dedupeKey = `ea:v2:${slug}:${eventName}`;

    try {
      if (sessionStorage.getItem(dedupeKey)) return;
      sessionStorage.setItem(dedupeKey, '1');
    } catch {}

    const payload = {
      source: 'intelligence-delivery-tracking-v2',
      event: eventName,
      company,
      delivery_slug: slug,
      ...clientContext(eventName),
    };

    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        credentials: 'omit',
      });
      if (response.ok) return;
    } catch {}

    await fallbackToFormSubmit(payload);
  };

  roots.forEach((root) => {
    send(root, 'delivery-page-viewed');

    const presenceTimer = window.setTimeout(() => {
      if (document.visibilityState === 'visible' && document.hasFocus()) {
        send(root, 'human-presence-5s');
      }
    }, 5000);

    window.addEventListener('pagehide', () => window.clearTimeout(presenceTimer), { once: true });

    root.querySelectorAll('[data-delivery-event]').forEach((el) => {
      el.addEventListener('click', () => {
        const eventName = el.dataset.deliveryEvent;
        if (eventName) send(root, eventName);
      });
    });
  });
})();
