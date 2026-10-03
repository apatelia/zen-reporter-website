# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: retry.spec.ts >> flaky once (fails on first attempt, passes on retry)
- Location: tests/retry.spec.ts:11:1

# Error details

```
Error: first attempt should fail

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 1
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
  3  | import * as path from 'path';
  4  | import { resolveConfig } from '../src/lib/reporter';
  5  | 
  6  | const counterDir = path.resolve(process.cwd(), resolveConfig().outputDir);
  7  | const counterFile = path.join(counterDir, '_retry_counter');
  8  | 
  9  | test.describe.configure({ retries: 1 });
  10 | 
  11 | test('flaky once (fails on first attempt, passes on retry)', () => {
  12 |   const n = existsSync(counterFile) ? Number(readFileSync(counterFile, 'utf8')) : 0;
  13 | 
  14 |   if (n === 0) {
  15 |     if (!existsSync(counterDir)) {
  16 |       mkdirSync(counterDir, { recursive: true });
  17 |     }
  18 |     writeFileSync(counterFile, '1');
> 19 |     expect(1, 'first attempt should fail').toBe(2);
     |                                            ^ Error: first attempt should fail
  20 |   }
  21 | 
  22 |   expect(1).toBe(1);
  23 | 
  24 |   // Remove counter file after the test passes on retry.
  25 |   rmSync(counterFile);
  26 | });
  27 | 
```