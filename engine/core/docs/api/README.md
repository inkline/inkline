# API Reference

This section provides a comprehensive reference of the @inkline/core API, organized by functionality.

## Table of Contents

- [Context API](./context.md)
- [Variables API](./variables.md)
- [Themes API](./themes.md)
- [Selectors API](./selectors.md)
- [Colors API](./colors.md)
- [Utility Functions](./utils.md)

## Core Functions Overview

| Category | Function | Description |
|----------|----------|-------------|
| Context | `createContext()` | Creates a new context for storing themes and tokens |
| Variables | `variable(name, value, options)` | Creates a new variable token |
| Variables | `nsvariable(namespace, name, value, options)` | Creates a namespaced variable token |
| Variables | `set(variable, value)` | Sets a variable's value |
| Variables | `valueOf(variable)` | Gets a variable's value |
| Themes | `theme(name, options)` | Creates or retrieves a theme |
| Selectors | `selector(selector, properties, options)` | Creates a CSS selector |
| Colors | `color(value)` | Creates a color object with manipulation methods |
| References | `ref(variable)` | Creates a reference to another variable |
| Calculations | `calc(operand1, operator, operand2)` | Performs calculations with variable values |
| CSS | `createCss(options)` | Generates CSS from the context |

## Type Definitions

The @inkline/core package includes comprehensive TypeScript definitions for all its APIs. Key types include:

```typescript
// Context
interface Context {
    id: string;
    themes: Record<string, Theme>;
    files: File[];
}

// Theme
interface Theme {
    __type: TokenType.Theme;
    __name: string;
    __keys: {
        variables: Set<string>;
        selectors: Set<string>;
    };
    variables: Record<string, Variable<string>>;
    selectors: Selector[];
}

// Variable
interface Variable<Name extends string = string> {
    __type: TokenType.Variable;
    __name: Name;
    __value: TokenValue;
}

// Selector
interface Selector {
    __type: TokenType.Selector;
    selector: string;
    properties: Record<string, TokenValue>;
    children?: Selector[];
}
```

## Importing the API

You can import all functions from the package root:

```typescript
import { 
    createContext,
    variable,
    nsvariable,
    theme,
    selector,
    color,
    ref,
    calc,
    createCss
} from '@inkline/core';
```

Or import specific functions from their modules:

```typescript
import { createContext } from '@inkline/core/context';
import { variable, nsvariable } from '@inkline/core/tokens/variable';
import { theme } from '@inkline/core/tokens/theme';
import { selector } from '@inkline/core/tokens/selector';
```

## Next Steps

Explore the detailed API documentation for each category:

- [Context API](./context.md): Functions for creating and managing contexts
- [Variables API](./variables.md): Functions for working with variables
- [Themes API](./themes.md): Functions for creating and managing themes
- [Selectors API](./selectors.md): Functions for creating CSS selectors
- [Colors API](./colors.md): Functions for working with colors
- [Utility Functions](./utils.md): Helper functions for working with tokens