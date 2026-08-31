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
    slug: 'lemonlime-brief-7c4f29a1',
    company: 'LemonLime',
    recipient: 'Jordan Zietz',
    recipientRole: 'Founder & CEO',
    trigger: 'A live competitor comparison is reframing LemonLime’s $999 entry price into a $21,801/month total-cost story while a vertical specialist is productizing one of LemonLime’s most visible workflows.',
    preparedDate: '2026-08-26',
    summary: 'Complimentary competitive narrative brief — external cost framing, vertical workflow pressure, and a buyer-reference-class check.',
    headlineFinding: 'FullGTM is publicly turning LemonLime’s $999 entry price into a $21,801/month stack narrative under its own assumptions.',
    deckHref: '/deliveries/lemonlime-brief-7c4f29a1/deck.pdf',
    appendixHref: '/deliveries/lemonlime-brief-7c4f29a1/appendix.pdf',
    deckLabel: 'Competitive Narrative Brief',
    appendixLabel: 'Evidence Appendix',
  },
  {
    slug: 'guideless-brief-3c0935bc',
    company: 'Guideless',
    recipient: 'Evaldas Bieliūnas',
    recipientRole: 'CEO & Co-Founder',
    trigger: 'EUR 1M pre-seed plus planned UK, European and US expansion while a January comparison page still describes an earlier Tango product surface.',
    preparedDate: '2026-08-29',
    summary: 'Complimentary intelligence brief — comparison drift, buyer trust, and the next product-layer decision across maintenance, contextual delivery and execution.',
    headlineFinding: 'Guideless’s live Tango comparison contains buyer-visible factual drift that a prospect can verify before trusting the rest of the page.',
    deckHref: '/deliveries/guideless-brief-3c0935bc/deck.pdf',
    appendixHref: '/deliveries/guideless-brief-3c0935bc/appendix.pdf',
    deckLabel: 'Executive Intelligence Brief',
    appendixLabel: 'Evidence Appendix',
  },
  {
    slug: 'caddi-brief-16eaa1a8',
    company: 'Caddi',
    recipient: 'Alejandro Castellano',
    recipientRole: 'Co-Founder & CEO',
    trigger: 'Caddi launched a broader agent-building product while three May comparison pages still encode an earlier competitive boundary.',
    preparedDate: '2026-08-29',
    summary: 'Competitive comparison boundaries after the August product launch — one pre-existing gap and two post-publication shifts.',
    headlineFinding: 'Three public comparison pages draw competitive boundaries narrower than the underlying evidence supports.',
    deckHref: '/deliveries/caddi-brief-16eaa1a8/Evidence_Axis_Caddi_Executive_Brief_FINAL%20(1).pdf',
    appendixHref: '/deliveries/caddi-brief-16eaa1a8/Evidence_Axis_Caddi_Evidence_Appendix_FINAL%20(2).pdf',
    deckLabel: 'Executive Brief',
    appendixLabel: 'Evidence Appendix',
  },
  {
    slug: 'keenable-brief-b2235130',
    company: 'Keenable',
    recipient: 'Andrey Styskin',
    recipientRole: 'Co-Founder & CEO',
    trigger: '$26M seed at stealth exit while pricing, proof architecture and the first product/revenue hires make the production handoff a live GTM decision.',
    preparedDate: '2026-08-29',
    summary: 'Public-evidence brief on the free-to-production pricing handoff, externally validated performance, and workload-specific competitive pressure.',
    headlineFinding: 'On recurring public list prices, Keenable’s Agent Builder / Parallel Fast crossover appears at about 132K monthly requests.',
    deckHref: '/deliveries/keenable-brief-b2235130/deck.pdf',
    appendixHref: '/deliveries/keenable-brief-b2235130/appendix.pdf',
    deckLabel: 'Executive Intelligence Deck',
    appendixLabel: 'Evidence Appendix',
  },
  {
    slug: 'neno-brief-56e07372',
    company: 'Neno',
    recipient: 'Nick Knuppe',
    recipientRole: 'Founder & CEO',
    trigger: 'EUR 6.6M seed plus planned Dutch GTM expansion while incumbents and adjacent finance platforms are closing the easy automation gap.',
    preparedDate: '2026-08-29',
    summary: 'Competitive intelligence brief on AI differentiation, Dutch back-office convergence, and the finished-outcome layer worth defending.',
    headlineFinding: 'AI alone is becoming a weaker differentiator before Dutch GTM scales.',
    deckHref: '/deliveries/neno-brief-56e07372/deck.pdf',
    appendixHref: '/deliveries/neno-brief-56e07372/appendix.pdf',
    deckLabel: 'Executive Brief',
    appendixLabel: 'Evidence Appendix',
  },
];
