# Context

The context is the central container for all design token information in @inkline/core. It stores themes, variables, and selectors, providing a centralized registry for your design system.

## Creating a Context

Creating a context is the first step when using @inkline/core:

```typescript
import { createContext } from '@inkline/core';

const context = createContext();
```

Each context has a unique ID and maintains collections of themes and files that will be generated.

## Context Structure

A context consists of:

- **id**: A unique identifier (automatically generated)
- **themes**: An object containing all defined themes
- **files**: An array of file descriptions for CSS generation

```typescript
interface Context {
    id: string;
    themes: Record<string, Theme>;
    files: File[];
}
```

## Using the Context

The context is required for most operations in @inkline/core. You typically pass it as part of the options object:

```typescript
import { createContext, variable, selector } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a variable using the context
const primaryColor = variable('primary-color', '#5E9ED6', options);

// Create a selector using the context
selector('button', {
    backgroundColor: primaryColor,
    padding: '10px 15px'
}, options);
```

## Context Sharing

It's important to share the same context across your entire application to ensure consistency:

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

## Multiple Contexts

While it's generally best to use a single context, you can create multiple contexts for different purposes:

```typescript
import { createContext } from '@inkline/core';

// Create different contexts for different applications
const appOneContext = createContext();
const appTwoContext = createContext();
```

## Inspecting the Context

You can inspect the contents of a context for debugging or analysis:

```typescript
import { createContext, variable } from '@inkline/core';

const context = createContext();
const options = { context };

variable('primary-color', '#5E9ED6', options);

// Log all themes in the context
console.log(context.themes);

// Log all variables in the default theme
console.log(context.themes.default.variables);
```

## Best Practices

1. **Create a single context**: Use one context for your entire application to ensure consistency
2. **Export the context**: Make the context available throughout your application
3. **Pass the context consistently**: Always include the context in options objects
4. **Organize by theme**: Use the same context but specify different themes for variants
5. **Document your context structure**: Keep track of what's in your context

## Next Steps

- [Variables](./variables.md): Learn how to create and use variables within a context
- [Themes](./themes.md): See how to organize variables into themes
- [CSS Generation](../css-generation.md): Generate CSS from your context