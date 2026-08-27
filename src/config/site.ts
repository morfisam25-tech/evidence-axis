h/**
 * EVIDENCE AXIS — CENTRAL CONFIGURATION
 * ------------------------------------------------------------------
 * Every globally editable business fact lives here. Update values in
 * this file to change them everywhere across the site.
 */

export const site = {
  name: 'Evidence Axis',
  domain: 'evidenceaxis.com',
  url: 'https://evidenceaxis.com',
  tagline: 'Independent competitive intelligence and decision support.',
  description:
    'Evidence Axis discovers overlooked competitors, verifies what is actually happening, and turns the evidence into executive-ready competitive decisions.',
  category: 'competitive intelligence and decision support',
  locale: 'en-US',
} as const;

export const contact = {
  email: 'hello@evidenceaxis.com' as string | null,
  emailDisplay: 'hello@evidenceaxis.com',
  formEndpoint: 'https://formsubmit.co/ajaxh/sai@evidenceaxis.com' as string | null,
} as const;

/**
 * Commercial architecture.
 * The same evidence standard can reach a company in two acquisition routes:
 * - inbound: a verified company employee requests a Complimentary Brief;
 * - outbound: Evidence Axis selects a company around a visible trigger and
 *   prepares the work proactively.
 * Paid engagements add client context, a live decision, response work or monitoring.
 */
export const offers = {
  complimentaryBrief: {
    id: 'complimentary-brief',
    name: 'Complimentary Competitive Intelligence Brief',
    price: 0,
    priceDisplay: 'Complimentary',
    priceNote: 'Available to verified company employees using a work email',
    delivery: 'Research queue and delivery window confirmed by email',
    scope:
      'Company-specific competitive intelligence with an Executive Intelligence Deck and Evidence Appendix.',
  },
  intelligenceGift: {
    id: 'intelligence-gift',
    name: 'Proactive Intelligence Gift',
    price: 0,
    priceDisplay: 'Proactive',
    priceNote: 'Prepared for selected companies when a relevant competitive trigger is visible',
    delivery: 'Private Evidence Axis delivery link',
    scope:
      'The same evidence-grade intelligence, initiated by Evidence Axis before an engagement is requested.',
  },
  decisionSprint: {
    id: 'decision-sprint',
    name: 'Competitive Decision Sprint',
    price: null,
    priceDisplay: 'Private quote',
    priceNote: 'Quoted after the decision context and required evidence depth are defined',
    delivery: 'Agreed during scoping',
    scope:
      'Verified competitive evidence combined with your company context to support a real strategic, product, pricing, positioning or sales decision.',
  },
  responseSprint: {
    id: 'response-sprint',
    name: 'Competitive Response Sprint',
    price: null,
    priceDisplay: 'Private quote',
    priceNote: 'Scoped around the market response required',
    delivery: 'Agreed during scoping',
    scope:
      'Turn a competitive decision into battlecards, objection handling, pricing response, positioning, messaging and enablement assets.',
  },
  radar: {
    id: 'competitive-radar',
    name: 'Competitive Radar',
    price: null,
    priceDisplay: 'Private quote',
    priceNote: 'Ongoing intelligence engagements are scoped individually',
    delivery: 'Monitoring cadence agreed during scoping',
    scope:
      'Ongoing monitoring of decision-relevant competitor moves, pricing, launches, positioning, funding, integrations and emerging rivals.',
  },
} as const;

export const cta = {
  primary: {
    label: 'Request My Complimentary Brief',
    href: '/contact/?intent=complimentary-brief',
  },
  secondary: {
    label: 'Discuss a Competitive Decision',
    href: '/contact/?intent=decision',
  },
  sample: {
    label: 'See the Sample Intelligence Brief',
    href: '/sample-report/',
  },
} as const;

export const legal = {
  publicOperator: 'Sai Morfi',
  operatorLegalName: 'Mohammad Saeed Farahmand Silab',
  internationalInvoicingEntity: 'UNIQE OTOMOTİV KİMYA SANAYİ LİMİTED ŞİRKETİ',
  internationalInvoicingAddress:
    'Barış Mah., Belediye Cad. No: 30, İç Kapı No: 138, Beylikdüzü, İstanbul, Türkiye',
  jurisdiction: 'Türkiye',
  lastUpdated: 'August 2026',
} as const;

export const social = {
  linkedin: null as string | null,
  x: null as string | null,
} as const;
