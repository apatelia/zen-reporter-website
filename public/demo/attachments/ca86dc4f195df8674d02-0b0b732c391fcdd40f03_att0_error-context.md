# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: failures.spec.ts >> should time out
- Location: tests/failures.spec.ts:48:6

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
  - link "v0.14.2":
    - /url: https://www.npmjs.com/package/@arpanp/zen-reporter
  - button "Search": Ctrl K
  - link "GitHub":
    - /url: https://github.com/apatelia/zen-reporter
  - text: Select theme
  - combobox "Select theme":
    - option "Dark"
    - option "Light"
    - option "Auto" [selected]
- main:
  - heading "Beautiful Test Reports for Playwright" [level=1]
  - text: Transform raw Playwright test results into interactive, single-file HTML dashboards for modern QA teams.
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
    - paragraph: Test results breakdown, test run metadata, execution efficiency calculations, test health breakdowns.
  - article:
    - paragraph: Deep-Dive Failure Analysis
    - paragraph: Intelligent error grouping, step-by-step trace markers, highlighted code frames, and structured diff stack traces.
  - article:
    - paragraph: Unified Attachment Viewer
    - paragraph: Preview screenshots, videos, logs and text attachments right inside report.
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
  6  |     tag: ['@failure', '@explicit-wait'],
  7  |   },
  8  |   async ({ page }) => {
  9  |     console.log('This test should fail');
  10 | 
  11 |     // Go to Zen Reporter's home page
  12 |     await page.goto('https://zen-reporter.vercel.app');
  13 | 
  14 |     // Wait for "Getting Started" link-button to be visible
  15 |     await page
  16 |       .getByRole('link', { name: 'Getting Started' })
  17 |       .waitFor({ state: 'visible', timeout: 10_000 });
  18 | 
  19 |     // Expect a "GitHub" button on homepage
  20 |     const githubButton = page.getByRole('button', { name: 'GitHub' });
  21 |     console.error('There should not be any "GitHub" button on the page.');
  22 |     await expect(githubButton).toBeVisible();
  23 |   }
  24 | );
  25 | 
  26 | test.fixme(
  27 |   'to be fixed',
  28 |   {
  29 |     tag: ['@fixme'],
  30 |   },
  31 |   async () => {
  32 |     console.debug('empty test');
  33 |     await test.step('empty step - this step needs to be fixed', async () => {});
  34 |   }
  35 | );
  36 | 
  37 | test.skip(
  38 |   'Skipped test',
  39 |   {
  40 |     tag: ['@skip'],
  41 |   },
  42 |   async () => {
  43 |     console.debug('skipped test');
  44 |     await test.step('this step will be skipped', async () => {});
  45 |   }
  46 | );
  47 | 
  48 | test.fail(
  49 |   'should time out',
  50 |   {
  51 |     tag: ['@timeout'],
  52 |   },
  53 |   async ({ page, browserName }) => {
  54 |     test.skip(browserName === 'chromium', 'skipping test intentionally in chromium');
  55 | 
  56 |     // Go to Zen Reporter's home page
  57 |     await page.goto('https://zen-reporter.vercel.app');
  58 | 
  59 |     // Wait for "Getting Started" link-button to be visible
  60 |     await page
  61 |       .getByRole('link', { name: 'Getting Started' })
  62 |       .waitFor({ state: 'visible', timeout: 10_000 });
  63 | 
  64 |     // Expect a "GitHub" button on homepage
  65 |     const githubButton = page.getByRole('button', { name: 'GitHub' });
> 66 |     await expect(githubButton).toBeVisible({ timeout: 45_000 });
     |                                ^ Error: expect(locator).toBeVisible() failed
  67 |   }
  68 | );
  69 | 
```