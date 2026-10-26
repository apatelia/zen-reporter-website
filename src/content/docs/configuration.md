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
      '@arpanp/zen-reporter',
      {
        outputDir: 'zen-report',
        projectName: 'My Application E2E',
        testRunName: 'Nightly Execution #{N}',
        theme: 'Cafe',
        darkMode: 'system',
        singleSummaryFile: true,
        minimalReport: false,
        enableHistory: 'auto',
        consoleProgress: 'auto',
        openAutomatically: 'never',
      },
    ],
  ],
});
```

### Complete Configuration Options Table

| Option              | Type                                       | Default                     | Description                                                                                                                                 |
| :------------------ | :----------------------------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `outputDir`         | `string`                                   | `"zen-report"`              | Directory where final report files are saved.                                                                                               |
| `projectName`       | `string`                                   | `"Test Automation Project"` | Project name displayed prominently in the top bar of the dashboard.                                                                         |
| `testRunName`       | `string`                                   | `"Test Run #{N}"`           | Test run or build name displayed in top bar. `{N}` is replaced dynamically by run number.                                                   |
| `theme`             | `string`                                   | `"Cafe"`                    | Theme applied on first load (`"Cafe"`, `"Concept"`, `"Sentinel"`).                                                                          |
| `darkMode`          | `boolean \| 'system'`                      | `"system"`                  | Initial dark mode state (`true`, `false`, or `"system"` to automatically match OS theme setting).                                           |
| `singleSummaryFile` | `boolean`                                  | `false`                     | Generates a standalone `summary.html` for executive summary views.                                                                          |
| `minimalReport`     | `boolean`                                  | `false`                     | When `true`, disables history recording and hides analytical charts/secondary tabs (Projects, History, Trends, Insights) for a lean report. |
| `enableHistory`     | `'auto' \| boolean`                        | `"auto"`                    | Controls history execution archiving (`"auto"`, `true`, `false`). Forced to `false` when `minimalReport` is `true`.                         |
| `consoleProgress`   | `'auto' \| 'line' \| 'dot' \| boolean`     | `"auto"`                    | Controls terminal execution output (`"auto"` selects `line` in TTY and `dot` in non-TTY).                                                   |
| `openAutomatically` | `'always' \| 'never' \| 'on-failure-only'` | `"never"`                   | Controls whether to launch the report viewer automatically after run completion (`"always"`, `"never"`, or `"on-failure-only"`).            |

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

### 4. `theme` (`string`)

- **Default**: `"Cafe"`
- **Details**: Controls the initial color theme palette applied to the UI dashboard (`"Cafe"`, `"Concept"`, `"Sentinel"`):
  - **`Cafe`**: Warm, approachable theme featuring a four-tier green brand system layered over a warm cream canvas - inspired by Starbucks' color palette.
  - **`Concept`**: Modern tech theme with vibrant indigo/slate UI surfaces - inspired by Notion's color pallette.
  - **`Sentinel`**: High-contrast cybersecurity theme utilizing deep purple-violet midnight canvas and crisp warning accents - inspired by Sentry's color pallette.

### 5. `darkMode` (`boolean | 'system'`)

- **Default**: `"system"`
- **Details**: Specifies the initial dark mode state when opening the report (`true`, `false`, or `"system"` to automatically match OS theme setting). Users can still toggle dark mode using the header button.

### 6. `singleSummaryFile` (`boolean`)

- **Default**: `false`
- **Details**: When set to `true`, Zen Reporter outputs a secondary `summary.html` file in your `outputDir`. `summary.html` is a copy of the "Overview" tab without the sidebar. It is an executive dashboard containing test results breakdown, test run info, pass/fail rate indicators, execution efficiency calculations, and test suite stability and flakiness metrics. This is useful for distributing light status summaries to leadership as a single file.

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

### 10. `openAutomatically` (`'always' | 'never' | 'on-failure-only'`)

- **Default**: `"never"`
- **Details**: Controls whether to launch the report viewer automatically after run completion:
  - `'always'`: Automatically opens the report in your default browser after every test run.
  - `'never'`: Never opens the report automatically.
  - `'on-failure-only'`: Automatically opens the report only if one or more tests fail.

---
