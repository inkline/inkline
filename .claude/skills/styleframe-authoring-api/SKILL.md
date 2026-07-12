---
name: styleframe-authoring-api
description: The Styleframe authoring API — instance model, tokens, utilities, modifiers, recipes, themes — plus the anti-patterns that reviewers reject on sight. Use whenever writing or reviewing *.styleframe.ts / styleframe.config.ts code.
---

# Styleframe authoring API

## The single-instance model

One `Styleframe` instance from `styleframe.config.ts` is THE design system. Every `*.styleframe.ts` extension file imports the global instance from `virtual:styleframe`, extends it, and default-exports it. App code importing `virtual:styleframe` gets the compiled face instead (recipe functions + selector constants) — never the instance.

```ts
// styleframe.config.ts (or any *.styleframe.ts with `virtual:styleframe` import)
import { styleframe } from "styleframe"; // config: from barrel
// import { styleframe } from 'virtual:styleframe'; // extension files: from virtual
const s = styleframe();
const { variable, ref, selector, utility, modifier, recipe, theme, atRule, keyframes, media, css } =
  s;
export default s; // ALWAYS default-export the instance
```

## Core primitives

```ts
// Variables — dot notation → CSS custom property (color.primary → --color--primary)
const colorPrimary = variable('color.primary', '#006cff');
const spacing = variable('spacing', '1rem', { default: true }); // REQUIRED in composables

// References — never hardcode a var() string
backgroundColor: ref(colorPrimary)
color: ref('color.text', '#000')      // string ref + fallback
padding: "@spacing.md"                 // @-prefix shorthand ref

// Selectors — nesting, media, callback form
selector('.button', {
  padding: ref(spacing),
  '&:hover': { opacity: 0.9 },
  '@media (min-width: 768px)': { padding: '2rem' },
});

// Utilities — utility() returns a CREATOR that must be invoked or no CSS is emitted
const createPadding = utility('padding', ({ value }) => ({ padding: value }));
createPadding({ sm: ref(spacingSm), md: '@spacing.md' });          // object syntax
createPadding([ref(spacingSm), '1rem']);                            // array syntax
createPadding({ sm: ref(spacingSm) }, [hover, focus]);              // with modifiers

// Modifiers — wrap utility declarations; multi-key for breakpoints
const hover = modifier('hover', ({ declarations }) => ({ '&:hover': declarations }));
const responsive = modifier(['sm','md','lg'], ({ key, declarations }) =>
  ({ [`@media (min-width: ${breakpoints[key]}px)`]: declarations }));

// Recipes — variant systems; runtime call returns a class string
recipe({
  name: 'button',
  base: { borderStyle: 'solid' },
  variants: { color: { primary: {...} }, size: { sm: {...}, md: {...} } },
  defaultVariants: { color: 'primary', size: 'md' },
  compoundVariants: [{ match: { color: 'primary' }, css: {...} }],
});

// Themes — scoped to [data-theme="name"]
theme('dark', (ctx) => { ctx.variable(colorBackground, '#18181b'); });

// css tag for complex expressions; keyframes/media/atRule as expected
padding: css`${ref(spacingSm)} ${ref(spacingMd)}`
width: css`calc(100% - ${ref(sidebarWidth)})`
const fadeIn = keyframes('fade-in', { '0%': {...}, '100%': {...} }); // fadeIn.rule = name
atRule('supports', '(display: grid)', ({ selector }) => { ... });
merge(base, components, themes);  // general → specific; vars override, arrays concat
```

Generated utility class format: `_property:value` (`_margin:md`), boolean-true `_display`, modifiers chain `_dark:hover:background:primary`.

## Composable conventions (@styleframe/theme style)

`use<Context>DesignTokens(s, values?)`, `use<Context>Utilities(s)`, `use<Context>Recipe(s, options?)`, `use<Name>Element(s)`. First arg is always the instance; variables always `{ default: true }`; return typed token objects.

## Anti-patterns (reviewers reject on sight)

1. Hardcoded colors/spacing/sizes that should be tokens.
2. `utility()` defined but its creator never invoked (silently no CSS).
3. Composable variables missing `{ default: true }` (merge overwrites them).
4. Appearance-based names (`color.blue`) instead of semantic (`color.primary`).
5. Missing `export default s`.
6. Importing `@styleframe/*` sub-packages instead of the `styleframe` barrel.
7. Expecting the global instance from `virtual:styleframe` in non-extension files.
8. Recipes declared before the utilities/modifiers they reference (hard throw at load).
9. Complex CSS expressions concatenated as strings instead of the `css` tag.
10. Named exports in index files (`export *` only).
