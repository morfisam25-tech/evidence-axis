# Evidence Axis — G-02 Deep Dive

## Cytix — Decision-Layer Competitive Intelligence Gift

**Research date:** 2026-08-19  
**Status:** DEEP DIVE COMPLETE FOR EXECUTIVE SHORTLIST  
**Executive competitors:** **Apiiro + Cycode**  
**Adjacent / watch:** **OX Security**

---

# 1. Executive conclusion

## INFERENCE

Cytix’s August 2026 repositioning is strategically more differentiated than its earlier “continuous testing / AI pentesting / unified AppSec” framing — but the **decision-layer territory is not empty**.

The competitive pressure is best understood as a two-sided convergence:

### Apiiro attacks from the “material change” side

Apiiro already has a mature public mechanism around:

- detecting material software changes;
- maintaining a Software Graph and Risk Graph;
- judging business/contextual risk;
- automating risk-based approvals and workflows;
- using material-change intelligence to scope and manage pentesting;
- collecting audit/compliance evidence.

This overlaps unusually closely with Cytix’s new story of:

> understand the change → qualify whether it matters → choose a proportionate response → retain evidence.

### Cycode attacks from the “decision control” side

Cycode’s 2026 Context Intelligence Graph + Agentic Workflows + Maestro push a different but strategically important story:

- graph-based context across the SDLC;
- “decision traces” as institutional memory;
- multi-agent workflows;
- confidence thresholds;
- configurable human approval gates;
- auditable records of what triggered an agent, what it did, and which boundary applied.

This overlaps with the **explainability / defensible decision / human-control** part of Cytix’s new positioning.

### OX attacks the validation layer

OX is a meaningful same-budget substitute through ASPM, evidence-based risk prioritization, code-to-runtime traceability and continuous Agentic Pentesting. But its public story is currently less centered on **every software change as the unit of decision** than Apiiro, and less centered on **decision traces / human-control architecture** than Cycode.

For an executive Gift, Apiiro and Cycode therefore create a sharper decision story than treating all three as equal.

---

# 2. Cytix — current product thesis

## FACT

Cytix now positions itself as:

> “The security decision layer for a world where software development never stops.”

Its current public flow is:

1. **Understand change** — persistent knowledge graph; ticket/PR/code-diff/policy context.
2. **Data-led decisions** — prioritize high-risk changes and auto-approve low-risk changes.
3. **Validate the risk** — multi-agent orchestration; continuous change-driven testing; agentic validation.
4. **Evidence under-pinned** — log every decision, test and finding to the triggering change.

Primary:
- https://www.cytix.io/

## FACT

Founder Ben Armstrong explicitly says the company moved away from labels such as pentesting, continuous testing, AI pentesting and unified AppSec because those labels describe activities rather than the decision CISOs actually need.

He frames Cytix around this question:

> which of thousands of software changes actually need attention, what response is proportionate, and can the reasoning be defended to a board or regulator?

Primary:
- https://www.cytix.io/resources/why-cytix-focuses-on-software-risk

## FACT

Cytix’s June 2026 LLM benchmark describes a live triage/testability step that classifies whether a change requires security testing, cannot be tested in its current state, or lacks enough context for a confident call. The page explicitly states that the right response may be a human review, threat model, code review, validation step, pentest, remediation confirmation, accepted-risk record — or no test at all.

Primary:
- https://www.cytix.io/resources/llm-benchmark

## FACT

Cytix GRC messaging ties each security decision to the software change that triggered it and emphasizes a live audit-ready evidence trail.

Primary:
- https://www.cytix.io/use-cases/grc

## FACT — fresh commercial trigger

Independent coverage on 12–13 Aug 2026 reports a $7M / £5M Series A led by Northern Gritstone and a newly launched / general-release change-risk platform, with expansion toward enterprise and regulated sectors.

Independent:
- https://www.prolificnorth.co.uk/news/7m-funding-round-as-manchester-startup-addresses-cyber-risk-of-rapidly-expanding-role-of-ai-in-software-development/
- https://www.theintelligent.ec/technology/2026/manchester-cybersecurity-startup-cytix-raises-7m-manage-ai-driven-software-risks
- https://fintech.global/2026/08/13/cytix-raises-7m-to-tackle-ai-driven-code-risk/

---

# 3. Important Cytix message/control tension

## FACT A

Current Cytix homepage says:

> “Auto-approve low risk changes.”

Primary:
- https://www.cytix.io/

## FACT B

Founder Ben Armstrong writes on 5 Aug 2026 that Cytix is not “the judge,” and warns that a tool that quietly starts approving things on a customer’s behalf is a different and riskier product than one that ensures there is evidence behind the team’s decision.

Primary:
- https://www.cytix.io/resources/why-cytix-focuses-on-software-risk

## INFERENCE

This is not necessarily a technical contradiction: “auto-approve” may mean policy-configured approval with explicit evidence and governance rather than unconstrained autonomous judgment.

But it is a **positioning boundary that needs to be explained clearly**, especially because Cycode explicitly markets configurable confidence thresholds, human approval gates and auditable agent boundaries.

Potential implication for Cytix:

> If “decision layer” is the wedge, the human/autonomous decision boundary must be exceptionally crisp in product and messaging. Otherwise competitors can match the promise with more explicit control language.

---

# 4. Apiiro — HIGH DIRECTNESS

## 4.1 Core unit of analysis

### FACT

Apiiro’s Software Graph continuously maps software architecture and material changes using Deep Code Analysis and code-to-runtime matching.

It says DCA maps every material change across APIs, PII, GenAI frameworks, dependencies, identities, controls, infrastructure and other software components.

Primary:
- https://apiiro.com/platform/data-fabric/software-graph
- https://apiiro.com/platform/

### FACT

Apiiro’s current Data Fabric treats a material change as a delta against a continuously maintained graph and computes blast radius across connected software architecture.

Primary:
- https://apiiro.com/platform/

### Competitive implication — INFERENCE

This is very close to Cytix’s “start with the change itself + persistent knowledge graph” wedge.

The difference to test is whether Cytix owns a more explicit **security-decision lifecycle per change**, whereas Apiiro uses material change as one input into a broader ASPM / prevention / risk operating system.

---

## 4.2 Risk decision and workflow

### FACT

Apiiro currently markets:

- unified risk prioritization using software-graph and business context;
- automated risk-based approvals, acceptance, SLAs and fix workflows;
- risk-based policy/guardrail enforcement;
- executive and practitioner risk/compliance dashboards.

Primary:
- https://www.apiiro.com/

### Independent evidence

Gartner Peer Insights’ ASPM market page describes Apiiro’s Deep Code Analysis as identifying changes that introduce risk, with Risk Graph context and risk-based policies/workflows.

A Feb 20, 2026 enterprise-user review specifically states that Apiiro detects material code changes and uses those insights to trigger the right level of downstream testing.

Independent / customer-review source:
- https://www.gartner.com/reviews/market/application-security-posture-management-aspm-tools/vendor/apiiro/product/apiiro-aspm-platform/reviews
- https://www.gartner.com/reviews/market/application-security-posture-management-aspm-tools

### Competitive implication — INFERENCE

Cytix should not assume that “we decide which changes matter” is unique enough by itself. Apiiro customers are already describing exactly that outcome in operational terms.

---

## 4.3 Testing / pentest orchestration

### FACT

Apiiro markets automated pentest scoping and lifecycle management based on:

- material changes;
- software architecture;
- business risk.

Primary:
- https://www.apiiro.com/

### FACT

Apiiro’s Agile Penetration Testing page says teams can continuously scope and trigger pentests by detecting material changes and linking them to architecture/risk, with change diffs, impacted components and business context sent into the pentest workflow.

Primary:
- https://apiiro.com/blog/agile-penetration-testing-adapting-scope-and-targets-through-material-code-change-detection/

### Competitive implication — INFERENCE

This is the strongest direct collision with Cytix.

Cytix’s differentiation should not be described merely as:

> “testing triggered by change rather than by a calendar.”

Apiiro already publicly occupies that mechanism.

---

## 4.4 Graph and AI architecture

### FACT

Apiiro’s 2026 strategy is increasingly “AI needs a map.” Guardian Agent is grounded in:

- Software Graph;
- Risk Graph;
- organizational memory;
- architecture / policy / runtime context.

Primary:
- https://apiiro.com/blog/apiiro-guardian-agent/
- https://apiiro.com/platform/

### FACT

Apiiro Guardian can automatically threat-model feature requests, scope pentests from new features/material changes, prevent risky generated code, map ownership and perform context-aware AppSec actions.

Primary:
- https://apiiro.com/blog/apiiro-guardian-agent/

### Strategic implication — INFERENCE

Apiiro is expanding upstream from posture management into design-time and agentic prevention. This makes it harder for Cytix to defend the decision layer merely by saying it is “earlier” than scanners/pentests.

---

## 4.5 Evidence / compliance

### FACT

Apiiro markets:

- customizable risk/compliance reporting;
- automated/agentic evidence collection;
- audit readiness across the agentic development lifecycle.

Primary:
- https://www.apiiro.com/

### DIFFERENCE TO TEST — INFERENCE

Cytix may still have a stronger narrative around **one connected evidentiary record attached to each software change and each resulting decision**, rather than broader posture/compliance evidence.

This is potentially defensible but requires product-level proof.

---

## 4.6 Pricing

### UNKNOWN

No reliable public dollar price was found in the current public sources reviewed on 19 Aug 2026.

Do not infer a dollar figure.

---

# 5. Cycode — MEDIUM/HIGH STRATEGIC DIRECTNESS

## 5.1 Context graph

### FACT

Cycode introduced the Context Intelligence Graph in Jan 2026 as an evolution of its graph foundation connecting:

- code;
- pipelines;
- cloud assets;
- identities;
- risks.

It explicitly describes the graph as an AI-native substrate built to provide meaning through **decision traces** and enable intelligent decision-making across the SDLC.

Primary:
- https://cycode.com/blog/context-intelligence-graph-ai-application-security/

### Competitive implication — INFERENCE

This overlaps with Cytix’s persistent knowledge graph and “evidence behind every decision” narrative, but Cycode’s graph is broader across the software factory while Cytix is more explicitly centered on **the change as the primary event**.

---

## 5.2 Decision traces and institutional memory

### FACT

Cycode says the Context Intelligence Graph captures why/how/when/who makes security decisions and connects decisions to outcomes.

Maestro markets these “decision traces” as context for predictable and accountable AI.

Primary:
- https://cycode.com/maestro/
- https://cycode.com/blog/context-intelligence-graph-ai-application-security/

### Competitive implication — INFERENCE

This attacks one of the strongest parts of Cytix’s new positioning: defensible, explainable security decisions that remain connected to evidence.

Cytix therefore needs a sharper explanation of why a **change-native decision record** is better than a general graph-based decision trace.

---

## 5.3 Agentic workflows / human control

### FACT

Cycode Agentic Workflows markets:

- condition-based triggers;
- multi-agent chaining;
- confidence thresholds;
- human approval gates;
- autonomous action where allowed;
- audit trails that record triggering event, agent action and applied boundary.

Primary:
- https://cycode.com/agentic-workflows/
- https://cycode.com/blog/introducing-agentic-workflows/

### FACT

Cycode explicitly describes the model as:

> “Agent-Driven & Human-Controlled.”

Primary:
- https://cycode.com/agentic-workflows/

### Competitive implication — INFERENCE

Cycode currently communicates the autonomy boundary more explicitly than Cytix’s public pages.

If Cytix’s wedge depends on explainable security decisions and provable human intervention, this is a real messaging/feature benchmark.

---

## 5.4 AI orchestration

### FACT

Cycode Maestro orchestrates multi-agent workflows using Context Intelligence Graph data and organizational decision context.

Primary:
- https://cycode.com/maestro/

### FACT

Cycode launched Agentic Workflows in July 2026 as an Early Access product, shifting from human-driven/agent-assisted workflows toward agent-driven/human-controlled security operations.

Primary:
- https://cycode.com/blog/introducing-agentic-workflows/

### Strategic implication — INFERENCE

Cycode is currently converging toward the same high-level problem Cytix describes: security decisions need to happen at machine speed without losing control or auditability.

The main product difference is that Cycode starts from **risk events / violations across the wider ASPM estate**, while Cytix starts from **each software change**.

---

## 5.5 Pricing

### FACT

Cycode’s public pricing page says pricing is based on:

- active developer count;
- AI usage.

It publishes packages but requires “Get Pricing”; no public dollar amount is shown.

Primary:
- https://cycode.com/pricing/

### UNKNOWN

Exact public dollar price is not established.

---

# 6. OX Security — VALIDATED ADJACENT / WATCH

## 6.1 ASPM and prioritization

### FACT

OX ASPM markets:

- unified security signals;
- evidence-based prioritization;
- reachability, exploitability and business-impact context;
- traceability to code/repo/commit;
- automated no-code remediation and policy enforcement.

Primary:
- https://www.ox.security/ox-for-application-security-posture-management-aspm/

### Independent confirmation

TechCrunch reported in May 2025 that OX models risk across AI- and human-produced code for developers and security teams and had raised a $60M Series B.

Independent:
- https://techcrunch.com/2025/05/07/ox-security-lands-a-fresh-60m-to-scan-for-vulnerabilities-in-code/

---

## 6.2 Agentic pentesting

### FACT

OX’s Agentic Pentester markets:

- continuous adversarial testing;
- exploit chaining;
- privilege escalation attempts;
- business-logic testing;
- white-box testing;
- repo-to-application correlation;
- mapping a finding back to code and owner.

Primary:
- https://www.ox.security/pricing/
- https://www.ox.security/blog/ox-agentic-pentester-closing-the-loop-on-appsec-risk/

### Competitive implication — INFERENCE

OX strongly overlaps with Cytix’s validation / continuous-testing layer, but its public thesis is less centered on deciding whether **each change** deserves a security response before validation starts.

That makes OX important, but less useful than Apiiro/Cycode for the central executive blindspot in Gift #1.

---

## 6.3 2026 strategic move

### FACT

OX announced a “Prompt-to-Runtime” AI-Native Application Protection Platform (AINAPP) framing on 28 Jul 2026, spanning AI governance, code security, cloud enforcement and agentic pentesting.

Primary:
- https://www.ox.security/blog/ox-security-first-ainapp-platform/

### INFERENCE

This puts OX on a broad platform-consolidation trajectory. For Cytix, the threat is likely budget consolidation and validation overlap rather than the clearest direct attack on the decision-layer story.

---

## 6.4 Pricing

### FACT

OX says its platform is priced per developer with “one platform, one price, one license,” but its public pricing flow requires a quote.

Primary:
- https://www.ox.security/application-security-platform/
- https://www.ox.security/pricing/

### UNKNOWN

Exact public dollar amount is not established.

---

# 7. Decision matrix

| Dimension | Cytix | Apiiro | Cycode | OX |
|---|---|---|---|---|
| **Primary starting event** | Software change | Material change + software/risk estate | Risk/event across SDLC / context graph | Security finding / code-to-runtime risk / active validation |
| **Persistent context model** | Knowledge graph | Software Graph + Risk Graph | Context Intelligence Graph | PBOM / code-to-runtime application context |
| **Change-level qualification** | **Core** | **Strong** | Present indirectly | Present but not core public story |
| **Risk-based workflow** | **Core** | **Strong** | **Strong** | **Strong** |
| **Pentest/validation orchestration** | **Core** | **Strong material-change scoping** | Not central public differentiator | **Core Agentic Pentester** |
| **Human/autonomy boundary** | Human responsibility emphasized; homepage also says auto-approve low risk | Automated risk-based workflows; specific confidence-gate model not established | **Explicit confidence thresholds + human approval gates** | Policy/automation present; exact human gate model less explicit in reviewed pages |
| **Decision trace / audit record** | **Change-native connected evidence trail** | Compliance/audit evidence + graph/workflows | **Decision traces + workflow audit trail** | Traceability and compliance reporting |
| **AI narrative** | Machine-speed security judgment with human-quality / evidence | “AI needs a map”; graph-grounded agents | Context-grounded agents; agent-driven/human-controlled | AI-native prompt-to-runtime platform + agentic pentesting |
| **Public price** | Unknown | Unknown | Quote; active developer + AI usage | Quote; per developer |
| **Directness to new Cytix story** | — | **HIGH** | **MEDIUM/HIGH strategic** | **MEDIUM/HIGH adjacent** |

---

# 8. Executive competitor selection

## FINAL FOR EXECUTIVE DECK

### 1. Apiiro

Because it challenges the **mechanism** of Cytix’s new positioning:

> material change → graph context → risk qualification → right downstream action/testing → audit/compliance evidence.

This is the strongest potential blindspot.

### 2. Cycode

Because it challenges the **control and explainability layer**:

> context graph → decision traces → agentic workflows → confidence thresholds → human approval → audit trail.

This is the strongest benchmark for Cytix’s claim to a defensible security decision layer in the AI era.

## APPENDIX / WATCH

### OX Security

Keep in the Competitive Set Scan and Appendix as a strong adjacent platform / validation substitute.

It becomes an Executive Deck competitor only if further evidence shows Cytix is currently losing or explicitly positioning head-to-head on agentic pentesting / ASPM consolidation.

---

# 9. The Gift insight to build around

## INFERENCE — executive-worthy, pending final wording QA

> **Cytix’s new category story is not really competing with “pentesting.” Its hardest competitive pressure may come from platforms that are moving upstream into the same decision layer from different directions.**
>
> Apiiro already turns material code changes into risk-qualified workflows and change-scoped pentest decisions. Cycode is making context, decision traces, confidence thresholds and human-controlled agentic workflows a core platform layer. Cytix’s most defensible territory may therefore be narrower — and more valuable — than “AI-powered change risk”: a dedicated, change-native security decision record that determines the proportionate response to every software change and can explain that decision later.

### Why this matters

If this inference survives final source QA, it gives Cytix a practical positioning choice:

- **Do not lead with AI pentesting.** OX and others can match/overwhelm that surface.
- **Do not lead only with “context” or “graph.”** Apiiro and Cycode are already strong there.
- **Do not lead only with “we prioritize what matters.”** That is now standard ASPM language.
- Test a sharper wedge around **change-native security decisioning + defensible evidence + proportional response + explicit human/autonomy boundary.**

---

# 10. Recommended executive-deck structure

1. **Why we looked** — Aug 2026 repositioning + Series A / general release.
2. **What changed in the competitive picture** — Cytix moved from testing category into decision layer.
3. **The blindspot** — the new layer is already being approached by Apiiro and Cycode from different directions.
4. **Apiiro snapshot** — direct mechanism overlap.
5. **Cycode snapshot** — decision-control / agentic workflow overlap.
6. **Decision matrix** — where Cytix is actually distinct vs where the market has converged.
7. **Message/control tension** — auto-approve low risk vs “we are not the judge”; clarify autonomy boundary.
8. **Strategic implication** — protect the change-native decision-record wedge.
9. **What to watch next** — OX / validation convergence + Apiiro/Cycode product moves.

Evidence Appendix should contain OX as validated adjacent competitor and zerotrail as Watch / insufficient independent shortlist evidence.

---

# 11. Source register — opened / reviewed 2026-08-19

## Cytix — Primary

- C1 — https://www.cytix.io/ — current product flow; change-first / graph / decisions / validation / evidence.
- C2 — https://www.cytix.io/resources/why-cytix-focuses-on-software-risk — Aug 5 repositioning and decision-layer thesis.
- C3 — https://www.cytix.io/resources/llm-benchmark — live testability/triage decision pipeline and LLM benchmark.
- C4 — https://www.cytix.io/use-cases/security-leadership — leadership outcomes; human/AI intervention evidence.
- C5 — https://www.cytix.io/use-cases/grc — change-native audit/evidence record.
- C6 — https://cytix.io/change-analysis-tool — change-level AI security assessment demonstration.
- C7 — https://cytix.io/blog/cytix-ncc-group-partnership-announcement — NCC Group / continuous change-driven testing partnership.

## Cytix — Independent

- C8 — https://www.prolificnorth.co.uk/news/7m-funding-round-as-manchester-startup-addresses-cyber-risk-of-rapidly-expanding-role-of-ai-in-software-development/ — Series A / platform rollout.
- C9 — https://www.theintelligent.ec/technology/2026/manchester-cybersecurity-startup-cytix-raises-7m-manage-ai-driven-software-risks — Series A / software-change risk positioning.
- C10 — https://fintech.global/2026/08/13/cytix-raises-7m-to-tackle-ai-driven-code-risk/ — Series A / proportional response platform description.

## Apiiro — Primary

- A1 — https://apiiro.com/platform/data-fabric/software-graph — Software Graph / DCA / material changes.
- A2 — https://apiiro.com/platform/ — Data Fabric, Software Graph, Risk Graph, delta/material-change model.
- A3 — https://www.apiiro.com/ — risk workflows, pentest scoping, compliance/evidence, current platform.
- A4 — https://apiiro.com/blog/agile-penetration-testing-adapting-scope-and-targets-through-material-code-change-detection/ — change-driven pentest scoping.
- A5 — https://apiiro.com/blog/apiiro-guardian-agent/ — Guardian Agent / AI-needs-a-map / organizational memory / threat modeling / pentest scoping.

## Apiiro — Independent

- A6 — https://www.gartner.com/reviews/market/application-security-posture-management-aspm-tools/vendor/apiiro/product/apiiro-aspm-platform/reviews — material-code-change / downstream-testing customer evidence.
- A7 — https://www.gartner.com/reviews/market/application-security-posture-management-aspm-tools — independent ASPM market classification and capability summary.

## Cycode — Primary

- Y1 — https://cycode.com/blog/context-intelligence-graph-ai-application-security/ — Context Intelligence Graph / decision traces.
- Y2 — https://cycode.com/maestro/ — decision context / multi-agent orchestration.
- Y3 — https://cycode.com/agentic-workflows/ — confidence thresholds / human gates / audit trails.
- Y4 — https://cycode.com/blog/introducing-agentic-workflows/ — Jul 2026 agentic workflow launch / human-controlled model.
- Y5 — https://cycode.com/pricing/ — active-developer + AI-usage pricing model; exact dollar Unknown.

## Cycode — Independent

- Y6 — https://techcrunch.com/2024/03/05/cycode-acquires-bearer-to-accelerate-its-move-into-ai-enhanced-security-remediation/ — independent confirmation of end-to-end ASPM positioning.

## OX — Primary

- O1 — https://www.ox.security/ox-for-application-security-posture-management-aspm/ — ASPM, evidence prioritization, source/commit traceability.
- O2 — https://www.ox.security/pricing/ — Agentic Pentester capability + quote-based pricing.
- O3 — https://www.ox.security/application-security-platform/ — per-developer “one platform, one price, one license” framing.
- O4 — https://www.ox.security/blog/ox-agentic-pentester-closing-the-loop-on-appsec-risk/ — Mar 2026 Agentic Pentester.
- O5 — https://www.ox.security/blog/ox-security-first-ainapp-platform/ — Jul 28 2026 prompt-to-runtime AINAPP launch.

## OX — Independent

- O6 — https://techcrunch.com/2025/05/07/ox-security-lands-a-fresh-60m-to-scan-for-vulnerabilities-in-code/ — independent company/product/funding confirmation.

---

# 12. Unknowns / do not overclaim

- Cytix exact public dollar pricing: **Unknown**.
- Apiiro exact public dollar pricing: **Unknown**.
- Cycode exact public dollar pricing: **Unknown**; pricing basis is public.
- OX exact public dollar pricing: **Unknown**; per-developer quote model is public.
- Whether Cytix explicitly considers Apiiro/Cycode/OX named competitors internally: **Unknown**.
- Whether any of these vendors have displaced Cytix in a live deal: **Unknown**.
- Whether Cytix’s “auto-approve low risk” is fully autonomous, policy-based, or requires a configured customer approval framework: **not established from the reviewed public pages**.
- Whether Cycode’s current Early Access Agentic Workflows match Cytix’s change-level decision specificity in production: **not established**.

These Unknowns must remain visible in the client-facing appendix.
