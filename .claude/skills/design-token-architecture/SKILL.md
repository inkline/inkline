---
name: design-token-architecture
description: Styleframe's design-token system — the 23 token composables, OKLCH color internals, scales/multipliers, theming, and the elements/states/sanitize/preset layers. Use when designing, extending, or mapping tokens.
---

# Design token architecture

## Token tiers

Primitive values → semantic tokens (`color.primary`, `spacing.md`) → component consumption (recipes reference semantic tokens only). Name semantically, never by appearance (`color.primary`, not `color.blue`). Variables use dot notation (`color.primary` → `--color--primary`); composable-defined variables MUST pass `{ default: true }` so user overrides win at merge.

## The 23 token composables (`theme/src/variables/`)

Colors: `useColorDesignTokens`, `useColorLevelDesignTokens`, `useColorShadeDesignTokens`, `useColorTintDesignTokens` · Scales: `useScaleDesignTokens`, `useScalePowersDesignTokens` · Spacing: `useSpacingDesignTokens`, `useMultiplierDesignTokens` · Typography: `useFontFamilyDesignTokens`, `useFontSizeDesignTokens`, `useFontWeightDesignTokens`, `useFontStyleDesignTokens`, `useLineHeightDesignTokens`, `useLetterSpacingDesignTokens` · Borders/effects: `useBorderWidthDesignTokens`, `useBorderRadiusDesignTokens`, `useBorderStyleDesignTokens`, `useBorderColorDesignTokens`, `useBoxShadowDesignTokens` · Plus: `useBreakpointDesignTokens`, `useEasingDesignTokens`, `useDurationDesignTokens`, `useZIndexDesignTokens`.

Composition pattern (scale-driven spacing):

```ts
const { spacing } = useSpacingDesignTokens(s, { default: "1rem" } as const);
const { scale } = useScaleDesignTokens(s, { default: "@minor-third" });
const scalePowers = useScalePowersDesignTokens(s, scale);
const { spacingSm, spacingMd } = useMultiplierDesignTokens(s, spacing, {
  sm: scalePowers[-1],
  md: scalePowers[0],
});
```

## Color internals

Colors convert to **OKLCH** internally; `theme/src/utils/oklchGamut.ts` handles gamut mapping. Shade/tint/level steps (`-shade-50`, `-tint-50`, `-150`, `-750`, …) power recipe state styling and dark mode. Integration tests assert computed colors **as OKLCH** — expect that format in assertions. WCAG-AAA guaranteed palettes are an active roadmap theme.

## Theming

`theme('dark', ctx => ctx.variable(colorBackground, '#18181b'))` scopes to `[data-theme="dark"]`. Dark mode is **theme-driven** (attribute), not media-query-driven — recipes embed dark styling via `&:dark` nested selectors. `useGlobalPreset` centralizes element theme overrides via `registerElementThemes`.

## The layers above tokens (all in @styleframe/theme)

- **Modifiers** (8 composables): pseudo-state, pseudo-element, form-state, aria-state, media-preference, structural, directional, other-state.
- **Utilities**: ~303 `use*Utility` exports across 15 categories — near-Tailwind-parity including logical properties (Start/End/X/Y), ring/divide/space families, backdrop filters, gradients. Plus `useShorthandUtilitiesPreset` (Tailwind-style `m`, `p`, `w`, `text`).
- **Elements** (23 composables): semantic HTML base styles (`useBodyElement`, `useHeadingElement`, `useLinkElement`, `useCodeElement`, …) — back `useGlobalPreset`.
- **States**: `useFocusState`, `useSelectionState` (global focus/selection, theme-aware).
- **Sanitize** (4): reset layer backing `useSanitizePreset`.
- **Presets** (6): `useDesignTokensPreset` (flat all-tokens), `useUtilitiesPreset`, `useShorthandUtilitiesPreset`, `useModifiersPreset`, `useGlobalPreset`, `useSanitizePreset`.

## DTCG mapping awareness (coordinate with Bridge)

Tokens export to W3C DTCG (`styleframe dtcg export` → `tokens.json` + `tokens.resolver.json` for themes). Primitive types map cleanly (color, dimension, string); **composites (multi-shadow, gradients, typography) and booleans do not yet** — heterogeneous arrays fall back to `dev.styleframe.expression` extensions. When adding token kinds, state their DTCG story in the PR.
