from pathlib import Path
import re

p = Path('src/pages/index.astro')
s = p.read_text()

old_gallery = '''        <div class="gallery-v10__mosaic">
          <figure><img src="/assets/v10/command-center.webp" alt="Business intelligence team working in a decision room" loading="eager" /></figure>
          <figure><img src="/assets/v10/corporate-strategy.webp" alt="Business professionals studying a global market map" loading="lazy" /></figure>
          <figure><img src="/assets/v10/global-signal.webp" alt="Global signal map and market intelligence view" loading="lazy" /></figure>
          <figure><img src="/assets/v10/decision-dashboard.webp" alt="Decision dashboard interface" loading="lazy" /></figure>
        </div>'''
new_gallery = '''        <div class="gallery-v10__mosaic">
          <figure><img src="/assets/v10/premium/research-context.webp" alt="Evidence Axis research team connecting public signals, evidence and decision context" loading="eager" /></figure>
          <figure><img src="/assets/v10/premium/global-signals.webp" alt="Global signals and market intelligence command center" loading="lazy" /></figure>
          <figure><img src="/assets/v10/premium/strategy-war-room.webp" alt="Evidence Axis strategy war room with traceable decision intelligence" loading="lazy" /></figure>
          <figure><img src="/assets/v10/premium/workflow-dashboard.webp" alt="Evidence Axis source-to-decision workflow dashboard" loading="lazy" /></figure>
        </div>'''
if old_gallery in s:
    s = s.replace(old_gallery, new_gallery)
else:
    s = re.sub(r'<div class="gallery-v10__mosaic">.*?</div>', new_gallery.strip(), s, count=1, flags=re.S)

# Remove known white/broken visual assets and duplicate output art.
s = s.replace('/assets/v10/approved/what-you-get.webp', '/assets/v10/premium/workflow-dashboard.webp')
s = s.replace('/assets/v10/approved/decision-ready-showcase.webp', '/assets/v10/premium/strategy-war-room.webp')
s = s.replace('/assets/v10/approved-visual-gallery.webp', '/assets/v10/premium/research-context.webp')
s = s.replace('/assets/v10/ai-comparison.svg', '/assets/v10/premium/workflow-dashboard.webp')
needle = '<figure class="v10-media"><img src="/assets/v10/decision-dashboard.webp" alt="Structured evidence dashboard"'
s = s.replace(needle, '<figure class="v10-media"><img src="/assets/v10/premium/global-signals.webp" alt="Structured global evidence signals"', 1)
s = s.replace('/assets/v10/corporate-strategy.webp" alt="Business team reviewing strategic evidence"', '/assets/v10/command-center.webp" alt="Business team reviewing strategic evidence"')

if 'system-reel__slide' in s:
    raise SystemExit('Old slideshow markup still present; refusing to deploy')
p.write_text(s)

page_asset = {
    'src/pages/competitor-brief.astro': '/assets/v10/premium/strategy-war-room.webp',
    'src/pages/method.astro': '/assets/v10/premium/workflow-dashboard.webp',
    'src/pages/market-intelligence.astro': '/assets/v10/premium/global-signals.webp',
    'src/pages/strategic-blueprint.astro': '/assets/v10/premium/research-context.webp',
    'src/pages/sample-report.astro': '/assets/v10/premium/workflow-dashboard.webp',
    'src/pages/about.astro': '/assets/v10/premium/strategy-war-room.webp',
}
for file, asset in page_asset.items():
    q = Path(file)
    if not q.exists():
        continue
    t = q.read_text()
    t = re.sub(r'/assets/v10/approved/[^\"\']+?\.(?:webp|png|jpg|jpeg)', asset, t)
    for bad in (
        '/assets/v10/evidence-matrix.svg', '/assets/v10/decision-brief.svg',
        '/assets/v10/ai-comparison.svg', '/assets/v10/global-signal.svg',
        '/assets/v10/decision-room.svg', '/assets/v10/command-center-approved.svg'
    ):
        t = t.replace(bad, asset)
    q.write_text(t)

home = Path('src/pages/index.astro').read_text()
bad_home = [
    '/assets/v10/evidence-matrix.svg', '/assets/v10/decision-brief.svg',
    '/assets/v10/ai-comparison.svg', '/assets/v10/global-signal.svg',
    '/assets/v10/decision-room.svg', '/assets/v10/command-center-approved.svg'
]
found = [x for x in bad_home if x in home]
if found:
    raise SystemExit(f'Broken homepage visual references remain: {found}')
