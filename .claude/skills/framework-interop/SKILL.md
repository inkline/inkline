---
name: framework-interop
description: The seven framework output packages and the boundaries Inkline lives on — exports contracts, peer-dep/version matrix, per-target capability gaps, idiom fidelity, and the styleframe upstream relationship. Use for ui/<framework> work, framework upgrades, and boundary coordination.
---

# Framework interop

Inkline sits on two borders. **Downstream**: one compiled component must feel native in seven framework ecosystems. **Upstream**: every styled component consumes styleframe recipes. Both borders are trust surfaces — nothing crosses them silently degraded.

## The seven crossings (`ui/<framework>/`)

| Package            | Storybook | Runtime peers | Notes                                                    |
| ------------------ | --------- | ------------- | -------------------------------------------------------- |
| `@inkline/react`   | :6006     | react ≥18     | reference target for e2e parity                          |
| `@inkline/vue`     | :6007     | vue ≥3        | SFC `<script setup>` output                              |
| `@inkline/svelte`  | :6008     | svelte 5      | runes (`$state`/`$derived`/`$bindable`)                  |
| `@inkline/solid`   | :6009     | solid-js      | matches React pixel-exact today                          |
| `@inkline/angular` | :6010     | angular 21    | `ink-*` attribute selectors, `klass` input, SSR-verified |
| `@inkline/qwik`    | :6011     | qwik 2.0-beta | storybook-framework-qwik is a canary — see gaps          |
| `@inkline/astro`   | :6012     | astro         | static SSR — one-way binds, inert custom events          |

Anatomy is identical everywhere: `src/index.ts` is one line (`export * from "../.inkline/index.ts"`); `.inkline/` (compiled components + barrels) and `.styleframe/` are machine output — **nobody edits them**; hand-maintained surface is `package.json`, `vite.config.ts`, `tsconfig.json`, `.storybook/`. Exports map: `.` (styled), `./headless`, `./stories`, `./css`, `./package.json` — this map is the public contract; changing it is semver-major territory. `prestorybook` recompiles the source for that target so Storybook never shows stale components.

Framework versions are pinned in the `pnpm-workspace.yaml` catalog (React 19.2, Vue 3.5, Svelte 5.5x, Solid 1.9, Angular 21.2, Astro 6.4, Storybook 10.4 at snapshot). **Framework upgrades are deliberate migrations**: bump catalog → rebuild → conformance + visual parity → note behavior changes; when a new framework version changes the idiomatic output shape, that's a codegen change (coordinate with @atlas).

## Idiom fidelity (the downstream promise)

Emitted code must read like a native wrote it. Enforcement: per-target **conformance specs** (typecheck + framework-native lint of emitted files — the framework ESLint configs exist in the repo _only_ for this; the repo itself lints with oxlint) and the scenario layer's DOM equivalence. Known baseline: the Astro conformance-lint has ~74 pre-existing parse failures — not regressions.

**Per-target capability gaps are documented, diagnosed, never silent** — the pattern to preserve:

- Astro is static: two-way binding degrades to one-way (INK0045), custom events are inert.
- Qwik/Angular lack runtime slot presence: `hasSlot` compiles to `true` (INK0068) + the `:empty` CSS collapse convention.
- Angular: kebab `ink-*` selectors, `klass` class-merge, host-collapse variants; native attrs (e.g. `hidden`) must be explicit base props — fallthrough breaks on wrapper variants.
- Solid: `undefined` renders as `"undefined"` on native string props — sources coalesce with `?? ""`.
- Qwik Storybook: output is correct (resumable `componentQrl`s serve over HTTP) but `storybook-framework-qwik` (canary, Qwik 2.0-beta) resumes an empty container — an upstream integration issue, tracked, not a codegen bug.

A new gap must land as: compiler diagnostic (INKxxxx) + per-target note in docs + (where possible) a CSS/authoring convention that neutralizes it. Losing a capability quietly destroys consumer trust permanently.

## The styleframe border (the upstream relationship)

Inkline is **customer zero** of styleframe — the relationship runs both ways:

- **Inbound**: recipe/token breaking changes (axis renames, default changes) arrive with migration notes from the styleframe guild. Same-day triage: assess blast radius across `.styleframe.ts` files + recipe-prop types (`XRecipeProps` flows into component props!), land the migration, changeset the framework packages if emitted CSS changes.
- **Outbound**: recipe gaps blocking the catalog (toast, combobox, date-picker, data-table…) are filed upstream with the component spec attached — Inkline's component API research is styleframe's best requirements document. Never fork a local one-off for a family upstream is about to ship.
- Version bumps ride the catalog in `pnpm-workspace.yaml`; the styleframe first-party packages are deliberately excluded from pnpm's `minimumReleaseAge` guard (intentionally fresh, trusted).

## Story ids are an interop contract too

The story generator (`tooling/storybook`) keeps story ids identical across all 7 Storybooks — the e2e visual-parity suite drives every framework by React's id list. Renaming a story meta/variant changes ids in seven places and invalidates parity baselines; treat it like an API rename (migration note, @gauntlet heads-up).
