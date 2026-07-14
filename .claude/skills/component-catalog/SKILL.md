---
name: component-catalog
description: How Inkline components are built and kept consistent — the headless/styled split, family anatomy, prop/axis conventions, recipe consumption, the current 5-family catalog and its gap list. Use when authoring, documenting, showcasing, or reviewing components.
---

# The Inkline component catalog

The catalog lives in `ui/components/src/components/` — the **single source of truth** compiled to all 7 framework packages. It is what users adopt Inkline FOR. Consistency is the product: learning one component must teach all of them. The step-by-step build procedure lives in the phase skills (`research/implement/stories/test/document-component`, orchestrated by `create-component`); this skill is the catalog knowledge that keeps them coherent.

## Family anatomy (the law of the land)

```
<name>/
├── headless/I<Name>Base.ink.tsx        # behavior + accessibility, one per part, NO styling
├── styled/I<Name>.ink.tsx              # ONE per family — composes all parts + recipe classes
├── styled/I<Name>.styleframe.ts        # registers recipes + custom CSS for the family
├── stories/I<Name>.ink.stories.ts      # defineStories meta (args, argTypes, variants)
├── stories/<Variant>.ink.tsx           # render helpers (<div id="story"> grids)
└── */__snapshots__/, *.ink.test.ts     # colocated tests per part + styled
```

- **Headless parts** own structure, slots, events, ARIA — zero tokens, zero recipe classes; a single host-element root so the styled layer's `class` falls through. They are what consumers swap in to bring their own styling (exported as `I<Name>*Base` via the `headless.ts` barrel).
- **One styled component per family, never one per part.** `input/` is the model: five headless parts (shell, control, prefix, suffix, textarea), one `IInput` composing them. Optional addons gate on `<Show when={hasSlot("prefix")}>` with `:empty` collapse rules for Qwik/Angular.
- Registration: styled + headless exports in `src/components/index.ts`; internal-only parts (e.g. `IInputTextareaBase`) may stay unexported — deliberate, not an omission.

## Props & axes

- `interface <Name>Props extends <Name>BaseProps, <Name>StylingProps {}` where styling props alias the recipe's own types from `virtual:styleframe` — one source of truth for axis values. When recipe types collide with native ones (`disabled: "true" | "false" | boolean`), enumerate styling props explicitly (see `IInput`) — the compiler only enumerates directly-named interfaces.
- **The standard axes come from `@styleframe/theme` and are law**: `color` (9: primary, secondary, success, info, warning, error, light, dark, neutral) × `variant` (6: solid, outline, soft, subtle, ghost, link) × `size` (5: xs–xl). A component with clever one-off axes is worth less than nothing; extra booleans (`block`, `loading`) are fine as layered modifiers.
- Recipe classes render as `<name> <name>--<axis>-<value>` (e.g. `button button--color-primary button--size-md`); Angular SSR sorts class keys alphabetically — write assertions accordingly.
- TSDoc on every public prop — it feeds the future docs site and IDE surface.

## Styleframe consumption (`styled/I<Name>.styleframe.ts`)

```ts
import { styleframe } from "virtual:styleframe";
import { useButtonRecipe } from "@styleframe/theme";
const s = styleframe();
s.selector(".button--block", { width: "100%" }); // custom CSS layered, never forked
export const buttonRecipe = useButtonRecipe(s);
```

Reuse `use<Name>Recipe` from `@styleframe/theme` when it exists; author locally with the same axes when it doesn't (and file the upstream recipe request via @bridge). Custom values use tokens (`ref()`/`@`-refs), never hardcodes. Animations respect reduced motion. Slot-gated addons always ship `:empty` collapse rules.

## Definition of done (a component ships as a set)

Source + stories (meta with typed args/argTypes + per-axis render helpers) + colocated tests (~100% on its executable code; Angular SSR real-DOM checks via `mountStyledOnAngular`) + TSDoc + **changesets for each affected framework package** (`@inkline/components` itself is ignore-listed). Compile must be clean across all 7 targets with only the expected notices (INK0045 Astro two-way, INK0068 Qwik/Angular `hasSlot`). Partial deliveries create the doc-drift disease this team was built to cure.

## Catalog snapshot (5 families — verify with `ls ui/components/src/components`)

badge (1 part — the canonical single-part exemplar) · button (stateful + custom styles: spinner, block) · field-group (1) · hamburger-menu (1) · input (5 parts, two-way `defineModel`, slots — the multi-part exemplar). 13 barrel exports.

## The gap list (the runway)

`@styleframe/theme` ships ~39 recipe families; Inkline has components for 5. Build next where the recipe already exists upstream, roughly: **checkbox · radio · switch · select · textarea (standalone) · card · callout/alert · spinner · progress · avatar · chip · tooltip · tabs · accordion · dropdown · modal · drawer · popover · nav · breadcrumb · pagination · sidebar · skeleton/placeholder · slider · toggle · otp · calendar · media · color-picker · chat-message · context-menu · page-hero**. Recipes styleframe lacks (toast, combobox, date-picker, data-table, command palette, stepper) block on upstream — coordinate via @bridge; don't author one-off local styles for a family styleframe is about to ship. Priority unclear → ask @maestro, don't pick a favorite.
