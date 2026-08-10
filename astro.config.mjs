// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public production URL. Update here if the canonical domain changes.
const SITE = 'https://evidenceaxis.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      // The print-only report source is not a public page — keep it out of the sitemap.
      filter: (page) => !page.includes('/report-print'),
    }),
  ],
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
