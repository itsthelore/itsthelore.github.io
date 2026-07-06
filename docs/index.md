---
template: home.html
hide:
  - navigation
  - toc
---

RAC is the engine underneath: **Lore** keeps a team's recorded
requirements, decisions, and designs as typed Markdown in the repo,
validates them in CI, and serves them read-only to coding agents over MCP.

```
pip install rac-core
```

## How it works

<div class="lore-steps" markdown="0">
  <div><span class="lore-step__num">01</span><h3>Record</h3>
    <p>Requirements, decisions, and designs live as typed Markdown in your repo,
    versioned next to the code.</p></div>
  <div><span class="lore-step__num">02</span><h3>Validate</h3>
    <p>CI rejects malformed artifacts, broken links, and references to superseded
    decisions before they land.</p></div>
  <div><span class="lore-step__num">03</span><h3>Serve</h3>
    <p>Your agent queries Lore over MCP — four read-only tools — and cites
    decisions by ID instead of violating them.</p></div>
</div>

> Ask your agent: *"Should I add a hard delete to the user model?"* — it calls
> Lore, finds your soft-delete decision, cites it by ID, and proposes the
> compliant change instead of reintroducing what you removed on purpose.

Serving happens over the [lore MCP server](rac-core/mcp.md); the
[`rac` CLI](rac-core/cli.md) covers validation, inspection, and ingestion.

## Why it's different

<div class="lore-grid" markdown="0">
  <div class="lore-card"><h3>Deterministic, not probabilistic</h3>
    <p>Retrieval makes no model calls and uses no embeddings. The same query
    returns the same answer, every run.</p></div>
  <div class="lore-card"><h3>Read-only by design</h3>
    <p>Agents cite decisions by ID; they can never mutate the store. Changes
    land only through human-reviewed pull requests.</p></div>
  <div class="lore-card"><h3>Plain Markdown in your repo</h3>
    <p>No database, no vendor lock-in. Your knowledge is versioned next to
    your code and readable without any tool.</p></div>
  <div class="lore-card"><h3>Enforced in CI, air-gap friendly</h3>
    <p>Broken links and superseded references are rejected before they land.
    Runs fully offline — nothing leaves your machine.</p></div>
</div>

## The ecosystem

<div class="lore-grid" markdown="0">
  <div class="lore-card"><h3>Lore (rac-core)</h3>
    <p>The engine: the rac CLI, validation gates, and the read-only lore MCP
    server. This is what you install.</p></div>
  <div class="lore-card"><h3>Proofkeeper</h3>
    <p>Turns each recorded capability into a re-runnable Playwright test,
    proposed back by pull request.</p></div>
  <div class="lore-card"><h3>Wayfinder</h3>
    <p>Deterministic prompt-complexity routing — a hard-or-easy call on every
    prompt, offline, no model call.</p></div>
</div>

Plus SDKs, editor integrations, CI actions, and benchmarks — see the
[full repository map](rac-core/ecosystem.md) or the
[itsthelore org on GitHub](https://github.com/itsthelore).

<p class="lore-footnote">Lore is built on RAC (requirements-as-code), the
open-source engine — <code>pip install rac-core</code> installs the CLI and
the <code>lore</code> MCP server together.</p>

<div class="lore-ctaband" markdown="0">
  <h2>Up and running in five minutes.</h2>
  <p>Install the CLI, scaffold your first artifact, connect your agent.</p>
  <nav class="lore-cta">
    <a class="lore-btn lore-btn--primary" href="rac-core/quickstart/">Quickstart →</a>
    <a class="lore-btn" href="https://github.com/itsthelore">View on GitHub</a>
  </nav>
  <p class="lore-footnote">Lore is open source and under active development.</p>
</div>
