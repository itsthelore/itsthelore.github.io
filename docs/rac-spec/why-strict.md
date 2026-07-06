---
title: "Requirements as Code: a strict semantic layer over OKF"
description: >-
  Why RAC specifies a strict, enforced semantic layer for prescriptive
  knowledge — identity, status lifecycle, typed relationships, write-time
  enforcement — on top of OKF's deliberately permissive carrier.
---

# Requirements as Code: a strict semantic layer over OKF

Three weeks ago, Google Cloud published the Open Knowledge Format — a
deliberately minimal, deliberately permissive convention for representing
organizational knowledge as a Git tree of Markdown files with YAML
frontmatter. One required field. Consumers are forbidden from rejecting a
bundle over unknown types, missing fields, or broken cross-links. It is a
good spec, and its permissiveness is the correct design for its job.

This essay is about why we built the opposite thing on top of it, and
published the specification for it today.

## The problem OKF doesn't try to solve

If you run coding agents seriously — Claude Code, Cursor, anything that
writes code against your repo — you have watched an agent confidently
re-introduce a decision your team explicitly ruled out six months ago. The
knowledge existed. It was in an ADR, or a design doc, or a Slack thread
someone summarized into Confluence. The agent didn't have it, or had a stale
version of it, or had it and had no way to know it had been superseded.

OKF addresses the first failure: it gives knowledge a portable,
agent-readable carrier. What it deliberately does not address — its own spec
says the meaning of a link between concepts is "conveyed by the surrounding
prose, not by the link itself" — is the semantics. Whether a document is
current or retracted, whether a link means implements or supersedes or
contradicts, whether an agent citing this artifact is grounding itself or
poisoning itself: OKF leaves all of that to producers and consumers to work
out.

For descriptive knowledge — table schemas, metric definitions, runbooks —
that's fine. Descriptive knowledge degrades gracefully. An agent reading a
slightly stale description of your orders table writes a slightly worse
query.

Prescriptive knowledge does not degrade gracefully. An agent citing a
superseded architecture decision re-introduces the exact mistake your team
already paid to rule out. The failure mode isn't degraded output; it's
confident regression, delivered with a citation.

## What rac-spec specifies

RAC (Requirements as Code) is the semantic layer for prescriptive
knowledge — requirements, decisions, designs — written on the same carrier
OKF standardizes. Today we're publishing rac-spec, the specification, as its
own versioned document, separate from rac-core, the reference implementation
that has been dogfooding it across 29 releases.

The spec formalizes four things the carrier layer leaves open:

**Identity that survives refactoring.** OKF's concept identity is the file
path. Paths break on rename, and a growing corpus gets refactored
constantly. RAC artifacts carry an explicit id; links resolve by id, and a
file move is a non-event.

**A closed status lifecycle.** Every artifact has a status from a closed
enum with defined legal transitions, including supersession: when a
decision is superseded, that fact is machine-readable, and a conformant
consumer MUST refuse to present the artifact as current. Not SHOULD. MUST.

**Typed relationships with referential integrity.** Links carry a relation
type from a closed vocabulary — `supersedes` (the one directional, acyclic
edge), the `related-*` family scoped by target type (decisions,
requirements, roadmaps, prompts, designs), and the external-reference edges
(`verified-by`, `applies-to`, `related-tickets`) that point outside the
corpus without skipping validation. The validator checks that targets exist
and that nothing references a retired decision. Where OKF says relationship
meaning lives in the surrounding prose, RAC says: agents cannot be trusted
to infer edge semantics from prose. That inference gap is precisely the
failure this spec exists to close.

**Enforcement with a severity model.** Every validation finding lands in
one of four severity tiers; tiers 1 and 2 are conformance-breaking and fail
CI, tiers 3 and 4 are advisory. The check-to-tier mapping is a normative
table in the spec, not an implementation detail. `rac gate` runs in CI and
rejects malformed artifacts, broken links, and references to superseded
decisions before the knowledge lands — write-time enforcement, because the
entire value of a system of record is that you can trust what's in it.

And one thing that follows from strictness: every corpus declares the spec
version it targets, and a consumer that encounters a version newer than it
supports fails with a diagnostic naming both versions. OKF has a version
declaration too, but pairs it with best-effort consumption; ours is paired
with refusal, because a strict validator that can't tell you why a corpus
fails is worse than no validator at all.

## Composition, not competition

A RAC corpus exports to a conformant OKF bundle with one command —
`rac export --okf`. Our extra frontmatter rides as producer-defined keys,
which OKF consumers are required to preserve. So any OKF consumer can read a
RAC corpus.

The reverse is not generally possible. You cannot take an arbitrary
permissive bundle and recover validated lifecycle state, typed relations,
and referential integrity that were never enforced at write time. That
asymmetry is the point: OKF standardizes the carrier; RAC specifies what one
specific, high-stakes category of knowledge needs the carrier to guarantee.

## What this is not

It is not a general knowledge format — that's OKF's job, and we compose
with it rather than replicate it. It is not a retrieval or RAG system;
fuzzy recall and deterministic verification are different tools, and they
stack (recall fuzzily elsewhere, verify here). It is not a project-management
or ticketing replacement. And it does not prescribe MCP or any serving
layer — the reference implementation serves over MCP, the spec doesn't
care.

It is also not a standard. It's a specification with exactly one
implementation, published so that a second one can exist. The spec repo is
versioned independently of the reference implementation, the vocabularies
are closed enums with a stated compatibility policy, and the conformance
section defines what a producer and a consumer must each do — everything a
second implementer needs and nothing they'd have to reverse-engineer from
our Python.

If you're running agents against team knowledge and you've hit the
confident-regression failure, the spec is at
[github.com/itsthelore/rac-spec](https://github.com/itsthelore/rac-spec/blob/main/SPEC.md),
the reference implementation is `pip install rac-core`, and the fastest way
to form an opinion is to run `rac validate` against the examples directory
and read what it rejects and why.
