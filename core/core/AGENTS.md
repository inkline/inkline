# @inkline/core

The authoring API for `.ink.tsx` components. Provides typed primitives, control-flow components, and a JSX runtime. Imported by every Inkline component file.

For usage, see [`core/compiler/README.md`](../compiler/README.md) and [docs/authoring-components.md](../../docs/authoring-components.md).

## Critical invariant

**All exports here are authoring-time stubs.** The implementations in [`src/index.ts`](./src/index.ts) are identity functions / no-ops:

```ts
export function createSignal<T>(initial: T): [() => T, (v: T) => void] {
  let value = initial;
  return [() => value, (v) => { value = v; }];
}
export function createMemo<T>(fn: () => T): () => T { return fn; }
export function createEffect(fn: () => void | (() => void)): void { fn(); }
export function Show(_props: …): any { return null; }
// etc.
```

This package exists so authoring code type-checks and produces predictable IR. The compiler **removes every reference** to `@inkline/core` during emission — no `@inkline/core` runtime ships to consumers.

Implication: do not add real reactive behavior, real DOM rendering, or expensive logic to these stubs. Any "real" behavior must come from the per-framework code the compiler emits.

## Exports

Two entry points, declared in [`package.json`](./package.json) `exports`:

| Subpath         | Source                                       | Purpose                                                                                       |
| --------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `.`             | [`src/index.ts`](./src/index.ts)             | The authoring API (primitives + control-flow).                                                |
| `./jsx-runtime` | [`src/jsx-runtime.ts`](./src/jsx-runtime.ts) | JSX runtime referenced from authoring `tsconfig.json` via `jsxImportSource: "@inkline/core"`. |

### Authoring API (from `src/index.ts`)

| Export                                                 | Shape                                 | Notes                                                                                                                                                                                                                                               |
| ------------------------------------------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defineComponent`                                      | `(setup) \| (options, setup)`         | Sole component declaration entry point. `options` carries `slots`, `events`, `runtime`, `name`, `meta` (`meta.headless` marks a behavior-only component; the Angular target extracts its single static-element root as an attribute-selector host). |
| `createSignal<T>`                                      | `(initial) → [getter, setter]`        | Reactive state.                                                                                                                                                                                                                                     |
| `defineModel<T>`                                       | `(name = "value") → [getter, setter]` | Two-way-bindable prop + its `update:<name>` event (parents `$bind:<name>`).                                                                                                                                                                         |
| `defineEmits<E>`                                       | `(names?) → emit(event, …args)`       | Declares custom events; `emit(name, …)` maps to each target's event channel.                                                                                                                                                                        |
| `createMemo<T>`                                        | `(() => T) → () => T`                 | Derived value.                                                                                                                                                                                                                                      |
| `createEffect`                                         | `(() => void \| cleanup) → void`      | Side effect.                                                                                                                                                                                                                                        |
| `createRef<T>`                                         | `() → { current: T \| null }`         | Element ref.                                                                                                                                                                                                                                        |
| `createResource<T>`                                    | `(fn) → [data, meta]`                 | Async resource (deferred runtime).                                                                                                                                                                                                                  |
| `onMount`, `onCleanup`                                 | `(() => void) → void`                 | Lifecycle.                                                                                                                                                                                                                                          |
| `batch`, `untrack`                                     | `(() => T) → T`                       | Update grouping / dependency suppression.                                                                                                                                                                                                           |
| `defineSlot`                                           | `(name?) → any`                       | Binds an identifier to a named slot.                                                                                                                                                                                                                |
| `hasSlot`                                              | `(name?) → boolean`                   | Whether a (named, or default) slot was filled; compiles to a per-target presence check.                                                                                                                                                             |
| `Slot`, `Show`, `For`, `Switch`, `Match`, `Transition` | JSX components                        | Control-flow + slotting + transition. Lowered to IR nodes in compiler pass P3.                                                                                                                                                                      |

When you add a new primitive, **add the corresponding compiler binding** in [`core/compiler/src/pipeline/passes/02-parse/`](../compiler/src/pipeline/passes/02-parse/) (parse → IR) and [`core/compiler/src/pipeline/passes/03-lower/`](../compiler/src/pipeline/passes/03-lower/) (if it lowers to a different IR shape). A primitive without a compiler binding will be left as-is in output and likely break consumers.

## Build

```bash
vp pack          # one-shot
vp pack --watch  # rebuild on change (no script wired today; run manually)
```

Output: `dist/index.{mjs,d.mts}` + `dist/jsx-runtime.{mjs,d.mts}`.

## Tests

[`src/index.test.ts`](./src/index.test.ts) and [`src/jsx-runtime.test.ts`](./src/jsx-runtime.test.ts) pin the stub contracts (identity/no-op shapes, tuple returns). Behavioral coverage lives in [`@inkline/compiler`](../compiler/) (compile + scenario tests assert what the _compiled_ output does). Keep tests here shallow — the runtime is intentionally inert.

## See also

- [docs/authoring-components.md](../../docs/authoring-components.md) — how contributors use these primitives.
- [docs/architecture.md](../../docs/architecture.md) → "Compilation pipeline" — what the compiler does with `@inkline/core` references.
- [`core/compiler/AGENTS.md`](../compiler/AGENTS.md) — where the lowering rules live.
