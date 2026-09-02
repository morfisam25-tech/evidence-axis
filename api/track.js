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

function classify({ userAgent, webdriver, event, hasFocus, visibilityState }) {
  if (scannerPattern.test(userAgent || '')) return { classification: 'likely_scanner', reason: 'scanner_user_agent' };
  if (webdriver === true) return { classification: 'likely_scanner', reason: 'webdriver_true' };
  if (event === 'human-presence-5s' && hasFocus === true && visibilityState === 'visible') {
    return { classification: 'likely_human', reason: 'focused_visible_5s' };
  }
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
    const ip = getIp(req);
    const verdict = classify({
      userAgent,
      webdriver: body.webdriver,
      event: body.event,
      hasFocus: body.has_focus,
      visibilityState: body.visibility_state,
    });

    const enriched = {
      source: 'intelligence-delivery-tracking-v4',
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
      accept_language: firstHeader(req, 'accept-language'),
      sec_fetch_site: firstHeader(req, 'sec-fetch-site'),
      sec_fetch_mode: firstHeader(req, 'sec-fetch-mode'),
      sec_fetch_dest: firstHeader(req, 'sec-fetch-dest'),
      x_vercel_id: firstHeader(req, 'x-vercel-id'),
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

    console.log('EA_TRACKING_V4', JSON.stringify(enriched));

    return res.status(200).json({
      ok: true,
      recorded: true,
      classification: verdict.classification,
      classification_reason: verdict.reason,
      delivery_token: enriched.delivery_token,
      event: enriched.event,
      ip_captured: Boolean(ip),
      ip,
      server_timestamp_utc: enriched.server_timestamp_utc,
      user_agent: userAgent,
    });
  } catch (error) {
    console.error('EA_TRACKING_ERROR', error);
    return res.status(400).json({ ok: false, recorded: false });
  }
}
