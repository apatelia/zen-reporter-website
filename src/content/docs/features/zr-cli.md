---
title: "`zr` - Zen Reporter CLI"
---

The **Zen Reporter Command-Line Interface (`zr` / `zen-reporter`)** provides a powerful suite of terminal utilities for managing, viewing, summarizing, and querying test run history in **Zen Reporter**. Powered by an embedded **DuckDB analytics engine**, `zr` allows developers and CI/CD pipelines to inspect test run results directly from the terminal, generate markdown summaries for Pull Requests, and run arbitrary SQL queries on historic JSONL run files.

---

## 🏗️ Overview & Binary Setup

When `zen-reporter` is installed as a package dependency, npm/yarn/pnpm exposes two binary aliases:

- `zr`: Short-form convenient alias.
- `zen-reporter`: Full-name binary target.

```bash
# Executing via npx / package runner
npx zr <command> [options]

# Directly via npm scripts in package.json
npm run show
```

### Automatic Package Manager Detection

`zr` intelligently auto-detects the host environment's package manager (`pnpm`, `yarn`, `bun`, or `npm`) by inspecting lockfiles (`pnpm-lock.yaml`, `yarn.lock`, `bun.lock`, `package-lock.json`, `.npmrc`) and `package.json` to execute Playwright CLI commands seamlessly.

---

## 📜 CLI Architecture & Workflow

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                           Zen Reporter CLI (`zr`)                         │
├───────────────────┬──────────────────────┬────────────────────────────────┤
│    `zr show`      │   `zr summary`       │         `zr history`           │
│ Launches local    │ Markdown report      │   DuckDB-powered analytics     │
│ Playwright viewer │ for CI / PR comments │ (runs, flaky, slow, SQL)       │
└─────────┬─────────┴─────────┬────────────┴───────────────┬────────────────┘
          │                   │                            │
          ▼                   ▼                            ▼
   zen-report/index.html   zen-report/report.json   zen-report/runs/*.jsonl
```

---

## 🔍 Commands Reference

### 1. `zr show`

Serves and opens the generated HTML report locally in a browser using Playwright's built-in web server.

```bash
npx zr show
```

- **Environment Override**: Reads output directory path from `PW_REPORTER_OUTPUT` (defaults to `zen-report`).
- **Behavior**: Verifies that `zen-report/index.html` exists and delegates server execution to `<package-manager> exec playwright show-report zen-report`.

---

### 2. `zr summary`

Parses `zen-report/report.json` and prints a structured, GitHub-flavored Markdown summary snippet to stdout. Perfect for pasting into GitHub Actions PR comments or Slack build notifications.

```bash
npx zr summary
```

#### Sample Output

```markdown
### 📊 Test Run Summary: Test Automation Project — Test Run

**Status:** ❌ FAILED
**Duration:** 1m 14s
**Pass Rate:** 85.7%

| Total | Passed | Failed | Timed Out | Skipped |
| :---: | :---: | :---: | :-------: | :-----: |
|   21  |   18  |   2   |     1     |    0    |

#### ❌ Failed Tests (3)
- **[chromium]** `tests/auth.spec.ts` › User login with invalid credentials
- **[firefox]** `tests/checkout.spec.ts` › Complete purchase flow
- **[webkit]** `tests/api.spec.ts` › Fetch user profile timeout
```

---

### 3. `zr history` (DuckDB Analytics Engine)

`zr history` subcommands execute high-performance analytical queries across historic newline-delimited JSON (`runs/*.jsonl`) files stored in the output directory (`zen-report/runs`).

> [!NOTE]
> `zr history` commands rely on `@duckdb/node-api`. Ensure `@duckdb/node-api` is installed in your project's `devDependencies` or `peerDependencies`.

#### Subcommands

| Subcommand | Description | Example Usage |
| :--- | :--- | :--- |
| `zr history` / `zr history runs` | Lists all recorded historical runs with overall pass/fail metrics. | `npx zr history runs` |
| `zr history flaky` | Lists tests that failed in some runs and passed in others across history. | `npx zr history flaky` |
| `zr history regressions` | Displays test cases that passed in an earlier run but regressed (failed) in subsequent runs. | `npx zr history regressions` |
| `zr history slow [--limit N]` | Identifies the slowest tests across all runs by average duration (default limit 10). | `npx zr history slow --limit 15` |
| `zr history trend` | Displays overall per-run pass rates over time. | `npx zr history trend` |
| `zr history files` | Shows aggregate spec file historical metrics and overall pass rates. | `npx zr history files` |
| `zr history tests` | Shows aggregate individual test execution metrics. | `npx zr history tests` |
| `zr history report` | Compiles `history.json` and embeds history data directly into `index.html` for the web UI History tab. | `npx zr history report` |
| `zr history query "<SQL>"` | Executes an arbitrary SQL query against historic run files using DuckDB SQL. | `npx zr history query "SELECT * FROM runs WHERE status='failed'"` |

---

## 💻 Terminal Table Formatting Engine

`zr history` features a built-in terminal table renderer designed for CLI legibility:

1. **Auto-wrapping & Column Flexing**: Responsive column width calculation prevents line-wrapping on narrow screens.
2. **Proper Header Casing**: Converts database column names (e.g. `avg_duration_ms`) into clean display headers (`Avg Duration`).
3. **Smart Formatting**:
   - Millisecond durations (`_ms`) are formatted as human-readable durations (`1m 24s` or `45s`).
   - Timestamps (`_at`) are formatted into ISO local dates (`YYYY-MM-DD HH:MM:SS`).
   - Numbers and percentages are right-aligned while text fields remain left-aligned.

---

## ⚡ Custom SQL Querying with `zr history query`

The `query` subcommand grants full access to DuckDB's SQL syntax. The table/view `runs` is automatically bound to `read_json('zen-report/runs/*.jsonl', format='newline_delimited')`.

```bash
# Query failed tests in WebKit project with duration > 5000ms
npx zr history query "SELECT file, title, duration_ms FROM runs WHERE project = 'webkit' AND status = 'failed' AND duration_ms > 5000 ORDER BY duration_ms DESC"
```

---

## 💡 CI/CD Integration Examples

### GitHub Actions PR Commenting

```yaml
- name: Run Playwright Tests
  run: npx playwright test
  continue-on-error: true

- name: Output Test Summary to PR
  run: |
    echo "## Playwright Test Results" >> $GITHUB_STEP_SUMMARY
    npx zr summary >> $GITHUB_STEP_SUMMARY

- name: Build History Report
  run: npx zr history report
```
