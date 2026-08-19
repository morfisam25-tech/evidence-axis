/**
 * EVIDENCE AXIS — CENTRAL CONFIGURATION
 * ------------------------------------------------------------------
 * Every globally editable business fact lives here. Update values in
 * this file to change them everywhere across the site.
 */

export const site = {
  name: 'Evidence Axis',
  domain: 'evidenceaxis.com',
  url: 'https://evidenceaxis.com',
  tagline: 'Independent competitive intelligence for decisions under competitive pressure.',
  description:
    'Evidence Axis discovers overlooked competitors, verifies what is actually happening, and turns the evidence into executive-ready decisions.',
  category: 'Independent competitive intelligence and decision support',
  locale: 'en-US',
} as const;

/**
 * Contact configuration.
 * The public contact inbox and website inquiry form are live. FormSubmit
 * forwards website inquiries to the same inbox without exposing mail-server
 * credentials in the client bundle.
 */
export const contact = {
  email: 'hello@evidenceaxis.com' as string | null,
  emailDisplay: 'hello@evidenceaxis.com',
  formEndpoint: 'https://formsubmit.co/ajax/hello@evidenceaxis.com' as string | null,
  // No response-time SLA is promised. Research-queue timing is confirmed by email.
} as const;

/**
 * v1.3 public engagement architecture.
 * Paid prices remain deliberately unpublished while quote strategy is validated.
 */
export const offers = {
  complimentaryBrief: {
    id: 'complimentary-brief',
    name: 'Complimentary Competitive Intelligence Brief',
    price: 0,
    priceDisplay: 'Complimentary',
    priceNote: 'For verified company employees using a work email',
    delivery: 'Research queue confirmed by email',
    scope:
      'Company-specific competitive intelligence with an Executive Intelligence Deck and Evidence Appendix.',
  },
  decisionSprint: {
    id: 'decision-sprint',
    name: 'Competitive Decision Sprint',
    price: null,
    priceDisplay: 'Scoped engagement',
    priceNote: 'Quoted after the decision context and required depth are defined',
    delivery: 'Agreed during scoping',
    scope:
      'Verified competitive evidence combined with your company context to support a real strategic, product, pricing, positioning or sales decision.',
  },
  responseSprint: {
    id: 'response-sprint',
    name: 'Competitive Response Sprint',
    price: null,
    priceDisplay: 'Custom scope',
    priceNote: 'Scoped around the market response required',
    delivery: 'Agreed during scoping',
    scope:
      'Turn a competitive decision into battlecards, objection handling, pricing response, positioning, messaging and enablement assets.',
  },
  radar: {
    id: 'competitive-radar',
    name: 'Competitive Radar',
    price: null,
    priceDisplay: 'Custom',
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
