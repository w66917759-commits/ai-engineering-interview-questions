# AI Engineering Interview Questions

84 original practice questions with reference answers for AI application engineers and forward-deployed engineers (FDEs).

Created by **[SaveMyToken](https://savemytoken.com)** — practical guides for AI models, agents, RAG, and token costs.

Related project: **[SI-API](https://siapi.ai)**.

[Browse the questions](#question-bank) · [Structured JSON](data/questions.json) · [Contribute](CONTRIBUTING.md) · [Content license](LICENSE.md)

## What's included

- **60 foundation questions** covering RAG, prompt and context design, agent engineering, and vector search.
- **24 engineering scenarios** with clarification questions, reference approaches, tradeoffs, common mistakes, follow-ups, and self-review checklists.
- Markdown that can be read directly on GitHub or offline, plus JSON for your own study tools. No installation, account, API key, or paid service is required.

## How to practice

1. Choose a topic below.
2. Explain your answer before expanding the reference answer. For scenarios, state your assumptions and propose a way to verify the result.
3. Compare your reasoning with the explanation, mistakes, and checklist. Several approaches may be valid under different constraints.
4. Follow a technical reference or the linked tutorial when you need more detail, then retry the question in your own words.

For deeper tutorials, visit [SaveMyToken](https://savemytoken.com).

## Question bank

### Foundations — 60 questions

| Topic | Questions |
| --- | ---: |
| [RAG & retrieval](questions/foundations/rag.md) | 20 |
| [Prompt & context](questions/foundations/prompt.md) | 15 |
| [Agent engineering](questions/foundations/agent.md) | 15 |
| [Vector search](questions/foundations/vector.md) | 10 |

### Engineering scenarios — 24 questions

| Topic | Questions |
| --- | ---: |
| [Customer & delivery](questions/scenarios/customer.md) | 4 |
| [RAG & retrieval](questions/scenarios/rag.md) | 4 |
| [Agents & tools](questions/scenarios/agent.md) | 4 |
| [Context & cost](questions/scenarios/context.md) | 4 |
| [Evaluation & quality](questions/scenarios/evaluation.md) | 4 |
| [Production & reliability](questions/scenarios/production.md) | 4 |

## Reuse the data

Download [data/questions.json](data/questions.json). The top-level `foundations` and `scenarios` arrays retain stable IDs, topic IDs, reference answers, technical reference URLs, and editorial review dates. The `topics` object supplies display labels. See the [data format](data/README.md).

The Markdown and JSON are equivalent snapshots of the same question set. They do not require the SaveMyToken application or its internal services.

## Check the question bank

Reading the questions needs no setup. Maintainers can run `npm test` with Node.js 22 or newer to check IDs, topic coverage, references, and agreement between Markdown and JSON. No dependencies or build step are required.

## Editorial scope

These questions were written as learning exercises. They are not reports of actual interviews, employer-endorsed answers, hiring predictions, or performance benchmarks. Numbers inside scenarios describe hypothetical situations.

This snapshot contains only SaveMyToken's original foundation questions and editorial scenarios. Third-party question compilations and translated source question banks are not included. Technical references are links to supporting material; their content is not relicensed by this repository.

Export date: **2026-10-06**. The `checkedAt` fields retain the source content's editorial review dates; exporting does not constitute a new verification of upstream APIs or product behavior. Check the primary documentation for the versions you use.

## Contributions

Corrections, clearer explanations, original questions, and translations are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

## License and attribution

The original questions, answers, and repository documentation are licensed under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/). See [LICENSE.md](LICENSE.md) and [the full license](LICENSE).

Suggested attribution:

> AI Engineering Interview Questions by [SaveMyToken](https://savemytoken.com), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Indicate any changes you make.
