# RAG & retrieval

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. Find the right document and still get the wrong answer

ID: `scenario-rag-right-source-wrong-answer` · Intermediate · Suggested practice: 8 minutes · Editorial review: 2026-10-05

A policy assistant cites the correct handbook but tells a customer that opened products can be returned. The handbook contains an exception excluding them. How would you isolate the failure?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Was the exception in the exact context sent to the model, or only somewhere in the source document?
- Which source version, query, retrieval settings, and prompt produced the answer?

### Reference approach

**Inspect the actual evidence path**

Reproduce the case with a redacted trace. Follow the exception through extraction, chunking, candidate retrieval, reranking, and final context assembly. A correct document ID does not establish that the decisive sentence reached generation.

**Test the failing stage**

If the exception is absent, inspect chunk boundaries and candidate coverage. If present, test whether the answer preserves both the rule and exception with reduced distracting context. Change one factor at a time and retain the original failure as a regression case.

**Judge claims, not citation presence**

Check whether each material claim follows from the accessible passage. Include negative examples with valid citations but false statements. Review abstention when the policy cannot support an answer.

### Tradeoff

More retrieved text can recover an exception but can also add conflicting policy versions. Measure evidence completeness and answer correctness together.

### Common mistakes

- Assuming a citation proves the answer is supported.
- Changing the model before locating the missing evidence.

### Follow-up questions

- How would your diagnosis change if the document is a scanned table?
- What regression test would catch this before a release?

### Self-review checklist

- [ ] Separates document retrieval from final context.
- [ ] Tests an explicit failure hypothesis.
- [ ] Checks the rule and its exception at claim level.

### Technical references

- [LangChain: Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

</details>

## 2. Keep table headings and exceptions together

ID: `scenario-chunk-policy-tables` · Intermediate · Suggested practice: 8 minutes · Editorial review: 2026-10-05

A maintenance handbook mixes paragraphs, equipment tables, and footnotes. Fixed-size chunks separate a replacement interval from its equipment heading. How would you choose and test a better chunking strategy?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Which queries require multiple cells, a heading, or a footnote to be interpreted correctly?
- What structure survives the document extraction stage?

### Reference approach

**Define an evidence unit**

Identify complete units for the target queries: a procedure with prerequisites, or a table row with headers and applicable footnotes. Preserve source locations and document versions so a reviewer can inspect the original context.

**Compare concrete candidates**

Try structure-aware boundaries and bounded parent-context expansion against the current splitter. Avoid treating one token length or overlap percentage as universally correct. Keep extraction, embeddings, and evaluation queries fixed during the first comparison.

**Evaluate downstream use**

Label whether each retrieved result carries enough information to answer. Then inspect generated answers, context size, and latency. Include long tables and exception-heavy procedures in a held-out set before selecting the new default.

### Tradeoff

Larger evidence units retain meaning but may bring irrelevant rows. Smaller searchable units plus controlled surrounding context are another option to test.

### Common mistakes

- Tuning chunk length while the parser has already lost table headers.
- Reporting retrieval similarity as answer correctness.

### Follow-up questions

- How would you handle a table spanning three pages?
- When would overlapping chunks make the result worse?

### Self-review checklist

- [ ] Defines what a complete piece of evidence contains.
- [ ] Keeps source structure and locations.
- [ ] Compares answer quality and context cost on the same queries.

### Technical references

- [LangChain: Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

</details>

## 3. Retrieve exact product codes and everyday language

ID: `scenario-hybrid-search-product-codes` · Intermediate · Suggested practice: 10 minutes · Editorial review: 2026-10-05

A repair assistant handles both “E-417 on ZX-8” and “the pump rattles after startup.” Vector-only retrieval handles some paraphrases but misses exact code matches. How would you improve and evaluate retrieval?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Do extraction and indexing preserve punctuation, model numbers, and code-to-product relationships?
- How often do users provide a code, a description, or both?

### Reference approach

**Build query slices**

Create labeled examples for exact identifiers, paraphrases, and mixed queries. Inspect failures caused by broken text extraction or normalization before adding another retrieval layer.

**Combine eligible candidates**

Compare lexical and dense retrieval, then combine their ranked lists with an explicit method such as reciprocal rank fusion. Apply the same access scope to both paths. Deduplicate by stable passage IDs before assembling evidence.

**Test optional reranking**

Evaluate a reranker over a bounded candidate set only if the combined ranking leaves useful evidence buried. Track per-slice coverage, downstream answers, and latency; keep a simple baseline to show which stage earns its cost.

### Tradeoff

Hybrid retrieval introduces another index and tuning surface. It is useful only if the measured coverage gains justify its operating and query costs.

### Common mistakes

- Adding raw lexical and vector scores without considering their scales.
- Expecting a reranker to recover documents absent from all candidates.

### Follow-up questions

- What happens if the two result lists use different chunk IDs?
- Would you use identical settings for all query slices?

### Self-review checklist

- [ ] Tests exact-match and semantic needs separately.
- [ ] Explains fusion versus reranking.
- [ ] Preserves permissions and measures incremental benefit.

### Technical references

- [Elasticsearch: Reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)
- [Qdrant: Filtering](https://qdrant.tech/documentation/search/filtering/)

</details>

## 4. Stop answering from a withdrawn policy

ID: `scenario-rag-policy-update-and-deletion` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

HR replaces a leave policy and withdraws the old document. The assistant still returns the old allowance, sometimes with a working citation. Design an update and deletion process that you can verify.

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Is the stale result coming from the source, the index, a response cache, or conversation history?
- Which timestamp means the policy became effective, and who decides source precedence?

### Reference approach

**Trace identity and versions**

Give documents and chunks stable identities, track revisions, and record effective dates separately from ingestion times. Inspect the answer's source version and all caches involved in producing it.

**Make withdrawal observable**

Immediately exclude withdrawn records from eligible retrieval. Propagate deletion or replacement to indexes and dependent caches, and reconcile failed updates. A user continuing an old conversation should be rechecked against the current authorized source state.

**Verify with a known question**

Run a regression question that distinguishes the two policies. Check retrieved IDs, citations, cache behavior, and the final answer. Monitor update lag and expose uncertainty if a required source is temporarily unavailable.

### Tradeoff

Immediate exclusion can reduce answer coverage while replacement indexing completes. Returning an explicit gap is preferable to silently treating withdrawn policy as current.

### Common mistakes

- Updating the source file without invalidating derived answers.
- Assuming the latest upload is always the authoritative policy.

### Follow-up questions

- How would you recover from a partially failed re-index?
- What if two active policies apply to different employee groups?

### Self-review checklist

- [ ] Tracks revisions across every derived store.
- [ ] Distinguishes deletion from eventual background cleanup.
- [ ] Verifies the update with an end-to-end case.

### Technical references

- [LangChain: Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval)
- [Qdrant: Filtering](https://qdrant.tech/documentation/search/filtering/)

</details>
