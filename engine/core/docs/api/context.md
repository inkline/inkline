# Context API

The Context API provides functions for creating and managing the central container for all design token information in @inkline/core.

## Overview

The context is a fundamental concept in @inkline/core. It serves as the central registry for all themes, variables, and selectors, ensuring consistency throughout your design system.

## Functions

### createContext

Creates a new context for storing design tokens.

```typescript
function createContext(): Context;
```

**Returns**: A new Context object with a unique ID, empty themes object, and empty files array.

**Example**:

```typescript
import { createContext } from '@inkline/core';

const context = createContext();
console.log(context);
// Output: { id: 'unique-id', themes: {}, files: [] }
```

## Interfaces

### Context

The Context interface defines the structure of a context object.

```typescript
interface Context {
    id: string;                      // Unique identifier for the context
    themes: Record<string, Theme>;   // Map of theme names to Theme objects
    files: File[];                   // Array of files to be generated
}
```

### File

The File interface defines the structure of a file that will be generated.

```typescript
interface File {
    path: string;         // The file path where the CSS will be written
    content: string;      // The CSS content to write to the file
}
```

## Usage Patterns

### Basic Context Usage

The most common pattern is to create a context and pass it around in options objects:

```typescript
import { createContext, variable, selector } from '@inkline/core';

// Create a context
const context = createContext();
const options = { context };

// Use the context for creating variables
const primaryColor = variable('primary-color', '#5E9ED6', options);

// Use the context for creating selectors
selector('button', {
    backgroundColor: primaryColor,
    padding: '10px 15px'
}, options);
```

### Context Sharing

For larger applications, it's recommended to create and export a shared context:

```typescript
// theme.ts - Create and export the context
import { createContext } from '@inkline/core';

export const context = createContext();
export const options = { context };

// colors.ts - Import and use the shared context
import { nsvariable } from '@inkline/core';
import { options } from './theme';

export const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);
export const secondaryColor = nsvariable('color', 'secondary', '#6C757D', options);
```

### Multiple Themes in a Context

A single context can manage multiple themes:

```typescript
import { createContext, theme, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create light and dark themes in the same context
const lightTheme = theme('light', options);
const darkTheme = theme('dark', options);

// Add variables to specific themes
const lightPrimaryColor = nsvariable('color', 'primary', '#5E9ED6', { 
    ...options, 
    theme: 'light' 
});

const darkPrimaryColor = nsvariable('color', 'primary', '#3D7AB3', { 
    ...options, 
    theme: 'dark' 
});
```

### Adding Files to the Context

You can add files to the context for generation:

```typescript
import { createContext, createCss } from '@inkline/core';

const context = createContext();
const options = { context };

// Define variables and selectors...

// Generate CSS and add it to the context
const lightCss = createCss({ ...options, themeName: 'light' });
const darkCss = createCss({ ...options, themeName: 'dark' });

context.files.push({
    path: 'dist/light-theme.css',
    content: lightCss
});

context.files.push({
    path: 'dist/dark-theme.css',
    content: darkCss
});
```

## Best Practices

1. **Create a single context**: Use one context for your entire application
2. **Export the context**: Make the context available throughout your application
3. **Pass the context consistently**: Always include the context in options objects
4. **Organize by theme**: Use the same context but specify different themes for variants
5. **Document your context structure**: Keep track of what's in your context

## Related APIs

- [Themes API](./themes.md): Functions for working with themes in a context
- [Variables API](./variables.md): Functions for creating variables in a context
- [CSS Generation](../css-generation.md): Generate CSS from your context