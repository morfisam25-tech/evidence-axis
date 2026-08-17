from pathlib import Path
import re

# Homepage: replace the faux slide reel with a real motion video embed and remove broken overlays.
p = Path('src/pages/index.astro')
s = p.read_text()

film_pattern = re.compile(
    r'<div class="film-v10__stage">\s*<div class="film-v10__player film-v10__player--motion".*?</div>\s*<figure class="film-v10__card film-v10__card--a">.*?</figure>\s*<figure class="film-v10__card film-v10__card--b">.*?</figure>\s*</div>',
    re.S,
)
real_film = '''<div class="film-v10__stage film-v10__stage--real-video">
          <div class="film-v10__player film-v10__player--real-video" aria-label="Evidence Axis real motion film">
            <iframe
              src="https://player.vimeo.com/video/772467451?background=1&autoplay=1&muted=1&loop=1&autopause=0&title=0&byline=0&portrait=0"
              title="Business analyst working with live market data"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="eager"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
            <div class="film-v10__frame"><span>REAL MOTION FILM</span><b>Live market analysis · continuous loop</b></div>
          </div>
        </div>'''
s, count = film_pattern.subn(real_film, s, count=1)
if count != 1:
    raise SystemExit('Could not replace film block')

s = s.replace('Here the workflow moves automatically: public source, classification, comparison, traceable reasoning and the decision output.',
              'Here you see real motion: an analyst working with live market data. The surrounding site explains how Evidence Axis turns that kind of public signal into classified, traceable decision evidence.')

# Homepage gallery: only use assets known to render cleanly; remove all broken embedded SVGs.
s = s.replace('/assets/v10/approved/global-trading-command-center.webp" alt="Global trading and research command center"',
              '/assets/v10/command-center.webp" alt="Business intelligence team working in a decision room"')
s = s.replace('/assets/v10/global-signal.svg" alt="Global signal map interface"',
              '/assets/v10/global-signal.webp" alt="Global signal map and market intelligence view"')
s = s.replace('/assets/v10/command-center-approved.svg" alt="Evidence Axis command center interface"',
              '/assets/v10/decision-dashboard.webp" alt="Decision dashboard interface"')

# Homepage sample outputs: remove broken SVGs from large cards.
s = s.replace('/assets/v10/evidence-matrix.svg" alt="Evidence Axis evidence matrix sample"',
              '/assets/v10/approved/what-you-get.webp" alt="Evidence Axis evidence matrix and deliverable sample"')
s = s.replace('/assets/v10/decision-brief.svg" alt="Evidence Axis decision-ready output"',
              '/assets/v10/approved/decision-ready-showcase.webp" alt="Evidence Axis decision-ready output"')
s = s.replace('/assets/v10/ai-comparison.svg" alt="Structured evidence compared with generic AI output"',
              '/assets/v10/decision-dashboard.webp" alt="Structured evidence dashboard"')
s = s.replace('/assets/v10/decision-room.svg" alt="Business team reviewing strategic evidence"',
              '/assets/v10/corporate-strategy.webp" alt="Business team reviewing strategic evidence"')

# Keep later visuals clean as well.
s = s.replace('/assets/v10/approved/generic-ai-vs-evidence-axis.webp" alt="Comparison between generic AI output and structured, source-traceable Evidence Axis research"',
              '/assets/v10/approved-visual-gallery.webp" alt="Structured Evidence Axis research workflow"')
s = s.replace('/assets/v10/approved/sample-report-showcase.webp" alt="Business professionals reviewing strategic evidence"',
              '/assets/v10/command-center.webp" alt="Business professionals reviewing strategic evidence"')

p.write_text(s)

# Homepage CSS: real video iframe, remove slideshow rules, keep frame cinematic.
p = Path('src/styles/home-final.css')
s = p.read_text()
if 'REAL-FILM-PASS-V2' not in s:
    s += '''\n\n/* REAL-FILM-PASS-V2 — actual continuous video, not a presentation reel */\n.film-v10__stage--real-video{min-height:clamp(28rem,42vw,42rem);}\n.film-v10__player--real-video{inset:0!important;transform:none!important;overflow:hidden;background:#020713;}\n.film-v10__player--real-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;transform:scale(1.02);}\n.film-v10__player--real-video .film-v10__frame{z-index:3;top:auto;bottom:1rem;left:1rem;right:1rem;background:rgba(2,9,20,.72);border:1px solid rgba(124,168,225,.2);backdrop-filter:blur(12px);padding:.68rem .8rem;border-radius:.7rem;}\n.film-v10__stage--real-video .film-v10__card{display:none!important;}\n@media(max-width:620px){.film-v10__stage--real-video{min-height:22rem}.film-v10__player--real-video iframe{transform:scale(1.12)}}\n'''
p.write_text(s)

# Internal page secondary visuals: stop rendering the broken SVGs in the right half.
p = Path('src/styles/site-final.css')
s = p.read_text()
replacements = {
    "background-image:url('/assets/v10/decision-brief.svg')": "background-image:url('/assets/v10/decision-dashboard.webp')",
    "background-image:url('/assets/v10/evidence-matrix.svg')": "background-image:url('/assets/v10/approved-visual-gallery.webp')",
    "background-image:url('/assets/v10/global-signal.svg')": "background-image:url('/assets/v10/global-signal.webp')",
    "background-image:url('/assets/v10/decision-room.svg')": "background-image:url('/assets/v10/corporate-strategy.webp')",
    "background-image:url('/assets/v10/command-center-approved.svg')": "background-image:url('/assets/v10/command-center.webp')",
}
for old, new in replacements.items():
    s = s.replace(old, new)
# Avoid blowing up low-res source art too aggressively.
s = s.replace('grid-template-columns:.88fr 1.12fr;min-height:24rem', 'grid-template-columns:1fr 1fr;min-height:21rem')
s = s.replace('min-height:24rem;max-height:34rem;object-fit:cover', 'min-height:21rem;max-height:30rem;object-fit:contain')
s = s.replace('display:block;min-height:24rem;', 'display:block;min-height:21rem;')
p.write_text(s)

print('Patched real film + broken visuals successfully.')
