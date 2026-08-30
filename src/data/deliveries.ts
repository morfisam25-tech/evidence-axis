/**
 * Evidence Axis - company-specific intelligence delivery registry.
 *
 * SECURITY / OPERATING RULES
 * - Delivery pages are noindex and should use a high-entropy slug.
 * - Do not place private or confidential client information here.
 * - Only public-source intelligence and recipient/company identification needed
 *   for delivery belong in this registry.
 * - PDFs live under /public/deliveries/<slug>/ and are linked from the page.
 * - Add a delivery only when the actual Deck + Evidence Appendix are ready.
 */

export interface IntelligenceDelivery {
  slug: string;
  company: string;
  recipient?: string;
  recipientRole?: string;
  trigger: string;
  preparedDate: string;
  summary: string;
  headlineFinding?: string;
  deckHref: string;
  appendixHref: string;
  deckLabel?: string;
  appendixLabel?: string;
}

export const intelligenceDeliveries: IntelligenceDelivery[] = [
  {
    slug: 'aisel-uk-brief-a9f2c7e4',
    company: 'Aisel Health',
    recipient: 'Augusta Klingsten Peytz',
    recipientRole: 'Founder & CEO',
    trigger: 'EUR 1.7M pre-seed to scale a psychiatry-specific operating system into the UK',
    preparedDate: '2026-08-27',
    summary: 'UK entry competitive brief — NHS procurement route, public assurance signals, and mental-health workflow pressure.',
    headlineFinding: 'NHS England’s AVT supplier route is now active, while an existing NHS mental-health platform has already attached ambient documentation through a registry-listed supplier.',
    deckHref: '/deliveries/aisel-uk-brief-a9f2c7e4/deck.pdf',
    appendixHref: '/deliveries/aisel-uk-brief-a9f2c7e4/appendix.pdf',
    deckLabel: 'Executive Intelligence Deck',
    appendixLabel: 'Evidence Appendix',
  },
  {
    slug: 'actualyze-ai-brief-0710642b',
    company: 'Actualyze AI',
    recipient: 'Rafi Khardalian',
    recipientRole: 'Co-Founder & CEO',
    trigger: '3 Aug 2026 stealth launch with a $7M seed into the enterprise AI control-plane and AI Gateway buying category',
    preparedDate: '2026-08-30',
    summary: 'Category visibility, security-platform consolidation pressure, and deployment eligibility before feature-level evaluation.',
    headlineFinding: 'Actualyze fits the AI Gateway buying job, but two live buyer-category surfaces reviewed on 30 Aug 2026 did not visibly list Actualyze while established gateway products were already present.',
    deckHref: '/deliveries/actualyze-ai-brief-0710642b/deck.pdf',
    appendixHref: '/deliveries/actualyze-ai-brief-0710642b/appendix.pdf',
    deckLabel: 'Executive Intelligence Deck',
    appendixLabel: 'Evidence Appendix',
  },
];
