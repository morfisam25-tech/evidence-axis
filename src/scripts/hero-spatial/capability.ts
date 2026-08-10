/**
 * Capability gating for the spatial hero. Decides whether the full WebGL
 * experience runs, or the site keeps its CSS/SVG fallback. Errs toward the
 * fallback: the fallback is intentional, not a downgrade.
 */
import { CAPS } from './config';

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/** The Three.js WebGLRenderer here requires WebGL2. Test WebGL2 directly —
 *  a WebGL1-only device must fall back rather than let the renderer throw.
 *  The probe context is released so it doesn't linger. */
export function supportsWebGL2(): boolean {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** QA/testing hook: `?spatial=1` bypasses the fine-pointer/core/Save-Data gate
 *  so the scene can be rendered headlessly. Restricted to local development
 *  hosts (localhost / loopback) — it must NEVER override capability rules for a
 *  real visitor on evidenceaxis.com. Never bypasses reduced-motion, WebGL2, or
 *  the minimum-width rule. */
function isLocalDev(): boolean {
  const h = location.hostname;
  return (
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h === '[::1]' ||
    h === '::1' ||
    h.endsWith('.local')
  );
}
function forced(): boolean {
  try {
    return isLocalDev() && new URLSearchParams(location.search).get('spatial') === '1';
  } catch {
    return false;
  }
}

/** Full spatial experience only on capable, motion-tolerant desktops. */
export function shouldRunSpatial(): boolean {
  if (prefersReducedMotion()) return false;
  if (window.innerWidth < CAPS.minWidth) return false;
  if (!supportsWebGL2()) return false;
  if (forced()) return true;
  if (!hasFinePointer()) return false;
  // Respect data-saver / very low core counts where exposed.
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    hardwareConcurrency?: number;
  };
  if (nav.connection?.saveData) return false;
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2) return false;
  return true;
}

export function dprCap(): number {
  return window.innerWidth < 1280 ? CAPS.dprTablet : CAPS.dprDesktop;
}
