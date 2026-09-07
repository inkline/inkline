---
name: ink-authoring-api
description: The .ink.tsx authoring API — defineComponent, the compiler macros (defineProps, defineModel, defineEmits, defineSlot, hasSlot), signals, control flow, slots, two-way binding, events — plus per-target rewrite behavior and the anti-patterns that reviewers reject on sight. Use whenever writing or reviewing .ink.tsx code.
---

# The `.ink.tsx` authoring API

## The model

Components are authored once against `@inkline/core` and compiled to 7 frameworks. **`@inkline/core` is authoring-time stubs** — identity functions and no-ops that exist so code type-checks and produces predictable IR. The compiler removes every reference during emission; no core runtime ships. Never add real reactive/DOM behavior to the stubs — real behavior comes from the per-framework code the compiler emits.

```tsx
import {
  defineComponent,
  defineProps,
  defineSlot,
  createSignal,
  createMemo,
  Show,
  Slot,
} from "@inkline/core";

export interface ButtonBaseProps {
  label?: string;
  disabled?: boolean;
}

export default defineComponent(
  { meta: { headless: true } }, // options (events, meta, name)
  () => {
    const props = defineProps<ButtonBaseProps>(); // props — macro form, the primary style
    defineSlot(); // slots — macro form; the call declares, the binding is optional
    const [count, setCount] = createSignal(0);
    const doubled = createMemo(() => count() * 2);
    return (
      <button disabled={props.disabled} onClick={() => setCount(count() + 1)}>
        <Show when={doubled() > 4} fallback={<span>keep going</span>}>
          …
        </Show>
        <Slot>{props.label}</Slot>
      </button>
    );
  },
);
```

## Macros and the props channel

Macros — `defineProps` · `defineModel` · `defineEmits` · `defineSlot` · `hasSlot` — are read at build time and erased. Recognized **by binding, not by name**, so an alias still works and a same-named local function is left alone. Grammar: **top level of the setup body only** (INK0049; `hasSlot` is exempt — it is a query), **statically analyzable arguments only** (INK0048; `defineModel` reports INK0043 instead), **one declaration channel per concern** (props INK0047 = error; an event name in both channels is INK0046 = warning, `defineEmits` wins), **bind the result** (INK0075; `defineSlot` is exempt — the call declares the slot on its own), **always erased**.

Props have three channels and a component uses exactly one: `defineProps<T>()` / `defineProps({…})` (**primary style**, ADR-010 decision 5), the setup parameter's type annotation (kept because it is the only channel plain `tsc` sees), or the options `props` map (per-prop defaults). Two of them is INK0047.

Slots have two channels: `defineSlot(name?)` (**primary style**, UXF-251) or the options `slots` map (the only channel that can express `scoped` / `required`). Unlike props and events, using both is **not** diagnosed — the two declarations merge into a duplicate. Declare each slot once. `defineSlot` is the one macro whose binding is optional (UXF-254): the call declares the slot, and the binding only gives the render tree a name to place it by. Write `defineSlot();` when the body renders the slot with `<Slot>`, and `const footer = defineSlot("footer")` when it places `{footer}` directly. The two forms emit identical code.

**Name the `defineProps` binding `props`** — targets rewrite the props object under that fixed name, so any other name emits an undeclared identifier. Hard error INK0074, on the macro channel and the setup parameter alike; it fires on a **read** of the binding, matched on the symbol and not on the name, so an unread binding stays legal. `defineProps` does **not** type the parent side; `<IButton colr="x" />` is still unchecked. The corpus under `ui/components` is still on the annotation form (house style is open, ADR-010 decision 8) — new components use the macro.

## Primitives (all from `@inkline/core`)

`createSignal(initial) → [get, set]` · `createMemo(fn)` · `createEffect(fn)` (may return cleanup) · `createRef()` (`.current`, element refs only) · `onMount` / `onCleanup` · `batch` / `untrack` · `defineProps<T>()` / `defineProps({…})` (props) · `defineModel(name = "value")` (two-way prop + `update:<name>` event, returns a signal tuple) · `defineEmits<E>() → emit` (custom events) · `defineSlot` / `hasSlot(name?)` · `createResource` (deferred — no runtime yet).

Control flow is JSX, lowered in compiler pass P3: `<Show when fallback>` · `<For each key>` (**key is required** — INK0050 without it) · `<Switch>`/`<Match>` · `<Slot name?>` with fallback children (capital S — a lowercase `<slot>` is INK0077) · `<Transition>` (wraps one conditional element).

## How reads rewrite per target (the compiler's job, but know it)

| Source        | React         | Solid         | Vue               | Svelte      |
| ------------- | ------------- | ------------- | ----------------- | ----------- |
| `count()`     | `count`       | `count()`     | `count`           | `count`     |
| `setCount(x)` | `setCount(x)` | `setCount(x)` | `count.value = x` | `count = x` |

Two-way: child declares `defineModel("value")`; parent binds `$bind:value={text}` (also on native elements). Emits per target: Vue `v-model:value`, Svelte `$bindable`, Angular `model()`, React/Solid `value` + `onUpdateValue`, Qwik QRL, **Astro one-way only** (static SSR — INK0045 notice). `emit("change", x)` becomes `props.onChange?.(x)` (React/Solid), `defineEmits` (Vue), callback prop (Svelte), `@Output()` (Angular), QRL (Qwik); inert on Astro.

`hasSlot("prefix")` lowers to a real runtime presence check on React/Solid/Svelte/Vue/Astro but is **always `true` on Qwik and Angular** (no runtime slot-presence API — INK0068 info notice). Pair every `hasSlot`-gated wrapper with a CSS `:empty` collapse rule in the component's `.styleframe.ts`.

## Anti-patterns (reviewers reject on sight)

1. **Namespace import of core** (`import * as ink from "@inkline/core"`) — hard error INK0001. Named imports only.
2. **`<For>` without `key`** (INK0050); `<Show>` without `when` (INK0060); `<For>` without `each` (INK0062).
3. **A new primitive without its compiler binding.** Adding an export to `core/core` without wiring parse (P2) and lowering (P3) in the compiler leaves it verbatim in output and breaks every consumer. End-to-end or not at all.
4. **Real logic in core stubs** — the stubs are inert by contract.
5. **Component-ref forwarding** — unsupported (INK0070); element refs only.
6. **Dynamic reactive reads** (`obj[key()]`) — defeats static dependency tracking (INK0020); React falls back to recompute-every-render.
7. **Solid renders `undefined` as the string `"undefined"`** for native string props — coalesce optional string→attribute bindings with `?? ""`.
8. **`!!`, `Boolean()`, `??` sprinkled in JSX** that must stay lint-clean across 7 emitted outputs — prefer explicit conditionals; check the compiled output when in doubt.
9. **Interface-extension styling props that the compiler can't enumerate.** The compiler only enumerates members of directly-named interfaces — when extending recipe prop types would collide (e.g. recipe `disabled: "true" | "false" | boolean` vs a native `boolean`), declare the styling props explicitly (see `input/styled/IInput.ink.tsx`).
10. **Effects for derivation** — `createMemo` derives, `createEffect` is for real side effects only; an effect with no reactive reads runs once (INK0010).
11. **Destructuring the props object** — reads stay `props.x` (Solid's reactive proxy; `requirePropsNotDestructured` enforces it on the output). A props binding under any name other than `props` is the same defect one step earlier, and it is now hard error INK0074 — raised on a **read** of the binding, matched on the symbol and not on the name, for the `defineProps` macro and the setup parameter alike. An unread binding (`const _props = defineProps<EmptyProps>()` in a headless component) stays legal.

## Where the truth lives

`core/compiler/README.md` (user-facing reference — mind its known drift), `core/core/AGENTS.md` (stub invariant + export table), diagnostics registry `core/compiler/src/core/diagnostics/codes.ts` (INK0001–INK0120). Component-building procedure: the `research/implement/stories/test/document-component` phase skills; live exemplars `ui/components/src/components/{badge,button,input}`.
