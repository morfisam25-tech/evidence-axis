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
 * Temporary G-00 verification record.
 * Uses the existing public sample PDF for both click targets solely to verify
 * delivery-page and click-event plumbing end to end. Remove after verification.
 */
export const intelligenceDeliveries: IntelligenceDelivery[] = [
  {
    slug: 'g00-check-7d3f8a91',
    company: 'Evidence Axis Tracking Test',
    trigger: 'Operational verification of the Sprint-1 delivery tracking path',
    preparedDate: '2026-08-26',
    summary: 'A temporary noindex delivery used only to verify page-view and click-event tracking before the next outbound Gift is sent.',
    headlineFinding: 'Tracking must be verified end to end before a Gift can be counted as Viewed.',
    deckHref: '/report/evidence-axis-sample-intercom-vs-zendesk.pdf',
    appendixHref: '/report/evidence-axis-sample-intercom-vs-zendesk.pdf',
    deckLabel: 'Tracking Test — Executive Link',
    appendixLabel: 'Tracking Test — Appendix Link',
  },
];
