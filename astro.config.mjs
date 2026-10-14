// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightImageZoom from 'starlight-image-zoom';

// https://astro.build/config
export default defineConfig({
  site: 'https://zen-reporter.vercel.app',
  base: '/',
  integrations: [
    starlight({
      plugins: [starlightImageZoom()],
      title: 'Zen Reporter',
      favicon: '/favicon.png',
      logo: {
        src: './src/assets/logo.svg',
      },
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
      },
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/apatelia/zen-reporter'
        }
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Installation & Quick Start', slug: 'installation' },
            { label: 'Configuration', slug: 'configuration' },
            { label: 'Report Layout & Navigation', slug: 'report-layout' },
          ],
        },
        {
          label: 'Features',
          items: [
            { label: 'Dashboard & Key Metrics', slug: 'features/dashboard-overview' },
            { label: 'Per-Project Analytics', slug: 'features/per-project-analytics' },
            { label: 'Suite & Spec Explorer', slug: 'features/suite-spec-explorer' },
            { label: 'Failure Analysis', slug: 'features/failure-analysis' },
            { label: 'Attachment Preview', slug: 'features/universal-preview-modal' },
            { label: 'Visual Regression Viewer', slug: 'features/visual-regression' },
            { label: 'History & Archiving', slug: 'features/history-archiving' },
            { label: 'Context Guide', slug: 'features/guide-modals' },
            { label: 'Test Intelligence', slug: 'features/duckdb-intelligence' },
            { label: 'Themes & Dark Mode', slug: 'features/themes-and-dark-mode' },
            { label: 'CSV Exporter', slug: 'features/csv-exporter' },
            { label: 'Executive Summary Report', slug: 'features/executive-summary' },
            { label: 'Zen Reporter CLI', slug: 'features/zr-cli' },
          ],
        },
      ],
    }),
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
});
