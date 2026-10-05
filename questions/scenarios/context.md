# Context & cost

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. Shorten a conversation without losing its constraints

ID: `scenario-summarize-without-losing-constraints` · Intermediate · Suggested practice: 8 minutes · Editorial review: 2026-10-05

A travel-planning assistant exceeds its context budget after many revisions. A summary reduces tokens but forgets that the traveler cannot use stairs. How would you redesign the retained context?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Which facts are binding constraints, which were corrected, and which are historical discussion?
- Does the task need original evidence or just a current structured state?

### Reference approach

**Separate state from narration**

Store explicit current constraints, decisions, and unresolved questions in a scoped task record. Retain provenance and corrections. Use a conversational summary for background, not as the sole store of requirements that determine acceptable results.

**Build a bounded prompt**

Keep the current request, binding constraints, recent relevant turns, and targeted evidence. Budget tool results and output space as well as messages. Retrieve older detail when needed rather than keeping every previous itinerary in the active context.

**Test retention under revision**

Create long conversations with corrected preferences, distractors, and conflicting old plans. Check whether generated itineraries satisfy the latest constraints after compression. Compare token usage and task success on the same conversations.

### Tradeoff

Structured state takes more application work and can itself be wrong. Validate updates and retain enough provenance to inspect how a constraint entered the record.

### Common mistakes

- Assuming a shorter summary is better because it costs less.
- Treating all earlier messages as equally authoritative.

### Follow-up questions

- How would a user correct an incorrectly stored constraint?
- Which original turns must remain recoverable?

### Self-review checklist

- [ ] Protects task-critical constraints and corrections.
- [ ] Accounts for the whole context budget.
- [ ] Tests successful task completion after compression.

### Technical references

- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [LangChain: Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 2. Correct a remembered preference without reviving the old one

ID: `scenario-memory-correction-and-expiration` · Intermediate · Suggested practice: 8 minutes · Editorial review: 2026-10-05

A user changes a project preference from Python to TypeScript. The assistant acknowledges the change, but a later session retrieves the old preference from vector memory. How would you design reliable corrections?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Is the preference global, specific to one project, or only for the current task?
- Where can old values survive: history, memory records, embeddings, and cached responses?

### Reference approach

**Define a scoped record**

Represent the owner, project scope, preference key, revision, source, and validity. Derive user identity from authenticated context. A retrieved sentence should not override a more authoritative correction simply because it ranks highly.

**Propagate the correction**

Supersede the old value in the authoritative store and update or exclude its derived retrieval records. Invalidate affected cached context. Preserve an audit trail only under an appropriate retention policy, not as another active preference candidate.

**Test the complete lifecycle**

Verify recall before and after correction, across sessions and projects. Test expiration, deletion, ambiguous scope, and other users' records. Ask for clarification when a correction does not identify which project it applies to.

### Tradeoff

Keeping more memories can improve recall but increases conflict and maintenance work. Store information with a defined use and lifecycle.

### Common mistakes

- Appending a correction while leaving the old value equally eligible.
- Using embedding similarity as a precedence rule.

### Follow-up questions

- What should happen if the user asks to forget the preference?
- How does this differ from trimming conversation history?

### Self-review checklist

- [ ] Separates storage, retrieval, and authority.
- [ ] Handles scope, corrections, and deletion.
- [ ] Tests isolation and stale derived records.

### Technical references

- [LangChain: Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)
- [Qdrant: Filtering](https://qdrant.tech/documentation/search/filtering/)

</details>

## 3. Reduce model spend without hiding quality losses

ID: `scenario-lower-cost-model-routing` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

A support-drafting feature must work within a smaller operating budget. Management proposes replacing the model for every request. How would you compare a full replacement with a routing strategy?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Which request types create most spend, and which mistakes are expensive for operators?
- Does the budget include retries, routing calls, retrieval, and manual rework?

### Reference approach

**Establish cost per useful outcome**

Measure request mix, input and output tokens, cache use, failed calls, and accepted drafts. Use current provider prices with the relevant conditions. Avoid inferring production savings from headline token prices alone.

**Compare policies on fixed cases**

Evaluate the existing model, a cheaper candidate, and a simple routing rule on the same held-out tasks. Slice results by complexity, language, and exception handling. Include the router's cost and mistakes, not just the selected model's answer.

**Release with a quality boundary**

Define which failures trigger escalation and test whether the validator catches them. Introduce the policy gradually, monitor accepted outcomes and total spend, and retain a reversible configuration. Do not treat model self-confidence as calibrated correctness.

### Tradeoff

Routing can preserve difficult-case quality, but an inaccurate router and repeated escalation may erase the savings. A simpler model change may be better if it passes the actual workload.

### Common mistakes

- Quoting a savings percentage before measuring the traffic mix.
- Evaluating only the easy cases selected for the cheaper model.

### Follow-up questions

- What if the fallback rate doubles after launch?
- How would you compare a shorter prompt before changing models?

### Self-review checklist

- [ ] Measures full cost per accepted outcome.
- [ ] Tests quality by workload slice.
- [ ] Includes router and escalation failures in the comparison.

### Technical references

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

</details>

## 4. Explain why a long prompt is not getting cache hits

ID: `scenario-prompt-cache-misses` · Intermediate · Suggested practice: 8 minutes · Editorial review: 2026-10-05

Your app sends a long policy and tool definitions on every request. Caching was enabled, but billed usage barely changed. Each request also includes a timestamp and user-specific settings near the beginning. How do you investigate?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- What does this provider cache, and what are its eligibility, lifetime, write, and read billing rules?
- Do actual request logs and usage fields show reuse for the same eligible prefix?

### Reference approach

**Inspect the request shape**

Compare consecutive serialized requests. Look for changing timestamps, tool order, formatting, and user data inside the intended reusable prefix. Confirm the endpoint and model support the requested caching behavior.

**Separate stable and variable content**

Place eligible shared instructions and tool definitions in a stable order, with per-request content afterward where the provider's rules permit. Keep version changes deliberate. Do not move sensitive data across users merely to improve reuse.

**Measure warm and cold behavior**

Run controlled repeated requests within the relevant cache lifetime. Inspect cache-specific usage and compare total billed reads, writes, and uncached tokens. Report results for this workload rather than assuming a universal discount.

### Tradeoff

Maintaining a stable prefix can improve reuse but must not freeze a policy that needs updating. Correctness and version invalidation remain part of the design.

### Common mistakes

- Confusing prompt-prefix caching with reusing a previous answer.
- Comparing only the second request while ignoring cache creation cost.

### Follow-up questions

- How do frequent policy updates change the economics?
- Would a semantic response cache solve the same problem?

### Self-review checklist

- [ ] Checks provider-specific eligibility and billing.
- [ ] Finds accidental prefix variation.
- [ ] Measures total cost and preserves data boundaries.

### Technical references

- [Anthropic: Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

</details>
