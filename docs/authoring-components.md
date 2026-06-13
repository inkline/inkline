# Authoring components

How to add or modify an Inkline component. All components are authored in `.ink.tsx` files inside [`ui/components/`](../ui/components/) and compile to every framework target on rebuild.

For the user-facing language reference (primitives, control flow, lifecycle), the canonical source is [`core/compiler/README.md`](../core/compiler/README.md) — this document is the **contributor-facing** companion: where files live, how to wire a new component into the build, how to add stories and tests.

For the compiler's internals, see [architecture.md](./architecture.md).

## Where components live

```
ui/components/src/components/<name>/
├── headless/
│   └── I<Name>Base.ink.tsx        ← behavior only, no styling
├── styled/
│   └── I<Name>.ink.tsx            ← composes headless + styleframe class
└── stories/
    ├── <variant-1>.ink.tsx        ← Storybook stories, authored in .ink.tsx
    └── <variant-2>.ink.tsx
```

Example: [`ui/components/src/components/badge/`](../ui/components/src/components/badge/) — the canonical pattern to copy.

The split between `headless/` and `styled/` is deliberate:

- **Headless** components define structure, slots, props, events. No design tokens, no class names from `styleframe`. They are the testable, themable behavioral primitives.
- **Styled** components wrap the headless one and apply `styleframe`-generated classes from `virtual:styleframe`.

Consumers of `@inkline/{react,vue,…}` import the styled variant by default. The headless variants are available for users who want to ship custom styling.

## A minimal component

From [`ui/components/src/components/badge/headless/IBadgeBase.ink.tsx`](../ui/components/src/components/badge/headless/IBadgeBase.ink.tsx):

```tsx
import { defineComponent } from "@inkline/core";

export interface BadgeBaseProps {
  label?: string;
  disabled?: boolean;
}

export default defineComponent(
  {
    slots: { default: {} },
  },
  (props: BadgeBaseProps) => {
    return (
      <div class="badge" disabled={props.disabled}>
        <slot>{props.label}</slot>
      </div>
    );
  },
);
```

Three things to notice:

1. **`defineComponent` is the sole entry point.** It accepts either `(setup)` or `(options, setup)`. Use the options form when you need to declare slots, events, or prop metadata.
2. **Props are typed as a TypeScript parameter type** (`props: BadgeBaseProps`). The compiler reads the type to generate per-framework prop declarations.
3. **`<slot>` (lowercase) is the JSX intrinsic** the parser recognizes as the default slot. For typed / named / scoped slots, use the `<Slot>` JSX component from `@inkline/core` together with `defineSlot` — see [`core/compiler/README.md`](../core/compiler/README.md) and the compiler's slot fixtures.

The styled variant ([`IBadge.ink.tsx`](../ui/components/src/components/badge/styled/IBadge.ink.tsx)) composes the headless one:

```tsx
import { defineComponent } from "@inkline/core";
import IBadgeBase, { type BadgeBaseProps } from "../headless/IBadgeBase.ink.tsx";
import { badge, type BadgeProps as BadgeStylingProps } from "virtual:styleframe";

export interface BadgeProps extends BadgeBaseProps, BadgeStylingProps {}

export default defineComponent((props: BadgeProps) => {
  return <IBadgeBase class={badge(props as BadgeStylingProps)}>{props.label}</IBadgeBase>;
});
```

`virtual:styleframe` is provided by the `styleframe` integration; the resolved classnames live in each framework's `.styleframe/` directory (auto-generated — never hand-edit).

### Attribute fallthrough

This composition relies on **attribute fallthrough** (Vue-style attribute inheritance): when a parent passes attributes to a component, the compiler forwards them onto that component's root element. `class` is **merged** with the root's own class; every other non-prop attribute (`id`, `aria-*`, `data-*`, event handlers) is spread onto the root. That is how the styled variant's `badge(props)` classes reach the headless `<div class="badge">`.

Fallthrough requires a **single host-element (or component-instance) root**. A component whose root is a fragment, control-flow block, or multiple elements cannot inherit attributes — the compiler emits diagnostic `INK0120` if a parent passes a class to such a component.

Per-target notes:

- **React / Solid / Svelte / Qwik / Astro** — the inherited attributes are spread onto the rendered root element and `class` is merged there.
- **Vue** — handled natively by Vue's default `inheritAttrs`.
- **Angular** — handled natively: a `class`/`[class]` passed to a component is applied to its **host element** (the component selector), not the inner template root. Style Angular components accordingly (e.g. via `:host`).

## Authoring primitives

The full primitive set is documented in [`core/compiler/README.md`](../core/compiler/README.md). Quick reference:

| Need                   | Primitive                       | From            |
| ---------------------- | ------------------------------- | --------------- |
| Reactive state         | `createSignal(initial)`         | `@inkline/core` |
| Two-way model          | `defineModel("value")`          | `@inkline/core` |
| Custom events          | `defineEmits([...]) → emit`     | `@inkline/core` |
| Derived value          | `createMemo(() => expr)`        | `@inkline/core` |
| Side effect            | `createEffect(() => { … })`     | `@inkline/core` |
| Element ref            | `createRef()`                   | `@inkline/core` |
| Lifecycle              | `onMount`, `onCleanup`          | `@inkline/core` |
| Conditional            | `<Show when={…} fallback={…}>`  | `@inkline/core` |
| List                   | `<For each={…} key={…}>`        | `@inkline/core` |
| Switch / Match         | `<Switch>` + `<Match when={…}>` | `@inkline/core` |
| Named / scoped slot    | `<Slot>` + `defineSlot`         | `@inkline/core` |
| Slot-presence check    | `hasSlot("name")`               | `@inkline/core` |
| Conditional transition | `<Transition name="…" appear?>` | `@inkline/core` |

All primitives are authoring-time — the compiler removes them from emitted output. No `@inkline/core` runtime dependency is shipped to consumers.

## Adding a new component

1. Create the directory: `ui/components/src/components/<name>/{headless,styled,stories}/`.
2. Author `headless/I<Name>Base.ink.tsx` with behavior only.
3. Author `styled/I<Name>.ink.tsx` that composes the headless one.
4. Re-export from [`ui/components/src/components/index.ts`](../ui/components/src/components/index.ts) so it picks up in the compile step.
5. Add at least one story per variant under `stories/` (see "Stories" below).
6. Add fixture-based scenarios under [`core/compiler/src/__fixtures__/`](../core/compiler/src/__fixtures__/) if the component exercises a compiler feature not already covered (rarely needed for normal components).
7. Run `pnpm run storybook` and verify the component works across all seven targets.
8. Add a changeset (`pnpm changeset`) before opening a PR — see [release-process.md](./release-process.md).

## Stories

Stories are also authored in `.ink.tsx` and compiled per-framework into [`ui/<framework>/generated/stories/`](../ui/) by the CLI's story generator. Use the `defineStories` helper from [`@inkline/storybook`](../tooling/storybook/) to keep types tight.

Each story file represents a single variant (colors, sizes, states). See [`ui/components/src/components/badge/stories/`](../ui/components/src/components/badge/stories/) for the canonical layout. The unified Storybook aggregator ([`apps/storybook/`](../apps/storybook/)) consumes the compiled output and displays variants for every framework side-by-side.

## Testing

Component-level tests use [`@inkline/test-utils`](../tooling/test-utils/) and Vitest. Mount the compiled output across multiple targets and assert DOM-level behavior with `runScenarioAcrossTargets`. Place tests next to the source as `<name>.test.ts` per [conventions.md](./conventions.md).

For compiler-level coverage (does the IR represent your construct correctly across all targets?), add a fixture under [`core/compiler/src/__fixtures__/`](../core/compiler/src/__fixtures__/) and extend [`scenarios.ts`](../core/compiler/src/__fixtures__/) with DOM assertions. This is rare in normal component work — only needed when you exercise an untested compiler path.

## Common gotchas

- **`<For>` without `key`** emits `INK0050` (warning). Always supply a key.
- **`<Show>` without `when`** is a hard error (`INK0060`). Conditional rendering must specify its condition.
- **`<Transition>` must wrap a single conditional element.** Multiple children or wrapping `<For>` is rejected (`INK0065`-style diagnostics) — see [architecture.md](./architecture.md) → "Where `<Slot>` and `<Transition>` live".
- **Component refs are deferred to v1.** Element refs work; component refs emit `INK0070`. See [scope.md](./scope.md) → "Deferred to v1".
- **Dynamic reactive reads** (e.g. `obj[key()]`) prevent static dependency tracking and emit `INK0020`. Prefer destructuring or computed signals.

The full diagnostic table is in [`core/compiler/src/core/diagnostics/codes.ts`](../core/compiler/src/core/diagnostics/codes.ts) — that's the canonical source if docs drift.

## See also

- [architecture.md](./architecture.md) — how the compiler turns your `.ink.tsx` into seven framework outputs.
- [`core/compiler/README.md`](../core/compiler/README.md) — full language reference for `.ink.tsx`.
- [conventions.md](./conventions.md) — file naming, tests, commits.
