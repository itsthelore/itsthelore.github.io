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

Brand assets (`overrides/home.html`, `docs/stylesheets/extra.css`,
`docs/fonts/`, `docs/images/favicon.png` + `lamplighter.png`) are one-time
copies of `rac-core`'s `rac-localview` design system (see that repo's
`rac-localview/DESIGN.md` for the underlying rules) and its existing MkDocs
theme setup — this org site now owns the canonical copies per ADR-092
("the brand lives at the org").

Adding a new product section:

1. Add a `vendor_repo <slug> <repo> <ref> <path>` line to
   `scripts/vendor-docs.sh`.
2. Add its pages to the `nav:` list in `mkdocs.yml`.
3. Add a card to the "constellation" grid in `docs/index.md`.

## Local development

```sh
pip install mkdocs==1.6.1 mkdocs-material==9.7.6
./scripts/vendor-docs.sh
mkdocs serve
```
