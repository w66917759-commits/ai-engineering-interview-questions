# Production & reliability

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. The average is fast. Why are users waiting?

ID: `scenario-debug-rag-tail-latency` · Intermediate · Suggested practice: 10 minutes · Editorial review: 2026-10-05

An internal assistant has acceptable average latency, but some users wait more than ten seconds. It performs retrieval, reranking, generation, and optional tool calls. How do you find and improve the slow path?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Does the target describe time to first useful output or completed answers?
- Which users, payload sizes, and concurrency levels appear in the slow tail?

### Reference approach

**Measure the complete path**

Record queue time and stage-level latency within a request trace. Separate first-token time from completion and include retries. Compare tail percentiles by task type and load instead of relying on a single overall average.

**Test the leading bottleneck**

Inspect the slow traces before changing infrastructure. If reranking dominates, test fewer candidates; if generation dominates, inspect context and output size. If the queue dominates, review concurrency and admission control. Measure the quality consequence of each change.

**Protect the deadline**

Give expensive stages bounded time and define acceptable degradation for optional work. Use streaming when useful to users, but still enforce a completion budget. Load-test the intended mix, including cold paths and dependency delays.

### Tradeoff

Skipping a stage can improve speed while damaging a particular class of answers. Compare latency and quality for the affected slice rather than declaring success from the aggregate.

### Common mistakes

- Calling a fast first token proof of a fast completed task.
- Optimizing the model when most time is spent waiting in a queue.

### Follow-up questions

- How do you choose a latency objective with the customer?
- What happens when the optional tool times out?

### Self-review checklist

- [ ] Defines the user-visible latency objective.
- [ ] Uses traces and tail measurements to locate the bottleneck.
- [ ] Evaluates quality after each performance change.

### Technical references

- [Google SRE: Implementing SLOs](https://sre.google/workbook/implementing-slos/)
- [LangChain: Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval)

</details>

## 2. Keep a useful service during a provider outage

ID: `scenario-provider-outage-fallback` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

Your primary model provider starts timing out during peak traffic. A backup model is configured, but it uses different tool-call behavior and has never handled live requests. What would a credible recovery design include?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Which operations can degrade to read-only or human handling?
- Has the backup been tested for task quality, schemas, data handling, capacity, and cost?

### Reference approach

**Bound pressure on the dependency**

Set per-attempt and whole-request deadlines. Retry temporary failures with bounded backoff and jitter where safe, and stop sending new work to a repeatedly failing route. Control queues so retries do not amplify the outage.

**Treat fallback as a tested product path**

Evaluate the secondary model against the same acceptance suite and tool contract. Check which tasks it can safely support. For unsupported work, provide a clear degraded mode or human handoff rather than silently lowering the service's guarantees.

**Exercise recovery and return**

Simulate timeouts, rate limits, partial responses, and fallback exhaustion. Track routing decisions and user outcomes. Define how traffic returns to the primary gradually, and reconcile uncertain external actions before any repeat.

### Tradeoff

A backup adds integration and operating cost. For some tasks, a reliable human or read-only fallback offers more value than an untested second model.

### Common mistakes

- Assuming an API-compatible endpoint has equivalent behavior.
- Retrying every request at every layer without a shared deadline.

### Follow-up questions

- What if both providers share the same upstream dependency?
- How do you prevent failover from doubling a write?

### Self-review checklist

- [ ] Bounds retry and queue amplification.
- [ ] Tests the fallback's actual capability.
- [ ] Includes return-to-normal and uncertain-action handling.

### Technical references

- [AWS Builders’ Library: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)
- [Google SRE: Implementing SLOs](https://sre.google/workbook/implementing-slos/)

</details>

## 3. Keep one customer's evidence out of another's answer

ID: `scenario-tenant-isolation-in-rag` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

A shared RAG service stores documents for several customers. The model supplies a tenant_id argument when requesting a search, and a shared response cache keys only on the question text. Review the design.

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Where does the trusted user and tenant identity originate?
- Do retrieval, source links, caches, logs, and tools all enforce the same access policy?

### Reference approach

**Move authority outside the model**

Derive identity from verified server context and enforce resource authorization at every data boundary. The model's requested tenant is not trusted authority. Use supported isolation or mandatory filters and ensure every retrieval path applies them.

**Scope derived artifacts**

Scope response caches to all correctness and access dimensions, including tenant, authorization state, and relevant data version, or avoid caching protected answers. Recheck citation access. Keep logs and traces from becoming a second unprotected data store.

**Test with conflicting fixtures**

Create two tenants with the same question but different private answers. Test direct access, semantic search, cache hits, revoked access, and malicious tool arguments. Confirm unauthorized records never enter the model context.

### Tradeoff

Physical isolation can simplify some boundaries at greater operating cost. Shared storage requires consistently enforced policy across every access path; a prompt instruction cannot substitute for it.

### Common mistakes

- Filtering unauthorized text only after the model has seen it.
- Reusing an answer across users because their questions look similar.

### Follow-up questions

- How do permission changes affect cached answers?
- What if a background ingestion job forgets the tenant field?

### Self-review checklist

- [ ] Uses trusted identity and enforced authorization.
- [ ] Includes caches, citations, and logs in the design.
- [ ] Tests cross-tenant non-disclosure before generation.

### Technical references

- [Qdrant: Filtering](https://qdrant.tech/documentation/search/filtering/)
- [Anthropic: Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

</details>

## 4. Investigate a service that is up but getting worse

ID: `scenario-silent-quality-regression` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

The assistant returns HTTP 200 as usual, yet users report worse answers after yesterday's release. Several things changed: the prompt, an ingestion job, and the model alias. How do you investigate and recover?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Which task slices worsened, and what examples demonstrate the change?
- Which prompt, model, source, index, and tool versions were actually used in those runs?

### Reference approach

**Establish the impact**

Collect redacted failed cases and compare task outcomes, escalation, latency, and cost with the previous period. Distinguish user-mix changes from a regression on comparable inputs. Preserve the relevant versions and traces.

**Isolate likely changes**

Replay a representative case set while changing one suspected component at a time where reproducible. Compare extracted documents and retrieved evidence before blaming generation. Use fixed model versions when available and record the limits of replaying a moving alias.

**Recover with evidence**

Use the known-good configuration if it remains safe and compatible with current data. Validate the recovery on affected tasks and monitor the rollout. Add the failures to a maintained regression set and prevent multiple untracked changes from hiding the next cause.

### Tradeoff

Rollback can restore service quickly but may also restore an obsolete policy or incompatible index. Check the whole version combination rather than reversing only the application commit.

### Common mistakes

- Treating HTTP availability as a quality metric.
- Claiming a root cause from timing alone when several components changed.

### Follow-up questions

- What if the old provider model is no longer available?
- How would you change the next release process?

### Self-review checklist

- [ ] Separates observed impact from causal hypotheses.
- [ ] Tracks the full configuration and data version.
- [ ] Verifies recovery and adds targeted regression coverage.

### Technical references

- [Google SRE: Canarying releases](https://sre.google/workbook/canarying-releases/)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

</details>
