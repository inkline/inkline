# Colors API

The Colors API provides specialized functions for creating and manipulating color tokens in @inkline/core.

## Overview

Colors are a fundamental part of any design system. The Colors API offers tools to create, manipulate, and transform colors with precision and consistency.

## Functions

### color

Creates a color object with various manipulation methods.

```typescript
function color(value: string | Color | ColorInput): Color;
```

**Parameters**:
- `value`: The color value (hex, rgb, hsl string, or Color object)

**Returns**: A Color object with manipulation methods

**Example**:

```typescript
import { color } from '@inkline/core';

// Create a color from a hex string
const blue = color('#5E9ED6');

// Create a color from an RGB string
const red = color('rgb(255, 0, 0)');

// Create a color from an HSL string
const green = color('hsl(120, 100%, 50%)');
```

### defineColor

Creates a color definition with multiple states.

```typescript
function defineColor(
    value: ColorDefinitionValue,
    options: ColorOptions
): ColorDefinition;
```

**Parameters**:
- `value`: The color value or object with state values
- `options`: Options for the color (context, theme)

**Returns**: A ColorDefinition object

**Example**:

```typescript
import { createContext, defineColor } from '@inkline/core';

const context = createContext();
const options = { context };

// Define a color with states
const buttonColor = defineColor({
    base: '#5E9ED6',
    hover: '#4A89DC',
    active: '#3D7AB3',
    disabled: '#A8C7E6'
}, options);
```

## Color Object Methods

The Color object returned by the `color` function provides various methods:

### Manipulation Methods

```typescript
// Lighten the color by a percentage (0-1)
color('#5E9ED6').lighten(0.2).hex(); // '#8FBAE2'

// Darken the color by a percentage (0-1)
color('#5E9ED6').darken(0.2).hex(); // '#2E82CA'

// Adjust opacity (0-1)
color('#5E9ED6').alpha(0.5).toString(); // 'rgba(94, 158, 214, 0.5)'

// Mix with white by percentage (0-1)
color('#5E9ED6').tint(0.2).hex(); // '#7DAEDD'

// Mix with black by percentage (0-1)
color('#5E9ED6').shade(0.2).hex(); // '#4B7EAB'

// Mix with another color by percentage (0-1)
color('#5E9ED6').mix(color('#FF0000'), 0.5).hex(); // '#AF4F6B'

// Invert the color
color('#5E9ED6').negate().hex(); // '#A16129'

// Saturate the color by percentage (0-1)
color('#5E9ED6').saturate(0.2).hex(); // '#4BA0E5'

// Desaturate the color by percentage (0-1)
color('#5E9ED6').desaturate(0.2).hex(); // '#719DC7'

// Grayscale the color
color('#5E9ED6').grayscale().hex(); // '#ABABAB'
```

### Format Conversion Methods

```typescript
// Get hex representation
color('#5E9ED6').hex(); // '#5E9ED6'

// Get RGB object
color('#5E9ED6').rgb(); // { r: 94, g: 158, b: 214 }

// Get RGB string
color('#5E9ED6').toString('rgb'); // 'rgb(94, 158, 214)'

// Get RGBA string
color('#5E9ED6').toString('rgba'); // 'rgba(94, 158, 214, 1)'

// Get HSL object
color('#5E9ED6').hsl(); // { h: 210, s: 60, l: 60 }

// Get HSL string
color('#5E9ED6').toString('hsl'); // 'hsl(210, 60%, 60%)'

// Get HSLA string
color('#5E9ED6').toString('hsla'); // 'hsla(210, 60%, 60%, 1)'
```

### Analysis Methods

```typescript
// Get brightness (0-255)
color('#5E9ED6').brightness(); // 145

// Get luminance (0-1)
color('#5E9ED6').luminance(); // 0.35

// Get contrast ratio with another color (1-21)
color('#5E9ED6').contrast(color('#FFFFFF')); // 3.11

// Is the color dark?
color('#5E9ED6').isDark(); // false

// Is the color light?
color('#5E9ED6').isLight(); // true
```

## Interfaces

### Color

The Color interface defines the structure and methods of a color object.

```typescript
interface Color {
    // Original color library methods
    lighten(ratio: number): Color;
    darken(ratio: number): Color;
    alpha(value: number): Color;
    fade(ratio: number): Color;
    fadeIn(ratio: number): Color;
    fadeOut(ratio: number): Color;
    tint(ratio: number): Color;
    shade(ratio: number): Color;
    mix(color: Color | string, ratio?: number): Color;
    negate(): Color;
    saturate(ratio: number): Color;
    desaturate(ratio: number): Color;
    grayscale(): Color;
    
    // Format conversion
    hex(): string;
    rgb(): { r: number; g: number; b: number };
    hsl(): { h: number; s: number; l: number };
    toString(format?: string): string;
    
    // Analysis
    brightness(): number;
    luminance(): number;
    contrast(color: Color | string): number;
    isDark(): boolean;
    isLight(): boolean;
}
```

### ColorDefinition

The ColorDefinition interface defines the structure of a color definition with states.

```typescript
interface ColorDefinition {
    base: string;
    hover?: string;
    active?: string;
    focus?: string;
    disabled?: string;
    [key: string]: string | undefined;
}
```

## Usage Patterns

### Basic Color Creation and Manipulation

Creating and manipulating colors:

```typescript
import { color } from '@inkline/core';

// Create a primary color
const primary = color('#5E9ED6');

// Create variations
const primaryLight = color(primary).lighten(0.2).hex(); // '#8FBAE2'
const primaryDark = color(primary).darken(0.2).hex(); // '#2E82CA'
const primaryTransparent = color(primary).alpha(0.5).toString(); // 'rgba(94, 158, 214, 0.5)'

// Mix colors
const accentColor = color(primary).mix(color('#FF0000'), 0.3).hex(); // '#884DB9'
```

### Creating Color Palettes

Generating a complete color palette:

```typescript
import { createContext, nsvariable, color } from '@inkline/core';

const context = createContext();
const options = { context };

// Base color
const primaryBase = '#5E9ED6';

// Create a palette function
function createPalette(baseColor, namespace) {
    const base = color(baseColor);
    
    return {
        50: nsvariable(namespace, '50', base.lighten(0.4).hex(), options),
        100: nsvariable(namespace, '100', base.lighten(0.3).hex(), options),
        200: nsvariable(namespace, '200', base.lighten(0.2).hex(), options),
        300: nsvariable(namespace, '300', base.lighten(0.1).hex(), options),
        400: nsvariable(namespace, '400', base.lighten(0.05).hex(), options),
        500: nsvariable(namespace, '500', base.hex(), options),
        600: nsvariable(namespace, '600', base.darken(0.05).hex(), options),
        700: nsvariable(namespace, '700', base.darken(0.1).hex(), options),
        800: nsvariable(namespace, '800', base.darken(0.2).hex(), options),
        900: nsvariable(namespace, '900', base.darken(0.3).hex(), options)
    };
}

// Create color palettes
const primaryPalette = createPalette(primaryBase, 'primary');
const successPalette = createPalette('#28a745', 'success');
const dangerPalette = createPalette('#dc3545', 'danger');
```

### Accessibility Checking

Evaluating color combinations for accessibility:

```typescript
import { color } from '@inkline/core';

// Define colors
const backgroundColor = color('#5E9ED6');
const textColor = color('#FFFFFF');

// Check contrast for WCAG compliance
const contrast = backgroundColor.contrast(textColor); // ~3.11

// Check if it meets WCAG standards
const meetsAA = contrast >= 4.5; // false
const meetsAALarge = contrast >= 3; // true
const meetsAAA = contrast >= 7; // false
const meetsAAALarge = contrast >= 4.5; // false

// Find a better text color based on contrast
function findAccessibleTextColor(background) {
    const white = color('#FFFFFF');
    const black = color('#000000');
    
    const whiteContrast = background.contrast(white);
    const blackContrast = background.contrast(black);
    
    return whiteContrast >= 4.5 ? white.hex() : blackContrast >= 4.5 ? black.hex() : null;
}

const accessibleTextColor = findAccessibleTextColor(backgroundColor); // '#000000'
```

### Color Definitions for Components

Creating color definitions for component states:

```typescript
import { createContext, defineColor, selector } from '@inkline/core';

const context = createContext();
const options = { context };

// Define button colors with states
const primaryButton = defineColor({
    base: '#5E9ED6',
    hover: '#4A89DC',
    active: '#3D7AB3',
    disabled: '#A8C7E6'
}, options);

const secondaryButton = defineColor({
    base: '#6C757D',
    hover: '#5A6268',
    active: '#495057',
    disabled: '#A9AEB3'
}, options);

// Use in selectors
selector('.button.-primary', {
    backgroundColor: primaryButton.base,
    transition: 'background-color 0.2s ease',
    
    '&:hover': {
        backgroundColor: primaryButton.hover
    },
    
    '&:active': {
        backgroundColor: primaryButton.active
    },
    
    '&[disabled]': {
        backgroundColor: primaryButton.disabled,
        cursor: 'not-allowed'
    }
}, options);
```

### Color Mode Adaptation

Creating color tokens that adapt to light and dark modes:

```typescript
import { createContext, theme, nsvariable, color } from '@inkline/core';

const context = createContext();
const options = { context };

// Create themes
const lightTheme = theme('light', options);
const darkTheme = theme('dark', options);

// Light theme colors
const lightPrimary = nsvariable('color', 'primary', '#5E9ED6', { 
    ...options, 
    theme: 'light' 
});
const lightBackground = nsvariable('color', 'background', '#FFFFFF', { 
    ...options, 
    theme: 'light' 
});
const lightText = nsvariable('color', 'text', '#333333', { 
    ...options, 
    theme: 'light' 
});

// Dark theme colors - note how we invert the color relationships
const darkPrimary = nsvariable('color', 'primary', '#3D7AB3', { 
    ...options, 
    theme: 'dark' 
});
const darkBackground = nsvariable('color', 'background', '#121212', { 
    ...options, 
    theme: 'dark' 
});
const darkText = nsvariable('color', 'text', '#F5F5F5', { 
    ...options, 
    theme: 'dark' 
});

// Optional: Create color calculator functions
function adaptColorToBackground(baseColor, bgColor, options) {
    const base = color(baseColor);
    const bg = color(bgColor);
    
    // If background is dark, lighten the color; if light, darken it
    if (bg.isLight()) {
        return base.darken(0.1).hex();
    } else {
        return base.lighten(0.1).hex();
    }
}
```

## Best Practices

1. **Create a coherent color system**: Define a limited set of base colors
2. **Check contrast ratios**: Ensure text colors have sufficient contrast with backgrounds
3. **Use semantic color names**: Name colors by their purpose, not their appearance
4. **Create color scales**: Provide a range of shades for each base color
5. **Support dark mode**: Create dark theme versions of your colors
6. **Document color meaning**: Associate specific meanings with colors

## Related APIs

- [Variables API](./variables.md): Functions for creating variables to store colors
- [Themes API](./themes.md): Functions for organizing colors into themes
- [Selectors API](./selectors.md): Functions for applying colors to CSS selectors