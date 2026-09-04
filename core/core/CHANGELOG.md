# @inkline/core

## 0.1.0

### Minor Changes

- 78ea062: Add @inkline/core authoring API package with typed primitives (defineComponent, createSignal, createMemo, etc.), JSX runtime, and control-flow helpers. Support external import forwarding in the compiler codegen so non-framework imports (e.g. styleframe) are emitted into each target's output.
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

- 871c26c: feat(core): declare `props` and `style` on `ComponentOptions` and infer setup props from them

  The options-object props form (`defineComponent({ props: { color: "blue", size: Number } }, …)`) is a
  per-target-tested compiler feature that could not be authored from a type-checked `.ink.tsx` file:
  `ComponentOptions` declared neither the `props` key the parser reads nor the `style` key it reads
  alongside it, and `defineComponent` could not infer the setup parameter's type from the options
  object. Authoring the documented form produced `TS2353` on `props` and `TS2339` on every prop read.

  `ComponentOptions` now declares `props?: Record<string, PropDeclaration>` and `style?: string`, and a
  new `defineComponent` overload infers the setup parameter from the `props` map, mirroring the
  optionality each target emits:
  - a bare constructor reference (`size: Number`) → required, `number`;
  - a bare default value (`color: "blue"`) → optional, `string`;
  - the full shape (`count: { type: Number, required: true, default: 0 }`) → required, `number`.

  The constructor-to-type table matches the compiler's (`String`/`Number`/`Boolean`/`Object`/`Array`/
  `Function`/`Symbol`/`Date`). Leave the setup parameter unannotated to use the inference.

  The parser prefers `options.props` over the setup parameter's annotation, so declaring both would
  compile clean while emitting the options props and ignoring the annotation. The annotated-parameter
  overload now carries `props?: never`, so an annotation that _disagrees_ with the map is a type error
  instead. One that agrees still compiles, through the inferring overload. Options objects without a
  `props` map — the only form in use today — keep a typed setup parameter unchanged.

- 287b326: Add a `hasSlot(name)` authoring primitive that reports whether a named (or default) slot was filled, so a component can conditionally render a slot's wrapper: `<Show when={hasSlot("prefix")}>…<Slot name="prefix" /></Show>`.

  The compiler lowers it to each target's slot-presence read — `props.renderX != null` (React), `props.x != null` (Solid), `xSnippet != null` (Svelte), `!!$slots.x` (Vue), `Astro.slots.has("x")` (Astro). Qwik and Angular expose no runtime slot-presence API, so it lowers to `true` (the gated content always renders — pair it with a CSS `:empty` rule) and emits the new `INK0068` info diagnostic. Statically-true/false conditions are folded during codegen, so no constant `<Show when={true}>` is emitted.

- c12188d: Add two-way binding and custom component-event emission. New authoring primitives: `defineModel(name)` declares a two-way-bindable prop plus its paired `update:<name>` event (returns a `[get, set]` signal tuple), and `defineEmits()` declares custom events and returns an `emit` function.

  Each target emits the idiomatic shape: Vue `defineModel()` / `defineEmits()`, Svelte 5 `$bindable()` + callback props, Angular `model()` / `output()`, React/Solid a value prop + `onUpdate<Prop>` callback, Qwik the same with `QRL` callbacks, and Astro a read-only server value (two-way/events are not interactive there — diagnostic `INK0045`). Parents two-way-bind a component with `$bind:<prop>={state}` (getter convention). `IR_VERSION` is bumped 1 → 2 with a migration.

- 27dd186: feat(core): type `JSX.IntrinsicElements` instead of `any`

  `.ink.tsx` authoring had no type safety in markup: `JSX.IntrinsicElements` was
  `[elemName: string]: any`, so a misspelled attribute, a React-ism like `className`, or a typo'd event
  handler compiled silently and surfaced only when you ran the output. `IntrinsicElements` is now
  derived from an upstream JSX surface — a vendored, MIT-licensed copy of Solid's element types,
  carried in-tree rather than depended on — reshaped through an Inkline-owned alias. `@inkline/core`
  gains no runtime dependency from this: its only dependency is `csstype`, which ships no JavaScript.
  The package still ships no runtime, and the compiler still erases every `@inkline/core` reference
  from the output.

  Elements now carry real attribute types and typed event objects (`e.currentTarget` is the element you
  clicked, not `any`). `ref` stays Inkline's `{ current }` object, `children` and `key` stay
  compiler-opaque, and every `$`-prefixed key — `$bind:value`, `$if`, and any future directive — stays
  unconstrained. Component props are deliberately unchanged: `InkComponent` keeps its
  `[attr: string]: any`, so `<IButton colr="light" />` still type-checks.

  The declarations get bigger: `dist/jsx-runtime.d.mts` goes from ~1.7 kB to ~163 kB (21.5 kB gzipped),
  since the element surface is inlined rather than referenced. That is types-only weight.

  ## Migrating

  **Custom elements are the sharpest edge.** Any web component in your markup was previously accepted
  by the `any` index signature and is now an error, because `IntrinsicElements` enumerates only the
  standard HTML, SVG and MathML tags:

  ```
  <my-custom-element />
  // error TS2339: Property 'my-custom-element' does not exist on type 'JSX.IntrinsicElements'.
  ```

  Declare it once, anywhere in your project's type scope, and it is typed everywhere — including
  autocomplete on its own props. This is the fix for custom elements, and it keeps every other element
  strict:

  ```ts
  // src/inkline-jsx.d.ts
  declare module "@inkline/core/jsx-runtime" {
    namespace JSX {
      interface IntrinsicElements {
        "my-custom-element": { foo?: string; children?: any };
      }
    }
  }
  ```

  The same augmentation takes an index signature (`[elemName: string]: any`) if you have a whole family
  of them and do not want to enumerate it yet.

  ### What else changes

  15 realistic downstream patterns, type-checked against the published `dist/`. Ten are newly
  diagnosed; five that look risky are fine:

  | Pattern                             | Now                                                     |
  | ----------------------------------- | ------------------------------------------------------- |
  | `<my-custom-element />`             | TS2339 — see above                                      |
  | `className="…"`                     | TS2322 — use `class`                                    |
  | `htmlFor="…"`                       | TS2322 — use `for`                                      |
  | `dangerouslySetInnerHTML={…}`       | TS2322 — use `innerHTML`                                |
  | `defaultValue="…"`                  | TS2322 — use `value`                                    |
  | `autoFocus`                         | TS2322, did-you-mean `autofocus`                        |
  | `spellCheck={false}`                | TS2322, did-you-mean `spellcheck`                       |
  | `contentEditable="true"`            | TS2322 — it is a union, not a string: use `{true}`      |
  | `style={{ fontSize: 12 }}`          | TS2561, did-you-mean `font-size` — CSS keys are kebab   |
  | `role="buton"`                      | TS2820, did-you-mean `"button"` — this one is the point |
  | `maxLength={10}`                    | fine                                                    |
  | `tabIndex={0}`                      | fine                                                    |
  | `readOnly`                          | fine                                                    |
  | `style={{ "font-size": "12px" }}`   | fine — object `style` is supported, kebab keys          |
  | `onInput={(e) => e.currentTarget…}` | fine, and `currentTarget` is now the real element type  |

  Note that camelCase is **not** a reliable rule of thumb in either direction: `maxLength`, `tabIndex`
  and `readOnly` are declared alongside their lowercase spellings, while `autoFocus` and `spellCheck`
  are not. Where a camelCase spelling is unsupported TypeScript emits a did-you-mean, so the compiler
  tells you which is which — do not try to predict it.

  This landed with zero edits across Inkline's own 168 authored components and fixtures, so most
  codebases should see few or none of these.

  ### Last resort: opt out entirely

  If you hit more than you can fix now, point `jsxImportSource` at a local shim to restore the old
  untyped surface. **This disables the feature everywhere**, so prefer the augmentation above and reach
  for this only to unblock a large migration:

  ```ts
  // src/inkline-jsx-any/jsx-runtime.ts
  export { jsx, jsxs, Fragment } from "@inkline/core/jsx-runtime";

  export namespace JSX {
    export type Element = any;
    export interface IntrinsicElements {
      [elemName: string]: any;
    }
    export interface ElementChildrenAttribute {
      children: {};
    }
  }
  ```

  ```jsonc
  // tsconfig.json
  {
    "compilerOptions": {
      "jsxImportSource": "inkline-jsx-any", // was "@inkline/core"
      "paths": {
        "inkline-jsx-any/jsx-runtime": ["./src/inkline-jsx-any/jsx-runtime.ts"],
      },
    },
  }
  ```

  This affects type-checking and editors only — the Inkline compiler reads `.ink.tsx` directly and is
  unaffected by `jsxImportSource`. Delete the shim once the real errors are fixed.
