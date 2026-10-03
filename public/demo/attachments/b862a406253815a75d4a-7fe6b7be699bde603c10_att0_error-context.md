# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flaky.spec.ts >> flaky across runs (alternates pass/fail per run)
- Location: tests/flaky.spec.ts:19:1

# Error details

```
Error: run #104: expected to fail

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import { existsSync, readdirSync } from 'fs';
  3  | import * as path from 'path';
  4  | import { resolveConfig } from '../src/lib/reporter';
  5  | 
  6  | /**
  7  |  * Cross-run flaky generator for the history tab.
  8  |  *
  9  |  * Flakiness is computed on final per-run outcomes: a test is flaky if it
  10 |  * ended failed/timedOut in some run and passed in another. This test flips
  11 |  * its outcome on every run: the number of previously completed runs is the
  12 |  * count of JSONL files in <outputDir>/runs/ (each finished run's onEnd
  13 |  * writes exactly one). Even count -> pass, odd count -> fail.
  14 |  *
  15 |  * The body is a pure read — no state is mutated during the test, so both
  16 |  * browser projects and both retry attempts observe the same outcome within
  17 |  * a run; only the next run sees the flipped result.
  18 |  */
  19 | test('flaky across runs (alternates pass/fail per run)', () => {
  20 |   const runsDir = path.resolve(process.cwd(), resolveConfig().outputDir, 'runs');
  21 |   const completed = existsSync(runsDir)
  22 |     ? readdirSync(runsDir).filter((f) => f.endsWith('.jsonl')).length
  23 |     : 0;
  24 | 
  25 |   const shouldFail = completed % 2 === 1;
> 26 |   expect(shouldFail, `run #${completed + 1}: expected to ${shouldFail ? 'fail' : 'pass'}`).toBe(
     |                                                                                            ^ Error: run #104: expected to fail
  27 |     false
  28 |   );
  29 | });
  30 | 
  31 | /**
  32 |  * Random flakiness: passes 1/3 of the time, independent per run.
  33 |  * Unlike the deterministic alternation above, this gives the history a
  34 |  * mixed pass/fail pattern that does not reset on a fixed cadence.
  35 |  */
  36 | test('flaky random (fails unless the random pick is 1)', () => {
  37 |   const valuesToPickFrom = [1, 2, 3];
  38 |   const pickIndex = Math.floor(Math.random() * 3);
  39 |   const pick = valuesToPickFrom.at(pickIndex);
  40 | 
  41 |   expect(pick, `random pick was ${pick}, expected 1`).toBe(1);
  42 | });
  43 | 
```