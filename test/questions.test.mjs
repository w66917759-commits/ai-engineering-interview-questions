import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const bank = JSON.parse(await readFile(new URL('data/questions.json', root), 'utf8'));

test('snapshot contains 60 foundations and 24 scenarios with unique IDs', () => {
  assert.equal(bank.schemaVersion, 1);
  assert.equal(bank.foundations.length, 60);
  assert.equal(bank.scenarios.length, 24);
  assert.equal(new Set([...bank.foundations, ...bank.scenarios].map(q => q.id)).size, 84);
});
test('question topics, review dates, and references are valid', () => {
  for (const track of ['foundations', 'scenarios']) for (const question of bank[track]) {
    assert.ok(Object.hasOwn(bank.topics[track], question.topic), question.id);
    assert.match(question.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(question.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(question.sources.length > 0, question.id);
    for (const source of question.sources) {
      assert.ok(source.title.trim());
      const url = new URL(source.href);
      assert.equal(url.protocol, 'https:');
      assert.equal(url.username, ''); assert.equal(url.password, '');
    }
  }
});
test('all foundation answers and pitfalls are present in the Markdown', async () => {
  for (const q of bank.foundations) {
    const markdown = await readFile(new URL(`questions/foundations/${q.topic}.md`, root), 'utf8');
    for (const value of [q.id, q.prompt, q.answer, q.pitfall]) {
      assert.ok(value.trim().length > 0 && markdown.includes(value), q.id);
    }
    assert.equal(new URL(q.lesson.href).origin, 'https://savemytoken.com');
  }
});
test('all scenarios retain the full reference approach and self-review checklist', async () => {
  for (const q of bank.scenarios) {
    const markdown = await readFile(new URL(`questions/scenarios/${q.topic}.md`, root), 'utf8');
    assert.ok(q.clarify.length >= 2 && q.approach.length >= 3 && q.rubric.length >= 3, q.id);
    for (const value of [q.id, q.title, q.scenario, ...q.clarify, ...q.approach.flatMap(step => [step.title, step.body]), q.tradeoff, ...q.pitfalls, ...q.followups, ...q.rubric]) {
      assert.ok(value.trim().length > 0 && markdown.includes(value), q.id);
    }
  }
});
test('every topic has a readable Markdown file', async () => {
  for (const track of ['foundations', 'scenarios']) for (const topic of Object.keys(bank.topics[track])) {
    await access(new URL(`questions/${track}/${topic}.md`, root));
  }
});
