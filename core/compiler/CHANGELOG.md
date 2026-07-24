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

- a86ba6d: feat(compiler): resolve ambient module types via a `tsconfig` config option

  Add a generic `tsconfig` option to the Inkline config. When set, the compiler loads
  that tsconfig's ambient type-declaration files (`*.d.ts` from its `include`/`files`)
  into the per-file TypeScript program, so `import type` from virtual modules (e.g.
  `virtual:styleframe`) resolves during prop analysis — letting recipe styling props be
  enumerated as real component props. Inkline's own compiler options (jsx,
  jsxImportSource, …) are always forced on top; the per-file program model (and Vite
  plugin compatibility) is preserved. The CLI forwards the option from `inkline.config.ts`.

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

- 287b326: Add a `hasSlot(name)` authoring primitive that reports whether a named (or default) slot was filled, so a component can conditionally render a slot's wrapper: `<Show when={hasSlot("prefix")}>…<Slot name="prefix" /></Show>`.

  The compiler lowers it to each target's slot-presence read — `props.renderX != null` (React), `props.x != null` (Solid), `xSnippet != null` (Svelte), `!!$slots.x` (Vue), `Astro.slots.has("x")` (Astro). Qwik and Angular expose no runtime slot-presence API, so it lowers to `true` (the gated content always renders — pair it with a CSS `:empty` rule) and emits the new `INK0068` info diagnostic. Statically-true/false conditions are folded during codegen, so no constant `<Show when={true}>` is emitted.

- c12188d: Reclassify the Astro two-way-binding notice (INK0045) from `warning` to `info`, and add a diagnostics reporting level (`meetsLevel`). The CLI dev/watch loop (`inkline compile --watch`) now reports `warning` and above, so INK0045 stays quiet during development while genuine warnings still surface; it still prints on a one-shot `inkline compile` and on `inkline check`.
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
- c12188d: Preserve camelCase for component-instance event names in Solid, Svelte, and Angular output. A callback prop like `onValueChange` on a component instance was previously emitted lowercased (`onvaluechange` / `(valuechange)`), which breaks the case-sensitive callback-prop / `@Output()` binding. Native DOM event listeners are still lowercased.
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
