# Color Tokens

Color tokens are a fundamental part of any design system. In @inkline/core, there are specialized functions for working with colors that make it easy to create, manipulate, and reference color values.

## Creating Color Tokens

You can create color tokens using both standard variable functions and specialized color functions:

```typescript
import { createContext, nsvariable, color } from '@inkline/core';

const context = createContext();
const options = { context };

// Using standard variable function
const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);

// Using color function
const primary = color('#5E9ED6');
const secondary = color('rgb(108, 117, 125)');
const success = color('hsl(134, 61%, 41%)');

// Store color as a variable
const primaryColorVar = nsvariable('color', 'primary', color('#5E9ED6').hex(), options);
```

## Color Manipulations

The color function provides methods for manipulating colors:

```typescript
import { color } from '@inkline/core';

const primary = color('#5E9ED6');

// Lighten a color
const primaryLight = color(primary).lighten(0.2).hex(); // '#8FBAE2'

// Darken a color
const primaryDark = color(primary).darken(0.2).hex(); // '#2E82CA'

// Adjust opacity
const primaryTransparent = color(primary).alpha(0.5).toString(); // 'rgba(94, 158, 214, 0.5)'

// Create a tint (mix with white)
const primaryTint = color(primary).tint(0.2).hex(); // '#7DAEDD'

// Create a shade (mix with black)
const primaryShade = color(primary).shade(0.2).hex(); // '#4B7EAB'
```

## Color Palettes

You can create comprehensive color palettes:

```typescript
import { createContext, nsvariable, color } from '@inkline/core';

const context = createContext();
const options = { context };

// Base color
const primary = nsvariable('color', 'primary', '#5E9ED6', options);

// Create palette variations
const primaryPalette = [
  nsvariable('color', 'primary-50', color(valueOf(primary)).lighten(0.4).hex(), options),
  nsvariable('color', 'primary-100', color(valueOf(primary)).lighten(0.3).hex(), options),
  nsvariable('color', 'primary-200', color(valueOf(primary)).lighten(0.2).hex(), options),
  nsvariable('color', 'primary-300', color(valueOf(primary)).lighten(0.1).hex(), options),
  nsvariable('color', 'primary-400', color(valueOf(primary)).lighten(0.05).hex(), options),
  nsvariable('color', 'primary-500', valueOf(primary), options),
  nsvariable('color', 'primary-600', color(valueOf(primary)).darken(0.05).hex(), options),
  nsvariable('color', 'primary-700', color(valueOf(primary)).darken(0.1).hex(), options),
  nsvariable('color', 'primary-800', color(valueOf(primary)).darken(0.2).hex(), options),
  nsvariable('color', 'primary-900', color(valueOf(primary)).darken(0.3).hex(), options),
];
```

## Working with Color Spaces

@inkline/core supports different color spaces:

```typescript
import { color } from '@inkline/core';

const primary = color('#5E9ED6');

// RGB
const rgbValue = primary.rgb(); // { r: 94, g: 158, b: 214 }
const rgbString = primary.toString('rgb'); // 'rgb(94, 158, 214)'

// HSL
const hslValue = primary.hsl(); // { h: 210, s: 60, l: 60 }
const hslString = primary.toString('hsl'); // 'hsl(210, 60%, 60%)'

// HEX
const hexValue = primary.hex(); // '#5E9ED6'
```

## Color Contrast

You can check color contrast for accessibility:

```typescript
import { color } from '@inkline/core';

const backgroundColor = color('#5E9ED6');
const textColor = color('#FFFFFF');

// Calculate contrast ratio
const contrast = backgroundColor.contrast(textColor); // ~3.11

// Check if it meets WCAG standards
const isAA = contrast >= 4.5; // false (doesn't meet AA standard)
const isAAA = contrast >= 7; // false (doesn't meet AAA standard)
```

## Using Color Tokens in Selectors

Apply color tokens to CSS selectors:

```typescript
import { selector, nsvariable, color } from '@inkline/core';

// Define color variables
const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);
const textColor = nsvariable('color', 'text', '#333333', options);

// Use in selectors
selector('button.primary', {
  backgroundColor: primaryColor,
  color: color(valueOf(primaryColor)).contrast('#FFFFFF') > 4.5 
    ? '#FFFFFF' 
    : '#000000',
  border: `1px solid ${color(valueOf(primaryColor)).darken(0.1).hex()}`
}, options);
```

## Defining Custom Color Properties

Create specialized color property definitions:

```typescript
import { defineColor } from '@inkline/core';

// Define a complex color property with hover and active states
const buttonColorStates = defineColor({
  base: '#5E9ED6',
  hover: '#4A89DC',
  active: '#3D7AB3'
}, options);

// Use in a selector
selector('button', {
  backgroundColor: buttonColorStates.base,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: buttonColorStates.hover
  },
  '&:active': {
    backgroundColor: buttonColorStates.active
  }
}, options);
```

## Best Practices

1. **Create a coherent color system**: Define a limited set of base colors and derive others
2. **Check contrast ratios**: Ensure text colors have sufficient contrast with backgrounds
3. **Use semantic color names**: Name colors by their purpose, not their appearance
4. **Create color scales**: Provide a range of shades for each base color
5. **Support dark mode**: Create dark theme versions of your colors

## Next Steps

- [Typography Tokens](./typography.md): Learn about typography token system
- [Border Tokens](./border.md): Explore border styling tokens
- [Box Shadow Tokens](./shadow.md): See how to create shadow effects