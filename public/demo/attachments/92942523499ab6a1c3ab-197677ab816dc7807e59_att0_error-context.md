# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: interrupted.spec.ts >> should be interrupted
- Location: tests/interrupted.spec.ts:3:6

# Error details

```
Error: Test execution was interrupted
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | 
  3  | test.fail(
  4  |   'should be interrupted',
  5  |   {
  6  |     tag: ['@interrupted'],
  7  |   },
  8  |   // eslint-disable-next-line no-empty-pattern
  9  |   async ({}, testInfo) => {
  10 |     console.log('Simulating test interruption via testInfo...');
  11 |     testInfo.status = 'interrupted';
> 12 |     throw new Error('Test execution was interrupted');
     |           ^ Error: Test execution was interrupted
  13 |   }
  14 | );
  15 | 
```