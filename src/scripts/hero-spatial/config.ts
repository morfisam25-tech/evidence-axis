/**
 * Evidence Axis — spatial hero configuration.
 * Central constants for the WebGL scene: colours (brand-aligned), the
 * evidence set, motion timing, capability thresholds. No Three.js imported
 * here so this stays a plain data module.
 */

export const COLORS = {
  bg: 0x14171c,
  axis: 0x5a76ad,
  axisBright: 0x8aa0d0,
  fact: 0x53a98c,
  inference: 0xc99a4e,
  unknown: 0x8a919b,
  decision: 0x7590c6,
  paper: 0xf4f1e9,
  faint: 0x3a4048,
} as const;

export type EvidenceState = 'fact' | 'inference' | 'unknown';

export interface EvidenceItem {
  label: string;
  state: EvidenceState;
  /** scattered pose */
  scatter: [number, number, number];
  rot: number;
  /** resolved pose (aligned around the axis) */
  aligned: [number, number, number];
  /** index of the fact this inference derives from (for the connector) */
  derivesFrom?: number;
}

/**
 * The evidence set. Facts anchor ON the axis (x≈0). Inferences align to a
 * parallel rail (x≈+1.6) and keep a dashed connector back to their fact.
 * Unknowns stay off to the right (x≈+3.2), lower and unresolved — they never
 * converge. Order matters: `derivesFrom` indexes into this array.
 */
export const EVIDENCE: EvidenceItem[] = [
  // ---- Facts (anchor ON the axis, x=0) ----
  { label: 'pricing page', state: 'fact', scatter: [-3.6, 2.3, -1.6], rot: -0.5, aligned: [0, 1.7, 0] },       // 0
  { label: 'documentation', state: 'fact', scatter: [3.4, 1.7, -2.7], rot: 0.6, aligned: [0, 1.0, 0] },         // 1
  { label: 'changelog', state: 'fact', scatter: [-2.6, -2.3, -1.4], rot: 0.4, aligned: [0, 0.3, 0] },          // 2
  { label: 'product page', state: 'fact', scatter: [3.9, -1.5, -0.7], rot: -0.7, aligned: [0, -0.4, 0] },       // 3
  { label: 'help centre', state: 'fact', scatter: [-4.0, 0.3, -2.1], rot: 0.3, aligned: [0, -1.1, 0] },         // 4
  { label: 'review signal', state: 'fact', scatter: [1.4, 2.9, -1.9], rot: -0.35, aligned: [0, -1.8, 0] },      // 5
  // ---- Inferences (parallel rail x=1.5, dashed connector to a fact) ----
  { label: 'packaging gap', state: 'inference', scatter: [-1.3, 1.5, -2.3], rot: 0.5, aligned: [1.5, 1.45, 0], derivesFrom: 0 },   // 6
  { label: 'shipped?', state: 'inference', scatter: [2.6, 0.2, -1.9], rot: -0.4, aligned: [1.5, 0.65, 0], derivesFrom: 1 },        // 7
  { label: 'positioning shift', state: 'inference', scatter: [-3.0, -1.0, -0.9], rot: 0.6, aligned: [1.5, -0.4, 0], derivesFrom: 3 }, // 8
  // ---- Unknowns (off to the right x=2.35, unresolved, never converge) ----
  { label: 'private churn', state: 'unknown', scatter: [3.2, 2.4, -1.2], rot: 0.5, aligned: [2.35, 1.15, -0.3] },  // 9
  { label: 'roadmap', state: 'unknown', scatter: [-1.9, 2.6, -2.2], rot: -0.5, aligned: [2.35, 0.05, -0.3] },      // 10
  { label: 'adoption', state: 'unknown', scatter: [2.1, -2.6, -1.3], rot: 0.4, aligned: [2.35, -1.05, -0.3] },     // 11
] as const as EvidenceItem[];

export const STATE_LABELS = ['Scattered', 'Classified', 'Aligned', 'Decision'] as const;

export const TIMING = {
  progressTau: 0.16, // scroll-progress smoothing time constant (seconds)
  pointerTau: 0.13, // pointer parallax smoothing time constant (seconds)
  pointerAmpX: 0.32, // radians of scene yaw at full pointer deflection
  pointerAmpY: 0.2,
} as const;

export const CAPS = {
  dprDesktop: 1.5,
  dprTablet: 1.25,
  minWidth: 1024, // below this → CSS/SVG fallback, no WebGL scroll hero
} as const;
