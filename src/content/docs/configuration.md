---
title: "Configuration Guide"
---


This guide provides an exhaustive reference for all configuration options available in **Zen Reporter**, along with usage examples for local development, CI/CD pipelines, and multi-project test execution setups.

---

## ⚙️ Options Reference

Zen Reporter options are passed via Playwright's reporter tuple syntax in `playwright.config.ts` or `playwright.config.js`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    [
      'zen-reporter',
      {
        outputDir: 'zen-report',
        projectName: 'My Application E2E',
        testRunName: 'Nightly Execution #{N}',
        theme: 'Cafe',
        darkMode: false,
        singleSummaryFile: true,
        minimalReport: false,
        enableHistory: 'auto',
        consoleProgress: 'auto',
      },
    ],
  ],
});
```

### Complete Configuration Options Table

| Option              | Type                                   | Default Value               | Description                                                                          |
| :------------------ | :------------------------------------- | :-------------------------- | :----------------------------------------------------------------------------------- |
| `outputDir`         | `string`                               | `"zen-report"`              | Output folder where HTML reports, JSON data, and historical archives are saved.      |
| `projectName`       | `string`                               | `"Test Automation Project"` | Custom project header title displayed in the top bar of the dashboard.               |
| `testRunName`       | `string`                               | `"Test Run #{N}"`           | Test run header title. Supports dynamic run numbering via `{N}` placeholder.         |
| `theme`             | `'Cafe' \| 'Concept' \| 'Sentinel'`    | `"Cafe"`                    | Visual theme applied when the report is loaded in a browser.                         |
| `darkMode`          | `boolean`                              | `false`                     | Initial dark mode state when opening the report.                                     |
| `singleSummaryFile` | `boolean`                              | `false`                     | When set to `true`, generates a lightweight `summary.html` alongside `index.html`.   |
| `minimalReport`     | `boolean`                              | `false`                     | Disables history and hides analytical tabs for ultra-lightweight single-run reports. |
| `enableHistory`     | `'auto' \| boolean`                    | `"auto"`                    | History archiving control. Automatically disabled if `minimalReport` is enabled.     |
| `consoleProgress`   | `'auto' \| 'line' \| 'dot' \| boolean` | `"auto"`                    | Terminal live progress logging mode during test execution.                           |

---

## 🔍 Detailed Option Explanations

### 1. `outputDir` (`string`)

- **Default**: `"zen-report"`
- **Details**: Specifies the destination directory where Zen Reporter outputs report assets. The reporter creates the directory structure automatically:
  - `<outputDir>/index.html`: Main single-file report containing the interactive React app.
  - `<outputDir>/summary.html`: Executive summary report (if `singleSummaryFile: true`).
  - `<outputDir>/report.json`: Formatted JSON test execution payload.
  - `<outputDir>/history.json`: DuckDB aggregated historical metrics.
  - `<outputDir>/runs/*.jsonl`: Individual JSONL run archives used for historical analytics.
  - `<outputDir>/attachments/`: Screenshots, videos, and trace file copies.

### 2. `projectName` (`string`)

- **Default**: `"Test Automation Project"`
- **Details**: Sets the primary title displayed in the header sidebar and export summaries. Ideal for differentiating repository platforms (e.g., `"Checkout Service E2E"`, `"Admin Portal Visual Specs"`).

### 3. `testRunName` (`string`)

- **Default**: `"Test Run #{N}"`
- **Details**: Formats the run name displayed in headers and in historical run data table.
- **Dynamic Variable `{N}`**: Zen Reporter scans `<outputDir>/runs/*.jsonl` prior to execution to count past runs and automatically increments `{N}`. For example, if 4 previous JSONL files exist, `"Build #{N}"` evaluates to `"Build #5"`.

### 4. `theme` (`'Cafe' | 'Concept' | 'Sentinel'`)

- **Default**: `"Cafe"`
- **Details**: Controls the initial color theme palette applied to the UI dashboard:
  - **`Cafe`**: Warm, approachable theme featuring a four-tier green brand system layered over a warm cream canvas - inspired by Starbucks' color palette.
  - **`Concept`**: Modern tech theme with vibrant indigo/slate UI surfaces - inspired by Notion's color pallette.
  - **`Sentinel`**: High-contrast cybersecurity theme utilizing deep purple-violet midnight canvas and crisp warning accents - inspired by Sentry's color pallette.

### 5. `darkMode` (`boolean`)

- **Default**: `false`
- **Details**: Specifies whether the dashboard initializes in Dark Mode. When set to `true`, the dashboard applies dark background tokens instantly on first render. Users can still toggle dark mode using the header button.

### 6. `singleSummaryFile` (`boolean`)

- **Default**: `false`
- **Details**: When set to `true`, Zen Reporter outputs a secondary `summary.html` file in your `outputDir`. `summary.html` is an executive dashboard containing only high-level KPI cards, pass rate rings, health charts, and suite summaries—omitting heavy failure step details, code frame snippets, and trace blobs. This is useful for distributing light status summaries to leadership.

### 7. `minimalReport` (`boolean`)

- **Default**: `false`
- **Details**: Enables a minimal report mode. When `true`:
  - Disables JSONL history archiving (`enableHistory` is forced to `false`).
  - Hides secondary analytical tabs from the sidebar (`Projects`, `History`, `Trends`, `Insights`).
  - Reduces generated HTML file size for high-frequency CI pipelines where historical tracking is handled externally.

### 8. `enableHistory` (`'auto' | boolean`)

- **Default**: `"auto"`
- **Details**: Controls whether execution results are archived to `<outputDir>/runs/<run_id>.jsonl`.
  - `"auto"`: Enables history archiving automatically if `@duckdb/node-api` is present and `minimalReport` is `false`.
  - `true`: Forces history archiving to JSONL files.
  - `false`: Disables history archiving completely.

### 9. `consoleProgress` (`'auto' | 'line' | 'dot' | boolean`)

- **Default**: `"auto"`
- **Details**: Controls terminal output while tests are running:
  - `"auto"`: Detects terminal capabilities. Uses `'line'` in interactive TTY terminals and `'dot'` in non-TTY/CI environments.
  - `'line'`: Live updating single-line status bar showing progress percentage, pass/fail counts, worker thread count, and current test title.
  - `'dot'`: Continuous character stream (`.` pass, `F` fail, `s` skip, `±` flaky retry).
  - `false`: Disables custom terminal progress output.

---

## 🛠️ Advanced Integration Configurations

### CI/CD Environment Configuration (GitHub Actions Example)

```yaml
name: Playwright Test Suite
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Run Playwright Tests
        run: npx playwright test
        env:
          PLAYWRIGHT_HTML_REPORT: zen-report

      - name: Generate PR Markdown Summary
        if: always()
        run: npx zr summary >> $GITHUB_STEP_SUMMARY

      - name: Upload Zen Report Artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: zen-test-report
          path: zen-report/
```

---

## 🌐 Dynamic Configuration via Environment Variables

You can pass dynamic parameters in your `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

const isCI = !!process.env.CI;
const buildNumber = process.env.GITHUB_RUN_NUMBER || 'Local';

export default defineConfig({
  reporter: [
    [
      'zen-reporter',
      {
        outputDir: 'zen-report',
        projectName: process.env.APP_NAME || 'Production E2E',
        testRunName: `CI Run #${buildNumber}`,
        minimalReport: process.env.MINIMAL_REPORT === 'true',
        singleSummaryFile: isCI,
        enableHistory: !isCI ? 'auto' : true,
        consoleProgress: 'auto',
      },
    ],
  ],
});
```
