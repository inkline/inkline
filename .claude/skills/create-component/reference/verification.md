# Verification commands & known-noise caveats

The toolchain is **Vite+ (`vp`)** — OXLint for lint, Oxfmt for format, Vitest for tests. **Never** ESLint or Prettier. Run package-scoped commands from `ui/components/` unless noted.

## The command ladder

| Goal                                           | Command                                          | Where                                   |
| ---------------------------------------------- | ------------------------------------------------ | --------------------------------------- |
| Compile `.ink.tsx` → all 7 targets (+ stories) | `pnpm build` (= `vp build && inkline compile …`) | `ui/components/`                        |
| Recompile on change                            | `pnpm dev` (= `inkline compile … --watch`)       | `ui/components/`                        |
| Run unit tests                                 | `vp test`                                        | `ui/components/` (or repo root for all) |
| Tests with coverage                            | `vp test --coverage`                             | `ui/components/`                        |
| Format + lint + typecheck                      | `vp check` (add `--fix` to autofix)              | repo root                               |
| Format only / lint only                        | `vp fmt` / `vp lint`                             | repo root                               |
| Full CI gate (build + check + test)            | `vp run ready`                                   | repo root                               |
| All 7 framework Storybooks side-by-side        | `pnpm run storybook`                             | repo root                               |

`pnpm build` runs `vp build` (compiles styleframe artifacts) first, then `inkline compile` (emits every target into `ui/<framework>/.inkline/` per `inkline.config.ts`) and regenerates per-framework CSF3 stories. A component's behavior is verified primarily by **`vp test`** (which compiles in-memory via `@inkline/test-utils`) — you do not need a full `pnpm build` to run tests, but you do need it before Storybook reflects source changes.

## Known noise — do NOT chase these

- **`vp check` reports ~290 pre-existing `TS17004` errors on `.ink.tsx` fixtures.** This is a standing baseline, not something your change introduced. **Trust `vp test`** for whether the component is correct; don't try to "fix" these.
- **Expected compiler notices** for components using two-way binding or `hasSlot` gating: `INK0045` (Astro two-way, one per binding) and `INK0068` (Qwik + Angular `hasSlot`, exactly 2). Tests assert these explicitly. Anything else in `result.diagnostics` is a real problem.
- **Compiler-internal edits** (changing codegen in `core/compiler`) require `vp pack` in `core/compiler` before `inkline compile` / Storybook reflect them. **Not relevant when only authoring a component** — only if you also touched the compiler.
- **Angular SSR sorts recipe class keys alphabetically**, so real-DOM test regexes must expect the sorted order (e.g. `class="input input--color-light input--size-md"`).

## What "verified" means per phase

- **implement**: `pnpm build` emits all 7 targets with only the expected notices (`INK0045`/`INK0068`); no `INK0120`/`INK0060`/`INK0050` etc.
- **stories**: `pnpm build` regenerates CSF3 without error; `pnpm run storybook` renders the component across targets.
- **test**: `vp test` green; `vp test --coverage` shows ~100% line+branch on the component's own executable code.
- **final gate**: `vp run ready` green (build + check + test). Remember the `TS17004` fixture baseline when reading `check` output.
