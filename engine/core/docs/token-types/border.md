# Border Tokens

Border tokens help create consistent border styling across your UI components. @inkline/core provides specialized functions for defining borders and border radii.

## Creating Basic Border Tokens

Define the core border properties:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Border width
const borderWidthNone = nsvariable('border', 'width-none', '0', options);
const borderWidthThin = nsvariable('border', 'width-thin', '1px', options);
const borderWidthDefault = nsvariable('border', 'width-default', '2px', options);
const borderWidthThick = nsvariable('border', 'width-thick', '4px', options);

// Border style
const borderStyleSolid = nsvariable('border', 'style-solid', 'solid', options);
const borderStyleDashed = nsvariable('border', 'style-dashed', 'dashed', options);
const borderStyleDotted = nsvariable('border', 'style-dotted', 'dotted', options);

// Border colors
const borderColorLight = nsvariable('border', 'color-light', '#e5e5e5', options);
const borderColorDefault = nsvariable('border', 'color-default', '#cccccc', options);
const borderColorDark = nsvariable('border', 'color-dark', '#999999', options);
```

## Defining Complete Borders

@inkline/core provides a `defineBorder` function for creating complete border definitions:

```typescript
import { defineBorder } from '@inkline/core';

// Define a simple border
const simpleBorder = defineBorder('1px solid #cccccc', options);

// Define a border with different properties for each side
const complexBorder = defineBorder({
    top: {
        width: '1px',
        style: 'solid',
        color: '#cccccc'
    },
    right: {
        width: '2px',
        style: 'dashed',
        color: '#999999'
    },
    bottom: {
        width: '1px',
        style: 'solid',
        color: '#cccccc'
    },
    left: {
        width: '2px',
        style: 'dashed',
        color: '#999999'
    }
}, options);

// Define a border with the same properties for all sides
const uniformBorder = defineBorder({
    width: '1px',
    style: 'solid',
    color: '#cccccc'
}, options);

// Define a border with horizontal and vertical sides
const mixedBorder = defineBorder({
    x: {
        width: '1px',
        style: 'solid',
        color: '#cccccc'
    },
    y: {
        width: '2px',
        style: 'solid',
        color: '#999999'
    }
}, options);
```

## Border Radius Tokens

Define border radius tokens for consistent corner rounding:

```typescript
import { createContext, nsvariable, defineBorderRadius } from '@inkline/core';

const context = createContext();
const options = { context };

// Border radius sizes
const borderRadiusNone = nsvariable('border-radius', 'none', '0', options);
const borderRadiusXs = nsvariable('border-radius', 'xs', '2px', options);
const borderRadiusSm = nsvariable('border-radius', 'sm', '4px', options);
const borderRadiusMd = nsvariable('border-radius', 'md', '6px', options);
const borderRadiusLg = nsvariable('border-radius', 'lg', '8px', options);
const borderRadiusXl = nsvariable('border-radius', 'xl', '12px', options);
const borderRadiusFull = nsvariable('border-radius', 'full', '9999px', options);

// Define a uniform border radius
const buttonRadius = defineBorderRadius('4px', options);

// Define different radius for each corner
const cardRadius = defineBorderRadius({
    topLeft: '8px',
    topRight: '8px',
    bottomRight: '0',
    bottomLeft: '0'
}, options);

// Define border radius with top/bottom and left/right pairs
const tabRadius = defineBorderRadius({
    top: '4px',
    bottom: '0'
}, options);
```

## Using Border Tokens in Selectors

Apply border tokens to CSS selectors:

```typescript
import { selector, nsvariable, defineBorder, defineBorderRadius } from '@inkline/core';

// Define border variables
const defaultBorder = defineBorder({
    width: '1px',
    style: 'solid',
    color: '#cccccc'
}, options);

const primaryBorder = defineBorder({
    width: '1px',
    style: 'solid',
    color: '#5E9ED6'
}, options);

const defaultRadius = defineBorderRadius('4px', options);

// Use in selectors
selector('.card', {
    border: defaultBorder,
    borderRadius: defaultRadius
}, options);

selector('.button', {
    border: defaultBorder,
    borderRadius: defaultRadius,
    transition: 'border-color 0.2s ease'
}, options);

selector('.button.primary', {
    border: primaryBorder
}, options);

// Individual border sides
selector('.tab', {
    borderBottom: defaultBorder,
    borderRadius: defineBorderRadius({
        top: '4px',
        bottom: '0'
    }, options)
}, options);
```

## Interactive Border States

Define interactive border states for components:

```typescript
import { selector, defineBorder } from '@inkline/core';

// Define border states
const defaultBorder = defineBorder('1px solid #cccccc', options);
const hoverBorder = defineBorder('1px solid #999999', options);
const focusBorder = defineBorder('1px solid #5E9ED6', options);
const activeBorder = defineBorder('1px solid #3D7AB3', options);

// Apply interactive borders
selector('.input', {
    border: defaultBorder,
    transition: 'border 0.2s ease',
    
    '&:hover': {
        border: hoverBorder
    },
    
    '&:focus': {
        border: focusBorder
    },
    
    '&:active': {
        border: activeBorder
    }
}, options);
```

## Responsive Border Styles

Create borders that adapt to different screen sizes:

```typescript
import { selector, defineBorder, defineBorderRadius } from '@inkline/core';

// Define different borders for different viewports
const defaultBorder = defineBorder('1px solid #cccccc', options);
const mobileBorder = defineBorder('1px solid #e5e5e5', options);

const defaultRadius = defineBorderRadius('4px', options);
const mobileRadius = defineBorderRadius('2px', options);

// Apply responsive borders
selector('.card', {
    border: defaultBorder,
    borderRadius: defaultRadius
}, options);

selector('@media (max-width: 768px)', [
    selector('.card', {
        border: mobileBorder,
        borderRadius: mobileRadius
    }, options)
], options);
```

## Border Utility Classes

Create utility classes for common border styles:

```typescript
import { selector, nsvariable } from '@inkline/core';

// Border utilities
const borderWidths = {
    '0': '0',
    '1': '1px',
    '2': '2px',
    '4': '4px',
    '8': '8px'
};

const borderStyles = {
    'solid': 'solid',
    'dashed': 'dashed',
    'dotted': 'dotted',
    'none': 'none'
};

const borderColors = {
    'default': '#cccccc',
    'light': '#e5e5e5',
    'dark': '#999999',
    'primary': '#5E9ED6',
    'transparent': 'transparent'
};

// Create border width utilities
Object.entries(borderWidths).forEach(([key, value]) => {
    selector(`.border-${key}`, { borderWidth: value }, options);
});

// Create border style utilities
Object.entries(borderStyles).forEach(([key, value]) => {
    selector(`.border-${key}`, { borderStyle: value }, options);
});

// Create border color utilities
Object.entries(borderColors).forEach(([key, value]) => {
    selector(`.border-${key}`, { borderColor: value }, options);
});

// Create border radius utilities
const radii = {
    '0': '0',
    'xs': '2px',
    'sm': '4px',
    'md': '6px',
    'lg': '8px',
    'xl': '12px',
    'full': '9999px'
};

Object.entries(radii).forEach(([key, value]) => {
    selector(`.rounded-${key}`, { borderRadius: value }, options);
});
```

## Best Practices

1. **Consistent border widths**: Use a limited set of border widths for consistency
2. **Meaningful border styles**: Assign specific meaning to different border styles
3. **Color system integration**: Coordinate border colors with your color system
4. **Border radius scale**: Create a consistent scale for border radius values
5. **Semantic usage**: Use borders to communicate meaning (e.g., boundaries, separators, focus states)
6. **Consider context**: Adjust border styles based on the context (e.g., cards, buttons, inputs)

## Next Steps

- [Shadow Tokens](./shadow.md): Explore shadow token system
- [Color Tokens](./color.md): See how to create color tokens for borders
- [API Reference](../api/variables.md): See the complete API for border tokens