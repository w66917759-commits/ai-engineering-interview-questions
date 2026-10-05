# Data format

[Back to the question bank](../README.md)

`questions.json` is UTF-8 JSON with schema version 1.

| Field | Meaning |
| --- | --- |
| schemaVersion | Format version, currently 1 |
| homepage | SaveMyToken's public homepage |
| language | Content language, currently en |
| exportedOn | Date this snapshot was created; not a new technical review |
| license | SPDX identifier for the original content: CC-BY-4.0 |
| topics | Topic ID-to-label maps, separate for foundations and scenarios |
| foundations | 60 questions with id, topic, level, prompt, answer, pitfall, lesson, sources, and checkedAt |
| scenarios | 24 questions with id, slug, topic, level, minutes, title, scenario, clarify, approach, tradeoff, pitfalls, followups, rubric, sources, and checkedAt |

IDs are strings intended to remain stable when wording is corrected. Topic IDs are scoped to their track. Source entries have `title` and `href`; all URLs are absolute HTTPS URLs. Foundation `lesson` entries have `slug`, `title`, and `href`. Scenario `approach` entries have `title` and `body`.

Suggested practice minutes are editorial guidance, not measured interview duration. Review checklists are learning aids and do not define a hiring score.

When updating a question, keep its Markdown and JSON representations in sync. Record material changes and the actual review date. Preserve source references and attribution.
