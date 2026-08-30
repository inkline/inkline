# Architecture Decision Records

An ADR records a decision that was **actually made** — the context that made it reasonable, the
decision itself, and the consequences we accepted, including the bad ones. The point is that nobody
pays for the same lesson twice.

## Index

| #                                                                     | Title                                                                   | Date       | Status     | Tags                      |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------- | ---------- | ------------------------- |
| [001](./001-compiler-dx-invests-in-diagnostics.md)                    | Invest compiler DX in diagnostics, ordered coverage → rendering → prose | 2026-07-27 | Accepted   | compiler, cli, dx         |
| [002](./002-compiler-export-surface-tiers.md)                         | Tier the `@inkline/compiler` export surface via subpath exports         | 2026-07-29 | Accepted   | compiler, api, semver, dx |
| [003](./003-typed-jsx-intrinsic-elements-from-a-vendored-upstream.md) | Type `JSX.IntrinsicElements` from a vendored upstream, behind an alias  | 2026-07-29 | Accepted   | core, authoring, dx       |
| [004](./004-inkline-check-does-not-type-check.md)                     | `inkline check` does not type-check; `tsc` owns types                   | 2026-07-28 | Accepted   | cli, types, dx            |
| [005](./005-generated-component-authoring-types.md)                   | Keep `InkComponent`'s index signature; generate authoring types         | 2026-08-06 | Superseded | core, compiler, authoring |
| [006](./006-inferred-component-authoring-types.md)                    | Authoring types are inferred from `defineComponent`, not generated      | 2026-08-08 | Accepted † | core, compiler, authoring |
| [007](./007-website-ships-as-a-static-site.md)                        | `apps/website` ships as a fully static site on Vercel                   | 2026-08-08 | Accepted   | website, deploy, infra    |
| [008](./008-authoring-surface-is-inferred-from-options-alone.md)      | The inferred surface comes from options alone, not the setup body       | 2026-08-11 | Accepted   | core, compiler, authoring |
| [009](./009-emitted-output-is-typechecked-by-a-subprocess-tsc.md)     | Emitted output is typechecked by a subprocess `tsc`, on react and solid | 2026-08-27 | Accepted   | compiler, testing, types  |

† ADR-006 is superseded **in part** by ADR-008 — its Decision 1 mechanism claim and its Option D
uniqueness claim, only. Decisions 2–7 remain the live decisions, so its status stays `Accepted`
rather than flipping. This is the sole exception to the superseding rule below, and it is noted at
the top of ADR-006 itself.

If you arrived here from a link to `008-emitted-output-is-typechecked-in-the-unit-suite.md`: that
draft was never merged, its number was subsequently taken by ADR-008 above, and the decision it
described was never implemented.
[ADR-009](./009-emitted-output-is-typechecked-by-a-subprocess-tsc.md) records what actually shipped.

## Rules

- **Immutable.** An ADR is append-only history. Never edit its substance to match new reality —
  that turns the archive into retroactive fiction. Typo and link fixes are fine.
- **Superseding.** Changed decision? Write a new ADR with `Supersedes: ADR-NNN`; flip the old one's
  status to `Superseded` and add `Superseded by: ADR-MMM`. The chain is the memory.
  When only part of an ADR is overturned and its remaining decisions are still live, say which part
  in both headers and leave the old status at `Accepted` — flipping the whole record would mislead as
  badly as the sentence being corrected. [ADR-006](./006-inferred-component-authoring-types.md) is the
  worked example.
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
