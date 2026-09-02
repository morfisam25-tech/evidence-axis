const ALLOWED_ORIGINS = new Set([
  'https://evidenceaxis.com',
  'https://www.evidenceaxis.com',
]);

const scannerPattern = /(proofpoint|mimecast|barracuda|safelinks|microsoft office|defender|googleimageproxy|urlscan|crawler|spider|bot\b|headless|phantom|curl|wget|python-requests|axios|httpclient|linkcheck|security scanner)/i;

const corsHeaders = (origin) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'https://evidenceaxis.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
  Vary: 'Origin',
});

export async function onRequestOptions({ request }) {
  const origin = request.headers.get('Origin') || '';
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function onRequestPost({ request }) {
  const origin = request.headers.get('Origin') || '';
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return Response.json({ ok: false, error: 'origin_not_allowed' }, { status: 403, headers: corsHeaders(origin) });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400, headers: corsHeaders(origin) });
  }

  const company = String(body?.company || 'Unknown company').slice(0, 160);
  const event = String(body?.event || 'unknown').slice(0, 80);
  const slug = String(body?.delivery_slug || 'unknown').slice(0, 200);
  const token = String(body?.delivery_token || '').slice(0, 240);
  const ua = request.headers.get('User-Agent') || String(body?.user_agent || '');
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || '';
  const cf = request.cf || {};

  let classification = String(body?.classification || 'unknown');
  let classificationReason = String(body?.classification_reason || 'insufficient_signal');
  if (scannerPattern.test(ua)) {
    classification = 'likely_scanner';
    classificationReason = 'server_scanner_user_agent';
  }

  const payload = {
    _subject: `Evidence Axis tracking — ${company}`,
    _template: 'table',
    source: 'intelligence-delivery-tracking-server',
    event,
    company,
    delivery_slug: slug,
    delivery_token: token,
    received_at_utc: new Date().toISOString(),
    classification,
    classification_reason: classificationReason,
    ip,
    user_agent: ua,
    cf_country: cf.country || '',
    cf_city: cf.city || '',
    cf_region: cf.region || '',
    cf_timezone: cf.timezone || '',
    cf_asn: cf.asn || '',
    cf_colo: cf.colo || '',
    visitor_id: String(body?.visitor_id || '').slice(0, 240),
    session_id: String(body?.session_id || '').slice(0, 240),
    client_timestamp_utc: String(body?.timestamp_utc || body?.client_timestamp_utc || '').slice(0, 100),
    dwell_ms: String(body?.dwell_ms ?? '').slice(0, 40),
    referrer: String(body?.referrer || '').slice(0, 1000),
    page_url: String(body?.page_url || '').slice(0, 1600),
    visibility_state: String(body?.visibility_state || '').slice(0, 40),
    has_focus: String(body?.has_focus ?? '').slice(0, 20),
    webdriver: String(body?.webdriver ?? '').slice(0, 20),
    language: String(body?.language || '').slice(0, 80),
    client_timezone: String(body?.timezone || '').slice(0, 100),
    screen: String(body?.screen || '').slice(0, 60),
    viewport: String(body?.viewport || '').slice(0, 60),
  };

  try {
    const upstream = await fetch('https://formsubmit.co/ajax/sai@evidenceaxis.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const text = await upstream.text();
    if (!upstream.ok) {
      return Response.json({ ok: false, error: 'upstream_failed', upstream_status: upstream.status, upstream_body: text.slice(0, 300) }, { status: 502, headers: corsHeaders(origin) });
    }
    return Response.json({ ok: true, event, classification }, { status: 200, headers: corsHeaders(origin) });
  } catch (error) {
    return Response.json({ ok: false, error: 'upstream_exception', detail: String(error).slice(0, 300) }, { status: 502, headers: corsHeaders(origin) });
  }
}
