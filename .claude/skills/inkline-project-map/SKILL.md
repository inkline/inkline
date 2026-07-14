---
name: inkline-project-map
description: Ground-truth map of the Inkline monorepo — packages, layout, commands, conventions, known traps, and the styleframe ecosystem. Read before any work in the inkline codebase.
---

# Inkline project map

Inkline: a write-once, compile-everywhere component framework. Author components once in `.ink.tsx` (signal-based reactivity); the compiler emits idiomatic **React, Vue 3, Svelte 5, Solid, Angular, Qwik, and Astro** output. **No `@inkline/core` runtime ships to consumers** — the authoring package is inert stubs the compiler erases. Repo: `github.com/inkline/inkline`. Monorepo: pnpm 11 workspaces + **Vite+ (`vp` CLI)**. Node ≥22.12. All packages at `0.0.0` — pre-release; nothing is published to npm yet.

## Layout

```
core/      core (authoring stubs + JSX runtime), compiler (TSX → 7 targets via typed IR),
           config-loader (c12), plugin (unplugin, 6 bundlers), inkline (public barrel + bin)
tooling/   cli (citty: compile/check/init/add), storybook (defineStories + CSF generator),
           test-utils (cross-target harnesses), agents-check (doc link-integrity test)
testing/   e2e — Playwright cross-framework visual parity (pixel-diff vs live React reference)
ui/        components (single source of truth, private) + react/vue/svelte/solid/angular/
           qwik/astro (published output packages; compiled code lands in .inkline/)
apps/      storybook (composition aggregator :6100 over the 7 framework Storybooks
           :6006–:6012), website (docs site — today a Vite vanilla placeholder)
docs/      architecture, conventions, contributing, release-process, maintenance, authoring
.changeset/  pending changesets    .github/  ci.yml + changesets.yml
.old/      archived v0 codebase — read-only reference, never edit or link into
```

Catalog today (snapshot 2026-07-12 — verify with `ls ui/components/src/components`): **5 component families** — badge, button, field-group, hamburger-menu, input — 9 headless parts, 5 styled components, 13 barrel exports. The catalog build-out is the core mission.

## Commands (root)

```bash
vp install                   # setup (pnpm install + git hooks)
vp run ready                 # build + check + test — the CI gate shape
vp check | vp test | vp lint | vp fmt   # check = fmt + lint + typecheck
pnpm run storybook           # compile watcher + 7 framework Storybooks + :6100 aggregator
pnpm run test:e2e            # Playwright visual parity (boots/reuses the storybook)
vp test --coverage           # per-package; full local runs enforce ~100% thresholds
cd ui/components && pnpm build   # compile .ink.tsx → all 7 targets (+ stories CSF)
```

Per-package: `vp test` / `vp check` / `vp pack` (library builds) / `vp build` (app builds). OXLint + Oxfmt via `vp` — **not ESLint, not Prettier**.

## Conventions

- **Commits**: conventional, package-scoped — `feat(compiler): …`, `fix(components): …`, `ci: …`.
- **Tests**: colocated `<file>.test.ts` (components: `<file>.ink.test.ts`). Never a separate `tests/` dir. Playwright e2e is the one exception (own package, `test:e2e` script so `vp test` never collects it).
- **Changesets**: every change to a published package needs one. **Ignore list**: `website`, `@inkline/components` — component changes ship through the **framework packages**, so one component change = changesets for each affected `@inkline/<framework>`.
- **Generated dirs — never hand-edit**: `ui/<framework>/.inkline/`, `ui/<framework>/.styleframe/`, all `dist/`, `coverage/`, `storybook-static/`.
- Repo guidelines (root AGENTS.md): think before coding, simplicity first, surgical changes, goal-driven execution. Enforced at review.

## Known traps

1. **Doc drift is real here.** Live examples: several AGENTS.md files say output lands in `generated/` — the real directory is **`.inkline/`** (see `ui/components/inkline.config.ts`); the compiler README's CLI section describes `build`/`diagnose` while the shipped commands are `compile`/`check`/`init`/`add`; its "v0 limitations" still lists Angular/Qwik/Astro as deferred though all 7 targets ship; `docs/authoring-components.md` has drifted from the live badge/button/input source. **Trust source over docs**; when they disagree, proceed from source and file a `docs-drift` issue.
2. **`vp check` fixture noise**: a standing baseline of ~290 pre-existing `TS17004` errors on `.ink.tsx` compiler fixtures. Not yours. Trust `vp test` for correctness; never try to "fix" the baseline in passing.
3. **Stale dist bites consumers.** The CLI, Storybook, and `ui/components` consume `core/compiler` (and `core/core`) from `dist/`. After editing compiler source, run `vp pack` in `core/compiler` before expecting `inkline compile`/Storybook to reflect it.
4. **Two compile paths diverge by design**: the CLI `inkline compile` path (writes files into `.inkline/`, generates barrels + per-framework story CSF) vs the `@inkline/plugin` path (in-memory `compileIncremental` transform; no barrels, no stories). "Works via CLI" ≠ "works via plugin" — and the plugin has **zero direct tests** today.
5. **Per-target test isolation is enforced**: one test file per target under `codegen/targets/<name>/`, never a loop over a target list (`testing/per-target-tests.test.ts` fails CI on violations). Only the scenario layer compiles across all targets at once.
6. **e2e boot is picky**: use `pnpm run storybook:test` (no compile watcher — it races cold boots with `ENOTEMPTY`), kill stale processes on ports 6006–6012/6100 first, wait for :6100. React is the live reference — no committed baselines.
7. **Expected compiler notices are part of the contract**: `INK0045` (Astro two-way) and `INK0068` (Qwik/Angular `hasSlot`) are asserted by tests. Anything else in diagnostics is a real defect. Full registry: `core/compiler/src/core/diagnostics/codes.ts` (INK0001–INK0120).

## The styleframe ecosystem

Inkline's styling is **styleframe** (`github.com/styleframe-dev/styleframe`, local `~/Workspace/styleframe`) — the sibling project, with its own agent guild. Inkline is styleframe's **customer zero**: styled components call `use<Name>Recipe` from `@styleframe/theme` in `.styleframe.ts` files; versions are pinned in the `pnpm-workspace.yaml` catalog (`@styleframe/theme ^3.8.x`, `styleframe ^3.9.x` — verify before relying). Recipe gaps upstream block components downstream; upstream breaking changes arrive with migration notes and get same-day triage (Bridge is the ambassador). The styleframe first-party packages are excluded from pnpm's `minimumReleaseAge` supply-chain guard on purpose; everything else is guarded — treat new exclusions as decisions, not conveniences.

Direction: `~/Workspace/uxfront` — the future AI design-system builder (Studio) on top of Inkline + styleframe. Strategic context, not yet implementation.
