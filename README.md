# itsthelore.github.io

The `itsthelore` org's documentation site, served at
https://itsthelore.github.io/. Built with [MkDocs](https://www.mkdocs.org)
(Material theme) — the same tool and theme `rac-core` already uses for its
own docs, so the org site and every product's docs read as one brand.
Deployed by GitHub Actions on every push to `main`.

## How content gets here

Sections under `/rac-core/` (and future product sections) are **vendored,
not authored here**: `scripts/vendor-docs.sh` sparse-checks out each source
repo's `docs/` directory into `docs/<slug>/` before `mkdocs build`. Nothing
vendored is committed — `docs/rac-core/` is gitignored. Because it lands in
the same MkDocs `docs_dir` as everything else, the source repos' existing
relative links between pages (`[relationships.md](relationships.md)`, `cli.md#schema`,
etc.) resolve correctly with no rewriting.

The rationale and contract are recorded in `rac-core`'s
[ADR-101](https://github.com/itsthelore/rac-core/blob/main/rac/decisions/adr-101-org-docs-site-and-topology.md).

The site's own visual identity (light theme, Inter for prose, JetBrains
Mono for code, the lamplighter at icon size only) is recorded in `rac-core`'s
[ADR-102](https://github.com/itsthelore/rac-core/blob/main/rac/decisions/adr-102-org-site-brand-direction.md):
it deliberately *rhymes with, but does not match*, `rac-core`'s
`rac-localview` product-UI theme (dark, mono-everywhere) — three shared
constants (the amber accent, mono-for-code, the lamplighter), everything
else per surface. Brand assets (`docs/fonts/`,
`docs/images/favicon.png` + `lamplighter.png`) are one-time copies of
`rac-localview`'s source files; this org site owns the canonical copies per
ADR-092 ("the brand lives at the org").

Adding a new product section:

1. Add a `vendor_repo` call to `scripts/vendor-docs.sh`.
2. Add its pages to the `nav:` list in `mkdocs.yml`.
3. Add a card to "The ecosystem" grid in `docs/index.md`.

## Org-wide star count

The hero shows a "★ N stars across itsthelore's open-source repos" line,
sourced by `scripts/fetch-org-stats.sh` (sums `stargazers_count` across the
org's public repos via the GitHub API) and exposed to `overrides/home.html`
through `mkdocs.yml`'s `extra.total_org_stars` (an `!ENV` tag reading the
`TOTAL_ORG_STARS` env var the script sets). Requires a `GITHUB_TOKEN` with
read access — the deploy workflow uses the default `secrets.GITHUB_TOKEN`.
Without a token (e.g. local `mkdocs serve`), the count defaults to 0 and the
hero hides the line entirely.

## Essays

Long-form essays live at `/blog/` (nav label "Essays"), via MkDocs
Material's built-in [blog plugin](https://squidfunk.github.io/mkdocs-material/plugins/blog/) —
captured as intent in `rac-core`'s
[future roadmap](https://github.com/itsthelore/rac-core/blob/main/rac/roadmaps/future/org-site-rac-spec-surface.md)
ahead of rac-spec's own arrival. To publish one:

1. Add `docs/blog/posts/<slug>.md` with frontmatter:
   ```yaml
   ---
   date: 2026-01-15
   authors: [itsthelore]
   ---
   ```
2. Write the excerpt, then `<!-- more -->`, then the rest of the post.
3. Author identity comes from `docs/blog/.authors.yml` — add a new entry
   there for a named author instead of the shared `itsthelore` one.

Categories and the archive are off (`categories: false`, `archive: false`
in `mkdocs.yml`) until there's enough volume to need them.

## Local development

```sh
pip install mkdocs==1.6.1 mkdocs-material==9.7.6
./scripts/vendor-docs.sh
mkdocs serve
```
