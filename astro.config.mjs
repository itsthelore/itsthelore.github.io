import { defineConfig } from 'astro/config';
import { loreShikiTheme } from './src/lib/shiki-theme.mjs';

export default defineConfig({
  site: 'https://itsthelore.github.io',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: loreShikiTheme,
    },
  },
});
