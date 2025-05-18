# Core Concepts

The @inkline/core package is built around several key concepts that work together to create a powerful and flexible design token system. Understanding these concepts is essential for effectively using the library.

## Overview

- [Context](./context.md): The central container for all design tokens
- [Variables](./variables.md): The basic building blocks representing design values
- [Themes](./themes.md): Collections of variables and selectors
- [Selectors](./selectors.md): CSS rules that utilize variables
- [References](./references.md): Relationships between variables

## How These Concepts Work Together

1. **Context** serves as the global registry for all your design system artifacts
2. **Variables** store design values and are registered in the context
3. **Themes** organize variables into cohesive collections (e.g., light/dark themes)
4. **Selectors** define how variables are applied to DOM elements
5. **References** create connections between variables for maintainability

## Diagram

```
┌─────────────────────────────────────────┐
│                 Context                  │
│                                         │
│   ┌───────────┐       ┌───────────┐     │
│   │   Theme   │       │   Theme   │     │
│   │  (light)  │       │  (dark)   │     │
│   └───────────┘       └───────────┘     │
│                                         │
│   ┌───────────┐       ┌───────────┐     │
│   │ Variables │       │ Variables │     │
│   └───────────┘       └───────────┘     │
│                                         │
│   ┌───────────┐       ┌───────────┐     │
│   │ Selectors │       │ Selectors │     │
│   └───────────┘       └───────────┘     │
│                                         │
└─────────────────────────────────────────┘
```

## Example: Creating a Simple Design System

This example demonstrates how these concepts work together:

```typescript
import { 
  createContext, 
  variable, 
  nsvariable,
  theme,
  selector, 
  ref
} from '@inkline/core';

// Create context
const context = createContext();
const options = { context };

// Create themes
const lightTheme = theme('light', options);
const darkTheme = theme('dark', options);

// Define primary color variable for light theme
const lightPrimary = nsvariable('color', 'primary', '#5E9ED6', { 
  ...options,
  theme: 'light'
});

// Define primary color variable for dark theme
const darkPrimary = nsvariable('color', 'primary', '#3D7AB3', { 
  ...options,
  theme: 'dark'
});

// Define a secondary color that references primary
const lightSecondary = nsvariable('color', 'secondary', ref(lightPrimary), { 
  ...options,
  theme: 'light',
  transform: (color) => color.darken(0.1).hex()
});

// Define selectors that use these variables
selector('button', {
  backgroundColor: nsvariable('color', 'primary', '#5E9ED6', options),
  color: '#ffffff',
  padding: '8px 16px'
}, options);
```

## Next Steps

Explore each core concept in detail:

- [Context](./context.md): Learn how to create and manage contexts
- [Variables](./variables.md): Understand how to define and use variables
- [Themes](./themes.md): See how to organize variables into themes
- [Selectors](./selectors.md): Learn how to apply variables to CSS rules
- [References](./references.md): Discover how to create relationships between variables