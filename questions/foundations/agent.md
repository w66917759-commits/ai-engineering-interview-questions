# Agent engineering

[All topics](../../README.md) · [SaveMyToken](https://savemytoken.com)

Try each question before expanding its reference answer. These are editorial practice materials, not employer-reported interviews.

## 1. Who executes a function call proposed by a model?

ID: `foundation-tools-1` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

For a client-side tool, the application receives the proposal, validates and authorizes it, executes the operation, and returns the result to the model or controller.

**Common mistake:** Generated arguments are a proposal, not proof of permission.

**Continue learning:** [Validate a tool call before it runs](https://savemytoken.com/learn/agent-tool-validation)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>

## 2. What belongs in a tool schema?

ID: `foundation-tools-2` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Give the tool a specific purpose, clear argument names, types, required fields, and constraints. Define how failure is returned so the caller can react appropriately.

**Common mistake:** A broad tool named do_anything makes both selection and permission checks harder.

**Continue learning:** [Validate a tool call before it runs](https://savemytoken.com/learn/agent-tool-validation)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>

## 3. Where should argument validation happen?

ID: `foundation-tools-3` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

At the execution boundary before side effects, even if upstream generation used a schema. Validate allowed values and resource scope, not just JSON syntax.

**Common mistake:** A valid ID can still belong to a different user.

**Continue learning:** [Validate a tool call before it runs](https://savemytoken.com/learn/agent-tool-validation)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>

## 4. When can a failed call be retried?

ID: `foundation-tools-4` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Only when the failure is plausibly temporary and the operation is safe to repeat or protected against duplicate effects. Apply attempt and time limits.

**Common mistake:** A timeout does not prove that a remote write never happened.

**Continue learning:** [Validate a tool call before it runs](https://savemytoken.com/learn/agent-tool-validation)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>

## 5. What should a tool result contain?

ID: `foundation-tools-5` · Intermediate · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Return the data required for the next decision, an explicit status, and useful bounded error information. Preserve evidence references when the result supports a factual claim.

**Common mistake:** Dumping entire logs or credentials into the model context is unnecessary.

**Continue learning:** [Validate a tool call before it runs](https://savemytoken.com/learn/agent-tool-validation)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [JSON Schema: object validation](https://json-schema.org/understanding-json-schema/reference/object)

</details>

## 6. What connects actions in an agent loop?

ID: `foundation-loops-1` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

The next decision should use the observed result of the previous action and the remaining task state. The controller should not treat a proposed action as already completed.

**Common mistake:** Planning text alone does not establish execution success.

**Continue learning:** [Stop a failing agent loop](https://savemytoken.com/learn/agent-stop-conditions)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 7. Which stop conditions should be explicit?

ID: `foundation-loops-2` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Task acceptance, permanent failure, attempt exhaustion, elapsed-time limits, spending limits, and cancellation. Choose the appropriate conditions for the operation being performed.

**Common mistake:** One universal iteration count cannot protect against every failure.

**Continue learning:** [Stop a failing agent loop](https://savemytoken.com/learn/agent-stop-conditions)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 8. How do you handle a temporary service failure?

ID: `foundation-loops-3` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Classify it, check whether repetition is safe, and retry within bounded attempts and time. Respect service retry guidance and avoid synchronized retry bursts.

**Common mistake:** A validation error generally needs corrected input rather than the same retry.

**Continue learning:** [Stop a failing agent loop](https://savemytoken.com/learn/agent-stop-conditions)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 9. How should a workflow report partial completion?

ID: `foundation-loops-4` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Record completed actions, evidence, unresolved work, and the reason for stopping. Make any external effects visible so the next attempt can resume safely.

**Common mistake:** Calling the whole task failed can hide actions that already succeeded.

**Continue learning:** [Stop a failing agent loop](https://savemytoken.com/learn/agent-stop-conditions)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 10. How do you reduce repeated unsuccessful tool use?

ID: `foundation-loops-5` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Track attempted actions and their outcomes, detect unproductive repetition, and require new information or escalation before repeating the same failed approach.

**Common mistake:** Changing the wording of the same action is not necessarily progress.

**Continue learning:** [Stop a failing agent loop](https://savemytoken.com/learn/agent-stop-conditions)

**Technical references**

- [Anthropic: tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

</details>

## 11. How does stored memory differ from conversation history?

ID: `foundation-memory-1` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

History records a sequence of messages. Memory selects information intended to remain useful and retrieves it under explicit scope and update rules.

**Common mistake:** Saving every message indefinitely does not make memory reliable.

**Continue learning:** [Recall the right memory for the right user](https://savemytoken.com/learn/agent-memory)

**Technical references**

- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 12. What makes a memory record maintainable?

ID: `foundation-memory-2` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Keep its scope, origin, update or version information, and any expiration or deletion rule. Store enough provenance to resolve conflicts or correct a mistaken value.

**Common mistake:** A bare sentence loses who it applies to and whether it is still current.

**Continue learning:** [Recall the right memory for the right user](https://savemytoken.com/learn/agent-memory)

**Technical references**

- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 13. How should conflicting preferences be resolved?

ID: `foundation-memory-3` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Use a documented precedence rule that respects scope and explicit corrections. If the intended value remains uncertain, ask rather than silently combining incompatible preferences.

**Common mistake:** The most recently retrieved record is not always the authoritative one.

**Continue learning:** [Recall the right memory for the right user](https://savemytoken.com/learn/agent-memory)

**Technical references**

- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 14. Where should user isolation be enforced?

ID: `foundation-memory-4` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

At the storage and retrieval boundary using authenticated identity and resource authorization. Test that unrelated records cannot enter the returned context.

**Common mistake:** Asking the model to ignore another user's data is too late once that data was retrieved.

**Continue learning:** [Recall the right memory for the right user](https://savemytoken.com/learn/agent-memory)

**Technical references**

- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>

## 15. How do you evaluate a memory system?

ID: `foundation-memory-5` · Beginner · Editorial review: 2026-10-05

<details>
<summary>Reference answer and common mistake</summary>

Test retention of relevant facts, successful corrections, expiration, deletion, and cross-user isolation. Also check whether retrieved memories help the current task.

**Common mistake:** A higher recall rate can be harmful if it brings back stale or irrelevant data.

**Continue learning:** [Recall the right memory for the right user](https://savemytoken.com/learn/agent-memory)

**Technical references**

- [LangChain: short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

</details>
