---
template: home.html
hide:
  - navigation
  - toc
---

## What it is

Your agent reintroduces an approach you rejected months ago. It rebuilds something you deliberately removed. The decision was written down — in an ADR nobody, human or agent, ever reopened.

Lore stores your requirements, decisions, designs, and roadmaps as typed Markdown in your repo, and serves them to Claude Code, Cursor, and Claude Desktop over MCP. The agent cites your decisions instead of violating them.

No AI in the core. No inference. No guessing. Just your team's recorded knowledge, in your Git, handed to the agent that needs it.

## Why this works

The code is structured, the tests are automated, the infrastructure is versioned — but the *reasoning* behind what you build is scattered across tickets, chats, and dead docs. Agents can't act on what they can't read, so they re-litigate settled decisions.

Lore puts that reasoning back in the repo as typed, connected artifacts, then serves it to the agent through a deterministic interface. You write the decision once, in Markdown; RAC validates it, links it, and makes it retrievable — durable context for both humans and AI, with no proprietary format and no hosted platform.

## The constellation

Lore is one brand, several repositories — each a concern, not a grab-bag ([topology decision](https://github.com/itsthelore/rac-core/blob/main/rac/decisions/adr-092-repository-topology.md)).

<div class="lore-below__grid" markdown>

<div class="lore-below__card" markdown>
### [rac-core →](rac-core/index.md)
The engine and CLI. Artifact schemas, validation, relationships, the MCP server. **Live.**
</div>

<div class="lore-below__card lore-below__card--disabled" markdown>
### rac-ci
CI delivery — Watchkeeper, Gatekeeper, and audit actions. **Coming soon.**
</div>

<div class="lore-below__card lore-below__card--disabled" markdown>
### rac-connectors
Inbound and outbound integrations. **Coming soon.**
</div>

</div>

## How Lore earns trust

- **No AI in the core.** Retrieval is deterministic: the same repo state and the same query always return the same result.
- **It dogfoods itself.** Lore's own planning corpus is validated by RAC in CI — if the tool's rules break the tool's own artifacts, the build fails.
- **Output is a contract.** Golden tests pin CLI and MCP output; any change to what the tools return is reviewed as a product change.

---

Lore is early and evolving quickly. Contributions, ideas, and experiments welcome — see the [rac-core repository](https://github.com/itsthelore/rac-core).

[GitHub org](https://github.com/itsthelore)
