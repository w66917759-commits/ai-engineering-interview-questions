# Customer & delivery

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. Turn “we need AI” into a two-week pilot

ID: `scenario-scope-first-ai-pilot` · Intermediate · Suggested practice: 10 minutes · Editorial review: 2026-10-05

A distributor wants an AI assistant for its support team. You have two weeks, one engineer, and access to a sample of resolved tickets. The sponsor wants a visible improvement but has not defined success. What would you propose?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Which repeated task takes the most operator time, and what happens when it is done incorrectly?
- Who can approve data access, review outputs, and accept the pilot?

### Reference approach

**Observe a complete case**

Follow an operator from opening a ticket to resolving it. Record the current handling time, required systems, and rework. Select one frequent task with a clear finish, such as drafting a policy-backed response for review.

**Write the acceptance agreement**

Agree on eligible ticket types, an error definition, reviewer workload, and a baseline comparison. Mark target improvements as pilot goals, not measured savings. Name the customer owner who will judge the result.

**Ship one measurable slice**

Build a read-only draft flow using approved examples, with the operator retaining the send action. Evaluate held-out tickets, capture rejected drafts, and finish with a go, revise, or stop decision supported by the observed results.

### Tradeoff

A narrow pilot covers fewer tickets but lets you attribute changes and learn whether the workflow helps. A broad chatbot may demonstrate more features without establishing value.

### Common mistakes

- Selecting a model before observing the workflow.
- Counting generated drafts as resolved customer problems.

### Follow-up questions

- The sponsor insists on automatic sending. What evidence would you require first?
- What do you cut if data access arrives a week late?

### Self-review checklist

- [ ] Defines one customer outcome and its baseline.
- [ ] Names constraints, ownership, and an explicit acceptance decision.
- [ ] Includes a fallback that operators can actually use.

### Technical references

- [Google: Rules of Machine Learning — objectives and metrics](https://developers.google.com/machine-learning/guides/rules-of-ml/)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

</details>

## 2. Deliver a useful pilot with incomplete data

ID: `scenario-pilot-with-messy-data` · Intermediate · Suggested practice: 8 minutes · Editorial review: 2026-10-05

A service company offers 2,000 scanned work orders for an extraction pilot. Some scans are unreadable, several templates changed, and the customer cannot provide a complete ground-truth spreadsheet. How do you plan the first week?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Which fields drive a downstream decision, and which errors require review?
- Who can label a representative sample and resolve contradictory records?

### Reference approach

**Inspect before promising coverage**

Sample across templates, dates, scan quality, and common exceptions. Track whether errors come from missing source data, extraction, or interpretation. Ask for the minimum authorized data needed to test those categories.

**Build a small reviewed set**

Have domain staff label the required fields and mark genuinely ambiguous cases. Reserve a separate sample for validation. Report coverage alongside field accuracy so discarding difficult documents cannot look like an improvement.

**Deliver with a review queue**

Start with supported templates and show extracted values beside source locations. Route unsupported or ambiguous records to operators. Quantify review effort and maintain a backlog of source-data fixes with customer owners.

### Tradeoff

Restricting the supported document set can make the pilot useful sooner, but the customer must see how much work remains outside that boundary.

### Common mistakes

- Treating an absent source field as a model error.
- Evaluating only the clean documents used during development.

### Follow-up questions

- How do you report success when operators correct many outputs?
- A new template arrives tomorrow. What happens?

### Self-review checklist

- [ ] Separates data quality from model quality.
- [ ] Budgets customer review time.
- [ ] Measures abstention, coverage, and correction effort.

### Technical references

- [Google: Rules of Machine Learning — objectives and metrics](https://developers.google.com/machine-learning/guides/rules-of-ml/)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

</details>

## 3. Handle a scope change before the customer demo

ID: `scenario-manage-pilot-scope-change` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

Your approved pilot searches an internal support handbook. Three days before the demo, a director asks it to update orders and answer from finance documents too. How do you respond and keep the project moving?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- What decision does the demo need to enable, and which new request is essential to that decision?
- Who owns write permissions and access to the finance documents?

### Reference approach

**Make the new boundary visible**

Explain that retrieval from a new data domain and modifying orders each add integration and acceptance work. Show the current scope alongside the requested changes, their dependencies, and the evidence already available.

**Offer a concrete sequence**

Keep the approved search flow as the demonstrable delivery. Offer an order-update design walkthrough or a clearly labeled test-environment prototype only if it serves the decision. Put production writes behind a separate scoped milestone.

**Confirm the trade in writing**

Agree on what is deferred, the next owner, and which acceptance checks must precede access expansion. Give the sponsor an updated plan they can communicate rather than a technical objection without an alternative.

### Tradeoff

A small addition can improve the customer conversation, but combining untested permissions and writes can undermine the original delivery. Decide using the demo's purpose and remaining verification time.

### Common mistakes

- Quietly broadening data access to make the demo work.
- Saying yes without changing the delivery agreement.

### Follow-up questions

- The director calls the boundary unhelpful. What do you show them?
- Which checks are different for reading an order and changing it?

### Self-review checklist

- [ ] Explains the customer impact of the new scope.
- [ ] Proposes a feasible alternative and records the decision.
- [ ] Identifies the new permission and acceptance boundaries.

### Technical references

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic: Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

</details>

## 4. Hand over a pilot the customer can operate

ID: `scenario-handoff-ai-pilot` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

An internal assistant passes its pilot review. Your engagement ends next week, and the customer's platform team will own it. What must be in the handover for the system to remain useful?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Who owns document updates, application incidents, and model or prompt changes?
- Which operating commitments and escalation hours has the customer accepted?

### Reference approach

**Transfer an operating contract**

Document supported workflows, known limitations, permissions, versioned configuration, and what the customer accepted. Identify each ongoing task and a named team responsible for it, including data freshness and deletion.

**Rehearse common failures**

Ask the new operators to diagnose a failed ingestion, inspect a poor answer, and exercise a fallback in a test environment. Supply dashboards and a runbook organized around symptoms, evidence, and reversible recovery steps.

**Make changes reviewable**

Provide the evaluation set, its access rules, release checks, and rollback procedure. Explain how new failure examples enter the suite. Agree on how future work becomes reusable product improvements rather than an undocumented customer-specific patch.

### Tradeoff

Extensive documentation is expensive to maintain. Prioritize the actions the receiving team must perform and verify that the handover actually enables them.

### Common mistakes

- Handing over only source code and API credentials.
- Reporting pilot success as proof of long-term reliability.

### Follow-up questions

- How do you handle an upstream model version change after you leave?
- Which customer-specific pieces would you generalize?

### Self-review checklist

- [ ] Names operational and data owners.
- [ ] Demonstrates recovery and change procedures.
- [ ] Separates pilot evidence from ongoing service commitments.

### Technical references

- [Google SRE: Implementing SLOs](https://sre.google/workbook/implementing-slos/)
- [Google SRE: Canarying releases](https://sre.google/workbook/canarying-releases/)

</details>
