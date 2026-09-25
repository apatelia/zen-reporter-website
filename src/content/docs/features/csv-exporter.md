---
title: "CSV Export Utility"
---


Zen Reporter includes a zero-dependency, RFC 4180-compliant CSV export engine. It allows QA engineers, lead developers, and managers to extract filtered test execution datasets into raw CSV format for downstream analysis in Microsoft Excel, Google Sheets, or business intelligence tools (e.g., Tableau, PowerBI).

---

## 📊 Overview & UI Access

In all major tabular views throughout the dashboard (Spec Files table, History tables, File & Test History tables, Insights tables), a prominent **Export CSV** button is available:

```text
  [ 📥 Export CSV ]
```

Clicking the button immediately triggers a browser download of the actively rendered table dataset.

---

## 🛠️ Key Capabilities & Technical Specifications

### 1. Strict RFC 4180 Compliance

The exporter utility formats all data fields according to RFC 4180 standards:

- Fields containing commas, quotation marks, or newline characters are wrapped in double quotes.
- Internal quotation marks are escaped via double-quote pairs (`""`).

### 2. UTF-8 Byte Order Mark (BOM) Support

To prevent character encoding errors when opening CSV files in Microsoft Excel on Windows or macOS, Zen Reporter prepends the UTF-8 BOM byte sequence (`\uFEFF`) to every generated CSV file. Non-ASCII characters (such as status symbols, tags, or execution identifiers) render properly automatically.

### 3. Respects Active UI Filters & Search Terms

The CSV exporter operates dynamically on the user's active view context:

- **Search Filters**: Only rows matching your search filter (e.g., `@smoke` or `auth/login.spec.ts`) are exported.
- **Date Range Filters**: Honored in historical views.
- **Project Dropdowns**: Respects active project selections.

### 4. Full Un-paginated Dataset Extraction

Unlike simple DOM table scraping utilities, Zen Reporter's CSV engine exports the **entire underlying dataset**. Even if your UI table is configured to display only 10 rows per page across 50 pages (500 total rows), clicking **Export CSV** exports all 500 records into a single CSV file.

---

## 📑 Supported Export Tables

- **Spec Files Table**: Spec file path, total tests, pass count, fail count, timed-out count, skipped count, pass rate %, total duration.
- **Historical Runs Table**: Run ID, run name, start timestamp, wall-clock duration, total tests, pass rate %, quality rating.
- **File History Table**: File path, run date, total tests, pass count, failure breakdown.
- **Test Case History Table**: Test title, describe hierarchy, spec file, project, total runs, pass rate, average duration.
- **Insights & Intelligence Tables**: Flaky test lists, regression lists, and top slowest test cases.
