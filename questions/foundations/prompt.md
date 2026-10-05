# Prompt & context

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. What should a useful task instruction include?

ID: `foundation-instructions-1` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Specify the task, relevant context, output requirements, and what to do when information is missing. Include an example when it resolves an ambiguity that words alone leave open.

**Common mistake:** Extra instruction length is not itself evidence of better results.

**Continue learning:** [Separate the task from source text](https://savemytoken.com/learn/prompt-instructions)

**Technical references**

- [Anthropic: prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 2. Why separate instructions and reference material?

ID: `foundation-instructions-2` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

The reader or model can more easily distinguish the requested operation from text to analyze. Named fields or consistent delimiters make that intent explicit.

**Common mistake:** A delimiter does not make malicious source content trustworthy.

**Continue learning:** [Separate the task from source text](https://savemytoken.com/learn/prompt-instructions)

**Technical references**

- [Anthropic: prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 3. Is prompt injection solved by a stronger system prompt?

ID: `foundation-instructions-3` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

No. Use limited tool permissions, validation, separation of trust levels, and checks appropriate to each action, then test failures. Prompt wording is one layer.

**Common mistake:** Treating model compliance as the only security boundary leaves actions exposed.

**Continue learning:** [Separate the task from source text](https://savemytoken.com/learn/prompt-instructions)

**Technical references**

- [Anthropic: prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 4. When should you use few-shot examples?

ID: `foundation-instructions-4` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Use them to demonstrate a tricky format or decision boundary. Include relevant edge cases and compare results with a simpler baseline.

**Common mistake:** Examples with irrelevant details can teach accidental patterns.

**Continue learning:** [Separate the task from source text](https://savemytoken.com/learn/prompt-instructions)

**Technical references**

- [Anthropic: prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 5. How do you evaluate a prompt revision?

ID: `foundation-instructions-5` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Hold the model settings and evaluation cases fixed. Compare correctness, formatting, refusal or abstention behavior, and cost with a predefined acceptance rule.

**Common mistake:** Selecting only successful outputs can hide regressions.

**Continue learning:** [Separate the task from source text](https://savemytoken.com/learn/prompt-instructions)

**Technical references**

- [Anthropic: prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 6. What belongs in a context budget?

ID: `foundation-budget-1` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Include fixed instructions, tool definitions, messages, retrieved evidence, and space for output. Verify model-specific handling of other inputs and reasoning with the provider.

**Common mistake:** Counting only the most recent user message understates the request.

**Continue learning:** [Make a context budget before sending](https://savemytoken.com/learn/prompt-context-budget)

**Technical references**

- [Anthropic: context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 7. When is summarization useful?

ID: `foundation-budget-2` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

When older material contains useful decisions but too much detail to resend. Preserve constraints, unresolved issues, and retrievable source references, then check the summary for omissions.

**Common mistake:** Summarization has a cost and can remove information needed later.

**Continue learning:** [Make a context budget before sending](https://savemytoken.com/learn/prompt-context-budget)

**Technical references**

- [Anthropic: context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 8. What should remain exact during compression?

ID: `foundation-budget-3` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Keep identifiers, user constraints, critical numbers, code that must run, and evidence whose wording matters. Compress surrounding explanation instead.

**Common mistake:** An approximate paraphrase can change a permission or a requirement.

**Continue learning:** [Make a context budget before sending](https://savemytoken.com/learn/prompt-context-budget)

**Technical references**

- [Anthropic: context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 9. How is prompt caching different from history trimming?

ID: `foundation-budget-4` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Caching may reuse processing of eligible repeated input; trimming changes which input is sent. Their billing and quality effects differ and must be measured separately.

**Common mistake:** A cached request can still include a large context and paid output.

**Continue learning:** [Make a context budget before sending](https://savemytoken.com/learn/prompt-context-budget)

**Technical references**

- [Anthropic: context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 10. What if the necessary evidence does not fit?

ID: `foundation-budget-5` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Narrow the task, retrieve a better subset, process it in stages, or choose a suitable model after checking its limits. Make missing evidence explicit.

**Common mistake:** Silently dropping the exception to a rule may produce a confident wrong answer.

**Continue learning:** [Make a context budget before sending](https://savemytoken.com/learn/prompt-context-budget)

**Technical references**

- [Anthropic: context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 11. Is valid JSON sufficient for an application?

ID: `foundation-structured-1` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

No. Check the expected shape, required fields, types, values, and business rules after parsing. Apply separate authorization to any requested action.

**Common mistake:** A JSON object may be syntactically valid and completely unsuitable for the task.

**Continue learning:** [Validate JSON before using it](https://savemytoken.com/learn/prompt-structured-output)

**Technical references**

- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>

## 12. What should happen to unexpected fields?

ID: `foundation-structured-2` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Choose an explicit policy. This lab rejects them so a hidden execute field cannot silently become part of downstream behavior.

**Common mistake:** Ignoring unknown fields in one layer while acting on them in another creates inconsistent rules.

**Continue learning:** [Validate JSON before using it](https://savemytoken.com/learn/prompt-structured-output)

**Technical references**

- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>

## 13. How should missing information be represented?

ID: `foundation-structured-3` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Define an explicit unknown state, such as a status plus nullable value, and validate the relationship between fields. Do not replace unknown numbers with zero.

**Common mistake:** An empty string can hide the difference between missing and deliberately blank data.

**Continue learning:** [Validate JSON before using it](https://savemytoken.com/learn/prompt-structured-output)

**Technical references**

- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>

## 14. Does structured output guarantee factual accuracy?

ID: `foundation-structured-4` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

No. It constrains representation. Compare the content with evidence, application invariants, or task-specific tests before treating it as correct.

**Common mistake:** A schema-valid 90-day return window can still contradict a 30-day policy.

**Continue learning:** [Validate JSON before using it](https://savemytoken.com/learn/prompt-structured-output)

**Technical references**

- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>

## 15. How should an application handle validation failure?

ID: `foundation-structured-5` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Return a clear failure or try a bounded repair with the validation feedback. Preserve the failed payload for appropriate diagnostics and stop when the retry budget ends.

**Common mistake:** Unlimited repair attempts can multiply cost without improving correctness.

**Continue learning:** [Validate JSON before using it](https://savemytoken.com/learn/prompt-structured-output)

**Technical references**

- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>
