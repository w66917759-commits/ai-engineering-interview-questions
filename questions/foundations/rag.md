# RAG & retrieval

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. How should you choose chunk size?

ID: `foundation-chunking-1` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Start with the smallest passage that keeps a representative answer complete. Test those passages against a question set and the model input limit, then compare retrieval and answer quality.

**Common mistake:** A character limit is not a token limit, and one size does not suit every document.

**Continue learning:** [Keep a rule and its exception together](https://savemytoken.com/learn/rag-chunking)

**Technical references**

- [LangChain: recursive text splitting](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 2. What does chunk overlap solve?

ID: `foundation-chunking-2` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Overlap repeats boundary text so a fact split between adjacent chunks may remain available. Measure whether this improves evidence coverage enough to justify the added storage and context.

**Common mistake:** Overlap does not guarantee that a distant exception travels with its rule.

**Continue learning:** [Keep a rule and its exception together](https://savemytoken.com/learn/rag-chunking)

**Technical references**

- [LangChain: recursive text splitting](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 3. When is parent-child retrieval useful?

ID: `foundation-chunking-3` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Search small child passages for a precise match, then attach a bounded parent section for context. Keep the child location so the reader can verify the specific evidence.

**Common mistake:** Returning an entire manual as the parent can erase the context savings.

**Continue learning:** [Keep a rule and its exception together](https://savemytoken.com/learn/rag-chunking)

**Technical references**

- [LangChain: recursive text splitting](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 4. Which metadata should a chunk keep?

ID: `foundation-chunking-4` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Keep document ID, version, section or page, and the access scope required by the application. These fields support updates, filtering, and traceable citations.

**Common mistake:** A sequential chunk number alone may change after the source is edited.

**Continue learning:** [Keep a rule and its exception together](https://savemytoken.com/learn/rag-chunking)

**Technical references**

- [LangChain: recursive text splitting](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 5. How do you test a splitter?

ID: `foundation-chunking-5` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Use questions requiring a single fact, a rule with an exception, and information across a boundary. Inspect the actual chunks before measuring retrieval and final answers.

**Common mistake:** A readable chunk is not proof that a retriever will select it.

**Continue learning:** [Keep a rule and its exception together](https://savemytoken.com/learn/rag-chunking)

**Technical references**

- [LangChain: recursive text splitting](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 6. Why combine keyword and semantic retrieval?

ID: `foundation-fusion-1` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

They can find complementary evidence: exact identifiers matter for keyword matches, while meaning-based retrieval can help with paraphrases. Evaluate their combination against your own questions.

**Common mistake:** Hybrid retrieval is not automatically better on every query.

**Continue learning:** [Combine two retrieval rankings](https://savemytoken.com/learn/rag-rank-fusion)

**Technical references**

- [Elasticsearch: reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)

</details>

## 7. Why not add their raw scores?

ID: `foundation-fusion-2` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

The scales and distributions may differ, allowing one retriever to dominate. Use a calibrated combination or a rank-based method with explicit assumptions.

**Common mistake:** A score of 0.8 from one system is not necessarily comparable to 0.8 from another.

**Continue learning:** [Combine two retrieval rankings](https://savemytoken.com/learn/rag-rank-fusion)

**Technical references**

- [Elasticsearch: reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)

</details>

## 8. What does the RRF constant do?

ID: `foundation-fusion-3` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

It controls how much the highest positions dominate each contribution. A smaller constant makes early rank differences more influential.

**Common mistake:** It is not the number of retrieved documents or a similarity threshold.

**Continue learning:** [Combine two retrieval rankings](https://savemytoken.com/learn/rag-rank-fusion)

**Technical references**

- [Elasticsearch: reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)

</details>

## 9. How is reranking different from fusion?

ID: `foundation-fusion-4` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Fusion merges candidate orderings. A reranker evaluates candidate relevance to the query with another scoring procedure. You may fuse first and rerank the resulting shortlist.

**Common mistake:** A reranker cannot recover evidence absent from its candidate set.

**Continue learning:** [Combine two retrieval rankings](https://savemytoken.com/learn/rag-rank-fusion)

**Technical references**

- [Elasticsearch: reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)

</details>

## 10. How do you avoid duplicate evidence?

ID: `foundation-fusion-5` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Use stable document or passage IDs, deduplicate within each result list, then merge cross-list contributions. Also inspect near-duplicate passages before constructing the final context.

**Common mistake:** Deduplicating unrelated passages only because their titles match can remove evidence.

**Continue learning:** [Combine two retrieval rankings](https://savemytoken.com/learn/rag-rank-fusion)

**Technical references**

- [Elasticsearch: reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)

</details>

## 11. Does a citation prevent hallucination?

ID: `foundation-evidence-1` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

No. It can point to a real passage that does not support the answer. Verify the source, the claim, and any important conditions separately.

**Common mistake:** Citation presence is only a structural check.

**Continue learning:** [Check the evidence behind an answer](https://savemytoken.com/learn/rag-evidence)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 12. When should a RAG assistant abstain?

ID: `foundation-evidence-2` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

When accessible evidence is missing, contradictory, or insufficient for the requested claim. Explain what is missing and offer a relevant next step when one is available.

**Common mistake:** Low similarity alone is not a universally calibrated abstention rule.

**Continue learning:** [Check the evidence behind an answer](https://savemytoken.com/learn/rag-evidence)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 13. How should citations be linked?

ID: `foundation-evidence-3` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Keep source IDs and locations with the retrieved passages. Resolve approved IDs into actual links or document locations rather than accepting invented URLs from generated text.

**Common mistake:** An old source version may no longer justify the current answer.

**Continue learning:** [Check the evidence behind an answer](https://savemytoken.com/learn/rag-evidence)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 14. What if two sources disagree?

ID: `foundation-evidence-4` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Expose the disagreement, compare scope and effective dates, and apply a documented precedence rule where one exists. Avoid silently combining incompatible statements.

**Common mistake:** A newer upload timestamp is not always a newer policy date.

**Continue learning:** [Check the evidence behind an answer](https://savemytoken.com/learn/rag-evidence)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 15. How can you evaluate groundedness?

ID: `foundation-evidence-5` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Break the answer into checkable claims and compare each with the available evidence. Record unsupported claims and missing exceptions alongside overall correctness.

**Common mistake:** An answer can repeat its sources faithfully while the sources themselves are wrong.

**Continue learning:** [Check the evidence behind an answer](https://savemytoken.com/learn/rag-evidence)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)
- [LangChain: retrieval and RAG](https://docs.langchain.com/oss/python/deepagents/retrieval)

</details>

## 16. Can precision be perfect while retrieval is incomplete?

ID: `foundation-evaluation-1` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Yes. Retrieving only one of two required passages gives precision 1 and recall 0.5. A missing exception may still make the final answer wrong.

**Common mistake:** A high precision number does not establish answer completeness.

**Continue learning:** [Measure what Top K changes](https://savemytoken.com/learn/rag-evaluation)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)

</details>

## 17. Does increasing K always help?

ID: `foundation-evaluation-2` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

It can improve coverage but add irrelevant text and processing cost. Compare evidence coverage, final answers, and latency under the same conditions.

**Common mistake:** More context can include outdated or conflicting passages.

**Continue learning:** [Measure what Top K changes](https://savemytoken.com/learn/rag-evaluation)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)

</details>

## 18. How should you compare two RAG configurations?

ID: `foundation-evaluation-3` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Use the same source snapshot, questions, labels, and evaluation method. Change one setting when diagnosing a cause, and keep a separate held-out set for the final comparison.

**Common mistake:** Repeated tuning on the final test set inflates confidence in the result.

**Continue learning:** [Measure what Top K changes](https://savemytoken.com/learn/rag-evaluation)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)

</details>

## 19. Which costs belong in a RAG evaluation?

ID: `foundation-evaluation-4` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Track ingestion and indexing separately from per-query retrieval, reranking, and generation. Record retries and cache behavior rather than counting only the final model response.

**Common mistake:** A local arithmetic example is not evidence of real API savings.

**Continue learning:** [Measure what Top K changes](https://savemytoken.com/learn/rag-evaluation)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)

</details>

## 20. How do you handle questions with no answer in the corpus?

ID: `foundation-evaluation-5` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Include them deliberately and measure appropriate abstention and false claims. Keep that result separate from recall over queries that have labeled relevant evidence.

**Common mistake:** Dropping uncovered questions hides a common production failure.

**Continue learning:** [Measure what Top K changes](https://savemytoken.com/learn/rag-evaluation)

**Technical references**

- [Hugging Face: evaluating RAG](https://huggingface.co/learn/cookbook/en/rag_evaluation)

</details>
