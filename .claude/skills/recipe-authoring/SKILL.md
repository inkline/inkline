---
name: recipe-authoring
description: How @styleframe/theme component recipes are built — createUseRecipe, variant axes, compound variants with dark mode, shared factories, the current 39-family catalog and its gaps. Use when authoring, documenting, showcasing, or reviewing recipes.
---

# Recipe authoring in @styleframe/theme

## The pattern

Every public recipe is built with `createUseRecipe(name, defaults, setup?)` (`theme/src/utils/createUseRecipe.ts`) → returns `use<Name>Recipe(s, options?)`. At call time it `defu`-merges caller options over defaults, optionally applies a `FilterConfig` (prunes variant values, compound variants, defaults), then calls `s.recipe({ name, ...config })`. Optional `setup` runs side-effect registrations first (e.g. field recipes register nested `.${name}-field` reset selectors).

`RecipeConfig` = `{ base, variants: Record<axis, Record<value, cssBlock>>, defaultVariants, compoundVariants: [{ match, css?, className? }] }`.

## The standard axes (keep the catalog consistent)

- `color`: **9** — primary, secondary, success, info, warning, error, light, dark, neutral
- `variant`: **6** — solid, outline, soft, subtle, ghost, link (interactive recipes)
- `size`: **5** — xs, sm, md, lg, xl
- Button reference: ~54 compoundVariants covering color×variant; **defaultVariants = `{ color: "neutral", variant: "solid", size: "md" }`** (source truth — older docs said `primary`).

**Dark mode lives inside compound variants** via nested `&:dark` / `&:dark:hover` selectors using shade/tint/level steps (`@color.primary-shade-50`, `-tint-50`, `-150`, `-750`, …). Theme-driven (data-theme), not media-query-driven.

## Rules

1. Semantic tokens only — every value is a `@`-ref or `ref()`; zero hardcoded colors/sizes.
2. Recipes register AFTER the utilities/modifiers they reference (hard throw otherwise).
3. Multi-part components ship part-recipes (`use<Name><Part>Recipe`) sharing one naming family; reuse the shared factories instead of duplicating axis systems:
   - `createFieldRecipe` / `createFieldAddonRecipe` / `fieldSurfaceCompoundVariants` (input, textarea, otp…)
   - `createMenuRecipe` (dropdown, context-menu), `createOverlayRecipes` (modal, drawer, popover)
   - `createSidebarRecipe`, `createDismissRecipe`
     These are intentionally not barrel-exported.
4. Accessibility is part of the definition of done: contrast at every color×variant×state (aim WCAG AA now; AAA work is a roadmap theme), visible focus treatment, motion respecting `motionReduce`.
5. A recipe isn't shipped until: colocated tests + Storybook story (all axes) + docs page + changeset. File the Storybook/docs issues to @herald/@quill if not doing them yourself.
6. **Inkline is customer zero**: it calls `use<Name>Recipe(s)` in `.styleframe.ts` files and layers extra selectors. Renaming/removing an axis or value is a breaking change → migration note + heads-up.

## Catalog snapshot (39 families, ~148 recipe exports — verify with `ls theme/src/recipes`)

Rich multi-part: sidebar(15), page-hero(8), select(7), context-menu(6), accordion(5), drawer(5), dropdown(5), modal(5), popover(5), callout(4), card(4), chat-message(4), color-picker(4), media(4), slider(4), spinner(4), tabs(4). Mid: avatar(3), checkbox(3), input(3), pagination(3), radio(3), textarea(3), breadcrumb(2), calendar(2), chip(2), nav(2), otp(2), switch(2), toggle(2). Single-part: badge, button, field-group, hamburger-menu, placeholder, progress, skeleton, tooltip. Factory-only: dismiss.

## Known gaps (the target list, roughly priority-ordered)

toast/notification (only static callout exists) · combobox/autocomplete · date-picker (calendar primitive exists) · data-table/grid · command palette · stepper/wizard · number-input · tag-input · file-upload · menubar/navigation-menu · tree · carousel · rating · scroll-area · resizable/splitter · standalone separator · timeline.

Pick from this list when asked for "next recipes"; cross-check what Inkline needs next.
