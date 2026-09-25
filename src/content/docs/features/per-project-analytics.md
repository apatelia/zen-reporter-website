---
title: "Per-Project Execution Analytics"
---


Modern Playwright test suites frequently execute the same test files across multiple project profiles (e.g., Desktop Chrome, Desktop Firefox, Mobile Safari, API Testing). The **Projects** tab in Zen Reporter isolates and compares metrics across each configured Playwright project.

---

## 📊 Projects Tab Overview

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Per-Project Analytics                           │
├────────────────────────────────────────────────────────────────────────┤
│                     Project Breakdown Summary                          │
│     Total Projects, Most Active Project, Highest Failure Rate Profile  │
├────────────────────────────────────────────────────────────────────────┤
│                       Status Distribution Chart                        │
│    Stacked / Grouped Bar Charts of Passed/Failed/Skipped per Project   │
├────────────────────────────────────────────────────────────────────────┤
│                  Volume & Coverage Distribution Chart                  │
│       Comparison of Test Counts and Wall-Clock Durations per Profile   │
├────────────────────────────────────────────────────────────────────────┤
│                         Project Detail Cards                           │
│  Detailed Breakdown Cards per Project Profile with Pass Rate & Duration│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔍 Key Analytics & Visualizations

### 1. Project Summary Cards

High-level summary metrics at the top of the Projects view:

- **Total Projects**: Total number of Playwright project targets executed in the run.
- **Top Executed Project**: Project containing the largest total test case count.
- **Highest Failure Profile**: Highlights which specific project profile suffered the lowest pass rate percentage.

### 2. Status Distribution Chart

- **Interactive Bar Chart**: Visualizes the distribution of test statuses (`Passed`, `Failed`, `Timed Out`, `Skipped`, `Interrupted`) per project profile.
- **Hover Insights**: Hovering over any bar displays exact test counts for that specific browser profile.
- **Multi-Browser Comparison**: Easily spot issues specific to a single engine (e.g., tests failing only on `webkit` / Mobile Safari).

### 3. Volume & Coverage Distribution

- **Volume vs. Duration**: Plots both test case count and cumulative execution duration for each project.
- **Bottleneck Identification**: Identifies browser profiles taking disproportionately longer execution times despite having identical test counts.

### 4. Project Detail Cards

Comprehensive standalone cards for every Playwright project profile:

- **Pass Rate Badge**: Color-coded percentage tag indicating profile health.
- **Metrics Grid**: Total tests, passed, failed, timed-out, skipped, and average duration per test case.
- **Direct Filtering**: Clicking on a project profile filters the rest of the report view to show only specs and failures for that project.

---

## 💡 Practical Use Cases

- **Cross-Browser Compatibility Testing**: Instantly isolate whether a failure is an application bug (failing across Chromium, Firefox, and Webkit) or a browser-specific visual engine glitch (failing only on Webkit).
- **Mobile Viewport Analysis**: Compare desktop execution metrics against mobile responsive viewport profiles (`Mobile Chrome`, `iPhone 13`).
- **Parallel Worker Optimization**: Identify heavy projects that stall overall CI execution time and move them to dedicated worker pools.
