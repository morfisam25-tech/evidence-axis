(() => {
  const roots = document.querySelectorAll('[data-delivery-tracking]');
  if (!roots.length) return;

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

  const clientContext = () => ({
    visitor_id: visitorId,
    session_id: sessionId,
    delivery_token: deliveryToken,
    page_url: location.href,
    referrer: document.referrer || '',
    client_timestamp_utc: new Date().toISOString(),
    dwell_ms: Date.now() - startedAt,
    visibility_state: document.visibilityState,
    has_focus: document.hasFocus(),
    webdriver: navigator.webdriver === true,
    language: navigator.language || '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    viewport: `${window.innerWidth || 0}x${window.innerHeight || 0}`,
  });

  const send = (root, eventName) => {
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
      ...clientContext(),
    };

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
      credentials: 'omit',
    }).catch(() => {});
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
