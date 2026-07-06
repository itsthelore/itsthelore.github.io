import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://itsthelore.github.io',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
  },
});
