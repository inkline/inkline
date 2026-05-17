# Themes API

The Themes API provides functions for creating and managing themes in @inkline/core. Themes are collections of variables and selectors that represent a consistent visual style.

## Overview

Themes organize design tokens into cohesive collections (e.g., light and dark themes). The Themes API allows you to create themes and add variables and selectors to them.

## Functions

### theme

Creates or retrieves a theme.

```typescript
function theme(name: string, options: DefinitionOptions): Theme;
```

**Parameters**:
- `name`: The name of the theme
- `options`: Options for the theme (containing the context)

**Returns**: A Theme object

**Example**:

```typescript
import { createContext, theme } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a theme
const lightTheme = theme('light', options);
```

### addVariableToTheme

Adds a variable to a theme. This is typically called internally by the variable functions.

```typescript
function addVariableToTheme<Name extends string>(
    variable: Variable<Name>,
    options: VariableOptions
): void;
```

**Parameters**:
- `variable`: The variable to add to the theme
- `options`: Options for adding the variable (context, theme)

**Example**:

```typescript
import { createContext, variable, addVariableToTheme } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a variable without registering it
const primaryColor = variable('primary-color', '#5E9ED6', { 
    ...options, 
    register: false 
});

// Manually add it to a theme
addVariableToTheme(primaryColor, { 
    ...options, 
    theme: 'light' 
});
```

### addSelectorToTheme

Adds a selector to a theme. This is typically called internally by the selector function.

```typescript
function addSelectorToTheme(
    selector: Selector,
    options: SelectorOptions
): void;
```

**Parameters**:
- `selector`: The selector to add to the theme
- `options`: Options for adding the selector (context, theme)

**Example**:

```typescript
import { createContext, variable, Selector, TokenType, addSelectorToTheme } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);

// Create a selector manually
const buttonSelector: Selector = {
    __type: TokenType.Selector,
    selector: 'button',
    properties: {
        backgroundColor: primaryColor,
        padding: '10px 15px'
    }
};

// Add it to a theme
addSelectorToTheme(buttonSelector, options);
```

## Interfaces

### Theme

The Theme interface defines the structure of a theme.

```typescript
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
```

### DefinitionOptions

The DefinitionOptions interface defines the options for creating definitions.

```typescript
interface DefinitionOptions {
    context: Context;
    theme?: string;  // The theme name to use (default: 'default')
}
```

## Usage Patterns

### Basic Theme Creation

Creating simple themes:

```typescript
import { createContext, theme } from '@inkline/core';

const context = createContext();
const options = { context };

// Create default theme (automatically created if not explicitly defined)
const defaultTheme = theme('default', options);

// Create light and dark themes
const lightTheme = theme('light', options);
const darkTheme = theme('dark', options);
```

### Adding Variables to Themes

Adding variables to specific themes:

```typescript
import { createContext, theme, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create themes
const lightTheme = theme('light', options);
const darkTheme = theme('dark', options);

// Add variables to light theme
const lightPrimary = nsvariable('color', 'primary', '#5E9ED6', { 
    ...options, 
    theme: 'light' 
});
const lightBackground = nsvariable('color', 'background', '#FFFFFF', { 
    ...options, 
    theme: 'light' 
});

// Add variables to dark theme
const darkPrimary = nsvariable('color', 'primary', '#3D7AB3', { 
    ...options, 
    theme: 'dark' 
});
const darkBackground = nsvariable('color', 'background', '#121212', { 
    ...options, 
    theme: 'dark' 
});
```

### Adding Selectors to Themes

Adding selectors to specific themes:

```typescript
import { createContext, theme, selector, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create themes
const lightTheme = theme('light', options);
const darkTheme = theme('dark', options);

// Add variables to themes
const lightBackground = nsvariable('color', 'background', '#FFFFFF', { 
    ...options, 
    theme: 'light' 
});
const darkBackground = nsvariable('color', 'background', '#121212', { 
    ...options, 
    theme: 'dark' 
});

// Add selectors to light theme
selector('body', {
    backgroundColor: lightBackground,
    color: '#333333'
}, { ...options, theme: 'light' });

// Add selectors to dark theme
selector('body', {
    backgroundColor: darkBackground,
    color: '#f5f5f5'
}, { ...options, theme: 'dark' });
```

### Sharing Selectors Across Themes

Creating selectors that work with different themes:

```typescript
import { createContext, theme, selector, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create themes
theme('light', options);
theme('dark', options);

// Add variables to themes with the same name but different values
nsvariable('color', 'primary', '#5E9ED6', { ...options, theme: 'light' });
nsvariable('color', 'primary', '#3D7AB3', { ...options, theme: 'dark' });

// Create a selector that uses the theme-specific variable
// This selector will work in both themes because it references the variable by name
selector('button', {
    backgroundColor: nsvariable('color', 'primary', '#5E9ED6', options),
    padding: '10px 15px'
}, options);
```

### Inspecting Themes

Accessing theme data for analysis or debugging:

```typescript
import { createContext, theme, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a theme
const lightTheme = theme('light', options);

// Add variables to the theme
nsvariable('color', 'primary', '#5E9ED6', { ...options, theme: 'light' });
nsvariable('color', 'secondary', '#6C757D', { ...options, theme: 'light' });

// Inspect the theme
console.log(lightTheme.__name); // 'light'
console.log(Object.keys(lightTheme.variables)); // ['color-primary', 'color-secondary']
console.log(lightTheme.variables['color-primary'].__value); // '#5E9ED6'
```

## Best Practices

1. **Plan your themes**: Design your theme structure before building components
2. **Use consistent naming**: Use the same variable names across themes for compatibility
3. **Theme specialization**: Create specialized themes for specific purposes (dark mode, high contrast)
4. **Variable organization**: Group related variables together in each theme
5. **Document theme differences**: Keep track of theme variants and their purposes

## Related APIs

- [Context API](./context.md): Functions for creating contexts that hold themes
- [Variables API](./variables.md): Functions for creating variables in themes
- [Selectors API](./selectors.md): Functions for creating selectors in themes
- [CSS Generation](../css-generation.md): Generate CSS from your themes