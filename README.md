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

**The homepage hero is temporarily spec-led** (headline, CTAs, and eyebrow
all point at the rac-spec announcement essay, per an explicit "for now"
request) instead of the previous product pitch — see the comment at the
top of `overrides/home.html` for what to restore and why.

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

`docs/essays.md` (nav label "Essays") is a **hand-curated index**, not an
auto-generated blog. An essay lives wherever it makes most sense — a spec
announcement lives inside the relevant section (e.g.
`docs/rac-spec/why-strict.md`) rather than a generic `/blog/` — and gets one
card added to `docs/essays.md` linking to it. This is deliberate: essays
don't all belong under one directory, so there's nothing for a plugin to
auto-discover.

(An earlier pass tried MkDocs Material's built-in blog plugin for this; it
assumes every post lives under one `blog_dir`, which fought the actual
authoring pattern. See git history if a real dated/multi-author blog is
ever needed again — it's a small, well-understood revert.)

## Social previews (Open Graph / Twitter Card)

`overrides/main.html` extends Material's real `main.html` — which is itself
just a one-line `{% extends "base.html" %}` pass-through, so this is a safe
override — to add `og:*` and `twitter:*` meta tags to every page via
`base.html`'s `extrahead` block (Material ships nothing here by default).

- **Title/description** come from each page's frontmatter (`title:`,
  `description:`) when set, falling back to `config.site_name` /
  `site_description` for pages without them (the homepage always uses
  `site_name`, since `docs/index.md` has no `title:`).
- **Image** is one static card, `docs/images/social-card.png` (1200×630,
  the standard OG size) — not per-page. It was composed as an HTML mockup
  (brand tokens, the lamplighter, the product tagline) and rendered with
  Playwright rather than a design tool; regenerate the same way if the
  brand or tagline changes.
- Add a `description:` to a page's frontmatter for a tailored social
  preview instead of the generic site description (see
  `docs/rac-spec/why-strict.md` for an example).

## Local development

```sh
pip install mkdocs==1.6.1 mkdocs-material==9.7.6
./scripts/vendor-docs.sh
mkdocs serve
```
