---
name: design-token-architecture
description: How design tokens and recipes flow from styleframe into Inkline — the presets, the two faces of virtual:styleframe, recipe class contracts, theming, and the rules for custom CSS in components. Use when designing, extending, or debugging component styling.
---

# Design token architecture (the styleframe boundary)

Inkline does not own a token system — it **consumes styleframe's**. `@styleframe/theme` provides 23 token composables (OKLCH color internals, scale-driven spacing, typography, borders/effects, breakpoints/easing/duration/z-index), ~300 utilities, modifiers, element/state/sanitize layers, and the component recipe catalog (~39 families). Inkline's job is to consume them consistently and report gaps upstream, not to fork them.

## The wiring

```
ui/components/styleframe.config.ts        # the design system for the whole catalog:
  useDesignTokensPreset(s)                #   all semantic tokens
  useSanitizePreset(s)                    #   reset layer
  useGlobalPreset(s)                      #   semantic HTML base styles + element themes
  useUtilitiesPreset(s)                   #   utility classes
  useModifiersPreset(s)                   #   hover/focus/dark/… modifiers
        ▼
styled/I<Name>.styleframe.ts              # per-family extension files:
  const s = styleframe()                  #   instance face of virtual:styleframe
  export const xRecipe = use<X>Recipe(s)  #   register the family's recipe(s)
  s.selector(".x--block", { … })          #   custom CSS layered on top
        ▼
styled/I<Name>.ink.tsx                    # consumer face of virtual:styleframe:
  import { xRecipe, type XRecipeProps }   #   compiled recipe fn + typed axis props
  class = createMemo(() => xRecipe({ color, variant, size }))
        ▼
inkline compile → ui/<framework>/.inkline/  +  .styleframe/ artifacts
  each framework package exports the compiled CSS bundle as  @inkline/<framework>/css
```

**Two faces of `virtual:styleframe`**: a `*.styleframe.ts` importer gets the shared instance (extension face); any other importer gets the compiled face (recipe functions + selector constants + types). Expecting the instance elsewhere is a defect. `.styleframe/` directories are generated — never hand-edit.

## The contracts

- **Axes**: `color` ×9 (primary, secondary, success, info, warning, error, light, dark, neutral), `variant` ×6 (solid, outline, soft, subtle, ghost, link), `size` ×5 (xs–xl). Component props alias the recipe's own types (`type XRecipeProps` from `virtual:styleframe`) so axis values have one source of truth.
- **Class format**: `<name>` base + `<name>--<axis>-<value>` modifiers (`button button--color-primary button--size-md`). Angular SSR sorts recipe keys alphabetically — assertions must expect sorted order. Runtime recipe names must match build-time names or classes silently miss their CSS.
- **Dark mode is theme-driven** (`[data-theme]`), not media-query-driven — recipes embed `&:dark` styling via shade/tint/level token steps. Components inherit it for free; never hand-roll dark variants.
- **Custom CSS rules** (in `.styleframe.ts`): semantic tokens only (`ref()` / `@`-refs) — a hardcoded color/size/duration is a defect, not a shortcut; layer on top of recipes (`.button--block`), never fork or re-declare recipe internals; slot-gated addon wrappers always get `:empty` collapse rules (Qwik/Angular render wrappers unconditionally); animations respect reduced motion.
- When authoring a local recipe (no upstream `use<Name>Recipe` yet): same axes, `s.recipe({ name, base, variants, defaultVariants, compoundVariants })`, utilities/modifiers before recipes that reference them (upstream hard-throws), composable variables take `{ default: true }`.

## Version discipline

styleframe versions are pinned in the `pnpm-workspace.yaml` catalog (`styleframe`, `@styleframe/{theme,core,runtime,transpiler,loader,plugin,cli,license}` — theme `^3.8.x` at snapshot). Bumping them is a coordinated change: rebuild, run the visual-parity suite, changeset the framework packages if emitted CSS changes observably. Upstream recipe/token renames arrive as breaking changes with migration notes — @bridge lands the migration, @palette adapts components. Token/recipe gaps found while building components become **upstream issues** (via @bridge), not local workarounds that fork the system.

## Accessibility of styles

Contrast at every color×variant×state is a styleframe-recipe responsibility — but Inkline verifies it in situ: visible focus treatment on interactive components, `aria-*` states styled (not just classes), reduced-motion honored. Contrast findings are checked with computed values, not by eye, and filed upstream with the ratio.
