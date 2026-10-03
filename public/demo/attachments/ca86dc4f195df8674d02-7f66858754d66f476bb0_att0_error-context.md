# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: failures.spec.ts >> should fail
- Location: tests/failures.spec.ts:3:6

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | 
  3  | test.fail(
  4  |   'should fail',
  5  |   {
  6  |     tag: ['@failure'],
  7  |   },
  8  |   async () => {
  9  |     console.log('This test should fail');
  10 |     expect(true).toBe(true);
  11 |     console.error('True can never be False');
> 12 |     expect(true).toBe(false);
     |                  ^ Error: expect(received).toBe(expected) // Object.is equality
  13 |   }
  14 | );
  15 | 
  16 | test.fixme(
  17 |   'to be fixed',
  18 |   {
  19 |     tag: ['@fixme'],
  20 |   },
  21 |   async () => {
  22 |     console.debug('empty test');
  23 |     await test.step('empty step - this step needs to be fixed', async () => {});
  24 |   }
  25 | );
  26 | 
  27 | test.skip(
  28 |   'Skipped test',
  29 |   {
  30 |     tag: ['@skip'],
  31 |   },
  32 |   async () => {
  33 |     console.debug('skipped test');
  34 |     await test.step('this step will be skipped', async () => {});
  35 |   }
  36 | );
  37 | 
  38 | test.fail(
  39 |   'should time out',
  40 |   {
  41 |     tag: ['@timeout'],
  42 |   },
  43 |   async () => {
  44 |     console.debug('timed out test');
  45 |     await test.step('timed out', async () => {
  46 |       await new Promise((resolve) => setTimeout(resolve, 32_000));
  47 |     });
  48 |   }
  49 | );
  50 | 
```