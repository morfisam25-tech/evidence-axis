/**
 * Evidence Axis — spatial hero configuration.
 * Central constants for the WebGL scene. The palette is intentionally brighter
 * than the page background so the spatial layer reads as an active evidence
 * system rather than faint decoration.
 */

export const COLORS = {
  bg: 0x07111f,
  axis: 0x6f99ff,
  axisBright: 0xa9c0ff,
  fact: 0x58e6c8,
  inference: 0xf0b85e,
  unknown: 0x9aa8bd,
  decision: 0x779dff,
  paper: 0xf6f8fc,
  faint: 0x263a5a,
} as const;

export type EvidenceState = 'fact' | 'inference' | 'unknown';

export interface EvidenceItem {
  label: string;
  state: EvidenceState;
  scatter: [number, number, number];
  rot: number;
  aligned: [number, number, number];
  derivesFrom?: number;
}

export const EVIDENCE: EvidenceItem[] = [
  { label: 'pricing page', state: 'fact', scatter: [-3.6, 2.3, -1.6], rot: -0.5, aligned: [0, 1.7, 0] },
  { label: 'documentation', state: 'fact', scatter: [3.4, 1.7, -2.7], rot: 0.6, aligned: [0, 1.0, 0] },
  { label: 'changelog', state: 'fact', scatter: [-2.6, -2.3, -1.4], rot: 0.4, aligned: [0, 0.3, 0] },
  { label: 'product page', state: 'fact', scatter: [3.9, -1.5, -0.7], rot: -0.7, aligned: [0, -0.4, 0] },
  { label: 'help centre', state: 'fact', scatter: [-4.0, 0.3, -2.1], rot: 0.3, aligned: [0, -1.1, 0] },
  { label: 'review signal', state: 'fact', scatter: [1.4, 2.9, -1.9], rot: -0.35, aligned: [0, -1.8, 0] },
  { label: 'packaging gap', state: 'inference', scatter: [-1.3, 1.5, -2.3], rot: 0.5, aligned: [1.5, 1.45, 0], derivesFrom: 0 },
  { label: 'shipped?', state: 'inference', scatter: [2.6, 0.2, -1.9], rot: -0.4, aligned: [1.5, 0.65, 0], derivesFrom: 1 },
  { label: 'positioning shift', state: 'inference', scatter: [-3.0, -1.0, -0.9], rot: 0.6, aligned: [1.5, -0.4, 0], derivesFrom: 3 },
  { label: 'private churn', state: 'unknown', scatter: [3.2, 2.4, -1.2], rot: 0.5, aligned: [2.35, 1.15, -0.3] },
  { label: 'roadmap', state: 'unknown', scatter: [-1.9, 2.6, -2.2], rot: -0.5, aligned: [2.35, 0.05, -0.3] },
  { label: 'adoption', state: 'unknown', scatter: [2.1, -2.6, -1.3], rot: 0.4, aligned: [2.35, -1.05, -0.3] },
] as const as EvidenceItem[];

export const STATE_LABELS = ['Scattered', 'Classified', 'Aligned', 'Decision'] as const;

export const TIMING = {
  progressTau: 0.14,
  pointerTau: 0.12,
  pointerAmpX: 0.38,
  pointerAmpY: 0.23,
} as const;

export const CAPS = {
  dprDesktop: 1.5,
  dprTablet: 1.25,
  minWidth: 1024,
} as const;
