# Agents & tools

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. Choose a workflow, one agent, or several

ID: `scenario-workflow-or-autonomous-agent` · Intermediate · Suggested practice: 8 minutes · Editorial review: 2026-10-05

An operations team wants a “multi-agent” system to classify requests, look up account status, and draft a response. The steps are usually predictable, but a few requests need investigation. What architecture would you start with?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Which decisions genuinely require choosing the next action from new evidence?
- Can investigation be separated from the routine path, and what can each path access?

### Reference approach

**Model the routine path**

Write the common process as explicit steps with typed inputs and outputs. Use normal application code for deterministic checks and a bounded model call where interpretation is needed. Keep an operator path for unsupported requests.

**Locate the uncertain decisions**

Prototype a single bounded agent for cases that require evidence-driven exploration. Specify allowed tools and terminal states. Compare it against the workflow on the same cases before introducing separate agent roles.

**Justify any split**

Add multiple agents only for a demonstrated need such as independent parallel work or distinct access scopes. Define the handoff contract, result validation, and shared-state ownership; measure coordination cost and failure propagation.

### Tradeoff

A workflow is easier to inspect but can become brittle when paths multiply. Dynamic investigation adds flexibility while making execution cost and behavior harder to bound.

### Common mistakes

- Assigning an agent to every function before measuring a baseline.
- Treating role descriptions as enforced permission boundaries.

### Follow-up questions

- How do you prevent two workers from editing the same record?
- What evidence would persuade you to merge the agents again?

### Self-review checklist

- [ ] Chooses architecture from decision uncertainty.
- [ ] Accounts for coordination and access boundaries.
- [ ] Defines a comparison that could disprove the proposed design.

### Technical references

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic: Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

</details>

## 2. Debug an agent that calls the wrong tool

ID: `scenario-agent-selects-wrong-tool` · Intermediate · Suggested practice: 8 minutes · Editorial review: 2026-10-05

An agent sometimes uses update_customer when a user only asks to see a customer record. Both tools accept an account ID and their descriptions overlap. How would you fix the interface and execution path?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Was the write merely proposed, or did the application execute it?
- How are user intent, authenticated identity, and action permissions checked?

### Reference approach

**Contain the execution risk**

Inspect affected traces and disable unintended writes while investigating. Require the execution layer to validate allowed action, resource scope, and arguments before side effects. A correctly shaped tool call is still only a proposal.

**Make the tools distinguishable**

Give reads and writes distinct names and concise descriptions of when each applies. Require explicit fields for updates and reject unexpected arguments. Return structured, bounded results and actionable errors rather than ambiguous success strings.

**Evaluate near misses**

Test read-only requests, ambiguous instructions, denied resources, and malicious text in retrieved data. Check both tool selection and resulting state. Confirm rejected calls cannot enter the write function.

### Tradeoff

More tools can improve specificity but also increase selection burden. Expose only the relevant authorized operations for the current task.

### Common mistakes

- Solving a permission defect only by rewriting the system prompt.
- Accepting an account ID because the model supplied valid JSON.

### Follow-up questions

- How would you design confirmation for a permitted write?
- What should the agent see when access is denied?

### Self-review checklist

- [ ] Separates selection, validation, authorization, and execution.
- [ ] Improves the actual tool contract.
- [ ] Tests external effects, including rejected requests.

### Technical references

- [Anthropic: Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [OpenAI: Structured model outputs](https://developers.openai.com/api/docs/guides/structured-outputs)

</details>

## 3. A tool timed out. Did the action happen?

ID: `scenario-tool-timeout-duplicate-write` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

An agent submits a warehouse dispatch request. The service times out before returning a result, and retrying could send a second parcel. How should the agent and application recover?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Does the service support an idempotency key or a lookup by client operation ID?
- Can you distinguish a failed request from a completed operation whose response was lost?

### Reference approach

**Represent the uncertainty**

Record a stable operation ID and an unknown outcome. Do not label the dispatch failed solely because the caller timed out. Keep this state separate from permanent rejection and confirmed success.

**Reconcile before repeating**

Query the service for the operation state if supported. For safe retries, reuse the same idempotency key and intent, respecting the provider's scope and retention contract. A new key would represent another action, not recovery of this one.

**Bound recovery**

Apply retry limits and a deadline. If the outcome cannot be established safely, route to a human reconciliation queue with the operation record. Test a committed write followed by a lost response, not just a pre-execution network failure.

### Tradeoff

Pausing an uncertain action can delay fulfillment. Automatically repeating it can create a second external effect that is harder to reverse.

### Common mistakes

- Assuming all timeouts are safe to retry.
- Generating a fresh idempotency key on every attempt.

### Follow-up questions

- What if the idempotency window expired?
- How do you report partial completion to the customer?

### Self-review checklist

- [ ] Names the unknown-outcome state.
- [ ] Keeps operation identity stable across recovery.
- [ ] Tests duplicate prevention at the real side-effect boundary.

### Technical references

- [AWS Builders’ Library: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)

</details>

## 4. Stop an agent before a loop becomes a bill

ID: `scenario-bound-runaway-agent` · Advanced · Suggested practice: 8 minutes · Editorial review: 2026-10-05

A research agent keeps reformulating the same failed search and spends its entire daily allowance on one task. It stays under a per-call timeout, so the existing timeout check never stops it. What controls are missing?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- What counts as a completed task, and which failures should terminate it?
- Are limits shared by nested agents, retries, and parallel calls?

### Reference approach

**Budget the whole run**

Set limits for total calls, elapsed time, and spend at the controller boundary. Include child work and retries in the same accounting scope. Reserve estimated cost before concurrent work so multiple branches cannot all consume the remaining budget.

**Require meaningful progress**

Track action identity, results, and changes in evidence. Detect repeated unsuccessful actions while allowing legitimate pagination or polling. Require a new hypothesis, new input, or escalation when the same approach no longer improves the task state.

**Stop with usable state**

Cancel pending work where supported, record completed actions, and distinguish budget exhaustion from success. Return bounded findings and remaining gaps. Test hung tools, concurrent branches, and misleading success messages.

### Tradeoff

Tight limits can stop valid long investigations. Make the budget visible and adjustable for the task while retaining a hard ceiling and an explicit stop reason.

### Common mistakes

- Relying only on the model to decide when enough money was spent.
- Applying separate full budgets to every child agent.

### Follow-up questions

- Can cancellation guarantee that remote work stops immediately?
- How do you distinguish a useful retry from a loop?

### Self-review checklist

- [ ] Accounts for aggregate work, not only individual calls.
- [ ] Defines progress and terminal states.
- [ ] Preserves evidence and external-action status at shutdown.

### Technical references

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

</details>
