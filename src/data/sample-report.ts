/**
 * EVIDENCE AXIS — SAMPLE REPORT DATA (single source of truth)
 * ------------------------------------------------------------------
 * DEMONSTRATION SAMPLE. Not a client engagement.
 * First-party public sources only. Material claims are classified
 * Fact / Inference / Unknown and carry the check date below.
 */

export type EvidenceState = 'fact' | 'inference' | 'unknown' | 'contradiction';

export const sampleMeta = {
  demonstration: true,
  competitors: ['Intercom', 'Zendesk'] as const,
  question:
    'How do Intercom and Zendesk publicly position, package and substantiate their customer-support offerings for SaaS teams — and what can, and cannot, be established from their current public evidence?',
  boundary:
    'Lawful public first-party sources only (vendor sites, pricing, product and official help documentation). No client-supplied context, no confidential, private or non-public data.',
  checked: '19 August 2026',
  checkedISO: '2026-08-19',
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
    id: 'S1', org: 'Intercom', title: 'Pricing', url: 'https://www.intercom.com/pricing', party: 'first-party',
    supports: 'Integrated Intercom plan names and annual-billing seat prices (Essential/Advanced/Expert); Fin shown from $0.99 per outcome.',
    limitation: 'List pricing; excludes tax, negotiated terms and other usage-based channel/add-on costs.',
  },
  {
    id: 'S2', org: 'Intercom', title: 'Homepage', url: 'https://www.intercom.com', party: 'first-party',
    supports: 'Positioning: "The only helpdesk designed for the AI Agent era" and native Fin integration.',
  },
  {
    id: 'S3', org: 'Intercom', title: 'Help Center — Fin AI Agent outcomes', url: 'https://www.intercom.com/help/en/articles/8205718-fin-ai-agent-outcomes', party: 'first-party',
    supports: 'Current Fin outcome taxonomy and pricing: Resolution $0.99, Procedure handoff $0.99, Disqualification $0.99, Qualification $9.99; charged at most once per conversation.',
    limitation: 'Qualification and disqualification are sales-specific outcome types; this sample focuses on customer-support economics.',
  },
  {
    id: 'S4', org: 'Zendesk', title: 'Pricing', url: 'https://www.zendesk.com/pricing/', party: 'first-party',
    supports: 'Support Team $19, Suite Team $55 and Suite Professional $115 per agent/month paid yearly; Suite Enterprise + Copilot is sales-gated; AI Agents are included in Suite Team and above.',
    limitation: 'Annual-billing list prices; monthly and negotiated enterprise economics can differ.',
  },
  {
    id: 'S5', org: 'Zendesk', title: 'Homepage', url: 'https://www.zendesk.com', party: 'first-party',
    supports: 'Positioning: "AI-powered service platform" and "Move beyond deflection. Deliver real resolutions."',
  },
  {
    id: 'S6', org: 'Zendesk', title: 'AI agents', url: 'https://www.zendesk.com/service/ai/ai-agents/', party: 'first-party',
    supports: 'AI-agent positioning, Resolution Learning Loop framing, resolution allowance / tier language and "up to 80%" automation framing.',
    limitation: 'The automation figure is an "up to" claim, not a guaranteed result for a specific team.',
  },
  {
    id: 'S7', org: 'Zendesk', title: 'Help Center — Automated resolutions platform prior to resolution tiers', url: 'https://support.zendesk.com/hc/en-us/articles/5352026794010-About-automated-resolutions-for-AI-agents', party: 'first-party',
    supports: 'Prior automated-resolution platform: resolution allowances, no-human-intervention requirement, LLM verification and default 72-hour session evaluation.',
    limitation: 'Zendesk states this is the platform prior to May 18, 2026; customers can remain on it until they move to resolution tiers.',
  },
  {
    id: 'S8', org: 'Zendesk', title: 'Help Center — Automated resolution tiers', url: 'https://support.zendesk.com/hc/en-us/articles/9570369117338-About-automated-resolution-tiers', party: 'first-party',
    supports: 'Resolution-tier platform introduced May 18, 2026: Assisted escalation and Contained resolution do not consume resolution allowance; Verified resolution does after LLM verification.',
    limitation: 'Account billing behavior depends on which resolution platform the customer is currently on.',
  },
  {
    id: 'S9', org: 'Fin (Intercom)', title: 'Fin pricing: Outcomes', url: 'https://fin.ai/help/en/articles/13975800-fin-pricing-outcomes', party: 'first-party',
    supports: 'Support-oriented detail for Resolution and Procedure handoff outcomes at $0.99, including assumed-resolution and escalation behavior.',
    limitation: 'Broader Intercom outcome documentation also includes sales-specific qualification/disqualification outcomes; see S3.',
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
    id: 'OBS-01', status: 'fact',
    claim: 'Intercom publishes three standard integrated helpdesk plans — Essential $29, Advanced $85 and Expert $132 per seat/month when billed annually — with Fin shown from $0.99 per outcome.',
    observation: 'Plan names, annual-billing seat prices and the Fin outcome price appear on Intercom’s current pricing page.',
    sources: ['S1'],
    limitation: 'List pricing; other usage charges, tax and negotiated terms are outside this boundary.',
    implication: 'Intercom makes its three standard integrated seat tiers publicly price-visible.',
  },
  {
    id: 'OBS-02', status: 'fact',
    claim: 'Zendesk publishes Support Team $19, Suite Team $55 and Suite Professional $115 per agent/month paid yearly; Suite Enterprise + Copilot is "Talk to Sales".',
    observation: 'These plan names and prices appear on Zendesk’s current customer-service pricing page.',
    sources: ['S4'],
    limitation: 'Annual-billing list prices; enterprise and account-specific terms are not public.',
    implication: 'Zendesk’s highest displayed packaged tier is sales-gated rather than list-priced.',
  },
  {
    id: 'OBS-03', status: 'fact',
    claim: 'Both vendors lead with AI-centered positioning: Intercom says it is "the only helpdesk designed for the AI Agent era"; Zendesk describes an "AI-powered service platform" and says "Move beyond deflection. Deliver real resolutions."',
    observation: 'Current public homepage positioning from each vendor.',
    sources: ['S2', 'S5'],
    implication: 'The category language is converging around AI-led service, but the product story and economic mechanics still differ.',
  },
  {
    id: 'OBS-04', status: 'fact',
    claim: 'For customer-support use, Intercom’s current Fin outcome model prices a Resolution at $0.99 and a Procedure handoff at $0.99. Its broader current outcome table also lists sales-specific Disqualification at $0.99 and Qualification at $9.99.',
    observation: 'Intercom Help publishes a four-type outcome table and notes that qualification/disqualification occur in Fin for Sales; support-oriented Fin documentation details Resolution and Procedure handoff behavior.',
    sources: ['S3', 'S9'],
    limitation: 'This brief focuses on support economics, so sales qualification outcomes are disclosed but are not treated as the support comparison unit.',
    implication: '"$0.99 per Fin outcome" is accurate for the support outcome types used here, but it should not be described as the price of every possible Fin outcome.',
  },
  {
    id: 'OBS-05', status: 'fact',
    claim: 'Zendesk currently documents two automated-resolution billing platforms. The resolution-tier platform introduced May 18, 2026 uses Assisted escalation, Contained resolution and Verified resolution; only Verified resolutions consume the resolution allowance. Zendesk also states that customers can remain on the prior automated-resolution platform until they move to tiers.',
    observation: 'The current tier article and the prior-platform article both explicitly describe their scope and migration boundary.',
    sources: ['S7', 'S8'],
    implication: 'A Zendesk cost model must establish which resolution platform the account is on before treating the billing logic as universal.',
  },
  {
    id: 'OBS-06', status: 'inference',
    claim: 'A seat-price-only comparison is not a valid comparison of AI economics: Intercom combines seat pricing with outcome-based usage, while Zendesk combines plan pricing with account-dependent resolution allowances and resolution-platform rules.',
    observation: 'The vendors expose structurally different usage and billing mechanics in their first-party documentation.',
    sources: ['S1', 'S3', 'S4', 'S7', 'S8'],
    limitation: 'The size of the economic difference depends on workload, account configuration and commercial terms.',
    implication: 'Model the actual support workload and the account’s billing configuration before ranking total cost.',
  },
  {
    id: 'OBS-07', status: 'inference',
    claim: 'Intercom foregrounds a natively integrated Fin agent inside its helpdesk, while Zendesk frames AI inside a broader Resolution Platform and self-improving resolution loop.',
    observation: 'Interpretation of the vendors’ current homepage and AI-agent positioning.',
    sources: ['S2', 'S5', 'S6'],
    limitation: 'This is a positioning interpretation, not proof of underlying capability superiority.',
    implication: 'Buyers should separate positioning emphasis from evidence of performance on their own workload.',
  },
  {
    id: 'OBS-08', status: 'unknown',
    claim: 'Which vendor is cheaper for a specific SaaS support team cannot be established from public evidence alone.',
    observation: 'A real comparison needs the chosen plans, seat count, support volume, outcome/resolution mix, Zendesk resolution platform and allowance, and account-specific terms.',
    sources: ['S1', 'S3', 'S4', 'S7', 'S8'],
    implication: 'Bring a defined workload and account assumptions before drawing a total-cost conclusion.',
  },
  {
    id: 'OBS-09', status: 'unknown',
    claim: 'The automation rate a given SaaS team would achieve cannot be established from the public vendor claims used here.',
    observation: 'Zendesk uses "up to 80%" framing and publishes customer-specific examples; those are not a guarantee for a new workload.',
    sources: ['S6'],
    implication: 'Validate automation performance against the team’s own ticket mix, policies and escalation rules.',
  },
];

export interface MatrixRow {
  dimension: string;
  intercom: { state: EvidenceState; note: string };
  zendesk: { state: EvidenceState; note: string };
}

export const sampleMatrix: MatrixRow[] = [
  {
    dimension: 'Entry-tier price (annual billing)',
    intercom: { state: 'fact', note: 'Essential $29/seat/mo.' },
    zendesk: { state: 'fact', note: 'Support Team $19/agent/mo; Suite Team $55.' },
  },
  {
    dimension: 'Top displayed packaged tier',
    intercom: { state: 'fact', note: 'Expert $132/seat/mo — public.' },
    zendesk: { state: 'unknown', note: 'Suite Enterprise + Copilot — Talk to Sales.' },
  },
  {
    dimension: 'Support AI usage unit',
    intercom: { state: 'fact', note: 'Resolution or Procedure handoff: $0.99 each; broader sales outcomes also exist.' },
    zendesk: { state: 'fact', note: 'Automated resolution; resolution-platform rules depend on account migration state.' },
  },
  {
    dimension: 'AI billing mechanic',
    intercom: { state: 'fact', note: 'Seat plan + outcome usage; support outcomes above are $0.99.' },
    zendesk: { state: 'fact', note: 'Plan + resolution allowance; new tier platform charges allowance only for Verified resolutions.' },
  },
  {
    dimension: 'Core positioning emphasis',
    intercom: { state: 'fact', note: '"The only helpdesk designed for the AI Agent era."' },
    zendesk: { state: 'fact', note: '"AI-powered service platform" / "Deliver real resolutions."' },
  },
  {
    dimension: 'Public automation ceiling',
    intercom: { state: 'unknown', note: 'No directly comparable universal ceiling established in the bounded sources.' },
    zendesk: { state: 'fact', note: 'Public "up to 80%" framing; not a guaranteed team result.' },
  },
  {
    dimension: 'Comparable AI cost for a specific team',
    intercom: { state: 'unknown', note: 'Needs workload, seats and outcome mix.' },
    zendesk: { state: 'unknown', note: 'Needs workload, plan, allowance, resolution platform and terms.' },
  },
];

export const sampleProfiles = {
  intercom:
    'Positions itself as the helpdesk designed for the AI Agent era, built around natively integrated Fin. Current integrated plans list Essential at $29, Advanced at $85 and Expert at $132 per seat/month when billed annually. For support use, Fin Resolutions and Procedure handoffs are $0.99 each; Intercom’s broader outcome taxonomy also includes sales-specific qualification and disqualification outcomes, which this support comparison does not treat as the primary usage unit.',
  zendesk:
    'Positions itself as an AI-powered service platform and Resolution Platform. Current customer-service pricing lists Support Team at $19, Suite Team at $55 and Suite Professional at $115 per agent/month paid yearly, while Suite Enterprise + Copilot is sales-gated. AI-agent usage is measured through automated resolutions, but Zendesk currently documents both its prior automated-resolution platform and the resolution-tier platform introduced May 18, 2026, so the account’s migration state matters to billing logic.',
} as const;

export const sampleSummary =
  'Intercom and Zendesk both sell AI-centered customer service, but their public economics are not directly comparable from seat price alone. Intercom publishes Essential $29, Advanced $85 and Expert $132 per seat/month on annual billing, and prices the support outcome types used in this comparison — Resolution and Procedure handoff — at $0.99 each. Its broader Fin outcome table now also includes sales-specific Disqualification ($0.99) and Qualification ($9.99), so "every Fin outcome is $0.99" would be too broad. Zendesk publishes Support Team $19, Suite Team $55 and Suite Professional $115 per agent/month paid yearly, while Suite Enterprise + Copilot is sales-gated. Zendesk’s AI-agent economics are allowance-based and its current documentation explicitly describes both the prior automated-resolution platform and the resolution-tier platform introduced May 18, 2026; on the tier platform, only Verified resolutions consume the allowance. The decision implication is therefore not a universal winner. A valid comparison needs a defined workload, plan, seat count, usage mix and — for Zendesk — the account’s current resolution platform and allowance.';

export const sampleDecisionImplications: string[] = [
  'Both vendors publish meaningful list pricing, but Zendesk keeps Suite Enterprise + Copilot sales-gated while Intercom publishes Expert at $132/seat/month on annual billing. (Fact)',
  'Do not compare on seat price alone: Intercom uses outcome-based AI usage, while Zendesk uses resolution allowances and account-dependent resolution-platform rules. (Inference)',
  'Before comparing total AI cost, define seat count, support volume and usage mix; for Zendesk, also establish whether the account is on the prior automated-resolution platform or the resolution-tier platform. (Unknown until account/workload is defined)',
];

export const sampleLimitations =
  'This brief reflects first-party public evidence checked 19 August 2026. Public pages, product names, prices and billing rules can change. Prices shown are public annual-billing list prices where stated and exclude tax, negotiated terms and other add-ons or channels. Intercom’s broader Fin outcome taxonomy includes sales-specific qualification/disqualification types outside the core support comparison. Zendesk currently documents two automated-resolution platforms depending on account migration state; the brief therefore does not assume the new tier logic applies to every account. Total cost and achieved automation for a specific team remain Unknown without workload and account-level inputs.';

export const sampleMethodology =
  'The decision question set the boundary. Each vendor’s pricing, homepage, AI-agent pages and official help documentation were opened and reviewed directly on 19 August 2026; search snippets were not used as verification. Observations were classified Fact, Inference or Unknown, and transitional billing rules were preserved rather than flattened into a single cleaner story. The comparison names both vendors, uses first-party public evidence only, and declares no universal winner.';
