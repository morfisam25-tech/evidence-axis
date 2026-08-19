/**
 * Evidence Axis — company-specific intelligence delivery registry.
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

/**
 * Keep empty until Gift #1 is ready.
 *
 * Example shape — DO NOT uncomment as a real delivery:
 * {
 *   slug: 'acme-7f3c9d1a',
 *   company: 'Acme',
 *   recipient: 'Jane Smith',
 *   recipientRole: 'CEO',
 *   trigger: 'Recent pricing and positioning change',
 *   preparedDate: '2026-08-19',
 *   summary: 'A source-verified competitive intelligence package prepared specifically for Acme.',
 *   headlineFinding: 'One decision-relevant finding can be surfaced here.',
 *   deckHref: '/deliveries/acme-7f3c9d1a/executive-intelligence-deck.pdf',
 *   appendixHref: '/deliveries/acme-7f3c9d1a/evidence-appendix.pdf',
 * }
 */
export const intelligenceDeliveries: IntelligenceDelivery[] = [];
