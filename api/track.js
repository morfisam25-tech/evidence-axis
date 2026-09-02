const FORM_ENDPOINT = 'https://formsubmit.co/ajax/sai@evidenceaxis.com';

const scannerPattern = /(proofpoint|mimecast|barracuda|safelinks|microsoft office|defender|googleimageproxy|urlscan|crawler|spider|bot\b|headless|phantom|curl|wget|python-requests|axios|httpclient|linkcheck|security scanner)/i;

function firstHeader(req, name) {
  const value = req.headers?.[name];
  return Array.isArray(value) ? value[0] : value || '';
}

function getIp(req) {
  const forwarded = firstHeader(req, 'x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return firstHeader(req, 'x-real-ip') || req.socket?.remoteAddress || '';
}

function classify({ userAgent, webdriver, event, hasFocus, visibilityState, acceptLanguage }) {
  if (scannerPattern.test(userAgent || '')) return { classification: 'likely_scanner', reason: 'scanner_user_agent' };
  if (webdriver === true) return { classification: 'likely_scanner', reason: 'webdriver_true' };
  if (event === 'human-presence-5s' && hasFocus === true && visibilityState === 'visible') {
    return { classification: 'likely_human', reason: 'focused_visible_5s' };
  }
  if (!acceptLanguage && event === 'delivery-page-viewed') return { classification: 'unknown', reason: 'missing_accept_language' };
  return { classification: 'unknown', reason: 'insufficient_signal' };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const userAgent = firstHeader(req, 'user-agent');
    const acceptLanguage = firstHeader(req, 'accept-language');
    const ip = getIp(req);
    const xVercelId = firstHeader(req, 'x-vercel-id');
    const secFetchSite = firstHeader(req, 'sec-fetch-site');
    const secFetchMode = firstHeader(req, 'sec-fetch-mode');
    const secFetchDest = firstHeader(req, 'sec-fetch-dest');

    const verdict = classify({
      userAgent,
      webdriver: body.webdriver,
      event: body.event,
      hasFocus: body.has_focus,
      visibilityState: body.visibility_state,
      acceptLanguage,
    });

    const enriched = {
      _subject: `Evidence Axis tracking v2 — ${body.company || 'Unknown company'}`,
      _template: 'table',
      source: 'intelligence-delivery-tracking-v2',
      event: body.event || 'unknown',
      company: body.company || 'Unknown company',
      delivery_slug: body.delivery_slug || 'unknown',
      delivery_token: body.delivery_token || '',
      server_timestamp_utc: new Date().toISOString(),
      client_timestamp_utc: body.client_timestamp_utc || '',
      dwell_ms: body.dwell_ms ?? '',
      classification: verdict.classification,
      classification_reason: verdict.reason,
      ip,
      user_agent: userAgent,
      accept_language: acceptLanguage,
      sec_fetch_site: secFetchSite,
      sec_fetch_mode: secFetchMode,
      sec_fetch_dest: secFetchDest,
      x_vercel_id: xVercelId,
      visitor_id: body.visitor_id || '',
      session_id: body.session_id || '',
      page_url: body.page_url || '',
      referrer: body.referrer || '',
      visibility_state: body.visibility_state || '',
      has_focus: body.has_focus ?? '',
      webdriver: body.webdriver ?? '',
      language: body.language || '',
      timezone: body.timezone || '',
      screen: body.screen || '',
      viewport: body.viewport || '',
    };

    const upstream = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(enriched),
    });

    if (!upstream.ok) {
      console.error('tracking-forward-failed', upstream.status, enriched.delivery_slug, enriched.event);
      return res.status(202).json({ ok: true, forwarded: false });
    }

    return res.status(200).json({ ok: true, classification: verdict.classification });
  } catch (error) {
    console.error('tracking-error', error);
    return res.status(202).json({ ok: true, forwarded: false });
  }
}
