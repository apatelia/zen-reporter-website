# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: config.spec.ts >> Zen Reporter Configuration Tests >> resolves default config values when options are omitted
- Location: tests/config.spec.ts:5:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Starbucks"
Received: "Cafe"
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import { resolveConfig } from '../src/lib/reporter';
  3  | 
  4  | test.describe('Zen Reporter Configuration Tests', () => {
  5  |   test('resolves default config values when options are omitted', () => {
  6  |     const config = resolveConfig();
  7  |     expect(config.outputDir).toBe('zen-report');
  8  |     expect(config.projectName).toBe('Test Automation Project');
  9  |     expect(config.testRunName).toBe('Test Run #1');
> 10 |     expect(config.theme).toBe('Starbucks');
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  11 |     expect(config.darkMode).toBe(false);
  12 |   });
  13 | 
  14 |   test('resolves custom projectName and testRunName configuration options', () => {
  15 |     const config = resolveConfig({
  16 |       outputDir: 'custom-output',
  17 |       projectName: 'My E2E Project',
  18 |       testRunName: 'Nightly Run #42',
  19 |     });
  20 |     expect(config.outputDir).toBe('custom-output');
  21 |     expect(config.projectName).toBe('My E2E Project');
  22 |     expect(config.testRunName).toBe('Nightly Run #42');
  23 |     expect(config.theme).toBe('Starbucks');
  24 |     expect(config.darkMode).toBe(false);
  25 |   });
  26 | 
  27 |   test('resolves custom theme and darkMode configuration options', () => {
  28 |     const config = resolveConfig({
  29 |       theme: 'Notion',
  30 |       darkMode: true,
  31 |     });
  32 |     expect(config.theme).toBe('Notion');
  33 |     expect(config.darkMode).toBe(true);
  34 |   });
  35 | });
  36 | 
```