# @inkline/components

The **single source of truth** for every Inkline component. All seven framework packages (`@inkline/react`, `@inkline/vue`, …) are populated by compiling files in this package's `src/`. This package itself is private (`"private": true` in [`package.json`](./package.json)) and is never published.

If you are reading this because you wanted to change a React (or Vue, or …) component: stop. Edit a `.ink.tsx` file under `src/components/` here, then rebuild.

For author-facing instructions, see [docs/authoring-components.md](../../docs/authoring-components.md).

## Layout

```
ui/components/
├── inkline.config.ts      # Compile targets + per-target output paths
├── styleframe.config.ts   # styleframe (design tokens) config
├── vite.config.ts         # Vite+ build + tests
├── src/
│   ├── index.ts           # Re-exports (intentionally minimal)
│   └── components/
│       └── <name>/
│           ├── headless/<I<Name>Base>.ink.tsx   # behavior, no styling
│           ├── styled/<I<Name>>.ink.tsx         # composes headless + styleframe class
│           └── stories/                         # I<Name>.ink.stories.ts meta + <Variant>.ink.tsx stories
└── dist/                  # styleframe runtime output (NOT the compiled components)
```

The compiled components do **not** land in `dist/` here. They land in `ui/<framework>/.inkline/` per the `targetOutDir` mapping in [`inkline.config.ts`](./inkline.config.ts). The `srcDir` option controls how much of the source path is preserved in the output — with `srcDir: "src"`, a source file at `src/components/badge/headless/IBadgeBase.ink.tsx` produces output at `.inkline/components/badge/headless/IBadgeBase.vue`:

```ts
srcDir: "src",
targetOutDir: {
  react:   "../react/.inkline",
  vue:     "../vue/.inkline",
  svelte:  "../svelte/.inkline",
  solid:   "../solid/.inkline",
  angular: "../angular/.inkline",
  qwik:    "../qwik/.inkline",
  astro:   "../astro/.inkline",
}
```

The config's `barrels` option also writes three barrel files into each target's `.inkline/`: `index.ts` (styled components), `headless.ts` (headless parts), and `stories.ts` (namespace re-exports of the generated stories). The framework packages' `src/` and build entries point at these.

## Build

```bash
pnpm build   # vp build && inkline compile 'src/**/*.ink.tsx' --config inkline.config.ts --no-clean
pnpm dev     # inkline compile 'src/**/*.ink.tsx' --config inkline.config.ts --watch
```

`vp build` first compiles styleframe artifacts; `inkline compile` then runs the [`@inkline/cli`](../../tooling/cli/) compile command for every target. The output is written directly into the framework packages' `.inkline/` directories, which their `src/index.ts` re-exports.

## Headless / styled split

Every component ships in two variants under its own directory:

- **`headless/I<Name>Base.ink.tsx`** — structure, slots, props, events. No design tokens, no styleframe class names. Behavior + accessibility. One per part; this is what consumers swap in if they want to ship their own styling.
- **`styled/I<Name>.ink.tsx`** — composes the headless part(s) and applies styleframe-generated classes via `virtual:styleframe`.

Example: [`src/components/badge/`](./src/components/badge/) — the canonical single-part pattern to copy. The headless variant declares `slots: { default: {} }` so consumers can override content via slotting; the styled variant pulls `badgeRecipe(props)` from `virtual:styleframe` to produce the class name.

All current components (headless and styled sources alike) declare `meta: { headless: true }`. On Angular this opts into attribute-selector emission: the headless root element becomes the Angular host (e.g. `button[ink-button-base]`), and a styled component whose root is a single headless part collapses onto that host with the recipe class merged — zero wrapper element. The element-selector `<ink-*>` wrapper is still emitted alongside (dual selector). See [`ui/angular/AGENTS.md`](../angular/AGENTS.md).

**A styled component may compose _all_ of a family's headless parts into one component** — there is one styled component per family, not one per part. [`src/components/input/`](./src/components/input/) is the model: the five `headless/IInput*Base` parts (shell, control, textarea, prefix, suffix) are composed by a single [`styled/IInput.ink.tsx`](./src/components/input/styled/IInput.ink.tsx). Optional addon slots are gated with `<Show when={hasSlot("prefix")}>` so an unused addon emits nothing; on Qwik/Angular (no runtime slot presence) `hasSlot` is `true` and the empty wrapper is collapsed by `:empty` rules in [`IInput.styleframe.ts`](./src/components/input/styled/IInput.styleframe.ts). All recipes for the family are registered in that one `.styleframe.ts`.

## Stories

Stories live under `src/components/<name>/stories/` — an `I<Name>.ink.stories.ts` meta plus `.ink.tsx` render helpers — and are compiled per-framework by the same [`inkline compile`](../../tooling/cli/AGENTS.md) run, which writes generated CSF stories (and the `stories.ts` barrel) into each target's `.inkline/`. See [docs/authoring-components.md](../../docs/authoring-components.md) → "Stories".

## Tests

`vp test`. Tests live colocated next to source as `<name>.test.ts`. Component-level tests typically use [`@inkline/test-utils`](../../tooling/test-utils/) to mount the compiled output across multiple targets and assert HTML equivalence.

For compiler-level coverage (you're exercising a new compiler feature), prefer adding a fixture under [`core/compiler/src/__fixtures__/`](../../core/compiler/src/__fixtures__/) instead — keep this package focused on UI behavior, not compiler regressions.

### `.ink.tsx` coverage

`vp test --coverage` reports real line/branch coverage on the authored `.ink.tsx`. The Angular SSR helper ([`src/components/angular-ssr-helper.ts`](./src/components/angular-ssr-helper.ts)) drives each mounted component through the React target via `coverInkViaReact`; V8 instruments the generated JS and inlined source maps remap that execution back onto the `.ink.tsx`. It is wired into `mountStyledOnAngular`, so any test that SSR-mounts a styled component contributes coverage automatically — no per-test setup, and it is a no-op when coverage is off.

The config in [`vite.config.ts`](./vite.config.ts) deliberately leaves `coverage.include` **unset**: `.ink.tsx` is not a real module, so listing it would make the v8 provider's "uncovered files" pass parse it and throw `PARSE_ERROR`. Only components that actually render appear — the remap introduces them. Branch/statement precision is coarse today (a whole expression compiles to one source span), so a fully-exercised component can still read below 100%.

## When you change a component

1. Edit `src/components/<name>/{headless,styled,stories}/*.ink.tsx`.
2. Rebuild: `pnpm build` (or rely on `pnpm dev --watch`).
3. Verify it works across all seven targets: `pnpm run storybook` from the repo root (concurrently runs compile + per-framework Storybook + aggregator).
4. Add a changeset for **each affected framework package** (`@inkline/react`, `@inkline/vue`, …) — the change ships through the per-framework packages, not through this private package.

## When you add a new component

1. Create `src/components/<name>/{headless,styled,stories}/`.
2. Author the headless variant first; verify it compiles to all seven targets.
3. Author the styled variant; rebuild.
4. Add stories per variant.
5. Re-export from [`src/components/index.ts`](./src/components/index.ts) — the per-framework `.inkline/` barrels (`index.ts`, `headless.ts`, `stories.ts`) are generated automatically.
6. Add a changeset for the seven framework packages (assuming a meaningful release).

## Pitfalls

- **Do not edit anything under `ui/<framework>/.inkline/` or `ui/<framework>/.styleframe/`.** Both are rebuilt on every compile; your edits will be lost.
- **The `dist/` here is styleframe runtime output, not the component compile output.** Don't confuse the two.
- **`virtual:styleframe` imports require the styleframe plugin in the consumer's Vite config.** The per-framework packages set this up. If a new build path skips it, styling will be missing at runtime.

## See also

- [docs/authoring-components.md](../../docs/authoring-components.md) — the contributor walkthrough.
- [docs/architecture.md](../../docs/architecture.md) — what the compiler does with the `.ink.tsx` source.
- The seven `ui/<framework>/AGENTS.md` files — what each output package re-exports.
- [`tooling/cli/AGENTS.md`](../../tooling/cli/AGENTS.md) — the `compile` command (components + stories) invoked by this package's scripts.
