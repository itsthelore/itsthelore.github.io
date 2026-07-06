import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One collection per vendored product repo (see vendor.config.json and
// scripts/vendor-docs.mjs). Add an entry here when a repo gains a docs/
// section worth publishing, per rac-core's ADR-101.
const racCore = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rac-core' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = {
  'rac-core': racCore,
};
