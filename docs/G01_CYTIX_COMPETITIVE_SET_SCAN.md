# Evidence Axis — G-01 Competitive Set Scan

## Target: Cytix

**Research date:** 2026-08-19  
**Status:** ACTIVE — Gift #1 candidate  
**Purpose:** identify the decision-relevant competitive set from zero before deep-diving the final 2–3 competitors.

---

# 1. Trigger — VERIFIED

Cytix has just repositioned around **software change risk / security decision intelligence** and simultaneously entered a fresh growth phase.

Current Cytix positioning:

- “Every software change has meaning.”
- “The security decision layer for a world where software development never stops.”
- starts with the change itself
- persistent knowledge graph of the software landscape
- risk-based decisions on whether security should care
- high-risk changes routed to validation through multi-agent orchestration
- decision/test/finding evidence attached back to the triggering change

Cytix founder Ben Armstrong published on 5 Aug 2026 that the company had stopped focusing on testing labels and started focusing on **software risk**. He describes the core problem as determining which of thousands of software changes need attention, what response is proportionate, and whether the reasoning is defensible to a board or regulator.

On 12 Aug 2026, Cytix announced/received a $7M (£5M) Series A and its change-risk platform entered general release. Independent coverage says the company plans to expand deployment in enterprise and regulated sectors.

### Trigger sources

**Primary — Cytix**
- https://www.cytix.io/
- https://www.cytix.io/resources/why-cytix-focuses-on-software-risk
- https://www.cytix.io/resources/guides/continuous-offensive-security-testing
- https://www.cytix.io/use-cases/security-leadership
- https://www.cytix.io/use-cases/grc

**Independent**
- https://www.prolificnorth.co.uk/news/7m-funding-round-as-manchester-startup-addresses-cyber-risk-of-rapidly-expanding-role-of-ai-in-software-development/
- https://www.theintelligent.ec/technology/2026/manchester-cybersecurity-startup-cytix-raises-7m-manage-ai-driven-software-risks
- https://fintech.global/2026/08/13/cytix-raises-7m-to-tackle-ai-driven-code-risk/

---

# 2. Scan hypothesis

Cytix should **not** be benchmarked only against classic pentest / PTaaS vendors.

The new positioning moves Cytix across several adjacent buyer alternatives:

1. material software-change risk intelligence;
2. ASPM / application-risk context and prioritization;
3. change-triggered security workflows / testing;
4. continuous or agentic offensive validation;
5. graph-based context / decision intelligence across the SDLC.

The scan therefore starts with the **buyer decision and operating mechanism**, not the category label Cytix chooses for itself.

---

# 3. Candidate 1 — APIIRO

## Status: VALIDATED — HIGH DIRECTNESS — PRIORITY DEEP DIVE

### Why it surfaced

Apiiro is materially closer to Cytix’s new story than a generic ASPM comparison suggests.

Overlap visible in the public record:

- identifies **material code changes** rather than treating all changes equally;
- analyzes whether a change introduces business/application risk;
- uses code/application context to determine materiality;
- triggers risk-based workflows and guardrails;
- can use material-change intelligence to determine **when and where downstream testing / pentesting should occur**;
- maintains a graph-based contextual model of application risk;
- supports audit / compliance evidence around material changes.

This creates direct overlap with Cytix’s new thesis:

> understand the change → decide whether it matters → route the proportionate security response → preserve evidence.

### Independent confirmation 1 — Gartner Peer Insights / ASPM market

Gartner Peer Insights lists Apiiro in Application Security Posture Management and describes deep code analysis, material-change context and risk-based developer workflows.

More importantly, a Feb 20, 2026 enterprise-user review explicitly says Apiiro is used to **detect material code changes and use those insights to trigger the right level of downstream testing**.

- https://www.gartner.com/reviews/market/application-security-posture-management-aspm-tools/vendor/apiiro/product/apiiro-aspm-platform/reviews
- https://www.gartner.com/reviews/market/application-security-posture-management-aspm-tools/vendor/apiiro

### Independent confirmation 2 — independent market/editorial coverage

Forbes independently described Apiiro as identifying and prioritizing risky code changes before they enter the development pipeline and using application/business context to judge risk.

- https://www.forbes.com/sites/paulfroberts/2020/10/13/exclusive-with-35m-a-round-apiiro-aims-to-weed-out-risky-code/

VentureBeat independently described Apiiro as analyzing application changes and using context to assess application risk.

- https://venturebeat.com/technology/apiiro-aids-software-development-with-application-risk-management

### Primary product confirmation

Apiiro currently states that it can:

- manage risk with automated, risk-based workflows;
- automatically scope, prioritize and manage penetration testing based on **material changes, software architecture and business risk**;
- continuously analyze application/software context through its software graph;
- collect compliance evidence across the development lifecycle.

- https://www.apiiro.com/
- https://apiiro.com/blog/automating-material-code-change-detection-streamline-application-security-compliance/
- https://apiiro.com/blog/agile-penetration-testing-adapting-scope-and-targets-through-material-code-change-detection/

### Evidence Axis assessment

**Very high probability of being decision-relevant to Cytix.**

The strongest potential Gift insight is not “Apiiro is another ASPM.” It is:

> **Apiiro has already occupied a surprisingly large part of the exact mechanism Cytix is newly emphasizing — material-change detection, risk qualification, proportional downstream testing, graph context and audit-oriented workflows.**

This requires a full deep dive before it becomes a client-facing conclusion.

---

# 4. Candidate 2 — OX SECURITY

## Status: VALIDATED COMPETITIVE SET — MEDIUM/HIGH DIRECTNESS — PRIORITY DEEP DIVE

### Why it surfaced

OX overlaps with the same enterprise AppSec buyer and increasingly spans both sides of Cytix’s model:

- ASPM / context-based prioritization;
- risk traced back to source code / commit;
- prompt-to-runtime application security;
- continuous agentic penetration testing / exploit validation;
- evidence-based prioritization;
- developer/security workflow integration.

The overlap is less exact than Apiiro on **material change → proportional test decision**, but OX can compete for the broader budget/job: determine what AppSec risk matters, validate exploitability, and route action without drowning the team in alerts.

### Independent confirmation 1 — Gartner Peer Insights

Gartner Peer Insights lists OX in ASPM and Software Supply Chain Security and describes the platform as covering application, cloud, agentic development and agentic pentesting.

- https://www.gartner.com/reviews/product/ox-security-platform
- https://www.gartner.com/reviews/market/application-security-posture-management-aspm-tools/vendor/ox-security/product/ox-security-platform/likes-dislikes

### Independent confirmation 2 — TechCrunch

TechCrunch independently describes OX as a platform aimed at security teams/developers that models risk across code and the software supply chain.

- https://techcrunch.com/2025/05/07/ox-security-lands-a-fresh-60m-to-scan-for-vulnerabilities-in-code/

### Primary product confirmation

OX now markets an Agentic Pentester that continuously evaluates applications and maps exploitable findings back to code, inside a broader ASPM / code-to-runtime platform.

- https://www.ox.security/ox-agentic-pentester/
- https://docs.ox.security/scan-and-analyze-with-ox/scanning/agentic-pentester
- https://www.ox.security/ox-for-application-security-posture-management-aspm/

### Evidence Axis assessment

**Validated competitor / substitute.**

Potential client-facing angle:

> Cytix’s differentiation cannot safely be framed only as “AI + continuous validation + context + evidence,” because OX is now converging on a code-to-runtime, agentic-validation story. Cytix’s more defensible wedge may be the *decision layer tied to every change* rather than the testing layer itself.

Needs deep-dive validation before use.

---

# 5. Candidate 3 — CYCODE

## Status: VALIDATED COMPETITIVE SET — MEDIUM DIRECTNESS — DEEP-DIVE / COMPARISON CANDIDATE

### Why it surfaced

Cycode overlaps through:

- ASPM;
- code-to-runtime context;
- a graph foundation that correlates code, pipelines, cloud assets, identities and risks;
- AI/agentic security orchestration;
- “decision traces” / contextual security intelligence across the SDLC;
- governance / guardrails for AI-driven development.

This is adjacent to Cytix’s persistent knowledge graph + security decision layer narrative, especially as both companies argue that AI-driven development is moving too fast for traditional human-paced security workflows.

### Independent confirmation 1 — Gartner Peer Insights

Gartner Peer Insights lists Cycode in ASPM and Software Supply Chain Security and describes its Context Intelligence Graph as correlating code-to-runtime risk context.

- https://www.gartner.com/reviews/product/cycode-platform
- https://www.gartner.com/reviews/market/application-security-posture-management-aspm-tools/vendor/cycode

### Independent confirmation 2 — TechCrunch

TechCrunch independently describes Cycode as an end-to-end ASPM platform that continuously scans and helps remediate risk across the development lifecycle.

- https://techcrunch.com/2024/03/05/cycode-acquires-bearer-to-accelerate-its-move-into-ai-enhanced-security-remediation/

### Primary product confirmation

Cycode’s 2026 Context Intelligence Graph explicitly describes a graph connecting code, pipelines, cloud assets, identities and risks, with **decision traces** intended to support intelligent decisions across the SDLC.

Cycode has also launched Agentic Development Security / agentic workflows for AI-driven development.

- https://cycode.com/blog/context-intelligence-graph-ai-application-security/
- https://cycode.com/press/cycode-unveils-agentic-development-security-platform/
- https://cycode.com/blog/introducing-agentic-workflows/

### Evidence Axis assessment

**Validated adjacent competitor / budget substitute.**

Likely less directly overlapping than Apiiro, but potentially important because the language of graph-based context, decision traces and AI-era security is converging with Cytix’s newly launched narrative.

---

# 6. Candidate 4 — AIKIDO SECURITY

## Status: VALIDATED BROAD SUBSTITUTE — HOLD OUTSIDE INITIAL TOP 3

Aikido is independently classified in both Application Security Testing and ASPM and provides broad code-to-cloud application security with automatic triage, risk bundling and developer-first workflows.

Independent evidence:

- https://www.gartner.com/reviews/market/application-security-posture-management-aspm-tools/vendor/aikido-security/product/aikido-security-1778279857
- https://www.reuters.com/technology/belgian-cybersecurity-startup-aikido-hits-unicorn-status-with-new-funding-round-2026-01-14/

### Assessment

Strong buyer/budget substitute, but the public mechanism is less specifically aligned with Cytix’s **change-qualified security decision + proportional validation** thesis than Apiiro.

Keep in scan record; do not spend initial deep-dive hours unless evidence from the first three changes the shortlist.

---

# 7. Candidate 5 — ZEROTRAIL

## Status: EMERGING WATCH — NOT YET QUALIFIED FOR FINAL SHORTLIST

zerotrail’s public product claims are unusually close to Cytix on the offensive-security side:

- continuously validates every code change and deployment;
- maps code / architecture / data flows;
- reasons through attack paths;
- validates exploitability before surfacing a finding;
- integrates into pull requests and development workflow.

Primary:
- https://zerotrail.ai/

Independent signals exist that it is a real early-stage cybersecurity company / research actor:
- https://wellfound.com/company/zerotrail/people
- https://wellfound.com/jobs/3318810-software-engineer-intern
- https://security.snyk.io/vuln/SNYK-GOLANG-GITHUBCOMSIYUANNOTESIYUANKERNELSERVER-15922419

### Assessment

**Interesting emerging blindspot, but DO NOT put it in the client-facing competitive shortlist yet.**

The current independent record is not strong enough to satisfy the Evidence Axis rule that a scan-derived shortlist competitor requires at least two independent non-vendor sources confirming competitive-set membership.

Keep as Watch / Unknown until stronger independent market evidence is found.

---

# 8. Current shortlist

## Deep Dive — LOCK FOR NEXT RESEARCH STAGE

1. **Apiiro — HIGH DIRECTNESS**
2. **OX Security — MEDIUM/HIGH DIRECTNESS**
3. **Cycode — MEDIUM DIRECTNESS**

## Hold / Watch

4. Aikido Security — broad substitute
5. zerotrail — emerging / insufficient independent membership proof

---

# 9. Most important preliminary insight

## INFERENCE — NOT YET CLIENT-FACING FACT

Cytix’s Aug 2026 repositioning appears strategically stronger than its earlier “continuous testing / AI pentesting” framing — but the **core mechanism may be less uncontested than the new narrative suggests.**

Apiiro in particular has public evidence going back years around:

- material-code-change detection;
- business-context risk assessment;
- deciding which changes deserve attention;
- triggering risk-specific workflows;
- using change intelligence to scope / trigger pentesting;
- preserving governance / compliance evidence.

That does **not** mean Apiiro and Cytix are identical products.

The deep-dive question is:

> **Where exactly is Cytix genuinely differentiated after Apiiro’s material-change / risk-graph / agile-pentesting capabilities are put side by side?**

Possible defensible Cytix wedge to test:

> **A dedicated security decision layer centered on every software change, with explainable approval/escalation logic and a connected evidence trail — rather than ASPM aggregation plus risk workflows.**

This is only an analytical hypothesis until the product mechanics are compared line by line.

---

# 10. Next stage — G-02 research

For Apiiro, OX and Cycode, collect and human-verify:

- exact product mechanism
- input signals
- change-level analysis
- knowledge/risk graph mechanics
- testing/orchestration behavior
- human approval / autonomy boundary
- evidence / audit trail
- GRC claims
- integrations / workflow location
- pricing if public; otherwise Unknown
- target customer / route to market
- 2026 product launches and strategic moves
- AI positioning
- key differences from Cytix
- contradictions / unsupported vendor claims

Then reduce to the **2–3 competitors that matter most** for the Executive Intelligence Deck.

---

# Evidence rule reminder

Vendor-authored pages above validate **product claims only**. They do not independently prove competitive-set membership or superiority.

Every material client-facing claim must be based on a human-opened source. Search snippets are discovery only. Unknown remains Unknown.
