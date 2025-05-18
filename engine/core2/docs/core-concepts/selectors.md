# Selectors

Selectors define how your design tokens are applied to HTML elements through CSS rules. In @inkline/core, selectors create the connection between your variables and the actual styling of your application.

## Creating Selectors

The basic way to create a selector is with the `selector` function:

```typescript
import { createContext, variable, selector } from '@inkline/core';

const context = createContext();
const options = { context };

// Create variables
const primaryColor = variable('primary-color', '#5E9ED6', options);
const spacingBase = variable('spacing-base', '16px', options);

// Create a selector
selector('button', {
    backgroundColor: primaryColor,
    padding: spacingBase,
    borderRadius: '4px',
    border: 'none'
}, options);
```

## Selector Properties

Selectors can use different types of values for their properties:

```typescript
import { selector, variable } from '@inkline/core';

// Using variables as property values
const primaryColor = variable('primary-color', '#5E9ED6', options);
selector('button', {
    backgroundColor: primaryColor
}, options);

// Using raw values
selector('body', {
    margin: 0,
    padding: 0,
    fontFamily: 'system-ui, sans-serif'
}, options);

// Using calculated values
import { calc } from '@inkline/core';
const spacingBase = variable('spacing-base', '16px', options);
selector('.card', {
    padding: calc(spacingBase, '*', 1.5)
}, options);
```

## Nested Selectors

You can create nested selectors using the `&` character to reference the parent selector:

```typescript
selector('.button', {
    backgroundColor: primaryColor,
    color: '#ffffff',
    padding: '10px 15px',
    transition: 'background-color 0.2s ease',
    
    // Pseudo-classes
    '&:hover': {
        backgroundColor: secondaryColor
    },
    
    '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(94, 158, 214, 0.3)'
    },
    
    // Element states
    '&[disabled]': {
        opacity: 0.7,
        cursor: 'not-allowed'
    },
    
    // Child selectors
    '& > .icon': {
        marginRight: '8px'
    },
    
    // Combination with other selectors
    '.card &': {
        marginBottom: '16px'
    }
}, options);
```

## Media Queries and At-Rules

You can create responsive styles using media queries and other at-rules:

```typescript
import { atRule, selector } from '@inkline/core';

// Create a media query with selectors
atRule('@media (max-width: 768px)', [
    selector('button', {
        padding: '8px 12px',
        fontSize: '14px'
    }, options),
    
    selector('.container', {
        padding: '0 10px'
    }, options)
], options);

// Create keyframe animations
atRule('@keyframes fadeIn', [
    selector('from', {
        opacity: 0
    }, options),
    
    selector('to', {
        opacity: 1
    }, options)
], options);

// Create other at-rules
atRule('@supports (display: grid)', [
    selector('.grid', {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
    }, options)
], options);
```

## Selector Organization

You can organize your selectors by functionality:

```typescript
// Button selectors
selector('.button', {
    display: 'inline-block',
    padding: '10px 15px',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
}, options);

selector('.button.primary', {
    backgroundColor: primaryColor,
    color: '#ffffff',
    
    '&:hover': {
        backgroundColor: primaryHoverColor
    }
}, options);

selector('.button.secondary', {
    backgroundColor: secondaryColor,
    color: '#ffffff',
    
    '&:hover': {
        backgroundColor: secondaryHoverColor
    }
}, options);

// Card selectors
selector('.card', {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
}, options);

selector('.card-header', {
    padding: '15px',
    borderBottom: '1px solid #e5e5e5'
}, options);

selector('.card-body', {
    padding: '15px'
}, options);

selector('.card-footer', {
    padding: '15px',
    borderTop: '1px solid #e5e5e5',
    backgroundColor: '#f8f9fa'
}, options);
```

## Theme-Specific Selectors

You can create selectors that are specific to a theme:

```typescript
import { theme, selector } from '@inkline/core';

// Create themes
const lightTheme = theme('light', options);
const darkTheme = theme('dark', options);

// Light theme selectors
selector('body', {
    backgroundColor: '#ffffff',
    color: '#333333'
}, { ...options, theme: 'light' });

// Dark theme selectors
selector('body', {
    backgroundColor: '#121212',
    color: '#f5f5f5'
}, { ...options, theme: 'dark' });
```

## Dynamic Selectors

You can generate selectors programmatically:

```typescript
// Create spacing utility classes
const spacings = {
    'xs': '0.25rem',
    'sm': '0.5rem',
    'md': '1rem',
    'lg': '1.5rem',
    'xl': '2rem'
};

// Generate margin utilities
Object.entries(spacings).forEach(([key, value]) => {
    // m-xs, m-sm, etc.
    selector(`.m-${key}`, { margin: value }, options);
    
    // mt-xs, mt-sm, etc.
    selector(`.mt-${key}`, { marginTop: value }, options);
    
    // mr-xs, mr-sm, etc.
    selector(`.mr-${key}`, { marginRight: value }, options);
    
    // mb-xs, mb-sm, etc.
    selector(`.mb-${key}`, { marginBottom: value }, options);
    
    // ml-xs, ml-sm, etc.
    selector(`.ml-${key}`, { marginLeft: value }, options);
});
```

## Generating CSS

After defining selectors, you can generate CSS:

```typescript
import { createCss } from '@inkline/core';

// Generate CSS with all selectors
const css = createCss({ context });
console.log(css);

// Generate CSS for a specific theme
const lightCss = createCss({ context, themeName: 'light' });
const darkCss = createCss({ context, themeName: 'dark' });
```

## Best Practices

1. **Use variables**: Reference design tokens rather than hardcoding values
2. **Group related selectors**: Keep selectors for related components together
3. **Follow CSS best practices**: Minimize specificity, avoid deep nesting
4. **Use semantic selectors**: Name classes based on meaning, not appearance
5. **Be consistent**: Use a consistent naming pattern (e.g., BEM, SMACSS)
6. **Consider performance**: Be mindful of selector complexity

## Next Steps

- [References](./references.md): Learn how to create relationships between variables
- [CSS Generation](../css-generation.md): Generate CSS from your selectors
- [Selectors API](../api/selectors.md): Explore the complete selectors API