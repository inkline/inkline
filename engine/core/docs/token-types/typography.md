# Typography Tokens

Typography tokens help create a consistent type system across your design. @inkline/core provides tools for defining and managing typography-related properties like font families, sizes, weights, and line heights.

## Creating Basic Typography Tokens

Start by defining the core typography variables:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Font families
const fontFamilySans = nsvariable('typography', 'font-family-sans', 
  'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', options);

const fontFamilyMono = nsvariable('typography', 'font-family-mono', 
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace', options);

const fontFamilyBase = nsvariable('typography', 'font-family-base', 
  fontFamilySans, options);

// Font sizes
const fontSizeBase = nsvariable('typography', 'font-size-base', '16px', options);
const fontSizeSm = nsvariable('typography', 'font-size-sm', '14px', options);
const fontSizeLg = nsvariable('typography', 'font-size-lg', '18px', options);

// Font weights
const fontWeightLight = nsvariable('typography', 'font-weight-light', 300, options);
const fontWeightRegular = nsvariable('typography', 'font-weight-regular', 400, options);
const fontWeightMedium = nsvariable('typography', 'font-weight-medium', 500, options);
const fontWeightBold = nsvariable('typography', 'font-weight-bold', 700, options);

// Line heights
const lineHeightTight = nsvariable('typography', 'line-height-tight', 1.25, options);
const lineHeightBase = nsvariable('typography', 'line-height-base', 1.5, options);
const lineHeightRelaxed = nsvariable('typography', 'line-height-relaxed', 1.75, options);
```

## Creating a Type Scale

A type scale ensures proportional relationships between font sizes:

```typescript
import { createContext, nsvariable, calc } from '@inkline/core';

const context = createContext();
const options = { context };

// Base size
const fontSizeBase = nsvariable('typography', 'font-size-base', '16px', options);

// Scale ratio (1.25 - major third)
const typeScaleRatio = 1.25;

// Generate type scale
const fontSizeXs = nsvariable('typography', 'font-size-xs', 
  calc(fontSizeBase, '/', Math.pow(typeScaleRatio, 2)), options);
const fontSizeSm = nsvariable('typography', 'font-size-sm', 
  calc(fontSizeBase, '/', typeScaleRatio), options);
const fontSizeMd = nsvariable('typography', 'font-size-md', 
  fontSizeBase, options);
const fontSizeLg = nsvariable('typography', 'font-size-lg', 
  calc(fontSizeBase, '*', typeScaleRatio), options);
const fontSizeXl = nsvariable('typography', 'font-size-xl', 
  calc(fontSizeBase, '*', Math.pow(typeScaleRatio, 2)), options);
const fontSizeXxl = nsvariable('typography', 'font-size-xxl', 
  calc(fontSizeBase, '*', Math.pow(typeScaleRatio, 3)), options);
```

## Creating Heading Styles

Define consistent styles for headings:

```typescript
import { selector, nsvariable } from '@inkline/core';

// Base heading properties
const headingFontFamily = nsvariable('typography', 'heading-font-family', 
  fontFamilySans, options);
const headingFontWeight = nsvariable('typography', 'heading-font-weight', 
  fontWeightBold, options);
const headingLineHeight = nsvariable('typography', 'heading-line-height', 
  lineHeightTight, options);
const headingColor = nsvariable('typography', 'heading-color', 
  '#333333', options);

// Heading sizes
const h1FontSize = nsvariable('typography', 'h1-font-size', 
  fontSizeXxl, options);
const h2FontSize = nsvariable('typography', 'h2-font-size', 
  fontSizeXl, options);
const h3FontSize = nsvariable('typography', 'h3-font-size', 
  fontSizeLg, options);
const h4FontSize = nsvariable('typography', 'h4-font-size', 
  fontSizeMd, options);
const h5FontSize = nsvariable('typography', 'h5-font-size', 
  fontSizeSm, options);
const h6FontSize = nsvariable('typography', 'h6-font-size', 
  fontSizeXs, options);

// Apply to selectors
selector('h1, h2, h3, h4, h5, h6', {
  fontFamily: headingFontFamily,
  fontWeight: headingFontWeight,
  lineHeight: headingLineHeight,
  color: headingColor,
  margin: '0 0 0.5em'
}, options);

selector('h1', { fontSize: h1FontSize }, options);
selector('h2', { fontSize: h2FontSize }, options);
selector('h3', { fontSize: h3FontSize }, options);
selector('h4', { fontSize: h4FontSize }, options);
selector('h5', { fontSize: h5FontSize }, options);
selector('h6', { fontSize: h6FontSize }, options);
```

## Creating Text Styles

Define consistent text styles:

```typescript
import { selector, nsvariable } from '@inkline/core';

// Text properties
const textFontFamily = nsvariable('typography', 'text-font-family', 
  fontFamilyBase, options);
const textFontSize = nsvariable('typography', 'text-font-size', 
  fontSizeBase, options);
const textFontWeight = nsvariable('typography', 'text-font-weight', 
  fontWeightRegular, options);
const textLineHeight = nsvariable('typography', 'text-line-height', 
  lineHeightBase, options);
const textColor = nsvariable('typography', 'text-color', 
  '#444444', options);

// Apply to selectors
selector('body', {
  fontFamily: textFontFamily,
  fontSize: textFontSize,
  fontWeight: textFontWeight,
  lineHeight: textLineHeight,
  color: textColor
}, options);

// Text variations
selector('.text-small', {
  fontSize: fontSizeSm
}, options);

selector('.text-large', {
  fontSize: fontSizeLg
}, options);

selector('.text-bold', {
  fontWeight: fontWeightBold
}, options);

selector('.text-light', {
  fontWeight: fontWeightLight
}, options);
```

## Responsive Typography

Create responsive typography that adjusts based on viewport size:

```typescript
import { selector, nsvariable, calc } from '@inkline/core';

// Base sizes for different viewports
const fontSizeBaseMobile = nsvariable('typography', 'font-size-base-mobile', 
  '14px', options);
const fontSizeBaseTablet = nsvariable('typography', 'font-size-base-tablet', 
  '16px', options);
const fontSizeBaseDesktop = nsvariable('typography', 'font-size-base-desktop', 
  '18px', options);

// Apply responsive typography
selector('body', {
  fontSize: fontSizeBaseMobile
}, options);

selector('@media (min-width: 768px)', [
  selector('body', {
    fontSize: fontSizeBaseTablet
  }, options)
], options);

selector('@media (min-width: 1200px)', [
  selector('body', {
    fontSize: fontSizeBaseDesktop
  }, options)
], options);

// Responsive heading sizes
selector('@media (max-width: 768px)', [
  selector('h1', { fontSize: calc(h1FontSize, '*', 0.85) }, options),
  selector('h2', { fontSize: calc(h2FontSize, '*', 0.85) }, options),
  selector('h3', { fontSize: calc(h3FontSize, '*', 0.85) }, options)
], options);
```

## Fluid Typography

Create typography that scales smoothly between viewport sizes:

```typescript
// Helper function for fluid typography
function fluidSize(minSize, maxSize, minViewport, maxViewport) {
  const minSizeRem = parseFloat(minSize) / 16;
  const maxSizeRem = parseFloat(maxSize) / 16;
  const minViewportRem = parseFloat(minViewport) / 16;
  const maxViewportRem = parseFloat(maxViewport) / 16;
  
  const slope = (maxSizeRem - minSizeRem) / (maxViewportRem - minViewportRem);
  const yAxisIntersection = -minViewportRem * slope + minSizeRem;
  
  return `clamp(${minSizeRem}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxSizeRem}rem)`;
}

// Define fluid typography variables
const fluidHeading = nsvariable('typography', 'fluid-heading',
  fluidSize('24px', '48px', '320px', '1200px'), options);

const fluidText = nsvariable('typography', 'fluid-text',
  fluidSize('16px', '20px', '320px', '1200px'), options);

// Apply fluid typography
selector('h1', {
  fontSize: fluidHeading
}, options);

selector('body', {
  fontSize: fluidText
}, options);
```

## Custom Font Loading

Incorporate custom font loading:

```typescript
import { selector } from '@inkline/core';

// Define font faces
selector('@font-face', {
  fontFamily: '"CustomFont"',
  src: 'url("/fonts/CustomFont.woff2") format("woff2"), url("/fonts/CustomFont.woff") format("woff")',
  fontWeight: 400,
  fontStyle: 'normal',
  fontDisplay: 'swap'
}, options);

selector('@font-face', {
  fontFamily: '"CustomFont"',
  src: 'url("/fonts/CustomFont-Bold.woff2") format("woff2"), url("/fonts/CustomFont-Bold.woff") format("woff")',
  fontWeight: 700,
  fontStyle: 'normal',
  fontDisplay: 'swap'
}, options);

// Use custom font
const customFont = nsvariable('typography', 'custom-font', 
  '"CustomFont", system-ui, sans-serif', options);

selector('body', {
  fontFamily: customFont
}, options);
```

## Best Practices

1. **Use a type scale**: Choose a mathematical ratio for your type scale (1.2, 1.25, 1.5, etc.)
2. **Limit font families**: Stick to 2-3 font families maximum
3. **Use relative units**: Prefer rem or em units for better accessibility
4. **Set a reasonable base size**: Usually 16px is a good starting point
5. **Create meaningful variations**: Define clear purposes for each font size, weight, and style
6. **Consider line length**: Set max-width on text containers (typically 65-75 characters)
7. **Test for readability**: Ensure your typography is readable across devices and for all users

## Next Steps

- [Color Tokens](./color.md): Explore color token system
- [Spacing Tokens](./spacing.md): Discover spacing tokens
- [API Reference](../api/variables.md): See the complete API for typography tokens