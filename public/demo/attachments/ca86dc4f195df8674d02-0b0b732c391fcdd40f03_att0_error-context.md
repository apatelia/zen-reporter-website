# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: failures.spec.ts >> should time out
- Location: tests/failures.spec.ts:43:6

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'GitHub' })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'GitHub' }) with timeout 45000ms
  - waiting for getByRole('button', { name: 'GitHub' })
  - Test timeout of 30000ms exceeded.

```

```yaml
- link "Skip to content":
  - /url: "#_top"
- banner:
  - link "Zen Reporter":
    - /url: /
  - button "Search": Ctrl K
  - link "GitHub":
    - /url: https://github.com/apatelia/zen-reporter
  - text: Select theme
  - combobox "Select theme":
    - option "Dark"
    - option "Light"
    - option "Auto" [selected]
- main:
  - heading "Beautiful Reports for Playwright Test" [level=1]
  - text: Transform raw Playwright logs into interactive, single-file HTML dashboards for modern QA teams.
  - link "Getting Started":
    - /url: /installation
  - link "Interactive Demo":
    - /url: /demo/index.html
  - heading "Key Features" [level=2]
  - link "Section titled “Key Features”":
    - /url: "#key-features"
  - article:
    - paragraph: Beautiful by Design
    - paragraph: Built-in themes with real-time light and dark mode toggling.
  - article:
    - paragraph: Highly Adaptable & Configurable
    - paragraph: Feature-rich by default, lean on demand, customizable always.
  - article:
    - paragraph: Executive Dashboards
    - paragraph: Radial pass rate indicators, execution efficiency calculations, test health breakdowns, and environment metadata.
  - article:
    - paragraph: Deep-Dive Failure Analysis
    - paragraph: Intelligent error grouping, step-by-step trace markers, highlighted code frames, and structured diff stack traces.
  - article:
    - paragraph: Visual Regression Viewer
    - paragraph: Side-by-side snapshot comparison, interactive split-screen image slider, and overlay diff highlight modes.
  - article:
    - paragraph: Test Intelligence
    - paragraph: Embedded analytical engine for flaky test detection, regression tracking, and custom SQL history querying.
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
  8  |   async ({ page }) => {
  9  |     console.log('This test should fail');
  10 | 
  11 |     // Go to Zen Reporter's home page
  12 |     await page.goto('https://zen-reporter.vercel.app');
  13 | 
  14 |     // Expect a "GitHub" button on homepage
  15 |     const githubButton = page.getByRole('button', { name: 'GitHub' });
  16 |     console.error('There should not be any "GitHub" button on the page.');
  17 |     await expect(githubButton).toBeVisible();
  18 |   }
  19 | );
  20 | 
  21 | test.fixme(
  22 |   'to be fixed',
  23 |   {
  24 |     tag: ['@fixme'],
  25 |   },
  26 |   async () => {
  27 |     console.debug('empty test');
  28 |     await test.step('empty step - this step needs to be fixed', async () => {});
  29 |   }
  30 | );
  31 | 
  32 | test.skip(
  33 |   'Skipped test',
  34 |   {
  35 |     tag: ['@skip'],
  36 |   },
  37 |   async () => {
  38 |     console.debug('skipped test');
  39 |     await test.step('this step will be skipped', async () => {});
  40 |   }
  41 | );
  42 | 
  43 | test.fail(
  44 |   'should time out',
  45 |   {
  46 |     tag: ['@timeout'],
  47 |   },
  48 |   async ({ page, browserName }) => {
  49 |     test.skip(browserName === 'chromium', 'skipping test intentionally in chromium');
  50 | 
  51 |     // Go to Zen Reporter's home page
  52 |     await page.goto('https://zen-reporter.vercel.app');
  53 | 
  54 |     // Expect a "GitHub" button on homepage
  55 |     const githubButton = page.getByRole('button', { name: 'GitHub' });
> 56 |     await expect(githubButton).toBeVisible({ timeout: 45_000 });
     |                                ^ Error: expect(locator).toBeVisible() failed
  57 |   }
  58 | );
  59 | 
```