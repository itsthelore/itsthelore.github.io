# itsthelore.github.io

The `itsthelore` org's documentation site, served at
https://itsthelore.github.io/. Built with [Astro](https://astro.build) and
deployed by GitHub Actions on every push to `main`.

## How content gets here

Sections under `/rac-core/` (and future product sections) are **vendored,
not authored here**: `npm run build` runs `scripts/vendor-docs.mjs` first,
which sparse-checks out each source repo's `docs/` directory (see
`vendor.config.json`) into `src/content/<slug>/` before the Astro build.
Nothing vendored is committed — `src/content/rac-core/` is gitignored.

The rationale and contract are recorded in `rac-core`'s
[ADR-101](https://github.com/itsthelore/rac-core/blob/main/rac/decisions/adr-101-org-docs-site-and-topology.md).

Adding a new product section:

1. Add an entry to `vendor.config.json` (`slug`, `repo`, `ref`, `path`).
2. Add a matching collection in `src/content.config.ts`.
3. Add `src/pages/<slug>/index.astro` and `src/pages/<slug>/[...slug].astro`
   (copy the `rac-core` versions as a starting point).

## Local development

```sh
npm install
npm run dev
```

`npm run dev` and `npm run build` both vendor fresh content first.
