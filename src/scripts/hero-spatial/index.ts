/**
 * Spatial hero entry — strict progressive enhancement.
 *
 * The DOM hero renders immediately. A lightweight pointer interaction gives
 * the Evidence Chamber real depth on fine-pointer desktops even before the
 * optional WebGL layer is considered. Three.js remains a progressive layer:
 * if capability checks, loading, fonts or scene setup fail, the DOM experience
 * stays intact.
 */
import { shouldRunSpatial, dprCap } from './capability';
import { CAPS } from './config';

function initDomChamberInteraction(section: HTMLElement): void {
  const engine = section.querySelector<HTMLElement>('.engine');
  const chamber = section.querySelector<HTMLElement>('.chamber');
  if (!engine || !chamber) return;

  const finePointer = window.matchMedia('(pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!finePointer.matches || reducedMotion.matches || window.innerWidth < CAPS.minWidth) return;

  const glass = chamber.querySelector<HTMLElement>('.chamber__glass');
  const beam = chamber.querySelector<HTMLElement>('.chamber__beam');
  const factStack = chamber.querySelector<HTMLElement>('.fact-stack');
  const axisLabel = chamber.querySelector<HTMLElement>('.chamber__axis-label');
  const topCap = chamber.querySelector<HTMLElement>('.chamber__cap--top');
  const bottomCap = chamber.querySelector<HTMLElement>('.chamber__cap--bottom');
  const unknownLane = engine.querySelector<HTMLElement>('.lane--unknown');
  const inferenceLane = engine.querySelector<HTMLElement>('.lane--inference');
  const decision = engine.querySelector<HTMLElement>('.decision-card');
  const halo = engine.querySelector<HTMLElement>('.engine__halo');

  chamber.style.transformStyle = 'preserve-3d';
  chamber.style.willChange = 'transform';
  chamber.style.transition = 'transform 180ms cubic-bezier(.2,.75,.25,1), box-shadow 180ms ease, filter 180ms ease';

  const depthEls = [glass, beam, factStack, axisLabel, topCap, bottomCap].filter(Boolean) as HTMLElement[];
  depthEls.forEach((el) => {
    el.style.willChange = 'transform';
    el.style.transition = 'transform 180ms cubic-bezier(.2,.75,.25,1), filter 180ms ease';
  });

  let raf = 0;

  const reset = () => {
    cancelAnimationFrame(raf);
    chamber.style.transform = 'translateX(-50%) rotateX(0deg) rotateY(0deg) translateZ(0)';
    chamber.style.filter = 'brightness(1)';
    chamber.style.boxShadow = '';
    if (glass) {
      glass.style.transform = 'translateZ(8px)';
      glass.style.backgroundPosition = '50% 50%';
    }
    if (beam) beam.style.transform = 'translateX(-50%) translateZ(20px)';
    if (factStack) factStack.style.transform = 'translateX(-50%) translateZ(30px)';
    if (axisLabel) axisLabel.style.transform = 'translateX(-50%) translateZ(26px)';
    if (topCap) topCap.style.transform = 'perspective(320px) rotateX(-5deg) translateZ(18px)';
    if (bottomCap) bottomCap.style.transform = 'translateZ(12px)';
    if (unknownLane) unknownLane.style.transform = 'translate3d(0,0,0)';
    if (inferenceLane) inferenceLane.style.transform = 'translate3d(0,0,0)';
    if (decision) decision.style.transform = 'translate3d(0,0,0)';
    if (halo) halo.style.transform = 'translate(-50%, -50%)';
    engine.classList.remove('is-pointer-active');
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = engine.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const nx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      const rx = -ny * 7.5;
      const ry = nx * 13.5;

      chamber.style.transform = `translateX(-50%) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(8px)`;
      chamber.style.filter = 'brightness(1.08) saturate(1.08)';
      chamber.style.boxShadow = `inset 0 0 70px rgba(54,154,255,.17), ${(-nx * 18).toFixed(1)}px ${(ny * 12).toFixed(1)}px 82px rgba(29,113,240,.22)`;

      if (glass) {
        glass.style.transform = `translateZ(${(12 + Math.abs(nx) * 7).toFixed(1)}px)`;
        glass.style.backgroundPosition = `${(50 + nx * 18).toFixed(1)}% ${(50 + ny * 10).toFixed(1)}%`;
      }
      if (beam) beam.style.transform = `translateX(-50%) translateZ(${(24 + Math.abs(nx) * 9).toFixed(1)}px)`;
      if (factStack) factStack.style.transform = `translateX(-50%) translateZ(${(34 + Math.abs(nx) * 11).toFixed(1)}px)`;
      if (axisLabel) axisLabel.style.transform = `translateX(-50%) translateZ(${(30 + Math.abs(nx) * 8).toFixed(1)}px)`;
      if (topCap) topCap.style.transform = `perspective(320px) rotateX(${(-5 - ny * 2.2).toFixed(2)}deg) translateZ(22px)`;
      if (bottomCap) bottomCap.style.transform = 'translateZ(17px)';

      if (unknownLane) unknownLane.style.transform = `translate3d(${(-nx * 8).toFixed(1)}px, ${(-ny * 5).toFixed(1)}px, 0)`;
      if (inferenceLane) inferenceLane.style.transform = `translate3d(${(nx * 9).toFixed(1)}px, ${(ny * 5).toFixed(1)}px, 0)`;
      if (decision) decision.style.transform = `translate3d(${(nx * 12).toFixed(1)}px, ${(ny * 7).toFixed(1)}px, 0)`;
      if (halo) halo.style.transform = `translate(calc(-50% + ${(nx * 9).toFixed(1)}px), calc(-50% + ${(ny * 6).toFixed(1)}px))`;

      engine.classList.add('is-pointer-active');
    });
  };

  engine.addEventListener('pointermove', onMove, { passive: true });
  engine.addEventListener('pointerleave', reset, { passive: true });
  window.addEventListener('blur', reset, { passive: true });
  reset();
}

export function initHeroSpatial(): void {
  const section = document.querySelector<HTMLElement>('[data-hero]');
  const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  if (!section || !canvas) return;

  // DOM depth is useful even when WebGL is unavailable.
  initDomChamberInteraction(section);

  if (!shouldRunSpatial()) return;

  const ac = new AbortController();
  const { signal } = ac;
  const states = section.querySelector<HTMLElement>('[data-hero-states]');

  let scene: import('./scene').HeroScene | null = null;
  let io: IntersectionObserver | null = null;
  let rafId = 0;

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
    ac.abort();
    scene?.dispose();
    scene = null;
    section.classList.remove('hero--spatial-ready');
  };

  (async () => {
    let HeroScene: typeof import('./scene').HeroScene;
    try {
      ({ HeroScene } = await import('./scene'));
    } catch {
      return;
    }
    if (disposed) return;

    try {
      if (document.fonts?.ready) await document.fonts.ready;
    } catch {
      /* continue with fallback fonts */
    }
    if (disposed) return;

    const initW = section.clientWidth || window.innerWidth;
    const initH = window.innerHeight;
    try {
      scene = new HeroScene(canvas, dprCap(), initW, initH);
      scene.setProgress(computeProgress());
      scene.frame();
    } catch {
      teardownToFallback();
      return;
    }
    if (disposed) return;

    section.classList.add('hero--spatial-ready');
    requestAnimationFrame(() => {
      if (disposed || !scene) return;
      const { w, h } = measure();
      scene.resize(w, h);
      scene.frame();
    });

    initialized = true;

    window.addEventListener('scroll', () => {
      scene?.setProgress(computeProgress());
      updateStates();
    }, { passive: true, signal });

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      scene?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    }, { passive: true, signal });

    let rt = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        if (disposed) return;
        if (window.innerWidth < CAPS.minWidth) {
          teardownToFallback();
          return;
        }
        const s = measure();
        scene?.resize(s.w, s.h);
      }, 150);
    }, { signal });

    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden;
      updateRunState();
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
