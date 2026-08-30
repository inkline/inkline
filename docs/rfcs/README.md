# Requests for Comments

An RFC puts a **large upcoming change** on paper *before* it is built, while changing course is still
cheap: the context, the options with honest trade-offs, and a recommendation. It is argued on paper so
it does not have to be argued in production.

An RFC proposes. An [ADR](../adrs/) records what was actually decided. Every RFC that lands a decision
ends in one.

## Index

| #                                                                         | Title                                                         | Date       | Status   | Tags                      |
| ------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------- | -------- | ------------------------- |
| [001](./001-published-unbundled-source-reaches-its-styleframe-recipes.md) | How published unbundled source reaches its styleframe recipes | 2026-08-30 | Proposed | astro, packaging, styling |

Product RFCs that predate this directory live in [`docs/product/`](../product/) —
[content scope for the v5 documentation site](../product/docs-content-scope.md). New RFCs go here.

## Rules

- **What gets an RFC.** A change that spans multiple owners or systems, a new dependency or public
  surface, or anything hard to reverse. If the losing option is not real, you do not need an RFC — you
  need a PR.
- **Numbering.** Sequential, zero-padded to three digits, never reused. Shared with nothing.
- **Statuses.** `Proposed` → `Accepted` | `Rejected` | `Withdrawn` | `Superseded`.
- **Every option is steelmanned.** An option written only to be knocked down is a rigged review and
  wastes everyone's reading time. State the strongest honest case, then the costs.
- **Reversibility is declared up front.** A two-way door gets a short RFC and a fast decision; a
  one-way door gets the full treatment. Sizing the process is the author's job.
- **Claims are labelled** VERIFIED / INFERRED / ASSUMED, with the receipt. An unlabelled claim is
  read as speculation.
- **Timeboxed.** An RFC that has been open for a month without a decision is a graveyard. Withdraw it
  or force the call.
- **The decision is recorded elsewhere.** When an RFC is accepted, file the ADR; link both ways. Do
  not edit the RFC into a record of what happened — that is the ADR's job.

## See also

- [adrs/](../adrs/) — decisions actually made, and their consequences.
- [architecture.md](../architecture.md) — how `.ink.tsx` becomes seven framework outputs.
- [adding-a-target.md](../adding-a-target.md) — what a new compilation target has to satisfy.
