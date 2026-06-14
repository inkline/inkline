---
name: component-stories
description: Phase 3 of building an Inkline component — author single-source Storybook stories. Write a defineStories meta with typed args/argTypes and per-variant render helpers as .ink.tsx; these compile to CSF3 for all 7 frameworks. Use when adding or improving the stories for a component.
triggers:
  - add stories for a component
  - write storybook stories
  - story the component
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# Component stories — one source, seven frameworks

Stories are authored once in `.ink.tsx` and the CLI generates CSF3 per framework into `ui/<framework>/.inkline/.../stories/` (generated — never hand-edit). Good stories double as living documentation and a manual a11y/visual check across targets.

## Read first

1. The spec at `.context/component-<name>-spec.md` — the variant matrices and prop list drive the stories.
2. The exemplar `stories/` dir (`badge/stories/`, `button/stories/`) and `tooling/storybook/AGENTS.md`.
3. The `defineStories` types in `tooling/storybook/src/define.ts` — `StoryMeta` is `{ component, title, args?, argTypes? }`; a variant is `{ args? }` or `{ render: "./X.ink.tsx" }`.

## Steps

### 1. Meta — `stories/I<Name>.ink.stories.ts`

Use `defineStories<Props>()` with the styled component's props type. Set `component: "I<Name>"`, `title: "Components/<Name>"`, sensible default `args`, and an `argTypes` entry for **every meaningful prop** (control + options + description). Pull enum options straight from the spec/recipe.

```ts
import { defineStories } from "@inkline/storybook";
import type { ButtonProps } from "../styled/IButton.ink.tsx";

const meta = defineStories<ButtonProps>({
  component: "IButton",
  title: "Components/Button",
  args: { label: "Button", disabled: false, loading: false, block: false },
  argTypes: {
    label: { control: "text", description: "Button text content" },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "light",
        "dark",
        "neutral",
      ],
      description: "Color variant",
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "soft", "subtle", "ghost", "link"],
      description: "Style variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size variant",
    },
    disabled: { control: "boolean", description: "Disabled state" },
    loading: { control: "boolean", description: "Loading state with spinner" },
  },
});

export default meta;
```

### 2. Variants

Two kinds, both exported from the meta file:

- **State variants** — args-driven, inline: `export const Default = {};`, `export const Disabled = { args: { disabled: true } };`, `export const Loading = { args: { loading: true } };`. Cover every meaningful state from the spec.
- **Showcase variants** — a render-helper component: `export const Colors = { render: "./ButtonColors.ink.tsx" };`. Use these to show a whole axis at once (Colors, Variants, Sizes) or a composition example (e.g. Input with prefix/suffix).

### 3. Render helpers — `stories/<Variant>.ink.tsx`

A plain `defineComponent` returning the showcase wrapped in `<div id="story">`:

```tsx
import { defineComponent } from "@inkline/core";
import IBadge from "../styled/IBadge.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IBadge color="primary">Primary</IBadge>
      <IBadge color="secondary">Secondary</IBadge>
      <IBadge color="success">Success</IBadge>
      {/* …one per value in the axis… */}
    </div>
  );
});
```

Author one per axis you want to showcase. For composition examples, set the props/slots that demonstrate the feature (e.g. `<IInput prefix={<>$</>} suffix={<>USD</>} />`).

### 4. Verify

`cd ui/components && pnpm build` regenerates CSF3 for every framework — it must succeed with no new errors. Then `pnpm run storybook` (repo root) and confirm the component and all variants render across the 7 frameworks. (Per-framework: `pnpm storybook:react`, etc.)

## Exit criteria

A `defineStories` meta with full `argTypes`, inline variants for every meaningful state, render-helper showcases for each variant axis, `pnpm build` regenerating cleanly, and Storybook rendering across targets.
