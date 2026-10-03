# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flaky.spec.ts >> flaky random (fails unless the random pick is 1)
- Location: tests/flaky.spec.ts:31:1

# Error details

```
Error: random pick was 3, expected 1

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 3
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import { existsSync, readdirSync } from 'fs';
  3  | import * as path from 'path';
  4  | import { resolveConfig } from '../src/lib/reporter';
  5  | 
  6  | // Cross-run flaky generator for the history tab.
  7  | //
  8  | // Flakiness is computed on final per-run outcomes: a test is flaky if it
  9  | // ended failed/timedOut in some run and passed in another. This test flips
  10 | // its outcome on every run: the number of previously completed runs is the
  11 | // count of JSONL files in <outputDir>/runs/ (each finished run's onEnd
  12 | // writes exactly one). Even count -> pass, odd count -> fail.
  13 | //
  14 | // The body is a pure read — no state is mutated during the test, so both
  15 | // browser projects and both retry attempts observe the same outcome within
  16 | // a run; only the next run sees the flipped result.
  17 | test('flaky across runs (alternates pass/fail per run)', () => {
  18 |   const runsDir = path.resolve(process.cwd(), resolveConfig().outputDir, 'runs');
  19 |   const completed = existsSync(runsDir)
  20 |     ? readdirSync(runsDir).filter((f) => f.endsWith('.jsonl')).length
  21 |     : 0;
  22 | 
  23 |   const shouldFail = completed % 2 === 1;
  24 |   expect(shouldFail, `run #${completed + 1}: expected to ${shouldFail ? 'fail' : 'pass'}`).toBe(
  25 |     false
  26 |   );
  27 | });
  28 | // Random flakiness: passes 1/3 of the time, independent per run.
  29 | // Unlike the deterministic alternation above, this gives the history a
  30 | // mixed pass/fail pattern that does not reset on a fixed cadence.
  31 | test('flaky random (fails unless the random pick is 1)', () => {
  32 |   const pick = [1, 2, 3][Math.floor(Math.random() * 3)];
> 33 |   expect(pick, `random pick was ${pick}, expected 1`).toBe(1);
     |                                                       ^ Error: random pick was 3, expected 1
  34 | });
  35 | 
```