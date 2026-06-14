# `@inkline/core` primitives & per-target gotchas

Everything here is **authoring-time only** — the compiler removes it from emitted output, and no `@inkline/core` runtime dependency ships to consumers. The canonical language reference is `core/compiler/README.md`; this is the working subset for component authoring.

## Primitives

| Need                   | Primitive                                                     | Notes                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Declare a component    | `defineComponent(setup)` or `defineComponent(options, setup)` | Sole entry point. Use the options form to declare `slots` / `events`. Props are typed via the setup parameter: `(props: FooProps) => …`.                             |
| Reactive state         | `createSignal(initial)` → `[get, set]`                        | Call `get()` to read, `set(v)` to write.                                                                                                                             |
| Two-way model          | `defineModel<T>("value")` → `[get, set]`                      | Adds a `value` prop **and** a paired `update:value` event. Consumers bind `$bind:value`. Name extra models (`defineModel<boolean>("open")`).                         |
| Custom events          | `defineEmits<{ change: [value: string] }>()` → `emit`         | `emit("change", v)` maps to each target's event channel. Names are semantic, unprefixed.                                                                             |
| Derived value          | `createMemo(() => expr)`                                      | Use for computed class names: `createMemo(() => recipe({ … }))`.                                                                                                     |
| Side effect            | `createEffect(() => { … })`                                   | Re-runs when tracked deps change; return a cleanup fn.                                                                                                               |
| Element ref            | `createRef()` → `{ current }`                                 | DOM-element refs only. **Component refs are deferred (`INK0070`).**                                                                                                  |
| Lifecycle              | `onMount(fn)`, `onCleanup(fn)`                                |                                                                                                                                                                      |
| Default / named slot   | `<Slot>` (capital, from `@inkline/core`)                      | `<Slot>{props.label}</Slot>` for default with fallback; `<Slot name="prefix" />` for named. Declare every slot in options: `{ slots: { default: {}, prefix: {} } }`. |
| Slot presence          | `hasSlot("prefix")`                                           | Gate optional wrappers: `<Show when={hasSlot("prefix")}>…</Show>`. See per-target note below.                                                                        |
| Conditional            | `<Show when={cond} fallback={…}>`                             | `when` is **required** (`INK0060` if missing).                                                                                                                       |
| List                   | `<For each={items} key={…}>{(item) => …}</For>`               | Always pass `key` (`INK0050` warning if missing).                                                                                                                    |
| Switch / match         | `<Switch><Match when={…}>…</Match></Switch>`                  |                                                                                                                                                                      |
| Conditional transition | `<Transition name="…" appear?>`                               | Must wrap a **single** conditional element (not `<For>`, not multiple children).                                                                                     |

## Control-flow & authoring gotchas (with diagnostic codes)

- `<Show>` **must** have `when` → hard error **`INK0060`**.
- `<For>` **must** have `key` → warning **`INK0050`**.
- `<Transition>` wraps exactly one conditional element → `INK0065`-style error otherwise.
- Component refs are not supported yet → **`INK0070`**.
- **Dynamic reactive reads** like `obj[key()]` defeat static dependency tracking → **`INK0020`**. Prefer destructuring or a computed signal.
- A component that needs to inherit a `class` must have a **single host-element root** → **`INK0120`** otherwise (see conventions → attribute fallthrough).

## Per-target gotchas (these are the ones that bite)

- **Solid coerces `undefined` → the string `"undefined"`** when binding an optional string to a native prop. Coalesce: `value={value() ?? ""}`, `placeholder={props.placeholder ?? ""}`. Always do this for optional-string → native-attribute bindings.
- **Astro is static SSR** — two-way binding (`defineModel` / `$bind`) lowers to a one-way value and emits the info notice **`INK0045`** (one per two-way binding). This is expected, not an error.
- **Qwik & Angular have no runtime slot-presence API** — `hasSlot("x")` is `true` there, so a `<Show when={hasSlot("x")}>` wrapper is emitted unconditionally and must be collapsed with a CSS `:empty` rule in the `.styleframe.ts`. The compiler emits the info notice **`INK0068`** once per such target (so a single gated component → **2** `INK0068` notices: Qwik + Angular).

These three notices (`INK0045`, `INK0068`) are **expected** for components that use two-way binding or `hasSlot` gating. Tests assert them explicitly rather than treating them as failures (see the `component-test` skill).

## How bindings & slots lower per target (useful for test assertions)

| Concern               | React / Solid             | Vue                 | Svelte        | Angular                     | Qwik                        |
| --------------------- | ------------------------- | ------------------- | ------------- | --------------------------- | --------------------------- |
| Two-way `value`       | `value` + `onUpdateValue` | `v-model:value`     | `bind:value`  | `[value]` + `(valueChange)` | `value` + `onUpdateValue$`  |
| Slot presence         | `props.x != null`         | `!!$slots.x` (v-if) | `$$slots.x`   | always-render + `:empty`    | always-render (`{props.x}`) |
| Named slot projection | render-prop / children    | `<slot name>`       | `<slot name>` | `select="[slot=x]"`         | prop read                   |

The authoritative diagnostic-code table is `core/compiler/src/core/diagnostics/codes.ts`. If a code here ever disagrees with that file, that file wins.
