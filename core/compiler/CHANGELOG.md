# @inkline/compiler

## 0.1.0

### Minor Changes

- 78ea062: Add @inkline/core authoring API package with typed primitives (defineComponent, createSignal, createMemo, etc.), JSX runtime, and control-flow helpers. Support external import forwarding in the compiler codegen so non-framework imports (e.g. styleframe) are emitted into each target's output.
- 407c744: feat(compiler): collapse composite styled components with nested headless children (Angular)

  Generalizes the styled-over-headless collapse to composites whose styled component projects richer
  content — including other headless siblings — into its headless root's slot. Two new capabilities on
  the Angular target's collapse:
  - **Slot substitution**: the styled's own slot bodies project into the inlined headless root's `<Slot>`
    (replacing the `<ng-content>` one level), so the composite's content lands inside the collapsed host.
  - **Nested attribute-child rendering**: headless siblings in that content render as attribute-selector
    children (`<span ink-input-prefix-base>` rather than `<ink-input-prefix-base>`), zero wrapper, each
    importing its `HostComponent` variant.

  Existing single-child collapses (Button/Badge/FieldGroup/HamburgerMenu) are byte-identical. This is the
  codegen foundation for collapsing the Input family.

- 407c744: feat(compiler): collapse a model-bearing headless component onto its Angular host

  Extends the styled-over-headless collapse to headless components that own a two-way model + an event
  handler that writes it. The headless's event references its own model setter (e.g. `setOpen(...)` from
  `defineModel("open")`); the collapse now maps the child's setter names onto the same model so the
  merged host emits it correctly (`(click)="open.set(!open())"`), with the model declared under the
  styled component's binding.

  Flips **HamburgerMenu** to `meta.headless`: `<button ink-hamburger-menu ink-hamburger-menu-base>`
  carries the recipe classes, `aria-expanded`/`aria-controls`/`aria-label`, the `disabled` state, and the
  toggle click — zero wrappers. Only the Angular output changes (other six targets byte-identical).

- 407c744: feat(compiler): meta.headless + Angular attribute-selector host-extraction

  `defineComponent` accepts a new `meta: { headless?: boolean }` option, threaded through the parse
  pass into `IRComponent.meta` (IR_VERSION → 3, with a pure-bump 2→3 migration).

  On the **Angular** target, a `headless` component with a single static-element root now emits a
  second, **attribute-selector** `@Component` whose root element IS the host — `button[ink-button-base]`
  with the root's attrs/events extracted into `host: { … }` and a children-only template — so the
  native element carries the behavior with **no wrapper** (`<button ink-button-base>` instead of
  `<ink-button-base><button></button></ink-button-base>`). The original element-selector wrapper
  component is still emitted unchanged (dual selector), so `<ink-button-base>` keeps working as a
  `display: contents` wrapper.

  A `headless` component whose root is not a single static element (fragment/conditional) cannot be
  host-extracted; the target warns (**INK0111**) and emits only the element-selector wrapper.

  This is the compiler foundation for zero-wrapper Angular components; no shipped components opt in yet.

- 407c744: feat(compiler): collapse styled-over-headless into one zero-wrapper Angular component

  Builds on the headless host-extraction: a styled component marked `meta.headless` whose entire render
  is a single headless child now **collapses** onto that child's host element on Angular. The compiler
  parses the imported headless sibling (a cross-file **headless registry** on the codegen context) and
  inlines its root's host bindings + template into one attribute-selector `@Component`, merging the
  styled recipe class and tagging the host with the child's own selector:

  ```
  <button ink-button>  →  <button ink-button ink-button-base class="button button--color-primary …">…</button>
  ```

  The element-selector wrapper (`<ink-button>` → `display: contents`) is still emitted (dual selector),
  so existing usage is unchanged. Applied to **Button, Badge, and FieldGroup** (`meta.headless` added to
  their headless + styled sources). Only the Angular output changes — the other six targets are
  byte-identical. A styled root whose child can't be host-extracted (non-element/fragment root) warns
  (INK0111) and keeps only the wrapper.

  `@inkline/test-utils`' Angular SSR harness now mounts attribute-selector components (`tag[attr]` → a
  real `<tag attr>` host) and can select a named component export, and registers signal-input metadata
  for every class in a multi-class file.

- a86ba6d: feat(compiler): reactive Angular context provides + Astro context best-effort

  **Angular** could not provide a context value derived from a component's own signal — the value was
  emitted into the `@Component` decorator's `providers` array (`useValue: { disabled: disabled() }`),
  which is static metadata evaluated at class-definition time with no instance scope, so it threw
  `disabled is not defined` on module load. The provided signal is now **lifted into the DI factory**
  and exposed via a reactive getter/setter:

  ```ts
  providers: [
    {
      provide: FormContext.key,
      useFactory: () => {
        const disabled = signal(false);
        return {
          get disabled() {
            return disabled();
          },
          set disabled(v) {
            disabled.set(v);
          },
          size: "md",
        };
      },
    },
  ];
  ```

  The component injects the same object (`formContext = inject(FormContext.key)`) and reads/writes the
  signal through it, so the provider and every consumer of the token share one signal. Consumers are
  **unchanged** — `{{ form.disabled }}` reads the getter as a plain property and stays reactive.

  **Astro** has no client-side context runtime, so a consumed context now falls back to the context's
  exported default value as a documented best-effort (`const form = FormContext.defaultValue`) instead
  of referencing an undefined binding, and the context definition is exported (`export const
FormContext = { defaultValue: … }`) so consumer modules can import it.

- a86ba6d: feat(compiler): Angular signal inputs for reactive props + non-self-closing ng-content

  Two Angular-target correctness fixes surfaced by rendering the live Storybook:
  - **Props are now signal inputs.** Props were emitted as plain `@Input()` fields, but a
    `computed`/`effect` reading `this.color` captured it once at construction (before the input bound),
    so derived state (e.g. a styling recipe `computed(() => badge({ color: this.color }))`) never
    reacted. Props now emit as `color = input<T>()` / `input.required<T>()` / `input<T>(default)`, and
    every read uses the call form (`this.color()` in the class body, `color()` in the template) via a
    new `propSignals` rewrite rule. Derived state and templates now react to input changes.
  - **`<ng-content>` is no longer self-closing, and renders the slot fallback.** Self-closed
    `<ng-content … />` could be mishandled by Angular's JIT template parser; it is now
    `<ng-content>…</ng-content>` with the authored default-slot fallback as its projection default
    (Angular 18+). Component-instance tags with no slots are likewise emitted non-self-closing. A
    single styled component (label + recipe) now renders correctly.

  Note: composing a headless + styled component that forwards projected content through nested
  `<ng-content>` remains an Angular content-projection limitation (the inner component does not see the
  forwarded content as projected); that, and multi-instance `{ component }` story rendering, are tracked
  separately.

- 287b326: feat(compiler): render recipe-based styled components on the Angular target

  Styled components (ones that compose other components and pull classes from a `virtual:styleframe`
  recipe) now render correctly on Angular — previously the recipe classes were stranded on the wrong
  element and same-file children weren't declared. The Angular target now:
  - **Emits kebab-case `ink-*` selectors** (`IBadge` → `ink-badge`, `IInputControlBase` →
    `ink-input-control-base`) for both `@Component({ selector })` and every child tag, so components
    match when their tag passes through an HTML parser. (Breaking: the rendered custom-element tag
    names change — but styled components didn't render before this.)
  - **Merges a forwarded class onto the child's own root** via a synthesized `klass` input. Ivy never
    routes a `[class]` binding to an input, and a class on the host element alone styles the wrong box
    (the component root lives inside the host), so a parent's class travels through `klass` and the
    root element concatenates it with its own.
  - **Declares every instantiated component in `imports`** — same-file siblings (compiled to their own
    `.component.ts` modules) as well as cross-file imports — with a new conformance invariant that
    fails the build if a template references an undeclared `ink-*` tag.
  - **Re-exposes module-level imports** (e.g. styleframe recipes called inline in the template) as
    class fields, and **never self-closes a non-void element** (Angular's JIT rejects `<span … />`).

  `@inkline/test-utils` gains Angular SSR mounting (`@angular/platform-server`), so styled components
  are verified by real rendered HTML alongside React/Vue/Solid/Svelte.

- a86ba6d: Add Vue-style attribute fallthrough across all targets. A component's single host-element (or component-instance) root now inherits attributes passed by its parent: `class` is merged with the root's own class, and all other non-prop attributes (`id`, `aria-*`, `data-*`, event handlers) are spread onto the root. This makes the styled/headless composition work — a styled component's `styleframe` classes now reach the rendered DOM.
  - **React, Solid (`splitProps`), Svelte 5 (`$props()` rest), Qwik, Astro** — attributes are spread onto the rendered root element and `class` is merged there.
  - **Vue** — handled natively by `inheritAttrs`.
  - **Angular** — handled natively: a `class`/`[class]` passed to a component is applied to its host element (the component selector), not the inner template root.

  A new diagnostic (`INK0120`) warns when a parent passes a class to a same-module child whose root cannot inherit it (fragment / control-flow root).

- 993fa28: feat(cli): make the diagnostic report level configurable with `--report-level`

  The reporting floor was a hardcoded constant: `info` on a one-shot `inkline compile` and `warning`
  under `--watch`. A project that wanted a quieter CI build, or a developer who wanted to see the `info`
  notices the watch loop withholds, had no way to say so.

  `--report-level <error|warning|info>` and a `reportLevel` config key now set it, resolving
  `flag ?? config ?? default` exactly as `--target`, `--src-dir` and `--out-dir` do. A level reports
  itself and everything above it, so `warning` withholds notes. Both defaults are unchanged — `info`
  one-shot, `warning` under `--watch` — and the flag governs the watch loop too, which previously read
  the constant directly and so ignored it. An unusable value is reported as `INK0087`, a formatted
  diagnostic with help and a docs URL on the same path as a misspelled `--target`, and it is refused
  rather than coerced to the default; it is refused before `--clean` deletes anything.

  The summary line no longer under-reports what the level hid. `0 notes` cannot be told apart from
  "there were none", so withheld findings are named along with the level that hid them and the flag that
  reveals them:

  ```
  $ inkline compile "src/**/*.ink.tsx" --report-level warning
  Compiled 67 files in 0.45s — 0 errors, 0 warnings, 0 notes (12 notes withheld at --report-level warning; re-run with --report-level info to list)
  ```

  `Compiled N files` also now counts files that compiled without an error rather than files the glob
  matched, so a build with one failing file out of five no longer claims to have compiled all five
  directly below the error it printed. A clean build's output is byte-identical to before.

- 65c9f94: fix(cli): report an invalid or missing target as a diagnostic instead of a raw throw

  `inkline compile --target reakt` used to fail with `Error: Unknown target: "reakt"` and a stack
  trace through bundled compiler internals, which told the author nothing about their config. The same
  class of failure had three separate raw throws — two in `resolveOptions`, one in `compile` for a
  target the registry cannot serve.

  All three now go through the diagnostic catalog as `INK0084` (no target specified), `INK0085`
  (unknown target) and `INK0086` (target absent from the registry), thrown as a new
  `InklineConfigError` that carries a fully formed `Diagnostic`. The registry check moved into
  `resolveOptions`, so there is one validation point for every entry path.

  ```
  $ inkline compile "src/**/*.ink.tsx" --target reakt
  error  INK0085  Unknown target "reakt"
      help: Did you mean "react"? Available targets: react, solid, vue, svelte, angular, qwik, astro.
      docs: https://docs.inkline.dev/diagnostics/INK0085
  ```

  The CLI exits `2` for unusable input (`1` remains "the compile ran and reported errors") and prints
  the underlying stack only under `--verbose`. Targets are validated before `--clean` deletes output
  directories, so a typo in one of several targets no longer wipes the others' output.

  Also fixes a latent bug: placeholders in a diagnostic's `help` text were never interpolated, so
  `INK0121` leaked a literal `{name}` to users. `help` is now interpolated alongside `title`, and
  `DiagnosticParams<C>` extracts required params from both.

  New public exports from `@inkline/compiler`: `resolveOptions`, `InklineConfigError`,
  `isInklineConfigError`.

- 3b7f439: feat(compiler): ship the documented `@inkline/compiler/testing` subpath

  The README, `docs/testing.md`, `docs/architecture.md` and `docs/scope.md` all pointed at
  `@inkline/compiler/testing`, but `package.json` only exported `.` and `./package.json`, so the
  import failed with `ERR_PACKAGE_PATH_NOT_EXPORTED` for every consumer of the published package.
  `src/testing/index.ts` is now a second build entry with a matching `./testing` export condition,
  and the fixtures it reads at runtime (`src/__fixtures__/`) ship with the package so
  `compileFixture` and `scenarios` work outside the repo.

  The framework runtimes and lint tools the harnesses use (`react`, `react-dom`, `vue`,
  `@vue/server-renderer`, `solid-js`, `svelte`, `eslint`, `oxlint`, `tinybench`) are declared as
  **optional peer dependencies** rather than bundled — without that the published tarball grew from
  328 kB to 7.3 MB. `runBenchSuite` now loads `tinybench` lazily so the subpath still imports when
  it is not installed. Install only the peers for the harnesses you actually call.

  No source file imported the subpath, so the gap was invisible in CI. A packaging test now packs a
  tarball, resolves `@inkline/compiler/testing` through Node's exports algorithm and compiles a
  fixture through it, failing if the build entry or the export condition goes missing. It also parses
  the emitted bundles and fails on any static import of a package listed in `peerDependenciesMeta`,
  since a declared peer is externalised rather than inlined and would otherwise regress silently.

- a86ba6d: feat(compiler): resolve ambient module types via a `tsconfig` config option

  Add a generic `tsconfig` option to the Inkline config. When set, the compiler loads
  that tsconfig's ambient type-declaration files (`*.d.ts` from its `include`/`files`)
  into the per-file TypeScript program, so `import type` from virtual modules (e.g.
  `virtual:styleframe`) resolves during prop analysis — letting recipe styling props be
  enumerated as real component props. Inkline's own compiler options (jsx,
  jsxImportSource, …) are always forced on top; the per-file program model (and Vite
  plugin compatibility) is preserved. The CLI forwards the option from `inkline.config.ts`.

- f5e3055: Stop the CLI on a config value of the wrong type instead of crashing on it a few lines later.

  Config validation reported a wrong-typed value as a warning and handed the config to the command
  unchanged, so `targets: "react"` printed a correct `INK0083` diagnostic and then died with
  `TypeError: fileConfig.targets?.join is not a function`. The value was never usable — the diagnostic
  just arrived before the crash rather than instead of it.

  `INK0083` (invalid config value) is now an `error`, and `loadInklineConfig` returns
  `{ config, valid }`. `check` and `compile` stop at the boundary with exit code `2` when `valid` is
  `false`, before any consumer reads a field — in `compile`, notably before `--clean` removes output
  directories named by a `targetOutDir` that failed validation. A wrong-typed `targets` never reached
  the delete (`resolveTargets` threw first); a wrong-typed `targetOutDir` did, cleaning the targets
  ahead of the bad entry before throwing on it.

  Fixing this at the load boundary covers every consumer at once. `targets.join`, `barrels.filter`
  and `srcDir.endsWith` were three instances of the same assumption — that a validated config's fields
  hold their declared types — and hardening them one at a time would have left the next field to be
  found by a user.

  Unknown _keys_ remain non-fatal, and now consistently so, at every depth and under either shape
  zod reports them in: a key nested inside a value (`barrels[0].extra`) and a key of a record-typed
  field (`targetOutDir.preact`, `targetOptions.preact`) are both reported as `INK0081` by their full
  path rather than as an invalid value, so neither inherits the new fatal severity. A leftover entry
  for a target you no longer build is still ignored. `INK0081`/`INK0082` are otherwise unchanged.

- af4684d: feat(cli,compiler): configurable per-category barrels

  `inkline.config.ts` gains an optional `barrels` field — a list of `BarrelGroup`
  (`{ file, match, mode? }`) describing which generated re-export barrel each compiled file
  belongs to. Files are routed to a barrel by matching a directory segment of their source path
  (`components/<name>/<match>/…`), so a single source tree can be split into multiple per-category
  entry points instead of one flat `index.ts`.
  - `mode: "named"` (default) emits target-aware per-component exports, sourced from compiled components.
  - `mode: "namespace"` emits `export * as <Name>Stories from …`, sourced from the generated
    `*.stories.ts` modules (whose named exports otherwise collide across components).

  When `barrels` is omitted the CLI keeps its previous behaviour: a single `index.ts` re-exporting
  every non-story component. `BarrelGroup` is exported from `@inkline/compiler`; the compiler pipeline
  ignores the field (it is consumed by the CLI only).

- a86ba6d: feat(compiler): industry-standard createResource lowering across all targets

  `createResource<T>(fn)` returns `[data: T | undefined, { loading, error }]` — plain values read by
  their bare names. Each target now lowers a resource to reactive **state** (`data`/`loading`/`error`)
  plus an **async loader** that runs the fetcher and updates them (the universal "manual fetch with
  loading/error state" pattern), expressed in the framework's idiom:
  - **React** — `useState` ×3 + a `useEffect` loader (`.then(setData).catch(setError).finally(…)`).
  - **Vue** — `ref` ×3 + a fire-and-forget loader in `<script setup>`.
  - **Svelte** — `$state` ×3 + a top-level loader.
  - **Solid** — `createSignal` ×3 + a loader; template reads use the call form `data()`.
  - **Qwik** — `useSignal` ×3 + a `useTask$` loader; template reads `data.value`.
  - **Angular** — `signal` ×3 fields + a loader in the constructor; template reads `data()`.
  - **Astro** — server-side best-effort: top-level `await` in the frontmatter, `loading` resolves to
    `false`, errors captured.

  A new `reactiveBindings` rewrite rule makes the **bare** authored reads (`data`, `loading`) resolve
  per each framework's read convention even though the value has no call syntax. Setter and binding
  names are derived per resource, so a component with multiple `createResource` calls no longer
  collides on `setData`/`setLoading`. Adds `AsyncData` (all 7 targets) and `TwoResources` assertions.

- c3891ce: feat(cli): render a source frame and relative paths in diagnostics

  A diagnostic used to be a single line naming an absolute path, which put a ~140-character prefix on
  every line of output and never showed the code it was complaining about. `SourceLocation` already
  carried `offset` and `length` alongside line/column — enough to slice the source and underline the
  exact span — and nothing used them.

  `formatDiagnostic` now prints a `rustc`-style code frame under the header and makes the path
  relative to the invocation directory:

  ```
  $ inkline check src/Menu.ink.tsx
  src/Menu.ink.tsx:8:7  error  INK0060  <Show> requires a 'when' prop
    8 |       <Show>
      |       ^^^^^^
      help: Pass the condition as a prop: <Show when={visible()}>…</Show>. …
      docs: https://docs.inkline.dev/diagnostics/INK0060
  ```

  The formatter stays pure — the source text is a second argument, never an `fs` read — so the `check`
  and `compile` commands pass the text they already hold, and callers with no source (config-time
  failures) get the previous one-line output unchanged. The line number is derived from `offset` so
  the gutter can never disagree with the slice it labels; a span crossing a line boundary is clamped
  to the end of its first line; tabs are preserved in the caret padding so alignment survives any tab
  width. A path is kept absolute when climbing out of the tree with `../..` would be the longer read.

  Separately, the 7 catalog codes that shipped with `help: undefined` — `INK0060`, `INK0061`,
  `INK0062`, `INK0065`, `INK0066`, `INK0080`, `INK0090` — now carry help text containing a corrected
  example rather than a restatement of the title. A catalog test asserts non-empty `help` over
  `Object.keys(DIAGNOSTICS)` so the gap cannot reopen as codes are added. `INK0090` was building its
  diagnostic by hand and bypassing the catalog's `help` and interpolation; it now goes through
  `createDiagnostic` like every other code.

- 287b326: Add a `hasSlot(name)` authoring primitive that reports whether a named (or default) slot was filled, so a component can conditionally render a slot's wrapper: `<Show when={hasSlot("prefix")}>…<Slot name="prefix" /></Show>`.

  The compiler lowers it to each target's slot-presence read — `props.renderX != null` (React), `props.x != null` (Solid), `xSnippet != null` (Svelte), `!!$slots.x` (Vue), `Astro.slots.has("x")` (Astro). Qwik and Angular expose no runtime slot-presence API, so it lowers to `true` (the gated content always renders — pair it with a CSS `:empty` rule) and emits the new `INK0068` info diagnostic. Statically-true/false conditions are folded during codegen, so no constant `<Show when={true}>` is emitted.

- c12188d: Reclassify the Astro two-way-binding notice (INK0045) from `warning` to `info`, and add a diagnostics reporting level (`meetsLevel`). The CLI dev/watch loop (`inkline compile --watch`) now reports `warning` and above, so INK0045 stays quiet during development while genuine warnings still surface; it still prints on a one-shot `inkline compile` and on `inkline check`.
- 17b446a: Report discarded JSX spread attributes with a new `error` diagnostic, `INK0071`. `<button {...props} />` was previously dropped by the parser without any message, so the component compiled successfully and silently lost every spread attribute. The diagnostic names the file, line, and column of each spread, and its help text points at the workaround: enumerate the attributes explicitly. Spread support itself remains out of scope for v0 and is now listed under the compiler's v0 limitations.
- 58fcc23: Diagnose the two authoring mistakes the typed JSX surface structurally cannot catch — misspelled
  `aria-*` attributes and `$bind:` targets nothing can be written back to.

  TypeScript exempts JSX attribute names that are not valid identifiers from unknown-property
  checking, which is what makes `data-*` authoring work and what makes `aria-hiddenn` type-check on
  every element. `InklineOwned` declares ``[K in `$${string}`]?: any``, so every `$`-prefixed key is
  open by construction. Both are deliberate properties of the type surface, not gaps to be closed
  there — so they are now closed by the compiler:
  - `INK0072` — **warning**. An `aria-*` attribute that is not an ARIA attribute, with a did-you-mean
    against the real set (`aria-hiddenn` → `aria-hidden`). A warning rather than an error because the
    valid set is a _snapshot_ of a spec Inkline does not own: a genuinely new ARIA attribute the
    snapshot predates would otherwise fail the build of an author who did nothing wrong. The emitted
    output is unaffected either way — an unknown `aria-*` renders as written and assistive technology
    ignores it, which costs accessibility, not correctness.
  - `INK0073` — **error**. A `$bind:` target the compiler has nothing to write back to, naming what
    the element or component does bind. An error rather than a warning because `$bind:` is Inkline's
    own vocabulary with no external spec to lag, so a false positive is a bug rather than a risk to
    price in — and because the failure is not cosmetic: `<div $bind:nonsense={1} />` previously
    compiled clean and emitted `onInput={(e) => 1(e.target.value)}`, which throws on the first input
    event.

  The ARIA attribute set is **derived**, not hand-listed: `scripts/gen-aria-attributes.ts` reads the
  property names off `@inkline/core`'s vendored JSX element types and writes
  `src/core/aria-attributes.generated.ts`. `pnpm run generate:aria:check` fails on drift, so re-syncing
  the vendored types updates the diagnostic's vocabulary in the same step.

  The native two-way vocabulary is now a single table, `NATIVE_BINDINGS`, shared by the lowering that
  desugars `$bind:` and the check that rejects it — the two cannot drift into disagreeing about which
  bindings exist. `$bind:` on a custom element stays ungated: its bindable surface is defined by its
  own class, which the compiler cannot see. A `$bind:` onto a component from another module is skipped
  for the same reason `INK0120` documents — its model set is not visible from here.

  Rows 9 and 12 of the RFC §2.3 probe table move out of the blind-spot column: TypeScript still cannot
  see them and never will, but the mistake no longer reaches the author's output.

- 0cbb9a6: Split `@inkline/compiler` into three entry points so the import path states the support tier.

  The root exported 158 names, which buried the handful of real entry points in compiler internals. It now exports 35: compiling, configuring, diagnostics, plugin authoring, and target selection.
  - `@inkline/compiler` — `compile`, `compileIncremental`, `defineConfig`, `resolveOptions`, the diagnostic types and helpers, `definePlugin`, `TargetName`/`ALL_TARGETS`/`builtinRegistry`.
  - `@inkline/compiler/ir` — the render IR: node types, builders, visitors, `transform`, serialization, migration, `SymbolTable`, and the pass primitives.
  - `@inkline/compiler/codegen` — **unstable**: Code IR, the `Target` contract, the printer, and the built-in targets. Unstable for as long as `TargetName` is a closed union, since an external target cannot typecheck or run today. Marked in `package.json` under `inkline.unstableExports`.

  Nothing was removed — every name still ships, at the path that describes it. Two types that were previously unnameable are now exported: `SourceLocation` (the type of `Diagnostic.loc`) from the root, and `ReactivityGraph` (the value type of `AnalyzedModule.graphs`, which the `ir:post` plugin hook hands you) from `/ir`.

- a86ba6d: feat(compiler): object-form prop types and defaults

  The options/object form of prop declarations (`defineComponent({ props: { color: "blue", size: Number } }, …)`)
  previously emitted malformed, untyped output like `{ color?; size }` and never applied the declared
  default. The parser now infers a type for each object-form prop (from a constructor reference —
  `Number` → `number`, `String` → `string`, … — or the type of a default-value literal), and each target
  emits a valid type and applies the default in its own idiom:
  - **React / Qwik / Astro** — destructure with a default: `const { color = "blue", size, ...rest } = props`.
  - **Vue** — `withDefaults(defineProps<{ color?: string; size: number }>(), { color: "blue" })`.
  - **Svelte** — `let { color = "blue", size, ...rest } = $props()`.
  - **Solid** — `const props = mergeProps({ color: "blue" }, _props)` (the parameter is renamed `_props`
    so the merged binding narrows the defaulted keys to non-optional types).
  - **Angular** — `@Input() color: string = 'blue'` (field default) and `@Input() size!: number`.

  A new `propLocals` rewrite rule lets targets that keep `props.x` reads resolve a defaulted prop to its
  destructured local so the default takes effect.

- c12188d: Add two-way binding and custom component-event emission. New authoring primitives: `defineModel(name)` declares a two-way-bindable prop plus its paired `update:<name>` event (returns a `[get, set]` signal tuple), and `defineEmits()` declares custom events and returns an `emit` function.

  Each target emits the idiomatic shape: Vue `defineModel()` / `defineEmits()`, Svelte 5 `$bindable()` + callback props, Angular `model()` / `output()`, React/Solid a value prop + `onUpdate<Prop>` callback, Qwik the same with `QRL` callbacks, and Astro a read-only server value (two-way/events are not interactive there — diagnostic `INK0045`). Parents two-way-bind a component with `$bind:<prop>={state}` (getter convention). `IR_VERSION` is bumped 1 → 2 with a migration.

- 8480e72: Validate `inkline.config.*` at load time instead of silently ignoring what it does not understand.

  `defineConfig` is an identity function and nothing checked the loaded config at runtime, so a
  misspelled key such as `sourceMaps` (plural) or `plugns`, and a value of the wrong type, were both
  silent no-ops with exit code 0. `@inkline/cli` now parses the loaded config against a zod schema and
  reports the failures through the diagnostic catalog:
  - `INK0081` — unknown config key.
  - `INK0082` — unknown config key within a small edit distance of a real one, including the suggested
    spelling (`sourceMaps` → `sourceMap`).
  - `INK0083` — value of the wrong type, naming the path and what was expected.

  All three are warnings. The config is used exactly as loaded — nothing is coerced or dropped — and
  the exit code is unchanged.

  The schema lives in `@inkline/cli`, the only place a config file is read, so `@inkline/compiler`
  keeps its hand-written `InklineConfig` type and its zero runtime dependencies. A compile-time
  assertion ties the schema's key set to `keyof InklineConfig`, so the two cannot drift.

  New exports from `@inkline/compiler`: `createDiagnosticCollector` (with its `DiagnosticCollector`
  type) and `ALL_TARGETS`.

- 04a1350: Make `inkline compile --watch` inherit the initial build and report every rebuild with a duration.

  The watcher started from an empty incremental state, so the first save after startup recompiled
  every file — repeating the full build that had just finished. It now inherits the initial pass:
  on a 67-file project the first edit rebuilds 1 file and skips 66 instead of rebuilding all 67.

  Rebuilds also always print now, including a save that does not change the file's bytes (previously
  silent, making a live watcher indistinguishable from a dead one), and every rebuild line carries
  elapsed milliseconds:

  ```
  Rebuilt 1 file(s), skipped 66 in 31ms
  No changes, 67 file(s) up to date in 23ms
  ```

  `@inkline/compiler` gains `seedIncrementalState(seeds)` and the `IncrementalSeed` type, for adopting
  results from a plain `compile()` pass into an `IncrementalState`. Additive — nothing else changes.

### Patch Changes

- 407c744: fix(compiler): don't leak an unforwarded prop onto the collapsed Angular host

  When a styled `meta.headless` component collapses onto its headless child, the inlined host now binds
  the child's root attributes against the styled instance's actual arguments. A prop the child's root
  reads but the styled wrapper does not forward resolves to `undefined` (the binding is omitted) instead
  of the styled component's same-named prop.

  Previously `IInput` — whose `IInputBase` shell root binds `id={props.id}` but which forwards `id` only
  to the inner control — emitted `[attr.id]` on both the shell `<div ink-input>` and the inner
  `<input ink-input-control-base>`, producing a duplicate `id` (invalid HTML, broken `label[for]`). The
  collapsed host now carries `id` on the control only, matching the element-selector wrapper variant and
  the other six targets.

- cb27b40: fix(compiler): unwrap Angular element refs to `.nativeElement`

  On the Angular target a class-body read of an element ref (`ref.current` in an
  effect or event handler) resolved to the `viewChild<ElementRef>` wrapper, so
  imperative DOM writes and reads landed on the wrapper instead of the node — a
  silent no-op (`el.indeterminate = …`, `el.focus()`, layout measurement). Element
  refs now unwrap to `this.ref()?.nativeElement`; component-instance refs
  (`<Child ref={x}>`) keep the raw `this.childRef()` signal read, so `ComponentRef`
  output is byte-identical. The element-vs-component signal is derived from the
  render tree (refs on `Element` nodes) rather than the ref declaration category.
  The other six targets already return the raw element and are untouched.

- 407c744: perf(compiler): build the headless registry only when the Angular target is requested

  The cross-file headless registry (re-parses + lowers a component's imported `.ink` siblings) is
  consumed solely by the Angular target's collapse. It was built whenever a `meta.headless` component
  had a `ComponentInstance` root, regardless of `options.targets` — so compiling such a component to a
  non-Angular target (e.g. React-only via `compile()`) paid for the sibling re-parse for nothing. The
  build is now gated on `"angular"` being a requested target. No effect on multi-target builds (which
  include Angular); purely avoids wasted work on Angular-excluded compiles.

- 407c744: feat(components): zero-wrapper Angular Input family via the composite collapse

  Splits the conditional `IInputControlBase` (which rendered `<input>` _or_ `<textarea>`) into two
  single-root headless components — `IInputControlBase` (`input[ink-input-control-base]`) and the new
  `IInputTextareaBase` (`textarea[ink-input-textarea-base]`) — and hoists the `type === "textarea"`
  choice up into the styled `IInput`. Each Input part (`IInputBase`, prefix, suffix, both controls) is
  now `meta.headless`, and `IInput` collapses the whole composite:

  ```html
  <div ink-input ink-input-base class="input …">
    <span ink-input-prefix-base class="input-prefix …"></span>
    <input ink-input-control-base value="…" class="input-field" />
    <span ink-input-suffix-base class="input-suffix …"></span>
  </div>
  ```

  The native `<input>`/`<textarea>` carries the behavior directly — zero wrapper elements around the
  control or the shell, with the two-way value preserved. A void-element attribute-child self-closes
  (`<input ink-x />`). The element-selector wrapper variant is still emitted (dual selector); the split
  itself changes all seven targets' Input output (functionally equivalent), Angular adds the host
  variants.

- 7958f10: docs(compiler): state the export tier of every symbol in the API reference

  `docs/api-reference.md` presented IR types, the Code IR and the `Target` contract as first-class
  supported API. Since the three-entry-point split, the import path _is_ the support tier, and the page
  did not say so anywhere.

  Every section now opens with the path its symbols import from, and sections are grouped so the tier
  never changes mid-section: `@inkline/compiler` (§1–5), `@inkline/compiler/ir` (§6–11),
  `@inkline/compiler/codegen` (§12–15). The Target API section carries the instability warning and why
  it applies — `TargetName` is a closed union, so an external target cannot typecheck or run today —
  and Code IR, the printer and the built-in targets cross-reference it.

  The `ir:post` section now shows a worked plugin that types `analyzed.graphs` with `ReactivityGraph`,
  the type exported from `/ir` for exactly that purpose, along with two things that surprise plugin
  authors: `SymbolId` is fully qualified, and `DiagnosticCode` is a closed union so a plugin must reuse
  a catalog code.

  Accuracy fixes found while checking every documented symbol against the shipped entry points:
  - `IR_VERSION` was documented as `1`; it is `3`.
  - Undocumented additions: `seedIncrementalState`/`IncrementalSeed`, `AnalyzedModule`, `BarrelGroup`,
    `angularSelector`, `ALL_TARGETS`, `builtinRegistry`, `meetsLevel`, `createDiagnosticCollector`,
    `SourceLocation`, `ReactivityGraph`, `Pass`/`PassContext`/`pipe`.
  - Stale shapes corrected across `IRComponent`, `IRModule`, `IRElement`, `IRText`, `IRProp`,
    `IREventBinding`, `IRResourceDeclaration`, `IRSetupStatement`, `PrimitiveName`, `IRReactiveKind`,
    `InklineConfig`, `ResolvedCompilerOptions`, `CodegenContext`, `RewriteRules`, `MemberRewriteRules`,
    `TargetConformanceSpec`, `CJsxElement`, `CTmplElement` and `CTmplAttr`.
  - The diagnostics table listed 23 of 35 codes with no indication it was partial; it now points at
    `pnpm docs:diagnostics`, generated from `src/core/diagnostics/codes.ts`, so it cannot rot again.

  A new appendix lists the twelve types that appear in exported signatures but are not importable from
  any entry point, so the page never documents a symbol at a path that does not resolve. Those gaps
  pre-date the split and are tracked as follow-up work.

- a86ba6d: fix(astro): resolve component instances to their tag and expose `props`

  The Astro target emitted `<unknown>` for every component instance (the resolved
  reference name was dropped) and destructured `Astro.props` without binding a
  `props` object, so styled components that reference the whole `props` (e.g.
  styling recipes such as `badge(props)`) threw "props is not defined". Component
  instances now resolve to their reference name — matching the React target — and
  `props` is bound before deriving the named props and the attribute-fallthrough
  rest.

- a86ba6d: fix(compiler): unwrap batch() and capture Transition name/appear
  - **`batch()`** was emitted verbatim (`batch(() => { … })`) but never imported, leaving an undefined
    reference at runtime on every target. Since `batch` is a no-op grouping wrapper in the authoring
    model (`batch(fn) => fn()`) and every framework already batches synchronous updates, it is now
    unwrapped to its inner body: `() => batch(() => { … })` collapses to `() => { … }` (and to a
    `;`-separated statement run inside an Angular event binding).
  - **`<Transition name="…" appear>`** dropped both the `name` (always emitting the default `"ink"`)
    and the `appear` flag, because the lowering only read Expression-kind attributes while `name` is a
    static string and `appear` is a boolean shorthand. Both are now captured, so the authored
    transition name and mount-animation flag reach every target.

- b495727: Extract compiler and storybook CLIs into a unified `@inkline/cli` package using citty. Create `@inkline/config-loader` package backed by c12 v4 for loading `inkline.config.ts` files. Add `@inkline/storybook/generator` export path.
- 3b8b6c2: docs(compiler): correct the README props, config, and diagnostics reference

  The `Props` section now leads with the typed-parameter form (the form every component in
  `ui/components` uses), documents that defaults in that form are applied at the read site
  (`props.type ?? "button"`), and states the no-destructuring rule and why Solid requires it. The
  options-object form is retained — it is a real, per-target-tested feature — with a note that it does
  not type-check today because `ComponentOptions` in `@inkline/core` declares no `props` key and
  `defineComponent` cannot infer the setup parameter's type from the options object.

  Also corrected in the same pass:
  - The `INK0100` row described an emit failure; the code is raised on a parse failure.
  - The configuration table was missing `targetOutDir`, `tsconfig`, and `barrels`.
  - The diagnostics table listed 13 of 26 codes with no indication it was partial; it now points at
    `pnpm docs:diagnostics`, generated from `src/core/diagnostics/codes.ts`.

- c12188d: Preserve camelCase for component-instance event names in Solid, Svelte, and Angular output. A callback prop like `onValueChange` on a component instance was previously emitted lowercased (`onvaluechange` / `(valuechange)`), which breaks the case-sensitive callback-prop / `@Output()` binding. Native DOM event listeners are still lowercased.
- af6996e: Carry `defineEmits` payload types through to every target. The declared tuple was parsed and then discarded, so events were emitted untyped everywhere — most visibly in Angular, where `defineEmits<{ change: [value: string] }>()` produced a bare `change = output()`. That infers `OutputEmitterRef<void>`, so the generated `this.change.emit(value)` did not even type-check.

  `change = output<string>()` now, and the payload reaches the other targets too: React/Solid/Svelte get `onChange?: (value: string) => void` instead of `(...args: any[]) => void`, Qwik the same inside its `QRL<…>`, and Vue re-declares the shape as `defineEmits<{ change: [value: string] }>()` instead of the untyped array form. Custom events remain inert on Astro (`INK0045`), so nothing is typed there.

  Angular is the one target that cannot take the tuple verbatim, because an `output<T>` carries exactly one value. A single-value tuple unwraps, an empty one becomes `output<void>()`, and a multi-value tuple stays a tuple with the emit call packing its arguments to match (`emit("move", x, y)` → `this.move.emit([x, y])`) rather than silently dropping all but the first. Declaring events with the runtime array form (`defineEmits(["change"])`) still leaves them untyped, as it carries no type to begin with.

- 01a5207: fix(compiler): consistent named-slot rendering across JSX targets + Angular nullish attributes

  Rendering the Input "Default" story side-by-side surfaced cross-framework inconsistencies, all in codegen:
  - **Named slots were silently dropped on React, Solid, and Qwik.** Each emitted a named-slot fill as a
    dead `<Tag.name>` child while consuming the slot a different way, so content (e.g. the Input's `$`
    prefix and `USD` suffix) never rendered. All three now emit named slots as **props** — a node prop
    (`prefix={<>$</>}`, consumed as `{props.prefix}`) when unscoped, a function prop when the slot takes
    args — matching the authored `.ink.tsx` source with no runtime machinery. Qwik's default slot still
    projects through its native `<Slot/>`.
  - **React emitted the invalid lowercase `readonly` DOM prop** (a React warning); `REACT_ATTR_MAP` now
    maps `readonly` → `readOnly`.
  - **Angular rendered `id="undefined"`.** Dynamic native-element attributes were property bindings, which
    stringify a nullish value (`[id]="id()"` → `id="undefined"`). Non-property attributes now bind via
    `[attr.name]="(expr) ?? null"`, which Angular omits when null; boolean/value-semantic and special
    bindings (`value`, `disabled`, `readonly`, `style`, `innerHTML`, …) stay property bindings.

- 5e56c04: fix(core/compiler): bind Qwik DOM event handlers as QRLs so they fire on resume

  The Qwik target emitted DOM event handlers as a value-wrapped prop without the `$` suffix
  (`onChange={$(...)}`). Qwik's optimizer only extracts a handler into a lazy-loadable QRL when the
  prop name carries the `$` suffix, so the bare form was treated as a plain DOM attribute: the QRL was
  stringified inline (`onchange="async function..."`), never bound on resume, and the handler silently
  never fired (INK-31). Emitting `onChange$={$(...)}` makes the optimizer extract the QRL and wire it up,
  so interactive handlers (e.g. the checkbox control's `change`/`click`) run at runtime. Verified with a
  `createDOM` behaviour test in `@inkline/qwik` that toggles the bound model and enforces the read-only
  guard, and that fails if the `$` suffix regresses.

- d0c2ef8: fix(compiler): declare Qwik refs before visible tasks to avoid ReferenceError

  The Qwik emitter declared element refs (`const ref = useSignal(null)`) after the
  effects loop, so a `createEffect` that read a ref was emitted as a
  `useVisibleTask$` above the ref's `const`. Unlike React/Vue — where this was a
  setup-time temporal-dead-zone crash (INK-12) — Qwik defers task execution, so the
  ordering looked safe. It is not: Qwik's optimizer extracts each `useVisibleTask$`
  into its own QRL and captures lexical scope textually, so a task that references a
  name declared below it resolves to an undeclared identifier and throws
  `ReferenceError` at runtime (e.g. a `createRef` + `createEffect` pair patching a
  DOM IDL property like `indeterminate`).

  Refs are inert `null` declarations that depend on nothing, so the refs loop is now
  hoisted above the effects loop in the Qwik emitter — behavior-preserving and
  matching source order. This closes the target the INK-12 fix left uncovered;
  Solid/Svelte defer effects without textual QRL extraction, Angular initializes
  class fields before the constructor body, and Astro emits no effects, so those
  targets remain byte-identical.

- a86ba6d: fix(compiler): Qwik slot projection via `<Slot>`, and Astro `<slot>` fallback content

  Two slot-lowering bugs surfaced by rendering the live Storybooks:
  - **Qwik slots now project.** The Qwik target lowered a `<Slot>` to `{props.children ?? fallback}`,
    but Qwik never populates `props.children` — projected content is rendered through its native
    `<Slot/>` component. Projected children (e.g. `<IBadge>Primary</IBadge>`) silently vanished. Slots
    now emit `<Slot>…</Slot>` with the authored fallback as the `<Slot>`'s children, named slots emit
    `<Slot name="x"/>`, and `Slot` is added to the `@qwik.dev/core` import only when a `<Slot>` is
    actually emitted.
  - **Astro renders slot fallback.** The Astro target emitted a self-closing `<slot />` and dropped the
    authored default content, so a default-slot fallback (`<Slot>{label}</Slot>`) rendered nothing when
    no children were projected. Slots now emit a non-self-closing `<slot>…</slot>` carrying the fallback,
    which Astro shows when nothing is projected (matching Vue/Svelte).

- 420229e: fix(compiler): scope React HTML-attr canonicalisation to native host elements (INK-26)

  The React emitter renamed HTML attributes to their React-DOM spellings (`readonly` →
  `readOnly`, `for` → `htmlFor`) even when the JSX element was a custom Inkline component,
  not a native host element. Inkline component prop interfaces use the HTML-native
  lowercase names, so the forwarded key no longer matched what the child reads and the
  value silently never arrived on React — e.g. a styled component forwarding
  `readonly={props.readonly}` to its headless control emitted `readOnly={props.readonly}`,
  leaving `props.readonly` `undefined` in the child (`aria-readonly` unset, click-cancel
  guard dead). Every other target already crossed the boundary verbatim.

  Canonicalisation now applies only to native host elements; component prop names cross
  the boundary verbatim. `class` → `className` stays the one deliberate exception on
  components, since Inkline React components expose `className`. This fixes `readonly` on
  `IInput`'s styled composition (and any future component forwarding a canonicalised HTML
  attr) on React; the six other targets emit byte-identical output.

- a161934: fix(react): wrap a component holding a component-instance ref in `forwardRef`
- a86ba6d: fix(compiler): import React Fragment, qualify Angular class-body refs, order Qwik provides after signals

  Three runtime-correctness fixes the adversarial review of the real-world suite surfaced:
  - **React** keyed list rows wrapped each row in `<React.Fragment>`, but the module never imports
    `React` (the automatic JSX runtime doesn't bind it), so the value was undefined at runtime. The
    named `Fragment` is now imported and used (`<Fragment key={…}>`).
  - **Angular** class-body expressions (an `afterNextRender`/effect that focuses a ref) read the ref
    as a bare `inputRef`, but a ref is a `viewChild` signal member — `TS2663`. It now reads
    `this.inputRef()`, mirroring the `this.`-prefixing already applied to state/memo reads.
  - **Qwik** emitted `useContextProvider(…)` before the `useSignal` declarations whose `.value` it
    reads, a temporal-dead-zone reference. Provides are now emitted after all signal/memo/ref
    declarations.

- 1b07d5f: fix(compiler): map the React component function + return statement to source

  The React target emitted the component function signature and its `return`
  statement with no source span, so the whole render collapsed onto the single
  render-expression mapping. Source-map consumers (debuggers, stack traces,
  coverage tools) then mis-attributed the component function — reporting it as
  uncovered even when it executed. The signature now carries the component's
  source location and the return carries the render root's, so each maps to its
  authored position. Generated code is unchanged; only the emitted source map
  gains the two mappings.

- a86ba6d: fix(react): emit granular, deduped `useMemo`/`useEffect` dependency arrays

  A memo or effect that read a prop emitted the base object once per access
  (`[props, props, props]`) instead of the specific reads. Dependency arrays now
  use each dependency's full path (`[props.color, props.variant, props.size]`) and
  are deduplicated, so memoization is correct and minimal.

- 49c624f: fix(react): reference `props.<name>` for model getters in `useMemo`/`useEffect` deps

  A `createMemo`/`createEffect` that read a `defineModel` getter emitted the getter's bare local name in
  the React dependency array (e.g. `[open]`) while the body was rewritten to `props.open`. Since the
  props destructuring is emitted after the memo, the bare name hit the temporal dead zone — a runtime
  `ReferenceError: Cannot access 'open' before initialization`. Model-getter dependencies now render as
  their prop read (`props.open`), matching the body; signal locals stay bare (`useState`) and prop reads
  are unchanged.

- a86ba6d: fix(compiler): correct cross-target codegen for recipe/styled components

  Surfaced by a new real-world assertion test suite (author `.ink.tsx` → compile → assert
  the actual generated framework code). Fixes:
  - The shared expression rewriter now recurses into **object literals**, so `props.x` inside
    a recipe call like `badge({ color: props.color })` is correctly stripped (Svelte) or
    `this.`-prefixed (Angular) instead of emitted verbatim (which referenced an undefined
    `props`).
  - **Vue** keeps `props.x` in `<script setup>` (the `computed`/script context) and strips to
    bare names only in the template, where Vue resolves them against the component's props.
  - **Angular** resolves component instances to their selector, declares standalone `imports`,
    and `this.`-prefixes class-body member access (memos/effects), computing styling recipes in
    a `computed` bound via `[class]`.
  - **Astro** emits memos as frontmatter consts.

- c12188d: fix(compiler): don't strip the call from zero-arg recipe/function calls

  A zero-argument call such as a styleframe recipe `inputAppendRecipe()` was treated as a reactive
  signal read and rewritten per target — the call was stripped to a bare `inputAppendRecipe`
  (React/Svelte/Vue/Astro) or turned into `inputAppendRecipe.value` (Qwik). The recipe _function_,
  not its result, then ended up in the `class` attribute, emitting the recipe's source into the DOM.

  The expression rewriter now only applies a target's reactive-read convention to identifiers that are
  actually reactive accessors — signals, memos and model getters, collected from the component IR.
  Every other zero-arg call (an imported recipe, a plain helper) keeps its call syntax across all
  targets. This also fixes resource fetchers (`createResource(() => fetchData())`), whose call was
  likewise being stripped.

- fcc2bf4: fix(compiler): emit refs before memos/effects on React and Vue (INK-12)

  The React and Vue emitters declared element refs after memos and effects. React
  dependency arrays (`[controlRef.current, …]`) evaluate synchronously at the
  `useMemo`/`useEffect` call site, and Vue's `watchEffect` runs its callback
  synchronously at setup — so a ref referenced before its `const` declaration was a
  temporal-dead-zone `ReferenceError` that crashed the component on mount (e.g. a
  `createRef` + `createEffect` pair setting a DOM IDL property like `indeterminate`).

  Refs are inert `null` declarations that depend on nothing, so the refs loop is now
  hoisted above the memos/effects loops in both emitters — behavior-preserving and
  matching source order. Solid/Svelte/Qwik defer effects, Angular initializes class
  fields before the constructor body, and Astro emits no effects, so those targets
  were already correct and emit byte-identical output.

- a86ba6d: fix(compiler): bind createResource, preserve async, and correct per-target control-flow/state codegen

  Further real-world codegen fixes surfaced by the fixture→output assertion suite:
  - **`createResource` was silently dropped.** The primitive was missing from the parser's binding
    table, so the resource declaration never reached the IR and every target rendered undefined
    reads. It is now bound and emitted across all 7 targets.
  - **`async` was stripped from arrow/function expressions** by the shared rewriter, corrupting every
    async fetcher/handler (`async () => …` became `() => …`). The modifier is now preserved.
  - **Solid** destructures only the resource metas the author actually bound, mapping each to its
    local name and honouring aliases (`{ loading, error: _error }`), so unbound accessors no longer
    emit unused variables.
  - **Astro** now declares signal state as a mutable frontmatter `let` (it was dropped entirely, so
    the template referenced undeclared identifiers); setters become direct re-assignments.
  - **Vue** emits native DOM event listeners in all-lowercase (`@mousemove`, `@submit`) — a
    kebab-cased `@mouse-move` never fires — while keeping kebab case for component custom events; a
    root `<>…</>` fragment now emits sibling root nodes (Vue 3 multi-root) instead of a directive-less
    `<template>` that renders nothing.
  - **Angular** `@for` tracks the extracted key expression (`track item.id`, `track i`) with
    `let i = $index` for index bindings instead of leaking the raw arrow; `@switch (true)/@case`
    becomes an `@if/@else if` chain (boolean cases are not value matches); string literals in template
    bindings are single-quoted so they don't terminate the surrounding double-quoted binding; and
    effects + `onMount` (`afterNextRender`) + `onCleanup` (`inject(DestroyRef).onDestroy`) are
    consolidated into the single permitted `constructor`.

- af4684d: Fix React and Qwik codegen emitting a root-level `<Show>`/conditional wrapped in JSX-expression-container braces (`return ({…})`), which parsed as an object literal and broke the build. A conditional that is the component's entire render is now emitted as a bare ternary inside `return (…)`.
- a86ba6d: fix(compiler): best-effort scoped slots on Angular/Astro/Qwik

  A scoped slot (`<Slot args={[item, index]}>…fallback…</Slot>`) passes per-row data to slot content.
  Angular and Astro have no scoped-slot mechanism, and Qwik's `children`/`Slot` projects JSX rather than
  being a callable render function — so the previous output dropped the args and fallback (Angular/Astro
  emitted a bare `<ng-content>`/`<slot>`) or called the uncallable `props.children?.(args)` (Qwik).

  These targets now render the authored **fallback** (the component's default content, whose loop/scope
  variables are in scope) as a best-effort, so the component renders standalone; a parent simply cannot
  override the per-row rendering. Angular/Astro additionally emit a short template comment noting that the
  scoped-slot args are not projectable. React, Vue, Svelte and Solid (which have render-prop or
  slot-binding mechanisms) are unchanged.

- a86ba6d: fix(solid): render the unscoped default slot via the native `children` prop

  The Solid target read the default slot from `props.default`, but Solid delivers
  default-slot content on `props.children`, so slotted text (e.g. badge labels) was
  silently dropped. The unscoped default slot now compiles to `props.children` in the
  slot read, the generated props type, and the `splitProps` exclusion list — matching
  the React target. Named and scoped slots are unchanged.

- 3a61a4b: Fix CSS codegen to use plain side-effect imports instead of CSS modules. Add Angular component selectors. Migrate Angular Storybook to @analogjs/storybook-angular. Rename Button to IButton.
- c12188d: fix(compiler): aliased-model Svelte bindings + Qwik model/event-only props param

  **Svelte** declared each model's `$bindable()` binding under the public prop name, but
  model reads and writes resolve to the getter local. For an aliased model
  (`const [isOpen, setIsOpen] = defineModel("open")`) the script destructured
  `open = $bindable()` while the template read and assigned the never-declared `isOpen`,
  referencing an undefined variable for both reads and writes — and the same in the
  reconstructed whole-`props` object. The binding is now destructured with a rename when
  the names differ (`open: isOpen = $bindable()`).

  **Qwik** only emitted the `props` parameter when a component had plain props, slots, or
  attribute fallthrough — yet models compile to `props.<prop>` reads and emit/update to
  `props.on<Name>$` callbacks. A model- or event-only component with a non-fallthrough root
  (e.g. a Fragment root, which never gains attribute fallthrough) was emitted as
  `component$(() =>` while its body referenced `props.value`, crashing with
  "props is not defined". Models and events are now included in the parameter condition.

  Both were masked by the shipped components using `value`/`defineModel("value")`
  (name === propName) and single-element roots that gain fallthrough, so generated output
  is unchanged.

- c12188d: fix(svelte): emit Svelte 5 `{@render}` snippets instead of deprecated `<slot>`, and stop self-closing non-void elements

  The Svelte target lowered slots to the deprecated `<slot>` element (`slot_element_deprecated`) and
  self-closed every empty element, including non-void tags like `<span>`/`<textarea>`
  (`element_invalid_self_closing_tag`) — both emit build warnings on Svelte 5.

  Slots now compile to runes: the default slot renders via `{@render children?.()}`, named slots via
  `{@render <name>?.()}`, fallback content wraps in `{#if <name>}…{:else}…{/if}`, and scoped slots
  thread positional args (`{@render <name>(item, index)}`). Each slot is declared as a typed
  `Snippet`/`Snippet<any[]>` prop on `$props()` (importing `Snippet` from `svelte`); a named slot's prop
  is bound to a `<name>Snippet` local so `{@render}` never collides with an in-scope binding of the same
  name (e.g. a `{#each items as item}` loop and an `item` slot). Non-void HTML elements with no children
  now print as `<tag></tag>`. The output is functionally identical — same runtime DOM, no warnings.

- a86ba6d: fix(svelte): resolve whole-`props` references in destructured components

  The Svelte target destructures `$props()` into named bindings plus a fallthrough
  rest, leaving no `props` binding — so a component that passed the whole object to a
  function (e.g. `badge(props)` in styled components) emitted an unresolved `props`
  reference and crashed with "props is not defined". A bare `props` reference is now
  rewritten to the reconstruction of its destructured bindings (`{ name, ...rest }`),
  which stays reactive without introducing an extra binding.

- 0688298: fix(compiler): JSX-valued named-slot fills mis-compiled on template targets

  Filling a child component's named slot with JSX content (`<IButton icon={<span>★</span>}>`,
  and slot re-projection `icon={<Slot name="icon" />}`) emitted invalid output on template
  targets. The fill was kept as an opaque `Expression` IR node, so Vue/Svelte/Astro routed it
  through the text-interpolation path — Vue produced `<template #icon>{{ <span>★</span> }}</template>`
  instead of slot template content. JSX targets (React/Solid/Qwik) and Angular were unaffected
  because they re-emit the expression natively.

  The `slots` lowering pass now decomposes the JSX fill into real render nodes (the same
  `parseExpression` decomposition already used for `<Show>` fallbacks), so every target receives a
  structural subtree. Vue emits `<template #icon><span>★</span></template>`, Svelte a named
  `{#snippet}`, and Astro a `<Fragment slot="icon">`; re-projected `<Slot>` fills lower to the
  target's native slot node. Named slots other than `default` are now usable on the Vue target.

- a86ba6d: fix(compiler): wire up state setters and correct event-handler emission

  State mutation and interactivity were broken in Vue/Svelte/Angular/Qwik — surfaced by
  the real-world assertion suite. Fixes:
  - **State setters** are now applied per target (`setterStyle` was defined but never used):
    a `setX(v)` call becomes `x.value = v` (Vue script / Qwik), `x = v` (Svelte / Vue template,
    where Vue adds `.value`), or `x.set(v)` (Angular — new `method-call` style). React/Solid keep
    the declared `setX(v)`.
  - **Qwik** event handlers are single-wrapped: `$(() => …)` / `$(e => …)`, not `$(() => e => …)`.
  - **Angular** event bindings are statements, not arrow expressions: `(click)="count.set(count() + 1)"`,
    with the handler param mapped to `$event` and block bodies emitted as `;`-separated statements.
