# Evidence Axis — Website

Competitor intelligence for B2B SaaS decisions. A multi-page [Astro](https://astro.build)
site: static-rendered, no client framework, with a custom evidence-oriented visual
system (the "Axis") and a Fact / Inference / Unknown design language that runs through
the pages and the sample report.

- **Astro version:** `7.2.0` (pinned exactly in `package.json`; lockfile committed)
- **Rendering:** static (`output: static`), `trailingSlash: 'always'`
- **No SPA, no React/Vue/Svelte.** Interactions are CSS/SVG + small vanilla-TS scripts.
- **3D:** `three@0.185.1` powers the homepage spatial hero **only** — dynamically
  imported, WebGL2-gated, and never in the critical path (see below).
- **Fonts:** self-hosted open fonts via `@fontsource` (Space Grotesk, Newsreader, IBM Plex Mono) — no commercial license required.

---

## Requirements

- **Node.js `>=22.12.0`** — this is the engine required by the pinned `astro@7.2.0`
  (from its `package.json` `engines` field); it is the controlling technical fact.
  Older Node versions (18/20) are **not** supported by this Astro version.
- **npm `>=9.6.5`** (built and validated on npm 10)

## Install, run, build

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:4321)
npm run build      # production build → ./dist
npm run preview    # serve the built ./dist locally
npm run check      # astro check (type + template diagnostics)
```

The production build outputs a fully static site to `dist/`, including
`sitemap-index.xml` / `sitemap-0.xml` and `robots.txt`.

---

## Where to edit the important things

Almost every business-editable value is centralized in **`src/config/site.ts`**.

| You want to change… | Edit |
| --- | --- |
| Domain / canonical URL | `src/config/site.ts` → `site.url` **and** `astro.config.mjs` → `SITE` |
| Prices, delivery times, offer names | `src/config/site.ts` → `offers` |
| Primary/secondary CTA labels & links | `src/config/site.ts` → `cta` |
| Contact email (currently none) | `src/config/site.ts` → `contact.email` |
| **Form submission endpoint** | `src/config/site.ts` → `contact.formEndpoint` (see below) |
| Legal entity / jurisdiction | `src/config/site.ts` → `legal` (kept `null` until finalized) |
| Navigation items | `src/data/nav.ts` |
| Method copy / evidence states | `src/data/method.ts` |

### Connecting the inquiry form

The form (`src/components/ContactForm.astro`) is **provider-agnostic**. It POSTs a
standard `FormData` payload to whatever URL is set in `contact.formEndpoint`.

- While `formEndpoint` is `null` (the current state), the form validates fully but
  **does not pretend to submit** — it tells the visitor the channel is being finalized.
- To go live, set `contact.formEndpoint` to a real POST URL. Any of these work with no
  code change: Formspree, Web3Forms, Basin, a Cloudflare Pages Function, or a Vercel
  serverless function. The form also degrades to a native HTML POST if JS is unavailable.
- Fields submitted: `name, email, company, website, role, service, question,
  competitors, timing, context` (plus a `fax` honeypot you can ignore/drop server-side).

---

## Project structure

```
src/
  config/site.ts        # all editable business facts (single source of truth)
  data/                 # nav, method content (no competitor facts)
  styles/               # tokens.css (design system) + global.css
  layouts/Base.astro    # <head>, header, footer, enhancement scripts, fonts
  components/            # Header, Footer, Hero, evidence components, form, etc.
  pages/                # the 10 routes + 404
public/
  favicon.svg           # brand mark
  og-image.svg / .png   # social preview (raster generated from the SVG)
  robots.txt
```

### Pages

`/` · `/competitor-brief/` · `/market-intelligence/` · `/strategic-blueprint/` ·
`/method/` · `/sample-report/` · `/about/` · `/contact/` · `/privacy/` · `/terms/`

---

## Design system (for future edits)

- **Tokens:** `src/styles/tokens.css` — colors, type scale, spacing, depth, motion,
  z-index. Light "bone paper" is the default surface; add `data-surface="dark"` to any
  section for the dark editorial/instrument surface (it repaints background + text).
- **Evidence states:** Fact / Inference / Unknown are distinguished by **hue + border
  style + marker shape** (never color alone) so they remain legible without color and
  for colorblind users. See `.state--*` and the markers in `global.css`.
- **The Axis:** `.axis-frame` / `.axis-tick` draw the signature vertical reference line.

### Spatial hero (Three.js) — architecture

The homepage hero is layered by capability. The DOM hero (headline, pricing, CTAs)
always renders immediately; the 3D scene is a pure enhancement.

- **Files:** `src/scripts/hero-spatial/`
  - `config.ts` — colours, the **evidence items** (edit here — see below), motion timing, DPR caps, min width.
  - `capability.ts` — gating: reduced-motion, min width (1024), **WebGL2** support, fine pointer, Save-Data/cores. (`?spatial=1` force is restricted to localhost.)
  - `scene.ts` — the procedural Three.js scene (axis, evidence cards as canvas-texture labels, inference connectors, decision node). One renderer, one loop, disposes cleanly.
  - `index.ts` — lifecycle: dynamic `import('./scene')`, `await document.fonts.ready`, construct, render a first frame, **then** swap layout to `.hero--spatial-ready`.
- **WebGL2 required.** `capability.ts` tests `getContext('webgl2')` directly (the renderer needs WebGL2) and releases the probe context. WebGL1-only devices fall back.
- **Dynamic loading.** Three.js lives in the `scene.*.js` chunk, imported only after the capability gate passes — never blocking first paint. The hero entry chunk is tiny.
- **Fallback (always present underneath):** the CSS/SVG "evidence field" in `Hero.astro`. It is what shows for:
  - mobile (width < 1024), tablet without a fine pointer,
  - `prefers-reduced-motion: reduce` (a polished static composition),
  - no WebGL2, Save-Data, or any scene-init failure (silent — no console noise, no blank canvas).
- **`.hero--spatial-ready`** is added **only** after the scene loads, fonts are ready, and a valid first frame renders. The fallback stays fully visible until that instant, so there is no flash of empty canvas.
- **Run-state:** one authoritative check — the render loop runs only when `initialized && hero-intersects-viewport && document-visible && !disposed`. Returning to a visible tab does **not** resume rendering while the hero is offscreen. Loop pauses offscreen (IntersectionObserver) and on tab-hidden.
- **DPR caps:** 1.5 desktop, 1.25 tablet. Pointer parallax is subtle and mouse-only.
- **Teardown** (e.g. resize below 1024) cancels rAF, disconnects the observer, removes all listeners (via `AbortController`), disposes Three resources, and restores the fallback.

**Editing the evidence items safely:** change the `EVIDENCE` array in
`src/scripts/hero-spatial/config.ts`. Each item has a `state` (`fact`/`inference`/`unknown`),
a `scatter` pose, an `aligned` pose, and (for inferences) a `derivesFrom` index pointing at
the fact it connects to. Keep facts at `x: 0` (on the axis), inferences on the `x: 1.5` rail,
unknowns off to the right. Labels render into small canvas textures; keep them short.

### Evidence chain (Method + Home)

`src/components/EvidenceChain.astro` is CSS/SVG + vanilla TS (no WebGL). Its signature
interaction traces provenance **backward** — selecting any conclusion (or "← Trace to
source") walks Decision → Inference → Fact → Observation → Source. "Replay forward" plays
the other direction. Fully keyboard-operable; under reduced-motion it reveals the path
without the stepwise animation.

### Reduced motion / No-JS

Every animation is disabled under `prefers-reduced-motion: reduce`, and revealed content is
forced visible (including for print). With no JS, content is fully readable; `html.no-js` is
removed on load and reveal elements fall back to visible.

### Sample report architecture

The Intercom-vs-Zendesk demonstration content is centralized in
`src/data/sample-report.ts` (research metadata, sources, evidence records, matrix). The
`/sample-report/` page and the downloadable report asset both derive from that single
module, so claims stay consistent. The downloadable asset lives under `public/report/`.
It is a **demonstration sample**, clearly labelled, not a client engagement.

---

## Deployment

The site is static, so it deploys anywhere that serves files. Two recommended paths:

### Cloudflare Pages
1. Push this repo to GitHub/GitLab.
2. Cloudflare Pages → **Create project** → connect the repo.
3. Framework preset: **Astro**. Build command: `npm run build`. Output dir: `dist`.
4. Deploy. You'll get a `*.pages.dev` URL to verify.

### Vercel
1. Import the repo at vercel.com.
2. Vercel auto-detects Astro. Build: `npm run build`. Output: `dist`.
3. Deploy and verify the preview URL.

### Connecting evidenceaxis.com (registrar: GoDaddy)
GoDaddy is **registrar only** — do not host there and do not change existing DNS until
you have a deployment URL. `evidenceaxis.com` is an **apex** domain, which matters below.
Always use the exact records the platform shows you **at deployment time** — do not rely
on any value hard-coded here, as platform requirements change.

1. Deploy first (above) and confirm the site works on the platform URL.
2. Add the custom domain in the platform dashboard and follow its instructions:
   - **Cloudflare Pages — apex (`evidenceaxis.com`):** Cloudflare Pages custom domains
     work most cleanly when the domain's DNS is on a Cloudflare **zone**. The usual path is
     to add the site as a zone in Cloudflare and point GoDaddy to Cloudflare's **nameservers**;
     Cloudflare then manages the apex record (its CNAME-flattening handles the apex for you).
     A `www` subdomain is a straightforward `CNAME` to the Pages target. Use the exact
     nameservers/records Cloudflare shows for your project.
   - **Vercel — apex (`evidenceaxis.com`):** add the domain in Project → Domains and use the
     **exact DNS records the Vercel dashboard displays for your project** (an apex `A`/`ALIAS`
     and a `www` `CNAME`). The specific values are shown per-project at that moment — enter
     those, not any value copied from documentation.
3. In whichever DNS is authoritative (GoDaddy, or Cloudflare if you moved nameservers), add
   only the records the platform specified. Leave unrelated records untouched.
4. Wait for propagation + automatic TLS issuance, then confirm `https://evidenceaxis.com`.
5. Confirm `site.url` (config) and `SITE` (astro.config) are `https://evidenceaxis.com`
   so canonicals, sitemap and OG URLs are correct, and rebuild/redeploy.

---

## Pre-launch checklist (unresolved real-world items)

These are genuine business/config decisions, not unfinished website work:

- [ ] **Contracting/legal entity** — set in `legal.entity`; review Privacy & Terms wording.
- [ ] **Invoicing / payment route** — arranged off-site; no change needed in code.
- [ ] **Real contact email** — set `contact.email`.
- [ ] **Form endpoint** — set `contact.formEndpoint` (a real POST URL; currently `null`).
- [ ] **Analytics choice** (if any) — none is used by default; if you add one, update the Privacy page's technical/cookies section accordingly.
- [ ] **Cloudflare Pages or Vercel project** created and connected.
- [ ] **DNS** for `evidenceaxis.com` pointed at the deployment (GoDaddy records).
- [ ] Regenerate `public/og-image.png` if the OG art changes.

---

## Notes

- `astro check` passes with 0 errors.
- The Sample Report page is print-optimized: the "Save as PDF" button opens the browser
  print dialog and the print stylesheet outputs just the brief document.

