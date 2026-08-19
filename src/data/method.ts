/**
 * The Evidence Axis method — structural content (no competitor facts).
 * Safe to render anywhere; describes how the practice works, not claims
 * about any specific company.
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
      'A statement directly supported by identifiable evidence that was opened and checked. Recorded with its source and review date.',
    example: 'What the checked source directly supports, stated without adding interpretation.',
  },
  {
    key: 'inference',
    label: 'Inference',
    glyph: '◐',
    definition:
      'A reasoned conclusion drawn from disclosed evidence. Clearly separated from verified fact, with the reasoning visible.',
    example: 'What the evidence suggests, labeled as interpretation rather than proof.',
  },
  {
    key: 'unknown',
    label: 'Unknown',
    glyph: '○',
    definition:
      'Something the available evidence cannot responsibly establish. Named, not guessed at or quietly filled in.',
    example: 'The questions we could not close, so you know where certainty ends.',
  },
] as const;

export const methodSteps = [
  {
    n: '01',
    title: 'Scan the competitive set',
    body: 'We do not assume the names already on your radar are the whole market. We identify plausible candidates from the public record before choosing where the deep dive belongs.',
  },
  {
    n: '02',
    title: 'Validate scan-derived competitors',
    body: 'A competitor surfaced by the scan needs at least two independent non-vendor sources confirming that it belongs in the same competitive set before it enters the shortlist.',
  },
  {
    n: '03',
    title: 'Set the research boundary',
    body: 'We define what needs to be investigated and what the public record can responsibly support. Paid engagements also bring in the client’s decision context.',
  },
  {
    n: '04',
    title: 'Open, verify and classify sources',
    body: 'We work through primary pages, documentation, pricing, changelogs and strong independent sources. Search snippets are not verification, and vendor comparison pages are not treated as neutral evidence.',
  },
  {
    n: '05',
    title: 'Extract Fact, Inference and Unknown',
    body: 'Each material statement is classified. Conflicts stay visible, missing evidence remains Unknown, and analytical judgment is labeled as inference.',
  },
  {
    n: '06',
    title: 'Build the executive intelligence',
    body: 'We turn the verified record into an Executive Intelligence Deck and Evidence Appendix, showing what matters, why it may matter, and the source trail behind it.',
  },
  {
    n: '07',
    title: 'Add decision context when engaged',
    body: 'In a paid Decision Sprint, the verified market evidence is combined with the company’s real decision, constraints and internal context to determine what response should follow.',
  },
] as const;

/** The interactive evidence chain shown on Method and Home.
 * Illustrative structure — demonstrates the reasoning path, not real facts. */
export const evidenceChain = [
  {
    stage: 'Source',
    kind: 'source',
    label: 'SRC',
    body: 'A checked source: primary company page, documentation, changelog or credible independent evidence.',
    meta: 'opened · source-classed · dated',
  },
  {
    stage: 'Observation',
    kind: 'observation',
    label: 'OBS',
    body: 'What the source plainly shows, recorded before interpretation.',
    meta: 'evidence extracted',
  },
  {
    stage: 'Fact',
    kind: 'fact',
    label: 'FACT',
    body: 'A statement the checked evidence directly supports.',
    meta: 'evidence-backed',
  },
  {
    stage: 'Inference',
    kind: 'inference',
    label: 'INFER',
    body: 'A reasoned conclusion drawn from disclosed facts, labeled as interpretation.',
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
    body: 'What the evidence means for attention, priority or the decision in front of the team.',
    meta: 'decision-ready',
  },
] as const;
