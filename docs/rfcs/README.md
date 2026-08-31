# Requests for Comments

An RFC makes a decision **arguable in writing before it is expensive in code**. It is not a
persuasion document. It carries the strongest honest case for every live option, so the decider
chooses between real alternatives instead of between a favourite and a strawman.

An RFC is the argument. An [ADR](../adrs/README.md) is the ruling. A decided RFC always names the
ADR that records its outcome.

## Index

| #                                                        | Title                                          | Date       | Status  | Decided by                | Outcome                                                    |
| -------------------------------------------------------- | ---------------------------------------------- | ---------- | ------- | ------------------------- | ---------------------------------------------------------- |
| [0001](./0001-compiler-macros-for-the-authoring-surface.md) | Compiler macros for the Inkline authoring surface | 2026-08-31 | Decided | Project owner, 2026-08-31 | [ADR-010](../adrs/010-defineprops-joins-the-macro-family.md) |

## When an RFC is required

Any one of these triggers:

- **One-way door.** Costly to reverse: data model, public API contract, framework or language
  choice, a vendor with migration gravity.
- **Crosses lanes.** Two or more owners must change behaviour for it to work.
- **The bet exceeds about one person-week** and rests on a disputable assumption.
- **The same dispute has surfaced twice.** It was argued before and nobody wrote it down.

Not RFC material: reversible choices inside one owner's lane — decide, note the reasoning in the PR,
move on. Taste calls with no consequence gradient.

## Reversibility classes size the process

| Class | Door                                            | Process                                             |
| ----- | ----------------------------------------------- | --------------------------------------------------- |
| 1     | Two-way. Flag it off, delete it, cheap to unwind | A paragraph in the issue. Recording is optional.     |
| 2     | Expensive to reverse. Weeks to unwind           | RFC-light: the template below, 2-day comment window |
| 3     | One-way. Public contracts, data semantics       | Full RFC, 3-day window, explicit owner sign-off      |

Classify first. The class is itself reviewable. Most process pain comes from treating Class 1 like
Class 3, or Class 3 like Class 1.

## Rules

- **Numbering.** Sequential, zero-padded to four digits, never reused. ADRs use three digits, so a
  bare number is never ambiguous between the two archives.
- **The steelman bar.** Each option is written so that option's advocate would endorse it as
  accurate. If you cannot write a genuine case for an option, either it is not a real option — drop
  it and say why — or you do not understand it yet. A strawman "Option B" is the RFC-shaped version
  of not writing an RFC.
- **Status.** `Draft` → `In review` → `Decided` | `Superseded by RFC-NNNN`.
- **The clock is in the header and it is defended.** An RFC without a comment window becomes a
  parking lot.
- **Prior art first.** Search this archive and `docs/adrs/` before drafting. Superseding an old
  decision means engaging its recorded reasoning, not ignoring it.
- **The RFC recommends. The project owner decides** — including against the recommendation. Either
  way the decision-log line is written, the status flips to `Decided`, and an ADR records the
  outcome.
- **Superseded RFCs stay in the repo** with a pointer forward. The archive is the point.

## Template

```markdown
# RFC-0042: <the decision, as a question or a proposal>

Status: Draft · Class: 1/2/3 · Comment window closes: <date>
Author: · Reviewers: · Informed by:

## Problem

What hurts, who it hurts, and why now. Separate the constraints that are fixed from the
constraints that are merely traditional.

## Options considered   ← minimum two, each steelmanned

### Option A: <name>
The case FOR, written so A's strongest advocate would sign it.
How it works · what it costs · what it risks · who has done this before.

### Option B: <name>
The same treatment. "Do nothing" is often a legitimate option, and keeping it
honest keeps the urgency honest.

## Trade-off summary

|                    | A   | B   | C   |
| ------------------ | --- | --- | --- |
| Delivery cost      |     |     |     |
| Operational cost   |     |     |     |
| Reversibility      |     |     |     |
| Risk, blast radius |     |     |     |

## Recommendation

One option, with the reasoning — and the strongest argument against it, stated fairly.
A recommendation that cannot survive its own counter-case is not ready.

## Open questions

Each with an owner and a resolve-by date.

## Decision log

<date> — decided by <who>: <what>, because <why>. → ADR-NNN filed.
```

## See also

- [../adrs/README.md](../adrs/README.md) — the decisions that came out of these arguments.
- [../architecture.md](../architecture.md) — how `.ink.tsx` becomes seven framework outputs.
- [../scope.md](../scope.md) — capability boundaries and what is deferred.
