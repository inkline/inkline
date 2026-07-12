---
name: ink-authoring-api
description: The .ink.tsx authoring API — defineComponent, signals, control flow, slots, two-way binding, events — plus per-target rewrite behavior and the anti-patterns that reviewers reject on sight. Use whenever writing or reviewing .ink.tsx code.
---

# The `.ink.tsx` authoring API

## The model

Components are authored once against `@inkline/core` and compiled to 7 frameworks. **`@inkline/core` is authoring-time stubs** — identity functions and no-ops that exist so code type-checks and produces predictable IR. The compiler removes every reference during emission; no core runtime ships. Never add real reactive/DOM behavior to the stubs — real behavior comes from the per-framework code the compiler emits.

```tsx
import { defineComponent, createSignal, createMemo, Show, Slot } from "@inkline/core";

export interface ButtonBaseProps {
  label?: string;
  disabled?: boolean;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } }, // options (slots, events, meta, name)
  (props: ButtonBaseProps) => {
    // setup — props via the TS parameter type
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

## Primitives (all from `@inkline/core`)

`createSignal(initial) → [get, set]` · `createMemo(fn)` · `createEffect(fn)` (may return cleanup) · `createRef()` (`.current`, element refs only) · `onMount` / `onCleanup` · `batch` / `untrack` · `defineModel(name = "value")` (two-way prop + `update:<name>` event, returns a signal tuple) · `defineEmits<E>() → emit` (custom events) · `defineSlot` / `hasSlot(name?)` · `createResource` (deferred — no runtime yet).

Control flow is JSX, lowered in compiler pass P3: `<Show when fallback>` · `<For each key>` (**key is required** — INK0050 without it) · `<Switch>`/`<Match>` · `<Slot name?>` with fallback children (default slot: the lowercase `<slot>` intrinsic also works) · `<Transition>` (wraps one conditional element).

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

## Where the truth lives

`core/compiler/README.md` (user-facing reference — mind its known drift), `core/core/AGENTS.md` (stub invariant + export table), diagnostics registry `core/compiler/src/core/diagnostics/codes.ts` (INK0001–INK0120). Component-building procedure: the `research/implement/stories/test/document-component` phase skills; live exemplars `ui/components/src/components/{badge,button,input}`.
