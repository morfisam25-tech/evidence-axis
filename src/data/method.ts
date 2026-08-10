/**
 * The Evidence Axis method — structural content (no competitor facts).
 * Safe to render anywhere; describes how the practice works, not claims
 * about any specific company.
 */

/**
 * The research boundary — the correct operating rule.
 * Competitor findings come from lawful, publicly accessible evidence.
 * Clients may also supply their own context. Evidence Axis never implies
 * access to confidential, private, unauthorized or non-public COMPETITOR data.
 */
export const researchBoundary = {
  short: 'Public competitor evidence + your context',
  inScope:
    'Lawful, publicly accessible competitor evidence — plus any context you choose to share.',
  outScope:
    'No confidential, private or non-public competitor data, and no unauthorized access.',
} as const;

export const evidenceStates = [
  {
    key: 'fact',
    label: 'Fact',
    glyph: '●',
    definition:
      'A statement directly supported by identifiable public evidence. Recorded with its source and the date it was checked.',
    example: 'Sourced from a page you can open yourself, quoted or described plainly.',
  },
  {
    key: 'inference',
    label: 'Inference',
    glyph: '◐',
    definition:
      'A reasoned conclusion drawn from the available evidence. Clearly separated from verified fact, with the reasoning stated.',
    example: 'What the evidence suggests, labeled as interpretation rather than proof.',
  },
  {
    key: 'unknown',
    label: 'Unknown',
    glyph: '○',
    definition:
      'Something the available public evidence cannot responsibly establish. Named, not guessed at or quietly filled in.',
    example: 'The questions we could not close, so you know where certainty ends.',
  },
] as const;

export const methodSteps = [
  {
    n: '01',
    title: 'Define the decision question',
    body: 'We start from the decision you actually need to make, not a generic "competitor overview." The question sets the boundary for everything that follows.',
  },
  {
    n: '02',
    title: 'Set the research boundary',
    body: 'We agree which competitors, which sources, and what is in and out of scope. Competitor findings come from lawful public evidence; you can add your own context. No confidential or non-public competitor data.',
  },
  {
    n: '03',
    title: 'Discover and check sources',
    body: 'We work through public pages, documentation, pricing, changelogs, marketplaces and reviews, recording each source and the date checked.',
  },
  {
    n: '04',
    title: 'Extract and classify evidence',
    body: 'Each observation is recorded and labeled Fact, Inference or Unknown. Marketing language is separated from substantiated capability.',
  },
  {
    n: '05',
    title: 'Surface contradictions and gaps',
    body: 'Where sources disagree, we show the conflict rather than resolving it silently. Where evidence runs out, we mark the unknown.',
  },
  {
    n: '06',
    title: 'Draw decision implications',
    body: 'We connect the evidence to your decision: what it supports, what it does not, and what would need to be true for a different call.',
  },
] as const;

/** The interactive evidence chain shown on Method and Home.
 *  Illustrative structure — demonstrates the reasoning path, not real facts. */
export const evidenceChain = [
  {
    stage: 'Source',
    kind: 'source',
    label: 'SRC',
    body: 'A public page: pricing, documentation, a changelog or a review.',
    meta: 'public · dated on check',
  },
  {
    stage: 'Observation',
    kind: 'observation',
    label: 'OBS',
    body: 'What the source plainly shows, quoted or described without embellishment.',
    meta: 'recorded verbatim',
  },
  {
    stage: 'Fact',
    kind: 'fact',
    label: 'FACT',
    body: 'A statement the source directly supports, kept separate from interpretation.',
    meta: 'evidence-backed',
  },
  {
    stage: 'Inference',
    kind: 'inference',
    label: 'INFER',
    body: 'A reasoned conclusion drawn from the facts, labeled as interpretation.',
    meta: 'reasoning shown',
  },
  {
    stage: 'Unknown',
    kind: 'unknown',
    label: 'UNK',
    body: 'What the evidence cannot establish, named rather than guessed.',
    meta: 'boundary of certainty',
  },
  {
    stage: 'Decision implication',
    kind: 'decision',
    label: 'DEC',
    body: 'What this means for the decision in front of you.',
    meta: 'connected to your question',
  },
] as const;
