/**
 * Spatial hero entry — strict progressive enhancement.
 *
 * The DOM hero (headline, pricing, CTAs) renders immediately and is never
 * blocked. The CSS/SVG "evidence field" is the fallback and stays fully visible
 * during JS startup, the Three.js chunk download, font loading and scene
 * construction. Only after the scene has loaded, fonts are ready, the WebGL2
 * renderer initialises and a valid first frame renders do we swap the layout to
 * `.hero--spatial-ready`. Any failure keeps the fallback intact, silently.
 */
import { shouldRunSpatial, dprCap } from './capability';
import { CAPS } from './config';

export function initHeroSpatial(): void {
  const section = document.querySelector<HTMLElement>('[data-hero]');
  const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  if (!section || !canvas) return;
  if (!shouldRunSpatial()) return; // keep the CSS/SVG fallback

  const ac = new AbortController();
  const { signal } = ac;
  const states = section.querySelector<HTMLElement>('[data-hero-states]');

  let scene: import('./scene').HeroScene | null = null;
  let io: IntersectionObserver | null = null;
  let rafId = 0;

  // Authoritative run-state inputs — the loop runs only when ALL are true.
  let initialized = false;
  let intersecting = false;
  let visible = !document.hidden;
  let disposed = false;
  let running = false;

  const measure = () => {
    const r = canvas.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  };
  const computeProgress = () => {
    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), total);
    return scrolled / total;
  };
  const updateStates = () => {
    if (!states) return;
    const p = computeProgress();
    states.setAttribute('data-active', String(p < 0.28 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3));
  };

  const tick = () => {
    if (!running || !scene) return;
    scene.setProgress(computeProgress());
    scene.frame();
    rafId = requestAnimationFrame(tick);
  };

  // Single source of truth: reconcile the loop with current conditions.
  const updateRunState = () => {
    const shouldRun = initialized && intersecting && visible && !disposed;
    if (shouldRun && !running) {
      running = true;
      rafId = requestAnimationFrame(tick);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(rafId);
    }
  };

  const teardownToFallback = () => {
    if (disposed) return;
    disposed = true;
    running = false;
    cancelAnimationFrame(rafId);
    io?.disconnect();
    io = null;
    ac.abort(); // removes every listener registered with `signal`
    scene?.dispose();
    scene = null;
    section.classList.remove('hero--spatial-ready');
  };

  (async () => {
    let HeroScene: typeof import('./scene').HeroScene;
    try {
      ({ HeroScene } = await import('./scene'));
    } catch {
      return; // chunk failed to load → keep fallback, silent
    }
    if (disposed) return;

    // Fonts must be ready before we rasterise labels into canvas textures.
    try {
      if (document.fonts?.ready) await document.fonts.ready;
    } catch {
      /* proceed with fallback fonts if the API misbehaves */
    }
    if (disposed) return;

    // Construct + render a first frame BEFORE swapping layout. The canvas is
    // still display:none, so size it to what it will become (full stage).
    const initW = section.clientWidth || window.innerWidth;
    const initH = window.innerHeight;
    try {
      scene = new HeroScene(canvas, dprCap(), initW, initH);
      scene.setProgress(computeProgress());
      scene.frame(); // valid first frame into the backing buffer
    } catch {
      teardownToFallback();
      return;
    }
    if (disposed) return;

    // Now reveal: swap to the spatial layout (canvas already shows frame one).
    section.classList.add('hero--spatial-ready');
    requestAnimationFrame(() => {
      if (disposed || !scene) return;
      const { w, h } = measure(); // exact size after layout
      scene.resize(w, h);
      scene.frame();
    });

    initialized = true;

    // Events (all removed together via the AbortController on teardown).
    window.addEventListener('scroll', () => { scene?.setProgress(computeProgress()); updateStates(); }, { passive: true, signal });
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      scene?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    }, { passive: true, signal });

    let rt = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        if (disposed) return;
        if (window.innerWidth < CAPS.minWidth) { teardownToFallback(); return; }
        const s = measure();
        scene?.resize(s.w, s.h);
      }, 150);
    }, { signal });

    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden;
      updateRunState(); // will NOT resume if the hero is still offscreen
    }, { signal });

    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) intersecting = e.isIntersecting;
        updateRunState();
      },
      { threshold: 0 }
    );
    io.observe(section);

    updateStates();
    updateRunState();
  })();
}
