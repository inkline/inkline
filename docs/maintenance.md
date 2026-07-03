# Documentation maintenance

How we keep `AGENTS.md` and `docs/*.md` from drifting away from the code they describe.

## Core principle: pointers, not duplicates

Most drift comes from documentation that _restates_ config or code that lives elsewhere. We design against it at the source: docs **point at** canonical locations (`vite.config.ts:lint`, `package.json:scripts`, `core/compiler/src/...`) rather than re-state their contents. If a reader needs the exact rule, they read the config. If they need the _intent_, they read the doc.

- ✅ "Lint config lives in [`vite.config.ts`](../vite.config.ts) `lint`. OXLint with `typeAware: true`."
- ❌ "Lint ignores `.context/**`, `.old/**`, `core/compiler/src/__fixtures__/**`, …" — this re-states config and will drift.

When writing or reviewing docs, ask: _if I removed this paragraph and replaced it with a link to the source, would the reader lose anything important?_ If no, replace it with the link.

## Five defenses in depth

| #   | Defense                                   | Where it lives                                                                             |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | Pointers, not duplicates                  | This principle, in every doc                                                               |
| 2   | Automated link/path integrity check       | [`tooling/agents-check`](../tooling/agents-check/) — Vitest, runs in the standard test job |
| 3   | PR template with "docs touched?" reminder | [`.github/pull_request_template.md`](../.github/pull_request_template.md)                  |
| 4   | Selective generation for stable lists     | Deferred; revisit when a specific drift bites                                              |
| 5   | Quarterly audit                           | Calendar event; see "Audit checklist" below                                                |

## Cross-references: if you change X, update Y

Use this table when reviewing your own PR. If the left column changed, check the right column.

| If you change…                                                                                                            | …consider updating                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The compiler's public exports ([`core/compiler/src/index.ts`](../core/compiler/src/index.ts))                             | [`core/compiler/README.md`](../core/compiler/README.md), [`core/compiler/AGENTS.md`](../core/compiler/AGENTS.md), [architecture.md](./architecture.md) |
| The diagnostic registry ([`core/compiler/src/core/diagnostics/codes.ts`](../core/compiler/src/core/diagnostics/codes.ts)) | The diagnostics table in [`core/compiler/README.md`](../core/compiler/README.md) (until generation lands)                                              |
| The CLI command surface ([`tooling/cli/`](../tooling/cli/))                                                               | [`tooling/cli/AGENTS.md`](../tooling/cli/AGENTS.md), [`core/compiler/README.md`](../core/compiler/README.md) "CLI" section                             |
| Target registry ([`core/compiler/src/codegen/registry.ts`](../core/compiler/src/codegen/registry.ts))                     | [architecture.md](./architecture.md), the "Available targets" table in [`core/compiler/README.md`](../core/compiler/README.md)                         |
| `pnpm-workspace.yaml` or top-level directory shape                                                                        | [AGENTS.md](../AGENTS.md), [conventions.md](./conventions.md) → "Workspace layout"                                                                     |
| Root `package.json` scripts                                                                                               | [contributing.md](./contributing.md), [AGENTS.md](../AGENTS.md) → quick start                                                                          |
| [`vite.config.ts`](../vite.config.ts) (lint, fmt, staged, run)                                                            | [conventions.md](./conventions.md) (only if the _kind_ of tooling changes — not for ignore-list edits)                                                 |
| `.changeset/config.json`                                                                                                  | [release-process.md](./release-process.md)                                                                                                             |
| Storybook port assignments or topology                                                                                    | [contributing.md](./contributing.md), [`apps/storybook/AGENTS.md`](../apps/storybook/AGENTS.md), the per-framework UI AGENTS.md files                  |
| Adding/removing a workspace package                                                                                       | [AGENTS.md](../AGENTS.md), [architecture.md](./architecture.md) "Dependency layering", create a new `AGENTS.md` for the package                        |
| Adding a new compilation target                                                                                           | [architecture.md](./architecture.md), [`core/compiler/AGENTS.md`](../core/compiler/AGENTS.md), [adding-a-target.md](./adding-a-target.md)              |

This list itself is a duplication risk — keep it short, prefer adding `[[link]]`s in docs over expanding the table.

## Automated link integrity check

Implemented as [`tooling/agents-check/src/link-integrity.test.ts`](../tooling/agents-check/src/link-integrity.test.ts): a single Vitest test that walks every `AGENTS.md` (repo-wide) plus `docs/*.md` and `.github/*.md`, extracts relative markdown links (code fences stripped, fragments dropped), and asserts each target exists on disk. The test fails the standard CI test job on any miss. Catches the dominant failure mode (renames and deletes) automatically.

This check does **not** verify semantic accuracy. A doc that says "the lint config uses `typeAware`" still passes if `typeAware` is gone from the source — the _link_ still resolves. Semantic drift is the audit's job (below).

## PR template

[`.github/pull_request_template.md`](../.github/pull_request_template.md) carries a small checklist. The key item asks whether the PR changes public API, build flow, conventions, or repo structure, and if so, whether the relevant `AGENTS.md` / `docs/` files were updated. Soft enforcement; the goal is to raise the question on every PR.

## Audit checklist (quarterly)

Once per quarter, walk this list against current source:

1. **[AGENTS.md](../AGENTS.md)** — does the workspace map match `pnpm-workspace.yaml`? Are the listed `vp` commands still the right surface?
2. **[architecture.md](./architecture.md)** — do the linked pipeline pass files still exist with the documented responsibilities? Do the listed targets match [`codegen/registry.ts`](../core/compiler/src/codegen/registry.ts)?
3. **[conventions.md](./conventions.md)** — does the "Tooling" table match what's actually wired in `vite.config.ts` and `package.json`?
4. **[contributing.md](./contributing.md)** — do the dev-loop commands still produce a working environment? Walk the new-contributor flow end-to-end.
5. **[release-process.md](./release-process.md)** — does the changeset workflow still match `.github/workflows/changesets.yml`?
6. **[authoring-components.md](./authoring-components.md)** — does the canonical example (badge) still exist? Are the listed primitives still exported from `@inkline/core`?
7. **Per-package `AGENTS.md`** — for each, does the package still exist? Do the entry-point claims match `package.json` `main`/`module`/`exports`?

Record findings in a tracking issue; clean up in a single docs PR.

## When to defer

If a section is starting to feel like a duplicate-prone list (e.g. a registry, a code-mapped table), do not try to maintain it by hand. Either:

- Replace it with a one-line pointer to the source file, or
- File a follow-up to generate it from source as part of `vp build` (see "Selective generation for stable lists" above).

## See also

- [conventions.md](./conventions.md) — what conventions these docs enforce.
- [contributing.md](./contributing.md) → "Pull requests" — the soft expectation that docs travel with code.
- [AGENTS.md](../AGENTS.md) — the entry point this maintenance protects.
