# Vector search

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. How is cosine similarity calculated?

ID: `foundation-cosine-1` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Take the dot product of two nonzero vectors and divide by the product of their lengths. Validate matching dimensions and finite coordinates first.

**Common mistake:** The formula is undefined when either vector has zero length.

**Continue learning:** [Calculate cosine similarity by hand](https://savemytoken.com/learn/vector-similarity)

**Technical references**

- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>

## 2. When do dot product and cosine give the same ordering?

ID: `foundation-cosine-2` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

For vectors normalized to unit length, their dot products equal their cosine similarities. Otherwise vector magnitude can change dot-product ranking.

**Common mistake:** Do not normalize blindly if the embedding model expects a different scoring method.

**Continue learning:** [Calculate cosine similarity by hand](https://savemytoken.com/learn/vector-similarity)

**Technical references**

- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>

## 3. Is a similarity score a probability of correctness?

ID: `foundation-cosine-3` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

No. It is a score under a particular representation and metric. Calibrate retrieval decisions with labeled tasks and verify answer claims separately.

**Common mistake:** A high semantic match can retrieve an outdated or factually wrong passage.

**Continue learning:** [Calculate cosine similarity by hand](https://savemytoken.com/learn/vector-similarity)

**Technical references**

- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>

## 4. Can embeddings from different models be mixed?

ID: `foundation-cosine-4` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Usually they must be regenerated or kept in separate compatible indexes. Equal vector lengths alone do not align the underlying spaces.

**Common mistake:** Changing only the query model can silently damage retrieval.

**Continue learning:** [Calculate cosine similarity by hand](https://savemytoken.com/learn/vector-similarity)

**Technical references**

- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>

## 5. How should you choose an embedding model?

ID: `foundation-cosine-5` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Evaluate representative language, document types, queries, and relevance labels. Compare retrieval quality with latency, storage, and total processing cost.

**Common mistake:** A larger dimension alone does not prove better results for your workload.

**Continue learning:** [Calculate cosine similarity by hand](https://savemytoken.com/learn/vector-similarity)

**Technical references**

- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>

## 6. Why keep metadata alongside vectors?

ID: `foundation-filtering-1` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Metadata identifies the source, version, tenant or access scope, and other eligibility conditions. The vector alone cannot reliably encode those rules.

**Common mistake:** Semantic similarity is not a permission check.

**Continue learning:** [Filter the corpus before choosing Top K](https://savemytoken.com/learn/vector-filtering)

**Technical references**

- [Qdrant: filtering](https://qdrant.tech/documentation/search/filtering/)
- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>

## 7. Why can filtering after Top K miss valid evidence?

ID: `foundation-filtering-2` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

The global shortlist may contain only ineligible records. Filtering that truncated list cannot recover eligible records excluded before filtering.

**Common mistake:** An empty shortlist does not prove the eligible corpus contains no answer.

**Continue learning:** [Filter the corpus before choosing Top K](https://savemytoken.com/learn/vector-filtering)

**Technical references**

- [Qdrant: filtering](https://qdrant.tech/documentation/search/filtering/)
- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>

## 8. How does exact search differ from approximate search?

ID: `foundation-filtering-3` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Exact search considers the full eligible set under the defined metric. Approximate search trades some retrieval accuracy for efficiency through an index or candidate-selection method.

**Common mistake:** This three-record sorting example is not evidence of approximate-index performance.

**Continue learning:** [Filter the corpus before choosing Top K](https://savemytoken.com/learn/vector-filtering)

**Technical references**

- [Qdrant: filtering](https://qdrant.tech/documentation/search/filtering/)
- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>

## 9. How should updated documents be handled?

ID: `foundation-filtering-4` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Associate chunks with a document version, publish a consistent updated set, and remove or exclude superseded chunks. Test retrieval immediately after the change.

**Common mistake:** Adding new vectors while keeping old conflicting passages active can mix policy versions.

**Continue learning:** [Filter the corpus before choosing Top K](https://savemytoken.com/learn/vector-filtering)

**Technical references**

- [Qdrant: filtering](https://qdrant.tech/documentation/search/filtering/)
- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>

## 10. What should you measure when selecting an index?

ID: `foundation-filtering-5` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Measure recall against an exact baseline together with latency, memory, build time, updates, and filtering behavior on representative data.

**Common mistake:** A latency number without corpus size and recall conditions is hard to interpret.

**Continue learning:** [Filter the corpus before choosing Top K](https://savemytoken.com/learn/vector-filtering)

**Technical references**

- [Qdrant: filtering](https://qdrant.tech/documentation/search/filtering/)
- [Sentence Transformers: semantic textual similarity](https://sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html)

</details>
