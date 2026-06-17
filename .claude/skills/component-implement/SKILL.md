---
name: component-implement
description: Phase 2 of building an Inkline component — write the .ink.tsx source. Author the headless part(s) (behavior + accessibility, no styling), then one styled component that composes them and applies a styleframe recipe, then the .styleframe.ts, then register the export. Compiles to all 7 frameworks. Use when implementing a component from a spec, or adding/fixing component source.
triggers:
  - implement a component
  - write the component code
  - build the component source
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# Component implementation — headless, styled, styleframe, register

Author the `.ink.tsx` source so it compiles cleanly to all 7 targets. Mirror the live exemplar's structure exactly — do not invent new patterns.

## Read first

1. The spec at `.context/component-<name>-spec.md` (from `component-research`). If it's missing and you're working standalone, read the existing source and infer the contract before changing it.
2. `.claude/skills/create-component/reference/conventions.md` and `.../reference/primitives.md` — the split, the fallthrough rule, the primitives, and the **per-target gotchas**.
3. The matching exemplar source: `badge/` (single part), `button/` (stateful + custom styles), `input/` (multi-part family with slots + two-way).

## Steps

### 1. Scaffold

Create `ui/components/src/components/<name>/{headless,styled}/`.

### 2. Headless first — `headless/I<Name>Base.ink.tsx`

Behavior, structure, slots, events, accessibility. **No styleframe classes, no design tokens.** Single host-element root (so styled's `class` falls through — see conventions). TSDoc every prop. The minimal shape (from `badge`):

```tsx
import { defineComponent, Slot } from "@inkline/core";

export interface BadgeBaseProps {
  /** Text content; overridden by the default slot. */
  label?: string;
}

export default defineComponent({ slots: { default: {} } }, (props: BadgeBaseProps) => {
  return (
    <div class="badge">
      <Slot>{props.label}</Slot>
    </div>
  );
});
```

For stateful components, reflect state in ARIA and gate decoration with `<Show>` (from `button`):

```tsx
<button
  class="button"
  type={props.type ?? "button"}
  disabled={props.disabled || props.loading}
  aria-busy={props.loading ? "true" : "false"}
>
  <Show when={!!props.loading}>
    <span class="button-spinner" aria-hidden="true" />
  </Show>
  <Slot>{props.label}</Slot>
</button>
```

For a family, author one `I<Name>*Base` per structural part. Two-way state uses `defineModel` and must coalesce optional strings for Solid:

```tsx
const [value, setValue] = defineModel<string>("value");
// ...
<input
  value={value() ?? ""}
  onInput={(e: { currentTarget: HTMLInputElement }) => setValue(e.currentTarget.value)}
/>;
```

Apply the **a11y baseline** from conventions: native element first, correct role/ARIA states, `aria-hidden` on decorative nodes, accessible name, keyboard map per the spec's APG pattern.

### 3. Styled — `styled/I<Name>.ink.tsx`

Compose the headless part(s) and apply the recipe class via `createMemo`. The styled props interface extends the base + the recipe's styling props:

```tsx
import { defineComponent, Slot, createMemo } from "@inkline/core";
import IBadgeBase, { type BadgeBaseProps } from "../headless/IBadgeBase.ink.tsx";
import { badgeRecipe, type BadgeRecipeProps as BadgeStylingProps } from "virtual:styleframe";

export interface BadgeProps extends BadgeBaseProps, BadgeStylingProps {}

export default defineComponent({ slots: { default: {} } }, (props: BadgeProps) => {
  const className = createMemo(() =>
    badgeRecipe({ color: props.color, variant: props.variant, size: props.size }),
  );
  return (
    <IBadgeBase class={className()}>
      <Slot>{props.label}</Slot>
    </IBadgeBase>
  );
});
```

- **Layout/extra flags** combine into the class list (from `button`): `[buttonRecipe({…}), props.block && "button--block"].filter(Boolean).join(" ")`.
- **Optional addons** are gated by slot presence (from `input`): `<Show when={hasSlot("prefix")}><IInputPrefixBase class={…}><Slot name="prefix" /></IInputPrefixBase></Show>`. Expect `INK0068` on Qwik + Angular (×2) — that's why step 4 ships `:empty` rules.
- **One styled component per family** composes every headless part; do not make one styled component per part.

### 4. Styleframe — `styled/I<Name>.styleframe.ts`

Register the recipe(s) and add any custom CSS. Branch on the spec's styling decision:

**(a) `@styleframe/theme` exports `use<Name>Recipe`** — reuse it:

```ts
import { styleframe } from "virtual:styleframe";
import { useBadgeRecipe } from "@styleframe/theme";

const s = styleframe();
export const badgeRecipe = useBadgeRecipe(s);
```

Layer custom, non-recipe rules in the same file (from `button` — `.button--block`, the spinner keyframes + selector):

```ts
s.selector(".button--block", { width: "100%" });
s.keyframes("button-spin", { "100%": { transform: "rotate(360deg)" } });
s.selector(".button-spinner", {
  /* … */
});
export const buttonRecipe = useButtonRecipe(s);
```

**(b) No theme recipe exists** — author styles locally with `s.recipe(...)` / `s.selector(...)`, exporting `<name>Recipe`. Define the same `color`/`variant`/`size` axes the props expose. **Always** add `:empty` collapse rules for any slot-gated addon (Qwik/Angular render the wrapper unconditionally):

```ts
s.selector(".<name>-prefix:empty, .<name>-suffix:empty", { display: "none" });
```

Gate animations behind `prefers-reduced-motion`.

### 5. Register

Add the styled export and every headless part to `ui/components/src/components/index.ts`:

```ts
export { default as IBadge } from "./badge/styled/IBadge.ink.tsx";
export { default as IBadgeBase } from "./badge/headless/IBadgeBase.ink.tsx";
```

### 6. Verify

`cd ui/components && pnpm build`. The component must compile to **all 7 targets** with only the expected notices: `INK0045` (Astro two-way, if any) and `INK0068` (Qwik + Angular, if `hasSlot` is used). Anything else (`INK0120` fallthrough, `INK0060`, `INK0050`, conformance failures) is a real defect — fix it. See `.../reference/verification.md` for the noise baseline.

## Exit criteria

`pnpm build` is clean (only expected notices), the export is registered, every prop has TSDoc, and the source mirrors the exemplar's structure. Hand off to `component-stories` and `component-test`.
