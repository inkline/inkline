# Architecture Decision Records

An ADR records a decision that was **actually made** — the context that made it reasonable, the
decision itself, and the consequences we accepted, including the bad ones. The point is that nobody
pays for the same lesson twice.

## Index

| #                                                                     | Title                                                                   | Date       | Status   | Tags                |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------- | -------- | ------------------- |
| [001](./001-compiler-dx-invests-in-diagnostics.md)                    | Invest compiler DX in diagnostics, ordered coverage → rendering → prose | 2026-07-27 | Accepted | compiler, cli, dx   |
| [002](./002-typed-jsx-intrinsic-elements-from-a-vendored-upstream.md) | Type `JSX.IntrinsicElements` from a vendored upstream, behind an alias  | 2026-07-29 | Accepted | core, authoring, dx |

## Rules

- **Immutable.** An ADR is append-only history. Never edit its substance to match new reality —
  that turns the archive into retroactive fiction. Typo and link fixes are fine.
- **Superseding.** Changed decision? Write a new ADR with `Supersedes: ADR-NNN`; flip the old one's
  status to `Superseded` and add `Superseded by: ADR-MMM`. The chain is the memory.
- **Statuses.** `Proposed` → `Accepted` → `Superseded` | `Deprecated`.
- **Numbering.** Sequential, zero-padded to three digits, never reused.
- **The "Bad" consequences section is mandatory.** An ADR with only upside is a press release.
- **Revisit triggers are written at decision time**, while judgment is cold — not retrofitted when
  the decision starts hurting.

## What gets an ADR

Any one of these qualifies:

- Hard or expensive to reverse.
- Others will build on the assumption.
- The losing option was real — the decision was genuinely contested.
- A decision **not** to do something. These prevent the most expensive re-litigations.
- An override of a recommendation, recorded with the same care as any other decision.

Not ADR material: implementation details inside one owner's lane, reversible defaults, taste.

## See also

- [conventions.md](../conventions.md) — code, file, test, and commit conventions.
- [architecture.md](../architecture.md) — how `.ink.tsx` becomes seven framework outputs.
- [scope.md](../scope.md) — capability boundaries and what is deferred.
