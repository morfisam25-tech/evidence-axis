/**
 * EVIDENCE AXIS — CENTRAL CONFIGURATION
 * ------------------------------------------------------------------
 * Every globally editable business fact lives here. Update values in
 * this file to change them everywhere across the site. Items marked
 * `PRE-LAUNCH` are intentionally unresolved and must be finalized
 * before the site goes live (see README + pre-launch checklist).
 */

export const site = {
  name: 'Evidence Axis',
  domain: 'evidenceaxis.com',
  url: 'https://evidenceaxis.com',
  tagline: 'Competitor intelligence for B2B SaaS decisions.',
  description:
    'Evidence Axis turns scattered competitor information into decision-ready evidence for B2B SaaS teams. Asynchronous research briefs with a disciplined Fact, Inference and Unknown method.',
  category: 'Competitor intelligence for B2B SaaS decisions',
  locale: 'en-US',
} as const;

/**
 * Contact configuration.
 * The public contact inbox is live. `formEndpoint` remains optional: when
 * it is null, the contact page exposes the live email address directly;
 * when a real POST endpoint is configured later, the form submits directly.
 */
export const contact = {
  email: 'hello@evidenceaxis.com' as string | null,
  emailDisplay: 'hello@evidenceaxis.com',
  formEndpoint: null as string | null,
  // No response-time SLA is promised. Do not add a time guarantee that has
  // not been approved.
} as const;

/**
 * Locked commercial offers. Do not raise launch prices or hide them.
 */
export const offers = {
  twoCompetitor: {
    id: 'two-competitor',
    name: 'Two-Competitor Decision Brief',
    price: 150,
    priceDisplay: '$150',
    priceNote: 'Launch / pilot price',
    delivery: '3 business days',
    scope: 'Two named competitors, or a client-versus-competitor comparison.',
  },
  fiveCompetitor: {
    id: 'five-competitor',
    name: 'Five-Competitor Evidence Brief',
    price: 350,
    priceDisplay: '$350',
    priceNote: 'Starting price',
    delivery: '5 business days',
    scope: 'Five named competitors against a defined research question.',
  },
  blueprint: {
    id: 'strategic-blueprint',
    name: 'Strategic Market Blueprint',
    price: null,
    priceDisplay: 'Scoped individually',
    priceNote: 'Scoped after the decision question and research boundary are defined',
    delivery: 'Agreed during scoping',
    scope: 'A deeper investigation defined around the decision to be made.',
  },
} as const;

export const cta = {
  primary: { label: 'Start a Brief', href: '/contact/' },
  secondary: { label: 'View Sample Report', href: '/sample-report/' },
} as const;

/**
 * PRE-LAUNCH legal/entity values. Left deliberately unresolved.
 * Do not state a jurisdiction, registration, or legal entity that is
 * not finalized. These render as cautious, non-fabricated language.
 */
export const legal = {
  entity: null as string | null,
  jurisdiction: null as string | null,
  lastUpdated: 'August 2026',
} as const;

export const social = {
  linkedin: null as string | null,
  x: null as string | null,
} as const;
