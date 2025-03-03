# Spacing Tokens

Spacing tokens provide a consistent way to manage whitespace throughout your design system. @inkline/core offers specialized functions for defining margins, padding, and other spacing-related properties.

## Creating Basic Spacing Tokens

You can create spacing tokens using the standard variable functions:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Define base spacing unit
const spacingBase = nsvariable('spacing', 'base', '16px', options);

// Define specific spacing values
const spacingXs = nsvariable('spacing', 'xs', '4px', options);
const spacingSm = nsvariable('spacing', 'sm', '8px', options);
const spacingMd = nsvariable('spacing', 'md', '16px', options);
const spacingLg = nsvariable('spacing', 'lg', '24px', options);
const spacingXl = nsvariable('spacing', 'xl', '32px', options);
```

## Calculations with Spacing Tokens

You can create a mathematical relationship between spacing values:

```typescript
import { createContext, nsvariable, calc } from '@inkline/core';

const context = createContext();
const options = { context };

// Define base spacing unit
const spacingBase = nsvariable('spacing', 'base', '16px', options);

// Define derived spacing using calculations
const spacingXs = nsvariable('spacing', 'xs', calc(spacingBase, '*', 0.25), options);
const spacingSm = nsvariable('spacing', 'sm', calc(spacingBase, '*', 0.5), options);
const spacingMd = nsvariable('spacing', 'md', spacingBase, options);
const spacingLg = nsvariable('spacing', 'lg', calc(spacingBase, '*', 1.5), options);
const spacingXl = nsvariable('spacing', 'xl', calc(spacingBase, '*', 2), options);
const spacingXxl = nsvariable('spacing', 'xxl', calc(spacingBase, '*', 3), options);
```

## Defining Margin and Padding

@inkline/core provides specialized functions for defining margin and padding:

```typescript
import { defineMargin, definePadding } from '@inkline/core';

// Define margin with different values for each side
const cardMargin = defineMargin({
    top: '16px',
    right: '24px',
    bottom: '16px',
    left: '24px'
}, options);

// Define padding with different values for each side
const cardPadding = definePadding({
    top: '24px',
    right: '16px',
    bottom: '24px',
    left: '16px'
}, options);

// Define uniform margin
const buttonMargin = defineMargin('8px', options);

// Define margin with shorthand (top/bottom, left/right)
const sectionMargin = defineMargin({
    y: '32px',
    x: '16px'
}, options);
```

## Spacing Utilities

You can create utilities that work with spacing tokens:

```typescript
// A function to generate spacing utilities
function createSpacingUtilities(spacingTokens, options) {
    // Create margin utilities
    Object.entries(spacingTokens).forEach(([key, value]) => {
        selector(`.m-${key}`, { margin: value }, options);
        selector(`.mt-${key}`, { marginTop: value }, options);
        selector(`.mr-${key}`, { marginRight: value }, options);
        selector(`.mb-${key}`, { marginBottom: value }, options);
        selector(`.ml-${key}`, { marginLeft: value }, options);
        selector(`.mx-${key}`, { 
            marginLeft: value,
            marginRight: value
        }, options);
        selector(`.my-${key}`, { 
            marginTop: value,
            marginBottom: value
        }, options);
    });

    // Create padding utilities
    Object.entries(spacingTokens).forEach(([key, value]) => {
        selector(`.p-${key}`, { padding: value }, options);
        selector(`.pt-${key}`, { paddingTop: value }, options);
        selector(`.pr-${key}`, { paddingRight: value }, options);
        selector(`.pb-${key}`, { paddingBottom: value }, options);
        selector(`.pl-${key}`, { paddingLeft: value }, options);
        selector(`.px-${key}`, { 
            paddingLeft: value,
            paddingRight: value
        }, options);
        selector(`.py-${key}`, { 
            paddingTop: value,
            paddingBottom: value
        }, options);
    });
}

// Usage
const spacingTokens = {
    '0': '0',
    'xs': valueOf(spacingXs),
    'sm': valueOf(spacingSm),
    'md': valueOf(spacingMd),
    'lg': valueOf(spacingLg),
    'xl': valueOf(spacingXl)
};

createSpacingUtilities(spacingTokens, options);
```

## Spacing in Layout Systems

Spacing tokens are essential for grid and layout systems:

```typescript
import { nsvariable, selector } from '@inkline/core';

// Define grid gutter
const gridGutter = nsvariable('grid', 'gutter', '24px', options);
const gridGutterSm = nsvariable('grid', 'gutter-sm', '16px', options);
const gridGutterLg = nsvariable('grid', 'gutter-lg', '32px', options);

// Create grid selectors
selector('.row', {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: calc(gridGutter, '*', -0.5),
    marginRight: calc(gridGutter, '*', -0.5)
}, options);

selector('.col', {
    paddingLeft: calc(gridGutter, '*', 0.5),
    paddingRight: calc(gridGutter, '*', 0.5)
}, options);

// Responsive grid gutters
selector('@media (max-width: 768px)', [
    selector('.row', {
        marginLeft: calc(gridGutterSm, '*', -0.5),
        marginRight: calc(gridGutterSm, '*', -0.5)
    }, options),
    
    selector('.col', {
        paddingLeft: calc(gridGutterSm, '*', 0.5),
        paddingRight: calc(gridGutterSm, '*', 0.5)
    }, options)
], options);
```

## Creating Spacing Scales

Designing a systematic spacing scale helps maintain consistency:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a geometric spacing scale (1.5x ratio)
const baseUnit = 4; // 4px
const spacingScale = Array.from({ length: 10 }, (_, i) => {
    const value = `${baseUnit * Math.pow(1.5, i)}px`;
    return nsvariable('spacing', `scale-${i + 1}`, value, options);
});

// Resulting scale:
// scale-1: 4px
// scale-2: 6px
// scale-3: 9px
// scale-4: 13.5px
// scale-5: 20.25px
// ...and so on
```

## Using Spacing Tokens in Selectors

Apply spacing tokens to CSS selectors:

```typescript
import { selector, nsvariable } from '@inkline/core';

// Define spacing variables
const spacingBase = nsvariable('spacing', 'base', '16px', options);
const spacingSm = nsvariable('spacing', 'sm', '8px', options);
const spacingLg = nsvariable('spacing', 'lg', '24px', options);

// Use in selectors
selector('body', {
    margin: '0',
    padding: spacingBase
}, options);

selector('.card', {
    margin: spacingBase,
    padding: spacingLg
}, options);

selector('.button', {
    margin: spacingSm,
    padding: `${spacingSm} ${spacingBase}`
}, options);
```

## Best Practices

1. **Use a consistent base unit**: Start with a base unit (often 4px or 8px) and build your scale from there
2. **Create a ratio-based scale**: Use a mathematical ratio like 1.5x or 2x for consistent progression
3. **Limit your options**: Too many spacing options lead to inconsistency; aim for 5-7 core values
4. **Use semantic naming**: Consider task-based names like "compact", "default", "spacious" alongside size names
5. **Document your spacing system**: Make sure designers and developers understand the available options

## Responsive Spacing

Create responsive spacing that adapts to different screen sizes:

```typescript
import { nsvariable, selector } from '@inkline/core';

// Define responsive spacing variables
const spacingBaseMobile = nsvariable('spacing', 'base-mobile', '12px', options);
const spacingBaseTablet = nsvariable('spacing', 'base-tablet', '16px', options);
const spacingBaseDesktop = nsvariable('spacing', 'base-desktop', '20px', options);

// Apply responsive spacing
selector('.container', {
    padding: spacingBaseMobile
}, options);

selector('@media (min-width: 768px)', [
    selector('.container', {
        padding: spacingBaseTablet
    }, options)
], options);

selector('@media (min-width: 1200px)', [
    selector('.container', {
        padding: spacingBaseDesktop
    }, options)
], options);
```

## Next Steps

- [Typography Tokens](./typography.md): Learn about typography token system
- [Border Tokens](./border.md): Explore border styling tokens
- [Margin and Padding API](../api/variables.md): See the complete API for spacing tokens