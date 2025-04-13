# Variables

Variables are the basic building blocks of your design system in @inkline/core. They represent design values like colors, spacing, typography, and more.

## Creating Variables

There are two main ways to create variables:

### Basic Variables

```typescript
import { createContext, variable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a simple variable
const primaryColor = variable('primary-color', '#5E9ED6', options);
```

### Namespaced Variables

For better organization, use namespaced variables:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a namespaced variable
const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);
const secondaryColor = nsvariable('color', 'secondary', '#6C757D', options);

// This creates variables with names like 'color-primary' and 'color-secondary'
```

## Variable Values

Variables can store different types of values:

```typescript
// Primitive values
const colorPrimary = nsvariable('color', 'primary', '#5E9ED6', options);
const spacingBase = nsvariable('spacing', 'base', '16px', options);
const fontWeight = nsvariable('typography', 'font-weight', 400, options);

// References to other variables (see References documentation)
import { ref } from '@inkline/core';
const accentColor = nsvariable('color', 'accent', ref(colorPrimary), options);

// Calculated values (see Calculations documentation)
import { calc } from '@inkline/core';
const spacingLarge = nsvariable('spacing', 'large', calc(spacingBase, '*', 1.5), options);
```

## Variable Options

When creating variables, you can specify several options:

```typescript
nsvariable('color', 'primary', '#5E9ED6', {
    context: context,           // Required: The context to store the variable in
    theme: 'light',             // Optional: The theme to store the variable in (default: 'default')
    register: true,             // Optional: Whether to register the variable in the theme (default: true)
    default: false,             // Optional: Whether to use the existing value if already defined (default: false)
    transform: (value) => value // Optional: A function to transform the value
});
```

## Accessing Variable Values

You can access a variable's value in different ways:

```typescript
import { valueOf, toVariableKey } from '@inkline/core';

// Get the raw value of a variable
const value = valueOf(primaryColor); // '#5E9ED6'

// Get the CSS variable name
const cssVar = toVariableKey(primaryColor); // '--color-primary'
```

## Setting Variable Values

You can change a variable's value after creation:

```typescript
import { set } from '@inkline/core';

// Update a variable's value
set(primaryColor, '#4A89DC');
```

## Working with Variables in Different Themes

You can create the same variable in different themes:

```typescript
// Light theme primary color
const lightPrimary = nsvariable('color', 'primary', '#5E9ED6', { 
    ...options,
    theme: 'light'
});

// Dark theme primary color
const darkPrimary = nsvariable('color', 'primary', '#3D7AB3', { 
    ...options,
    theme: 'dark'
});
```

## Using Variables in Selectors

Variables are most useful when applied to CSS selectors:

```typescript
import { selector } from '@inkline/core';

// Create a selector using variables
selector('button', {
    backgroundColor: primaryColor,
    color: '#FFFFFF',
    padding: `${spacingSmall} ${spacingBase}`
}, options);
```

## Best Practices

1. **Use namespaces**: Organize variables by type (color, spacing, etc.)
2. **Follow naming conventions**: Be consistent in how you name variables
3. **Document variables**: Make variable purpose clear from its name
4. **Create relationships**: Use references to connect related variables
5. **Think in systems**: Design variables as part of a cohesive system

## Examples

### Color System

```typescript
// Base colors
const colorPrimary = nsvariable('color', 'primary', '#5E9ED6', options);
const colorSecondary = nsvariable('color', 'secondary', '#6C757D', options);
const colorSuccess = nsvariable('color', 'success', '#28a745', options);
const colorDanger = nsvariable('color', 'danger', '#dc3545', options);

// Color variants using the color utility
import { color } from '@inkline/core';

const colorPrimaryLight = nsvariable('color', 'primary-light', 
    color(valueOf(colorPrimary)).lighten(0.2).hex(), options);

const colorPrimaryDark = nsvariable('color', 'primary-dark', 
    color(valueOf(colorPrimary)).darken(0.2).hex(), options);
```

### Spacing System

```typescript
// Base spacing
const spacingBase = nsvariable('spacing', 'base', '16px', options);

// Derived spacing using calculations
import { calc } from '@inkline/core';

const spacingXs = nsvariable('spacing', 'xs', calc(spacingBase, '*', 0.25), options);
const spacingSm = nsvariable('spacing', 'sm', calc(spacingBase, '*', 0.5), options);
const spacingMd = nsvariable('spacing', 'md', spacingBase, options);
const spacingLg = nsvariable('spacing', 'lg', calc(spacingBase, '*', 1.5), options);
const spacingXl = nsvariable('spacing', 'xl', calc(spacingBase, '*', 3), options);
```

## Next Steps

- [References](./references.md): Learn how to create connections between variables
- [Selectors](./selectors.md): See how to use variables in CSS rules
- [Themes](./themes.md): Organize variables into themes