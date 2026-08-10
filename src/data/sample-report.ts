/**
 * EVIDENCE AXIS — SAMPLE REPORT DATA (single source of truth)
 * ------------------------------------------------------------------
 * A DEMONSTRATION SAMPLE. Not a client engagement.
 * Every substantive claim below is drawn from the first-party public sources
 * listed in `sampleSources`, checked on the date in `sampleMeta.checked`, and
 * classified Fact / Inference / Unknown. The website page and the downloadable
 * report both derive from this module so claims never drift apart.
 *
 * TO REFRESH: re-open each source in `sampleSources`, update its note, update
 * any moved figure, re-classify anything that changed, and set a new `checked`
 * date. Unknown is reserved for what first-party evidence genuinely cannot
 * establish — never for something under-researched.
 */

export type EvidenceState = 'fact' | 'inference' | 'unknown' | 'contradiction';

export const sampleMeta = {
  demonstration: true,
  competitors: ['Intercom', 'Zendesk'] as const,
  question:
    'How do Intercom and Zendesk publicly position, package and substantiate their customer-support offerings for SaaS teams — and what can, and cannot, be established from their current public evidence?',
  boundary:
    'Lawful public first-party sources only (vendor sites, pricing, product and official help documentation). No client-supplied context, no confidential, private or non-public data.',
  checked: '9 August 2026',
  checkedISO: '2026-08-09',
} as const;

export interface Source {
  id: string;
  org: string;
  title: string;
  url: string;
  party: 'first-party' | 'third-party';
  supports: string;
  limitation?: string;
}

export const sampleSources: Source[] = [
  {
    id: 'S1',
    org: 'Intercom',
    title: 'Pricing',
    url: 'https://www.intercom.com/pricing',
    party: 'first-party',
    supports: 'Per-seat plan names and prices (Essential/Advanced/Expert); Fin priced per outcome.',
    limitation: 'Annual-billing list prices; excludes tax, negotiated terms and usage-based Fin costs.',
  },
  {
    id: 'S2',
    org: 'Intercom',
    title: 'Homepage',
    url: 'https://www.intercom.com',
    party: 'first-party',
    supports: 'Positioning ("AI Agent era") and native Fin integration.',
  },
  {
    id: 'S3',
    org: 'Fin (Intercom)',
    title: 'Fin pricing: Outcomes',
    url: 'https://fin.ai/help/en/articles/13975800-fin-pricing-outcomes',
    party: 'first-party',
    supports:
      'Official definition of a billable Fin "outcome" (a Resolution or a Procedure handoff) at $0.99, and what does not count.',
  },
  {
    id: 'S4',
    org: 'Zendesk',
    title: 'Pricing',
    url: 'https://www.zendesk.com/pricing/',
    party: 'first-party',
    supports: 'Per-agent plan names/prices; Suite Enterprise + Copilot sales-gated; AI agents included across plans.',
    limitation: 'Annual-billing list prices; Enterprise tier not publicly priced.',
  },
  {
    id: 'S5',
    org: 'Zendesk',
    title: 'Homepage',
    url: 'https://www.zendesk.com',
    party: 'first-party',
    supports: 'Positioning ("AI-powered service platform", "move beyond deflection").',
  },
  {
    id: 'S6',
    org: 'Zendesk',
    title: 'AI agents',
    url: 'https://www.zendesk.com/service/ai/ai-agents/',
    party: 'first-party',
    supports: 'AI-agent capabilities and the public "up to 80%" automation framing (aspirational).',
  },
  {
    id: 'S7',
    org: 'Zendesk',
    title: 'Help Center — About automated resolutions for AI agents',
    url: 'https://support.zendesk.com/hc/en-us/articles/5352026794010-About-automated-resolutions-for-AI-agents',
    party: 'first-party',
    supports:
      'Official definition of an "automated resolution" (resolved without live-agent intervention; LLM-verified at a 72-hour session end) and plan resolution allowances.',
  },
  {
    id: 'S8',
    org: 'Zendesk',
    title: 'Help Center — About automated resolution tiers',
    url: 'https://support.zendesk.com/hc/en-us/articles/9570369117338-About-automated-resolution-tiers',
    party: 'first-party',
    supports:
      'Resolution-tier model (from 18 May 2026): Assisted escalation and Contained resolution are free; only Verified resolutions consume the allowance.',
  },
];

export interface Record {
  id: string;
  status: EvidenceState;
  claim: string;
  observation?: string;
  sources: string[];
  limitation?: string;
  implication?: string;
}

export const sampleRecords: Record[] = [
  {
    id: 'OBS-01',
    status: 'fact',
    claim:
      'Intercom publishes three standard per-seat plans — Essential $29, Advanced $85 and Expert $132 per seat/month — and prices its Fin AI Agent at $0.99 per outcome.',
    observation:
      'Plan names, per-seat prices and the "$0.99 per Fin outcome" line appear on Intercom\'s public pricing page.',
    sources: ['S1'],
    limitation: 'Annual-billing list prices; Fin usage is billed separately per outcome.',
    implication: 'Intercom publicly lists the Expert price — its top standard tier — as a figure.',
  },
  {
    id: 'OBS-02',
    status: 'fact',
    claim:
      'Zendesk publishes Support Team $19, Suite Team $55 and Suite Professional $115 per agent/month (paid yearly); Suite Enterprise + Copilot is "Talk to Sales", and AI agents are included across Service Plans.',
    observation:
      'Plan names, per-agent prices and the sales-gated Enterprise entry appear on Zendesk\'s public pricing page.',
    sources: ['S4'],
    limitation: 'Annual-billing list prices; Zendesk states a 20% annual discount, so monthly prices are higher.',
    implication: 'Zendesk\'s top-tier price is not public and requires a sales conversation.',
  },
  {
    id: 'OBS-03',
    status: 'fact',
    claim:
      'Both vendors lead with AI-agent positioning: Intercom as "the only helpdesk designed for the AI Agent era" with natively integrated Fin; Zendesk as an "AI-powered service platform" that moves "beyond deflection" to "real resolutions".',
    observation: 'Hero wording quoted from each vendor\'s current homepage.',
    sources: ['S2', 'S5'],
    implication: 'On messaging the two are converging; the differentiator is emphasis, not category.',
  },
  {
    id: 'OBS-04',
    status: 'fact',
    claim:
      'Intercom publicly defines a billable Fin "outcome": either a Resolution (the customer\'s issue is resolved — they confirm it helped or do not reply further, including a 24-hour inactivity rule) or a Procedure handoff. Escalations and failed procedures do not count.',
    observation:
      'Fin\'s official pricing documentation states an outcome "is counted when Fin successfully delivers value — either by resolving a customer\'s issue (a Resolution) or by executing a Procedure that ends in a handoff".',
    sources: ['S3'],
    implication: 'Intercom\'s AI charge is a defined, flat per-outcome fee — not an opaque metric.',
  },
  {
    id: 'OBS-05',
    status: 'fact',
    claim:
      'Zendesk publicly defines an "automated resolution": a customer request resolved without live-agent intervention, LLM-verified at the end of a 72-hour session. Plans include a resolution allowance, and since 18 May 2026 a tier model bills only "Verified" resolutions (assisted escalations and unverified contained resolutions are free).',
    observation:
      'Zendesk help documentation defines the automated resolution, the 72-hour LLM verification, plan allowances and the three resolution tiers.',
    sources: ['S7', 'S8'],
    implication: 'Zendesk\'s AI metering is defined but multi-part: allowance + tier + verification, not a single flat fee.',
  },
  {
    id: 'OBS-06',
    status: 'inference',
    claim:
      'Because the two AI-billing mechanics differ — Intercom a flat $0.99 per defined outcome, Zendesk a plan allowance plus tiered, verification-gated resolutions — comparing the vendors on per-seat price alone does not reflect their AI cost.',
    observation: 'The two pricing models combine seats with structurally different AI-usage charges.',
    sources: ['S1', 'S3', 'S4', 'S8'],
    limitation: 'Reasoned from the published pricing structures; the size of the effect depends on volume and mix.',
    implication: 'Model expected AI-resolution volume and mix before comparing plans — the seat line is not the whole cost.',
  },
  {
    id: 'OBS-07',
    status: 'inference',
    claim:
      'Intercom foregrounds a single, natively integrated AI agent, while Zendesk frames AI inside a broader resolution platform spanning more channels and operations.',
    observation:
      'Intercom\'s hero centres on Fin; Zendesk\'s centres on a platform and a "Resolution Learning Loop" with a wider product footprint.',
    sources: ['S2', 'S5', 'S6'],
    limitation: 'Interpretation of positioning, not a claim about underlying capability parity.',
    implication: 'Buyers weighting one native agent vs a broad platform will read these emphases differently.',
  },
  {
    id: 'OBS-08',
    status: 'unknown',
    claim:
      'Which vendor is cheaper on AI for a specific SaaS team cannot be established from public evidence alone. It depends on the selected plan, the included resolution allowance, the resolution mix and tier, usage volume, and account terms.',
    observation:
      'Both AI-billing units are publicly defined, but the models are not directly comparable without a defined workload; Zendesk\'s tiered, allowance-based model is account- and usage-dependent.',
    sources: ['S1', 'S3', 'S4', 'S8'],
    implication: 'Bring a defined workload (volume, resolution mix, plan) to get a real cost comparison — do not rank on public pages alone.',
  },
  {
    id: 'OBS-09',
    status: 'unknown',
    claim:
      'The automation rate a given SaaS team would achieve cannot be established; Zendesk\'s public "up to 80%" is an aspirational ceiling, with case-specific results, not a guarantee.',
    observation:
      'Zendesk frames "up to 80%+" as a target; cited customer rates are presented as case-specific.',
    sources: ['S6'],
    implication: 'Validate any automation claim against your own ticket mix before relying on it.',
  },
];

export interface MatrixRow {
  dimension: string;
  intercom: { state: EvidenceState; note: string };
  zendesk: { state: EvidenceState; note: string };
}

export const sampleMatrix: MatrixRow[] = [
  {
    dimension: 'Entry-tier price (per seat/agent, annual)',
    intercom: { state: 'fact', note: 'Essential $29/seat/mo (public).' },
    zendesk: { state: 'fact', note: 'Support Team $19/agent/mo; Suite Team $55 (public).' },
  },
  {
    dimension: 'Top standard tier price visibility',
    intercom: { state: 'fact', note: 'Expert $132/seat/mo — published.' },
    zendesk: { state: 'unknown', note: 'Suite Enterprise + Copilot — "Talk to Sales", not public.' },
  },
  {
    dimension: 'AI-resolution unit (publicly defined)',
    intercom: { state: 'fact', note: 'Outcome = a Resolution or a Procedure handoff.' },
    zendesk: { state: 'fact', note: 'Automated resolution, LLM-verified at 72h; tiered.' },
  },
  {
    dimension: 'AI billing mechanic',
    intercom: { state: 'fact', note: 'Flat $0.99 per outcome.' },
    zendesk: { state: 'fact', note: 'Plan allowance + tiers; only "Verified" billable.' },
  },
  {
    dimension: 'Core positioning emphasis',
    intercom: { state: 'fact', note: '"The only helpdesk designed for the AI Agent era."' },
    zendesk: { state: 'fact', note: '"AI-powered service platform" — "move beyond deflection".' },
  },
  {
    dimension: 'Public automation claim',
    intercom: { state: 'inference', note: 'Emphasises native-agent quality over a headline %.' },
    zendesk: { state: 'fact', note: 'Publicly claims "up to 80%" (framed aspirational).' },
  },
  {
    dimension: 'Comparable AI cost for a specific team',
    intercom: { state: 'unknown', note: 'Needs a defined workload; flat per-outcome still volume-dependent.' },
    zendesk: { state: 'unknown', note: 'Allowance + tier + usage — account-specific.' },
  },
];

export const sampleProfiles = {
  intercom:
    'Positions itself as an AI-first helpdesk built around a natively integrated AI agent (Fin). Publishes three standard per-seat tiers — Essential $29, Advanced $85 and Expert $132 per seat/month — and prices Fin at a flat $0.99 per outcome, where an "outcome" is publicly defined as a Resolution or a Procedure handoff. Emphasis is on a single, self-improving agent working from unified customer records.',
  zendesk:
    'Positions itself as an AI-powered service platform (the "Resolution Platform") spanning support, employee service and contact-centre operations. Publishes Support and Suite tiers up to Suite Professional ($115/agent/month); Suite Enterprise + Copilot is sales-gated. AI agents are included across plans and metered as automated resolutions — resolved without live-agent intervention, LLM-verified at a 72-hour session end, governed by plan allowances and, since 18 May 2026, resolution tiers in which only "verified" resolutions are billable.',
} as const;

export const sampleSummary =
  'Intercom and Zendesk have both converged on AI-agent-led positioning, and both publish meaningful pricing detail — but their AI-billing mechanics are not the same. Intercom lists per-seat plans (Essential $29, Advanced $85, Expert $132) and prices Fin at a flat $0.99 per outcome, with "outcome" publicly defined as a Resolution or a Procedure handoff. Zendesk lists Support and Suite plans (Suite Enterprise is sales-gated), includes AI agents across plans, and meters them as automated resolutions — resolved without live-agent intervention, LLM-verified, governed by plan allowances and, since May 2026, resolution tiers in which only "verified" resolutions are billable. Because those mechanics differ, a valid economic comparison needs a defined workload — expected volume, resolution mix and plan — not a seat-price line. Positioning emphasis also differs: Intercom foregrounds a single native agent; Zendesk frames AI inside a broader resolution platform. There is no universal winner; the one thing public evidence cannot settle by itself is which is cheaper for a particular team\'s workload.';

export const sampleDecisionImplications: string[] = [
  'Both vendors publish real pricing detail: Intercom lists every standard tier, including Expert ($132/seat/mo); Zendesk\'s Suite Enterprise is sales-gated. (Fact)',
  'Do not compare on seat price alone — Intercom bills Fin at a flat $0.99 per defined outcome, while Zendesk uses plan allowances and verification-gated resolution tiers, so model your expected resolution volume and mix. (Inference)',
  'You cannot rank total AI cost from public pages alone; bring a defined workload — volume, resolution mix and plan — to get a real comparison. (Unknown)',
];

export const sampleLimitations =
  'This brief reflects public first-party evidence checked 9 August 2026; public pages and pricing mechanics change (Zendesk\'s resolution-tier model dates to 18 May 2026). Seat prices are annual-billing list prices and exclude tax and negotiated terms. Both vendors publicly define their AI-resolution unit, but the total AI cost for a specific team is account- and workload-dependent and is marked Unknown rather than estimated. Inferences are reasoned readings of pricing structure and positioning, not proofs.';

export const sampleMethodology =
  'The decision question set the boundary. Each vendor\'s own pricing, homepage, AI-agent pages and — for the billing definitions — official pricing and help documentation were opened and read directly, not inferred from search snippets. Each observation was recorded with its source and check date and classified Fact, Inference or Unknown. Unknown is reserved for what first-party evidence genuinely cannot establish — here, the comparable AI cost for a specific workload — never for anything under-researched. The comparison names both vendors, cites first-party sources, and declares no universal winner.';
