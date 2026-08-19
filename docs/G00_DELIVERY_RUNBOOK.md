# Evidence Axis — G-00 Intelligence Delivery Runbook

Status: **Sprint-1 delivery system implemented**

This runbook turns a completed Evidence Axis Gift into a company-specific delivery page on `evidenceaxis.com`.

## What the recipient receives

A high-entropy, noindex URL in this shape:

`https://evidenceaxis.com/intelligence/<company>-<random-token>/`

The page contains:

- company-specific heading and trigger
- optional named recipient / role
- optional headline finding
- Executive Intelligence Deck PDF
- Evidence Appendix PDF
- Evidence Axis evidence-state explanation
- soft path to a Competitive Decision Sprint

No signup, form or call is required to access the Gift.

## What is tracked during Sprint 1

The delivery page sends one operational event per browser session for:

1. `delivery-page-viewed`
2. `executive-deck-opened`
3. `evidence-appendix-opened`
4. `decision-conversation-clicked`

The event payload contains:

- company
- unique delivery slug
- event type
- UTC timestamp

The event is forwarded through the same FormSubmit route used by the website inquiry form to the Evidence Axis business inbox.

Tracking failure never blocks access to the Gift.

## Before Gift #1

### 1. Finish the two recipient-facing PDFs

Required files:

- Executive Intelligence Deck
- Evidence Appendix

### 2. Generate a high-entropy slug

Do not use only the company name.

Good:

`vector-8c4e7a2f`

Bad:

`vector`

The slug is not a password, but high entropy reduces accidental discovery.

### 3. Add the PDFs to the repository

Create:

`public/deliveries/<slug>/executive-intelligence-deck.pdf`

`public/deliveries/<slug>/evidence-appendix.pdf`

Use clean filenames. Do not publish internal PPTX, DOCX, research notes or source logs.

### 4. Add one record to `src/data/deliveries.ts`

Example:

```ts
{
  slug: 'vector-8c4e7a2f',
  company: 'Vector',
  recipient: 'Recipient Name',
  recipientRole: 'CEO',
  trigger: 'The current observable trigger that caused Evidence Axis to look',
  preparedDate: '2026-08-19',
  summary: 'A source-verified competitive intelligence package prepared specifically for Vector.',
  headlineFinding: 'One specific, decision-relevant finding that earns the click into the package.',
  deckHref: '/deliveries/vector-8c4e7a2f/executive-intelligence-deck.pdf',
  appendixHref: '/deliveries/vector-8c4e7a2f/evidence-appendix.pdf',
}
```

### 5. Deploy and verify

After Git/Vercel build passes, open all three URLs:

- delivery page
- Executive Deck PDF
- Evidence Appendix PDF

Check desktop and mobile.

### 6. Confirm operational tracking before sending Gift #1

The website code is configured to send delivery events through FormSubmit.

Before the first real Gift email:

1. Open the test delivery page once.
2. Open each PDF once.
3. Confirm the corresponding event messages arrive in the Evidence Axis business inbox.
4. If FormSubmit requests activation, complete activation before any prospect receives a Gift.

Do not mark `Viewed` in the outreach tracker until this end-to-end check is complete.

## Email delivery rule

The email itself should contain enough value to earn the click:

- the observable Trigger
- one specific finding
- why the package was prepared
- direct company-specific link
- no signup / form / call requirement

The tracked delivery page is the primary URL. PDFs remain directly available from the page.

## Funnel mapping

Use these statuses:

`Gift Built → Delivered → Viewed → Engaged → Commercial Intent → Conversation → Proposal → Payment`

Operational tracking maps as follows:

- `delivery-page-viewed` → evidence that the delivery page was viewed
- `executive-deck-opened` → strong content-consumption signal
- `evidence-appendix-opened` → deeper evidence-interest signal
- `decision-conversation-clicked` → commercial-intent signal, but still verify the resulting conversation before treating it as a qualified opportunity

## Privacy rule

Delivery pages are `noindex` and operational tracking is disclosed in the website Privacy notice.

Do not put confidential client information in the delivery registry or delivery-page HTML.

## Scaling rule

This email-based event tracking is deliberately a **Sprint-1 mechanism**, appropriate for the first small number of Gifts.

If volume grows, replace it with dedicated first-party analytics / event storage while preserving:

- company-specific path
- page-view signal
- Deck-open signal
- Appendix-open signal
- commercial-intent click signal
- no advertising tracker requirement

## G-00 completion gate

G-00 is fully PASS when:

- delivery page template builds successfully
- Gift #1 has a unique slug
- both PDFs resolve correctly
- noindex is present
- page view reaches the Evidence Axis inbox once
- Deck click reaches the inbox once
- Appendix click reaches the inbox once
- Decision CTA event reaches the inbox once

Until the four event checks are confirmed end-to-end, tracking is **implemented but not operationally verified**.
