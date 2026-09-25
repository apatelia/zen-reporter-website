# 🧘‍♂️ Zen Reporter Website & Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This repository contains the official documentation website for **Zen Reporter**, an open-source test reporting tool that transforms raw Playwright logs into interactive, single-file HTML dashboards for modern QA teams.

Built using [Astro](https://astro.build) and [Starlight](https://starlight.astro.build/), with integrated support for [Mermaid.js](https://mermaid.js.org/) diagrams.

---

## 🚀 Project Structure

```text
.
├── public/                  # Static assets (favicons, public images)
├── src/
│   ├── assets/              # Site assets & graphics (logo, hero preview)
│   ├── content/
│   │   ├── docs/            # Documentation pages & guides (.md / .mdx)
│   │   │   ├── features/    # Feature-specific documentation pages
│   │   │   ├── configuration.md
│   │   │   ├── index.mdx    # Homepage (splash page)
│   │   │   ├── installation.mdx
│   │   │   └── report-layout.md
│   └── content.config.ts    # Content collection configurations
├── astro.config.mjs         # Astro & Starlight configuration (sidebar, integrations)
├── package.json
└── tsconfig.json
```

---

## 📚 Documentation Content Overview

- **Start Here**:
  - `installation.mdx` – Installation & Quick Start Guide
  - `configuration.md` – Options, CLI arguments & Config file setup
  - `report-layout.md` – Navigation, views & UI layout overview
- **Features**:
  - `features/dashboard-overview.md` – Executive dashboard & metrics
  - `features/per-project-analytics.md` – Multi-project reporting & stats
  - `features/suite-spec-explorer.md` – Suite tree & spec execution details
  - `features/failure-analysis.md` – Intelligent error grouping & trace inspection
  - `features/visual-regression.md` – Image comparison & interactive diff slider
  - `features/history-archiving.md` – Historical trends & report archiving
  - `features/duckdb-intelligence.md` – Test intelligence & flaky test analytics
  - `features/themes-and-dark-mode.md` – Custom themes & dark mode
  - `features/csv-exporter.md` – Exporting test execution data
  - `features/executive-summary.md` – PDF/HTML summary reports
  - `features/zr-cli.md` – Zen Reporter CLI tool reference

---

## 🧞 Local Development & Commands

All commands are run from the project root:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Builds production site to `./dist/`              |
| `npm run preview`         | Previews production build locally                |
| `npm run astro ...`       | Runs Astro CLI commands (e.g. `astro check`)     |

---

## 🔗 Related Links

- **Main Repository**: [Zen Reporter on GitHub](https://github.com/apatelia/zen-reporter)
- **Starlight Documentation**: [starlight.astro.build](https://starlight.astro.build/)
