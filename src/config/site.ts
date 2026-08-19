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
} as const;

/**
 * Public engagement architecture.
 * The Intelligence Gift is invitation-only and is not a public service request.
 * Paid engagements are quoted privately because scope changes with the decision,
 * competitive set, evidence depth and response work required.
 */
export const offers = {
  intelligenceGift: {
    id: 'intelligence-gift',
    name: 'Competitive Intelligence Gift',
    price: 0,
    priceDisplay: 'Invitation only',
    priceNote: 'Prepared proactively for selected companies',
    delivery: 'Private Evidence Axis delivery link',
    scope:
      'A company-specific Executive Intelligence Deck and Evidence Appendix prepared before an engagement is requested.',
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
    label: 'Discuss a Competitive Decision',
    href: '/contact/?intent=decision',
  },
  secondary: {
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
