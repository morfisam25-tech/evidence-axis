# Gift #17 — Claude Adversarial QA Handoff

Project: Evidence Axis
Gift: #17
Company: Henry (`henry.ai`)
Cohort: C
Stage entering: Claude Adversarial QA

## Files to review

1. `docs/GIFT_17_PROSPECT_QUALIFICATION.md`
2. `docs/GIFT_17_RESEARCH_QA.md`
3. `docs/gift17-henry/Evidence_Axis_Henry_Executive_Brief_DRAFT.md`
4. `docs/gift17-henry/Evidence_Axis_Henry_Evidence_Appendix_DRAFT.md`

The Prospect Gate, Thesis Gate, Conflict Check, and Research QA are already complete. Do not restart prospect discovery or redesign the gift.

## Your role

Act as an adversarial evidence reviewer. Try to break the customer-facing Brief and Appendix before they are converted to final PDFs.

Do not improve prose merely for style. Focus on factual support, source attribution, reasoning, scope, and whether a founder could fairly challenge a sentence.

## Required checks

### A. Claim-to-source audit
For every material factual claim in the Brief:
- identify the supporting source(s) in the Appendix;
- verify that the source says what the Brief says it says;
- flag any sentence that moves beyond the source;
- distinguish company-originated claims from independent evidence.

### B. Finding 01 attack
Test the claim that IntellCRE's live Henry comparison materially understates current Henry capabilities.

Specifically verify:
- what IntellCRE currently says Henry lacks;
- what Henry currently documents for underwriting, comps, market research, Excel workflow, database/context and deal outputs;
- whether any terminology difference makes the apparent contradiction weaker than the Brief presents it.

Do not allow a claim that Henry is unaware of the page or losing deals because of it.

### C. Finding 02 attack
Test the Buildout reference-class conclusion.

Try to disprove that Henry and Buildout can appear in the same buyer evaluation landscape.

Verify:
- Buildout's current contact-to-commission / brokerage-wide scope;
- Henry's current deal-context / underwriting / comps / research / output scope;
- the third-party or competitor-created surfaces that place Buildout near Henry in an alternatives or broker-tool set.

Do not allow:
- "Buildout is Henry's primary direct competitor";
- same-workflow inference from the shared Newmark account;
- switching, displacement or share claims.

### D. Finding 03 attack
Test whether the segment/reference-class conclusion is useful rather than generic.

Verify that Henry currently targets:
- Investment Sales;
- Debt & Capital Markets;
- Sponsors & Owner-Operators.

Then verify that Dealpath, Archer, Clik.ai / lender-oriented tools, Buildout and related products actually represent materially different buyer seats/workflows.

The Brief may conclude that competitive enablement should be segmented by buyer seat. It may not declare all adjacent tools direct competitors without evidence.

If this finding is too obvious to be worth executive attention, say so and recommend removal rather than padding the Gift.

### E. Freshness / founder-led GTM
The January 2026 AE posting is historical evidence only.

Verify that the draft does not imply Sammy Greenwall still runs every sales call.

Current claim allowed only if supported by fresh evidence:
- Sammy remains publicly involved in positioning and customer access as of September 2026.

### F. Identity contamination
Search the drafts for evidence accidentally sourced from unrelated Henry companies.

Hard exclusions:
- `usehenry.ai`
- `henryapi.ai`

The correct identity-exclusion source for `henryapi.ai` is OfferZen:
`https://www.offerzen.com/companies/henry-ai`

No product, pricing, customer or feature claim from those unrelated businesses may enter the Henry CRE brief.

### G. Security/procurement supporting signal
Check the Airframe / SOC 2 point carefully.

The draft may say a 1 September 2026 third-party profile still carries older Henry/security framing while Henry's current site states SOC 2 Type II.

Do not infer Airframe traffic, procurement influence, or buyer impact.

### H. Client-facing hygiene
Flag:
- internal QA language accidentally exposed to the client;
- research-process notes that do not help the executive;
- overlong methodology;
- duplicated claims between Brief and Appendix;
- promotional language;
- unsupported market-size, share, revenue, pricing or ROI claims;
- any statement that sounds more certain than the evidence.

## Required output

Return exactly these sections:

1. **VERDICT:** PASS / PASS WITH PATCHES / FAIL
2. **BLOCKERS:** only issues that must be fixed before PDF production
3. **NON-BLOCKING PATCHES:** useful corrections that do not invalidate the Gift
4. **CLAIM AUDIT:** Finding 01 / Finding 02 / Finding 03, each with SUPPORTED / PARTIAL / UNSUPPORTED and why
5. **SOURCE ATTRIBUTION ERRORS:** exact source/claim mismatch, if any
6. **WORDING TO REMOVE OR NARROW:** quote the exact draft sentence and give a safer replacement
7. **WHAT SURVIVED THE ATTACK:** the strongest 1–3 findings after adversarial review

Do not generate final PDFs. Do not send outreach. Do not change the cohort, prospect, or acquisition model.
