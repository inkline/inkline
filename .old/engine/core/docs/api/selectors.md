# Selectors API

The Selectors API provides functions for creating CSS selectors that utilize design tokens in @inkline/core.

## Overview

Selectors define CSS rules that will be generated from your design tokens. The Selectors API allows you to create and manage CSS selectors with associated properties.

## Functions

### selector

Creates a CSS selector.

```typescript
function selector(
    selector: string,
    properties: Record<string, TokenValue>,
    options: SelectorOptions
): Selector;
```

**Parameters**:
- `selector`: The CSS selector string (e.g., 'button', '.card', '#header')
- `properties`: Object of CSS properties and their values
- `options`: Options for the selector (context, theme)

**Returns**: A Selector object

**Example**:

```typescript
import { createContext, variable, selector } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);

// Create a selector
const buttonSelector = selector('button', {
    backgroundColor: primaryColor,
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none'
}, options);
```

### atRule

Creates a CSS at-rule (like media queries) containing selectors.

```typescript
function atRule(
    rule: string,
    selectors: Selector[],
    options: SelectorOptions
): Selector;
```

**Parameters**:
- `rule`: The at-rule string (e.g., '@media (max-width: 768px)')
- `selectors`: Array of selectors to include in the at-rule
- `options`: Options for the at-rule (context, theme)

**Returns**: A Selector object representing the at-rule

**Example**:

```typescript
import { createContext, selector, atRule } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a responsive selector with a media query
atRule('@media (max-width: 768px)', [
    selector('button', {
        padding: '8px 12px',
        fontSize: '14px'
    }, options)
], options);
```

## Interfaces

### Selector

The Selector interface defines the structure of a selector.

```typescript
interface Selector {
    __type: TokenType.Selector;
    selector: string;
    properties: Record<string, TokenValue>;
    children?: Selector[];
}
```

### SelectorOptions

The SelectorOptions interface defines the options for creating selectors.

```typescript
interface SelectorOptions extends DefinitionOptions {
    parent?: Selector;  // Parent selector (for nesting)
}
```

## Usage Patterns

### Basic Selectors

Creating simple CSS selectors:

```typescript
import { createContext, variable, selector } from '@inkline/core';

const context = createContext();
const options = { context };

// Create variables
const primaryColor = variable('primary-color', '#5E9ED6', options);
const fontSize = variable('font-size', '16px', options);

// Create selectors with variables
selector('body', {
    fontFamily: 'system-ui, sans-serif',
    fontSize: fontSize,
    margin: 0,
    padding: 0
}, options);

selector('button', {
    backgroundColor: primaryColor,
    color: '#ffffff',
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none'
}, options);
```

### Nested Selectors

Creating selectors with pseudo-classes and child selectors:

```typescript
import { createContext, variable, selector } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);
const primaryHoverColor = variable('primary-hover-color', '#4A89DC', options);

// Create a selector with nested selectors
selector('.button', {
    backgroundColor: primaryColor,
    color: '#ffffff',
    padding: '10px 15px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    
    // Pseudo-classes
    '&:hover': {
        backgroundColor: primaryHoverColor
    },
    
    '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(94, 158, 214, 0.3)'
    },
    
    // Child selectors
    '& > .icon': {
        marginRight: '8px'
    }
}, options);
```

### Media Queries and Other At-Rules

Creating responsive designs with media queries:

```typescript
import { createContext, variable, selector, atRule } from '@inkline/core';

const context = createContext();
const options = { context };

// Create responsive selectors
selector('.container', {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px'
}, options);

// Create media queries
atRule('@media (max-width: 1200px)', [
    selector('.container', {
        maxWidth: '992px'
    }, options)
], options);

atRule('@media (max-width: 992px)', [
    selector('.container', {
        maxWidth: '768px'
    }, options)
], options);

atRule('@media (max-width: 768px)', [
    selector('.container', {
        maxWidth: '100%'
    }, options)
], options);

// Other at-rules
atRule('@keyframes fadeIn', [
    selector('from', {
        opacity: 0
    }, options),
    selector('to', {
        opacity: 1
    }, options)
], options);
```

### Combining Multiple Properties

Creating complex selectors with multiple properties:

```typescript
import { createContext, variable, selector } from '@inkline/core';

const context = createContext();
const options = { context };

// Create variables
const primaryColor = variable('primary-color', '#5E9ED6', options);
const borderRadius = variable('border-radius', '4px', options);
const animationDuration = variable('animation-duration', '0.2s', options);

// Create a complex selector
selector('.card', {
    backgroundColor: '#ffffff',
    borderRadius: borderRadius,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: `box-shadow ${animationDuration} ease`,
    
    '&:hover': {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
    },
    
    '& .card-header': {
        padding: '15px',
        borderBottom: '1px solid #e5e5e5',
        
        '& h3': {
            margin: 0,
            fontSize: '18px',
            color: primaryColor
        }
    },
    
    '& .card-body': {
        padding: '15px'
    },
    
    '& .card-footer': {
        padding: '15px',
        borderTop: '1px solid #e5e5e5',
        backgroundColor: '#f8f9fa'
    }
}, options);
```

### Utility Classes

Creating utility classes for common styles:

```typescript
import { createContext, nsvariable, selector } from '@inkline/core';

const context = createContext();
const options = { context };

// Create spacing variables
const spacingSm = nsvariable('spacing', 'sm', '0.5rem', options);
const spacingMd = nsvariable('spacing', 'md', '1rem', options);
const spacingLg = nsvariable('spacing', 'lg', '1.5rem', options);

// Create utility classes for margins
selector('.m-sm', { margin: spacingSm }, options);
selector('.m-md', { margin: spacingMd }, options);
selector('.m-lg', { margin: spacingLg }, options);

selector('.mt-sm', { marginTop: spacingSm }, options);
selector('.mt-md', { marginTop: spacingMd }, options);
selector('.mt-lg', { marginTop: spacingLg }, options);

// Create utility classes for padding
selector('.p-sm', { padding: spacingSm }, options);
selector('.p-md', { padding: spacingMd }, options);
selector('.p-lg', { padding: spacingLg }, options);

selector('.pt-sm', { paddingTop: spacingSm }, options);
selector('.pt-md', { paddingTop: spacingMd }, options);
selector('.pt-lg', { paddingTop: spacingLg }, options);
```

## Best Practices

1. **Use variables**: Reference design tokens rather than hardcoding values
2. **Organize selectors**: Group related selectors together
3. **Follow CSS best practices**: Use specificity appropriately, avoid deep nesting
4. **Document intentions**: Make selector purpose clear from its structure
5. **Keep selectors focused**: Each selector should have a single responsibility
6. **Consider performance**: Be mindful of selector complexity and specificity

## Related APIs

- [Variables API](./variables.md): Functions for creating variables to use in selectors
- [Themes API](./themes.md): Functions for organizing selectors into themes
- [CSS Generation](../css-generation.md): Generate CSS from your selectors