// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wics-uic.github.io',
  base: '/Sweet-T',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
  // DO NOT include an 'adapter' property here
});