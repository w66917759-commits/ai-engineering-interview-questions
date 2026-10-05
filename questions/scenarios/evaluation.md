# Evaluation & quality

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. Decide whether a good demo is ready for users

ID: `scenario-evaluation-set-before-launch` · Intermediate · Suggested practice: 10 minutes · Editorial review: 2026-10-05

A knowledge assistant answers the ten demo questions well. The customer wants to invite the whole company tomorrow. What evaluation would you run and how would you make the release decision?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Which user groups and task types will the release serve, including unsupported requests?
- What failures are unacceptable and who owns the acceptance decision?

### Reference approach

**Build a representative test set**

Collect authorized examples from intended workflows. Include common requests, rare exceptions, unanswerable questions, conflicting sources, and access boundaries. Keep development cases separate from the held-out release check.

**Use explicit grading rules**

Define required evidence, acceptable answers, critical failures, and appropriate abstention with domain reviewers. Combine deterministic checks, human review, and calibrated automated graders where useful. Record model, prompt, data, and tool versions.

**Make a bounded release decision**

Report results by task slice alongside sample sizes, latency, and cost. For sparse evidence, propose a restricted rollout with monitoring and a fallback. Agree on stop conditions before expanding access.

### Tradeoff

More testing delays availability but can expose hidden workload gaps. A smaller supported release is an option when the evidence is insufficient for the full audience.

### Common mistakes

- Reusing the rehearsed demo set as the only acceptance test.
- Averaging a critical permission failure into a high overall score.

### Follow-up questions

- How do you add production failures without overfitting the test set?
- What changes if the system can perform actions?

### Self-review checklist

- [ ] Defines representative cases and explicit acceptance criteria.
- [ ] Reports uncertainty and slice-level failures.
- [ ] Links the evidence to a practical release boundary.

### Technical references

- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Google SRE: Canarying releases](https://sre.google/workbook/canarying-releases/)

</details>

## 2. An LLM judge rewards longer answers. Can you trust it?

ID: `scenario-calibrate-llm-judge` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

Your automatic evaluator prefers a verbose answer that adds an unsupported claim over a concise correct answer. Its scores disagree with support reviewers. How would you repair the evaluation?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- What dimensions is the judge supposed to measure, and does it have the actual source evidence?
- How were its scores compared with human labels across different error types?

### Reference approach

**Separate the criteria**

Create a rubric for support, completeness, relevance, and style instead of one vague quality score. Add concrete positive and negative examples, including fluent answers with false claims. Decide how critical errors affect acceptance.

**Measure judge behavior**

Use an independently reviewed set. For pairwise grading, swap answer order and check consistency. Examine false acceptances, false rejections, and disagreements by category. Mask irrelevant model identity and test whether length alone changes a decision.

**Version and audit the grader**

Record the judge model, prompt, rubric, and evidence version. Recalibrate after changes and route important disagreements to people. Treat a model-generated score as a measurement needing validation rather than ground truth.

### Tradeoff

Human review is costly and can disagree too. Spend it on rubric design, representative calibration, and consequential disagreements rather than every easy case.

### Common mistakes

- Choosing the judge because it agrees with the preferred model.
- Using the same examples to tune and claim final evaluator accuracy.

### Follow-up questions

- What would you do if human reviewers disagree?
- Which checks could be deterministic instead?

### Self-review checklist

- [ ] Identifies specific evaluator biases.
- [ ] Calibrates against independent review.
- [ ] Keeps grader changes observable and consequential failures visible.

### Technical references

- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

</details>

## 3. An agent reports success, but the task is incomplete

ID: `scenario-agent-outcome-versus-trajectory` · Advanced · Suggested practice: 10 minutes · Editorial review: 2026-10-05

A scheduling agent says it booked a meeting, but the test calendar contains no event. Another run creates the event twice. How should an evaluation score the outcome and the steps taken?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- What exact calendar state and participant constraints define success?
- Can the test environment be reset and external effects inspected independently?

### Reference approach

**Verify observable state**

Grade whether one intended event exists with the correct participants, time, and authorization. Check for duplicate or unwanted events. A final natural-language success message is evidence of a claim, not proof that the calendar changed.

**Inspect the execution trace**

Examine selected tools, arguments, results, retries, and approval handling to explain failures. Allow different valid paths unless the task requires a specific sequence. Measure wasted steps without penalizing reasonable recovery automatically.

**Run isolated trials**

Reset fixtures between trials, capture dependencies and versions, and repeat tasks to observe variability. Report task success and harmful side effects separately. Add the missing-event and duplicate-event cases to the regression suite.

### Tradeoff

A strict expected trace is easy to compare but can reject a legitimate alternative plan. Outcome checks need to capture side effects, while trace checks should explain or enforce meaningful constraints.

### Common mistakes

- Letting the agent grade its own completion statement.
- Reusing a dirty calendar fixture across trials.

### Follow-up questions

- How would you test a timeout after the event was created?
- What if the task has several acceptable meeting times?

### Self-review checklist

- [ ] Checks state independently of the final response.
- [ ] Detects harmful extra actions.
- [ ] Uses repeatable, isolated trials and flexible valid-path criteria.

### Technical references

- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [AWS Builders’ Library: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)

</details>

## 4. Valid JSON, wrong business result

ID: `scenario-valid-json-wrong-business-result` · Intermediate · Suggested practice: 8 minutes · Editorial review: 2026-10-05

An extraction service always returns parseable JSON, yet it omits required fields and occasionally proposes a negative quantity. The team says JSON mode guarantees correctness. How would you redesign validation?

<details>
<summary>Reference approach, tradeoffs, and follow-up questions</summary>

### Clarify first

- Does the selected API mode guarantee JSON syntax or adherence to a supported schema?
- Which constraints are structural, and which require business data or permissions?

### Reference approach

**State the guarantees accurately**

Distinguish JSON syntax from schema adherence. Where supported, use a strict structured-output schema for required fields, types, and permitted values. Verify the provider's supported subset rather than assuming every JSON Schema keyword is enforced.

**Validate at the application boundary**

Parse and validate responses before downstream use. Check quantity ranges, record existence, units, and relevant business rules with authoritative data. A schema-valid customer ID still does not establish authorization to act on that customer.

**Handle non-success explicitly**

Recognize refusals, incomplete responses, and transport errors. Use bounded correction or review for recoverable issues, and reject unsafe output before side effects. Test malformed, incomplete, schema-valid-but-wrong, and adversarial cases.

### Tradeoff

Stricter constraints reduce structural variation but cannot determine factual truth. Complex business checks often belong outside generation where they can be tested deterministically.

### Common mistakes

- Treating JSON mode as a full schema guarantee.
- Automatically executing a valid tool object without business validation.

### Follow-up questions

- What do you do with a refusal that does not match the business schema?
- How does streaming change validation before display or execution?

### Self-review checklist

- [ ] Separates syntax, schema, semantics, and authorization.
- [ ] Checks actual provider behavior and failure states.
- [ ] Validates before downstream effects.

### Technical references

- [OpenAI: Structured model outputs](https://developers.openai.com/api/docs/guides/structured-outputs)

</details>
