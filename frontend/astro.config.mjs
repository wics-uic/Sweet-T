// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://wics-uic.github.io',
  base: '/Sweet-T',
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});