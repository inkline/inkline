# @inkline/angular

## 0.1.0

### Minor Changes

- d0c2ef8: feat(components): add Checkbox component

  Add `ICheckbox` (and its headless parts `ICheckboxBase` + `ICheckboxControlBase`), a labelled
  boolean control styled with the Styleframe `checkbox` and `checkbox-field` recipes. It wraps a native
  `<input type="checkbox">` inside a `<label>` for implicit label association and free APG semantics
  (`role="checkbox"`, `Space` toggle, focus, disabled). A two-way `checked` model drives the box via
  `$bind:checked`; `indeterminate` renders the partially-checked ("mixed") state on all seven targets,
  auto-exposing `aria-checked="mixed"`. A `readonly` prop keeps the box focusable but non-toggleable,
  announced via `aria-readonly` and enforced by cancelling the click default on all seven targets.
  Supports `color` (`light` / `dark` / `neutral`), `size` (`sm` / `md` / `lg`), and a `label` prop
  overridable by the default slot.

- d1d1f65: feat(components): add FieldGroup component

  Add `IFieldGroup` (and its headless `IFieldGroupBase`), styled with the Styleframe 3.9 `field-group`
  recipe. It joins bordered controls — inputs, buttons, selects, badges — placed as its **direct
  children** into a single visual unit, merging their border radii and collapsing the inner border at
  the seams. Supports `orientation` (`horizontal` / `vertical`) and a `block` mode that fills the
  container width.

  This is the supported replacement for the Input `prepend`/`append` addons removed alongside it: wrap
  a control and its neighbours in an `IFieldGroup` instead of nesting them inside the input.

- 49c624f: feat(components): add HamburgerMenu component

  Add `IHamburgerMenu` (and its headless `IHamburgerMenuBase`), an accessible animated three-line
  toggle button styled with the Styleframe `hamburger-menu` recipe. It follows the WAI-ARIA
  **Disclosure** pattern on a native `<button>`: a two-way `open` model drives `aria-expanded` and the
  recipe's `active` morph, while the consumer renders and links their own navigation region via
  `ariaControls`. Supports `color` (`light` / `dark` / `neutral`), `size` (`sm` / `md` / `lg`), and an
  `animation` axis (`close` / `arrow-up` / `arrow-down` / `arrow-left` / `arrow-right` / `minus` /
  `plus`) for the open-state shape. The icon-only control carries a defaulted `ariaLabel`
  (`"Toggle menu"`) so every instance has an accessible name out of the box.

- fbd79ca: feat(components): add Radio component

  Add `IRadioGroup` — a complete single-select control that renders one radio per `options` entry and
  owns the two-way `value` — composed from three headless parts (`IRadioGroupBase`, `IRadioBase`,
  `IRadioFieldBase`), styled with the Styleframe `radio-group` / `radio` / `radio-field` recipes.

  Each option renders a native `<input type="radio">` wrapped in its `<label>`, so role, `aria-checked`,
  keyboard roving, and mutual exclusivity (via a shared `name`) come from the platform. Supports the
  `color`, `size`, and `orientation` recipe axes plus a group-level `disabled` and `readonly` (the
  selection stays visible and focusable but can't be changed — surfaced as `aria-readonly` on the
  radiogroup and enforced per field). The headless parts are exported individually for advanced
  composition.

- 56f849b: feat(components): add Switch component

  Add `ISwitch` (and its headless parts `ISwitchBase`, `ISwitchControlBase`, `ISwitchLabelBase`), an
  accessible on/off toggle styled with the Styleframe `switch` / `switch-field` recipes. It follows the
  WAI-ARIA **Switch** pattern on a native `<input type="checkbox">`: a two-way `checked` model drives
  `aria-checked`, Space toggles natively, and Enter synthesises the native click to complete the switch
  keyboard map. The default slot (or `label` prop) supplies the accessible name, and the `.switch-label`
  addon collapses when empty. Supports `color` (`light` / `dark` / `neutral`) and `size`
  (`sm` / `md` / `lg`).

- 407c744: feat(compiler): collapse a model-bearing headless component onto its Angular host

  Extends the styled-over-headless collapse to headless components that own a two-way model + an event
  handler that writes it. The headless's event references its own model setter (e.g. `setOpen(...)` from
  `defineModel("open")`); the collapse now maps the child's setter names onto the same model so the
  merged host emits it correctly (`(click)="open.set(!open())"`), with the model declared under the
  styled component's binding.

  Flips **HamburgerMenu** to `meta.headless`: `<button ink-hamburger-menu ink-hamburger-menu-base>`
  carries the recipe classes, `aria-expanded`/`aria-controls`/`aria-label`, the `disabled` state, and the
  toggle click — zero wrappers. Only the Angular output changes (other six targets byte-identical).

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

- af4684d: feat: add `./headless` and `./stories` subpath exports

  Each framework package now builds three entry points instead of one and exposes them
  as subpath exports:
  - `@inkline/<fw>` — styled components (the default surface)
  - `@inkline/<fw>/headless` — the unstyled `*Base` components
  - `@inkline/<fw>/stories` — namespace re-exports of the generated CSF story modules

  **BREAKING:** the headless `*Base` components (e.g. `IButtonBase`) are no longer exported
  from the package root — import them from `@inkline/<fw>/headless` instead. Styled components
  and their imports are unchanged.

- af4684d: feat(components): add compound Input component

  Add an `Input` composed of individual sub-part components instead of a single
  slot-based monolith, styled with the styleframe input recipe family:
  - `IInput` — the bordered field shell (`color`, `variant`, `size`, `invalid`,
    `disabled`, `readonly`)
  - `IInputControl` — the native control; renders `<textarea>` when
    `type="textarea"`, otherwise `<input>`
  - `IInputGroup` — layout row for joined prepend/append addons
  - `IInputPrefix` / `IInputSuffix` — inline addons inside the shell
  - `IInputPrepend` / `IInputAppend` — block addons outside the shell

  Each ships in headless (`I…Base`) and styled variants and compiles to all seven
  framework targets. The control uses the controlled-value pattern (`value` plus
  native `onInput`/`onChange`/`onFocus`/`onBlur`); state props map to the recipe's
  styling axes and the matching native attributes.

- c12188d: feat(components): two-way binding for Input (UXF-5)

  `IInputControl` (and the headless `IInputControlBase`) now expose a two-way-bindable
  `value` via `defineModel`, so a parent binds it with each framework's native idiom:
  Vue `v-model:value`, Svelte `bind:value`, Angular `[(value)]`, and a `value` +
  `onUpdateValue` controlled pair in React/Solid/Qwik. On the static Astro target the
  value is render-only (one-way). This replaces the previous controlled-only `value`
  prop — the control now emits its own updates instead of relying on a parent-supplied
  `onInput` handler.

- d1d1f65: feat(components): remove Input prepend/append addons

  Remove the `prepend` and `append` slots from `IInput`, along with the now-purposeless
  `input-group` wrapper. This mirrors Styleframe 3.9, which dropped the per-field
  `useInputGroupRecipe`, `useInputPrependRecipe`, and `useInputAppendRecipe` recipes in favour of a
  single, generic field group.

  `IInput` now composes only the shell, the native control, and the inline `prefix`/`suffix` addons.
  The `IInputGroupBase`, `IInputPrependBase`, and `IInputAppendBase` headless exports are removed. To
  attach controls outside an input (the old prepend/append use case), wrap them in the new
  `IFieldGroup`.

- 287b326: `IInput` is now a single styled component that composes every part — the field shell, the native control, and the optional `prefix`/`suffix`/`prepend`/`append` addons — styled together, rather than a set of separate styled parts you assemble by hand:

  ```tsx
  <IInput
    type="text"
    placeholder="0.00"
    prefix={<>$</>}
    suffix={<>USD</>}
    color="light"
    size="md"
    $bind:value={amount}
  />
  ```

  Addons are named slots gated by `hasSlot`, so an unused addon renders nothing (the wrapper is omitted entirely on React/Vue/Solid/Svelte/Astro, and collapses via CSS `:empty` on Qwik/Angular). The standalone styled `IInputControl`, `IInputGroup`, `IInputPrefix`, `IInputSuffix`, `IInputPrepend`, and `IInputAppend` components are removed; the headless `*Base` parts remain exported for fully custom composition.

- 3a61a4b: Fix CSS codegen to use plain side-effect imports instead of CSS modules. Add Angular component selectors. Migrate Angular Storybook to @analogjs/storybook-angular. Rename Button to IButton.
- 78ea062: Integrate styleframe across all framework packages with Vite plugin and runtime dependency. Update storybook paths for ui/core to ui/components rename.
- b316a42: feat(components): add `readonly` prop to Switch

  Add a `readonly` prop to `ISwitch` (and its headless `ISwitchControlBase`). Because a native
  checkbox ignores the HTML `readonly` attribute, read-only is enforced behaviourally: the control
  announces `aria-readonly="true"` and cancels the click's default action so the box can't flip. Mouse
  click, Space (which the browser dispatches as a click), and the Enter-synthesised click all funnel
  through one guard, so the two-way `checked` model can't change — while the switch stays focusable and
  form-submittable, unlike `disabled`. The `switch-field` recipe has no read-only visual state, so this
  is aria + behaviour only.

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

- 58e2a00: fix(compiler): collapse Angular host elements with `display: contents`

  Angular components compile to `ink-*` custom-element hosts, which default to `display: inline` and
  added a few pixels of line-box height (e.g. badge +3px, input textarea +6px) versus the other
  framework targets. The generated `@Component` now sets `host: { style: 'display: contents' }`, so
  each host lays out transparently and Angular renders identically to React/Vue/Svelte/Solid/Qwik/Astro.

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

- a95b2ad: fix(components): keep the read-only checkbox from toggling

  A read-only checkbox stayed focusable but must not change value. The click guard
  (`readonly && preventDefault()`) cancels the toggle synchronously on React, Vue, Solid, Svelte and
  Angular. On Qwik, event handlers are QRLs that resume _after_ the browser's default action, so
  `preventDefault()` there cannot stop the toggle. The `change` handler now re-asserts the control from
  the model when read-only (`el.checked = checked()`) instead of writing to it, snapping the box back
  and leaving the model untouched. The handler is a single expression so Angular's template codegen
  inlines it. Read-only is unchanged elsewhere and stays announced via `aria-readonly`.

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

- 58e2a00: fix(compiler): normalize JSX whitespace so text and elements render identically across frameworks

  JSX text was trimmed too aggressively — meaningful spaces were dropped, so `<p>Hello, {name}!</p>`
  rendered as `Hello,world!` on React/Solid — and the codegen printer's formatting whitespace leaked into
  the rendered output differently per framework (extra gaps between inline elements on Svelte/Astro).
  Whitespace is now normalized once in the IR (matching the JSX spec, via `cleanJsxText`) and emitted
  inline (`childrenArePhrasing` + the printer's `inline` flag), so all seven targets render the same text
  and spacing.

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

- af4684d: fix: rename styleframe recipe exports to `<name>Recipe`

  Styleframe recipes were exported under bare names (`input`, `badge`, …) and imported into the styled
  components from `virtual:styleframe`. On the Angular target this collided with `input` imported from
  `@angular/core` for signal inputs, producing `Identifier 'input' has already been declared` in the
  compiled output.

  Recipes are now exported as `<name>Recipe` (e.g. `input` → `inputRecipe`), and the generated styling
  type follows as `<Name>RecipeProps`. The styled components import and call the renamed recipes. The
  public component prop types are unchanged. This removes the Angular collision and keeps recipe names
  clear of framework primitives across all targets.

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
