// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Base URL used for canonical/sitemap/OG. Override in prod via env.
const SITE = process.env.SITE_URL || 'https://www.mrfalconbeauty.com';

export default defineConfig({
  site: SITE,
  prefetch: true,
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
