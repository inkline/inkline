# Shadow Tokens

Shadow tokens help create consistent elevation and depth across your UI components. @inkline/core provides specialized functions for defining box shadows and other shadow effects.

## Creating Basic Shadow Tokens

Define the core shadow properties:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Shadow colors
const shadowColorLight = nsvariable('shadow', 'color-light', 'rgba(0, 0, 0, 0.05)', options);
const shadowColorDefault = nsvariable('shadow', 'color-default', 'rgba(0, 0, 0, 0.1)', options);
const shadowColorDark = nsvariable('shadow', 'color-dark', 'rgba(0, 0, 0, 0.2)', options);

// Shadow offsets
const shadowOffsetSmall = nsvariable('shadow', 'offset-small', '0 1px', options);
const shadowOffsetDefault = nsvariable('shadow', 'offset-default', '0 2px', options);
const shadowOffsetLarge = nsvariable('shadow', 'offset-large', '0 4px', options);

// Shadow blur
const shadowBlurSmall = nsvariable('shadow', 'blur-small', '2px', options);
const shadowBlurDefault = nsvariable('shadow', 'blur-default', '4px', options);
const shadowBlurLarge = nsvariable('shadow', 'blur-large', '8px', options);

// Shadow spread
const shadowSpreadNone = nsvariable('shadow', 'spread-none', '0', options);
const shadowSpreadSmall = nsvariable('shadow', 'spread-small', '1px', options);
const shadowSpreadDefault = nsvariable('shadow', 'spread-default', '2px', options);
```

## Defining Box Shadows

@inkline/core provides a `defineBoxShadow` function for creating complete shadow definitions:

```typescript
import { defineBoxShadow } from '@inkline/core';

// Define a simple box shadow
const simpleShadow = defineBoxShadow('0 2px 4px rgba(0, 0, 0, 0.1)', options);

// Define a box shadow with individual properties
const cardShadow = defineBoxShadow({
    x: '0',
    y: '2px',
    blur: '4px',
    spread: '0',
    color: 'rgba(0, 0, 0, 0.1)'
}, options);

// Define a box shadow with inset
const insetShadow = defineBoxShadow({
    inset: true,
    x: '0',
    y: '2px',
    blur: '4px',
    spread: '0',
    color: 'rgba(0, 0, 0, 0.1)'
}, options);

// Define multiple box shadows
const complexShadow = defineBoxShadow([
    {
        x: '0',
        y: '2px',
        blur: '4px',
        spread: '0',
        color: 'rgba(0, 0, 0, 0.1)'
    },
    {
        x: '0',
        y: '4px',
        blur: '8px',
        spread: '0',
        color: 'rgba(0, 0, 0, 0.05)'
    }
], options);
```

## Creating Shadow Elevation Systems

Define a system of shadows that represent different elevation levels:

```typescript
import { defineBoxShadow } from '@inkline/core';

// Create an elevation system (increasing intensity)
const elevation = [
    // Level 0 - No shadow
    defineBoxShadow('none', options),
    
    // Level 1 - Subtle shadow (buttons, cards)
    defineBoxShadow('0 1px 2px rgba(0, 0, 0, 0.05)', options),
    
    // Level 2 - Light shadow (dropdowns, popovers)
    defineBoxShadow('0 2px 4px rgba(0, 0, 0, 0.1)', options),
    
    // Level 3 - Medium shadow (navigation drawers, modals)
    defineBoxShadow([
        '0 4px 6px rgba(0, 0, 0, 0.1)',
        '0 2px 4px rgba(0, 0, 0, 0.06)'
    ], options),
    
    // Level 4 - Strong shadow (floating action buttons)
    defineBoxShadow([
        '0 10px 15px rgba(0, 0, 0, 0.1)',
        '0 4px 6px rgba(0, 0, 0, 0.05)'
    ], options),
    
    // Level 5 - Intense shadow (dialogs, alerts)
    defineBoxShadow([
        '0 20px 25px rgba(0, 0, 0, 0.15)',
        '0 10px 10px rgba(0, 0, 0, 0.05)'
    ], options)
];

// Store as namespaced variables
for (let i = 0; i < elevation.length; i++) {
    nsvariable('elevation', `level-${i}`, elevation[i], options);
}
```

## Using Shadow Tokens in Selectors

Apply shadow tokens to CSS selectors:

```typescript
import { selector, nsvariable, defineBoxShadow } from '@inkline/core';

// Define shadow variables
const cardShadow = defineBoxShadow('0 2px 4px rgba(0, 0, 0, 0.1)', options);
const buttonShadow = defineBoxShadow('0 1px 2px rgba(0, 0, 0, 0.1)', options);
const buttonActiveShadow = defineBoxShadow('inset 0 1px 2px rgba(0, 0, 0, 0.1)', options);

// Use in selectors
selector('.card', {
    boxShadow: cardShadow
}, options);

selector('.button', {
    boxShadow: buttonShadow,
    transition: 'box-shadow 0.2s ease',
    
    '&:active': {
        boxShadow: buttonActiveShadow
    }
}, options);

// Use elevation system
selector('.navbar', {
    boxShadow: nsvariable('elevation', 'level-2', elevation[2], options)
}, options);

selector('.modal', {
    boxShadow: nsvariable('elevation', 'level-4', elevation[4], options)
}, options);
```

## Interactive Shadow States

Define interactive shadow states for components:

```typescript
import { selector, defineBoxShadow } from '@inkline/core';

// Define shadow states
const defaultShadow = defineBoxShadow('0 1px 3px rgba(0, 0, 0, 0.1)', options);
const hoverShadow = defineBoxShadow('0 4px 6px rgba(0, 0, 0, 0.1)', options);
const activeShadow = defineBoxShadow('0 1px 2px rgba(0, 0, 0, 0.1)', options);

// Apply interactive shadows
selector('.card', {
    boxShadow: defaultShadow,
    transition: 'box-shadow 0.3s ease',
    
    '&:hover': {
        boxShadow: hoverShadow
    },
    
    '&:active': {
        boxShadow: activeShadow
    }
}, options);
```

## Drop Shadows and Text Shadows

In addition to box shadows, you can define drop shadows and text shadows:

```typescript
import { nsvariable, selector } from '@inkline/core';

// Define text shadow
const textShadowDefault = nsvariable('text-shadow', 'default', 
  '0 1px 2px rgba(0, 0, 0, 0.2)', options);

// Define filter drop shadow
const dropShadowDefault = nsvariable('filter', 'drop-shadow-default', 
  'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))', options);

// Apply text shadow
selector('.hero-title', {
    textShadow: textShadowDefault
}, options);

// Apply drop shadow filter
selector('.icon', {
    filter: dropShadowDefault
}, options);
```

## Creating Depth with Multiple Shadows

Use multiple shadows to create realistic depth:

```typescript
import { defineBoxShadow } from '@inkline/core';

// Realistic card shadow (ambient + direct light source)
const realisticCardShadow = defineBoxShadow([
    // Ambient light shadow (soft, wide spread)
    {
        x: '0',
        y: '2px',
        blur: '8px',
        spread: '0',
        color: 'rgba(0, 0, 0, 0.05)'
    },
    // Direct light shadow (sharper, more defined)
    {
        x: '0',
        y: '4px',
        blur: '4px',
        spread: '-1px',
        color: 'rgba(0, 0, 0, 0.1)'
    }
], options);

// Deep shadow for floating elements
const floatingShadow = defineBoxShadow([
    // Distant shadow
    {
        x: '0',
        y: '16px',
        blur: '24px',
        spread: '-8px',
        color: 'rgba(0, 0, 0, 0.15)'
    },
    // Middle shadow
    {
        x: '0',
        y: '8px',
        blur: '16px',
        spread: '-6px',
        color: 'rgba(0, 0, 0, 0.1)'
    },
    // Close shadow
    {
        x: '0',
        y: '4px',
        blur: '8px',
        spread: '-2px',
        color: 'rgba(0, 0, 0, 0.06)'
    }
], options);
```

## Responsive Shadows

Create shadows that adapt to different screen sizes:

```typescript
import { selector, defineBoxShadow } from '@inkline/core';

// Define different shadows for different viewports
const defaultShadow = defineBoxShadow('0 2px 4px rgba(0, 0, 0, 0.1)', options);
const mobileShadow = defineBoxShadow('0 1px 2px rgba(0, 0, 0, 0.1)', options);

// Apply responsive shadows
selector('.card', {
    boxShadow: defaultShadow
}, options);

selector('@media (max-width: 768px)', [
    selector('.card', {
        boxShadow: mobileShadow
    }, options)
], options);
```

## Shadow Utility Classes

Create utility classes for common shadow styles:

```typescript
import { selector, defineBoxShadow } from '@inkline/core';

// Define shadow utilities
const shadows = {
    'none': 'none',
    'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
    'md': '0 2px 4px rgba(0, 0, 0, 0.1)',
    'lg': '0 4px 8px rgba(0, 0, 0, 0.15)',
    'xl': '0 8px 16px rgba(0, 0, 0, 0.15)'
};

// Create shadow utilities
Object.entries(shadows).forEach(([key, value]) => {
    selector(`.shadow-${key}`, { 
        boxShadow: defineBoxShadow(value, options) 
    }, options);
});
```

## Best Practices

1. **Use shadows purposefully**: Shadows should communicate elevation and hierarchy
2. **Consistent light source**: Maintain a consistent light source direction across your UI
3. **Color consistency**: Use consistent shadow colors, typically black with varying opacity
4. **Limited elevation levels**: Create a finite set of elevation levels (usually 3-6)
5. **Document shadow meanings**: Assign specific meaning to each elevation level
6. **Consider dark mode**: Adapt shadows for dark mode (often lighter and less intense)
7. **Combine with other depth cues**: Use shadows with other depth cues like size and overlap

## Next Steps

- [Border Tokens](./border.md): Explore border styling tokens
- [Transition Tokens](./transition.md): Discover transition and animation tokens
- [API Reference](../api/variables.md): See the complete API for shadow tokens