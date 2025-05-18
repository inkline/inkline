# @inkline/core Usage Guide

`@inkline/core` is the foundation of Inkline's theming and design token system. It provides a powerful API for creating, managing, and using design tokens to build consistent and maintainable UI components and themes.

## Installation

```bash
# npm
npm install @inkline/core

# yarn
yarn add @inkline/core

# pnpm
pnpm add @inkline/core
```

## Getting Started

To get started with @inkline/core, you'll need to create a context and start defining tokens:

```typescript
import { createContext, variable, selector, theme } from '@inkline/core';

// Create a context to hold your themes and tokens
const context = createContext();

// All operations will use this context
const options = { context };
```

## Core Concepts

### Context

The context is the central container for all design token information. It stores themes, variables, and selectors.

```typescript
import { createContext } from '@inkline/core';

const context = createContext();
```

### Variables

Variables are the basic building blocks of the design system. They represent values like colors, spacing, typography, etc.

```typescript
import { variable, nsvariable } from '@inkline/core';

// Create a simple variable
const primaryColor = variable('primary-color', '#5E9ED6', { context });

// Create a namespaced variable
const colorPrimary = nsvariable('color', 'primary', '#5E9ED6', { context });
```

### Themes

Themes contain collections of variables and selectors. You can create multiple themes (e.g., light and dark) with different variable values.

```typescript
import { theme } from '@inkline/core';

// Create or retrieve a theme
const defaultTheme = theme('default', { context });
const darkTheme = theme('dark', { context });
```

### Selectors

Selectors define CSS rules that will be generated. They combine variables with CSS properties.

```typescript
import { selector } from '@inkline/core';

// Create a selector for a button
selector('button', {
    backgroundColor: colorPrimary,
    padding: '10px 15px',
    borderRadius: '4px'
}, { context });
```

### References

References allow you to refer to other variables, creating relationships between design tokens.

```typescript
import { ref, variable } from '@inkline/core';

const primaryColor = variable('primary-color', '#5E9ED6', { context });
const buttonColor = variable('button-color', ref(primaryColor), { context });
```

## Working with Tokens

### Color Manipulation

@inkline/core provides utilities for working with colors:

```typescript
import { color } from '@inkline/core';

// Create a color token
const primary = color('#5E9ED6');

// Create derived colors
const primaryLighter = color(primary).lighten(0.2).hex();
const primaryDarker = color(primary).darken(0.2).hex();
```

### Calculations

You can perform calculations with token values:

```typescript
import { calc, variable } from '@inkline/core';

const baseSize = variable('base-size', '16px', { context });
const largeSize = variable('large-size', calc(baseSize, '*', 1.5), { context });
```

### CSS Generation

Generate CSS output from your themes:

```typescript
import { createCss } from '@inkline/core';

// Generate CSS for the default theme
const css = createCss({ context, themeName: 'default' });
```

## Advanced Usage

### Custom Properties

Define complex properties like transitions, animations, and box shadows:

```typescript
import { 
    defineTransition,
    defineAnimation,
    defineBoxShadow 
} from '@inkline/core';

// Define a transition
const buttonTransition = defineTransition({
    property: 'all',
    duration: '300ms',
    timingFunction: 'ease-in-out'
}, { context });

// Define a box shadow
const cardShadow = defineBoxShadow({
    x: '0',
    y: '4px',
    blur: '6px',
    spread: '0',
    color: 'rgba(0, 0, 0, 0.1)'
}, { context });
```

### CSS At-Rules

Create media queries and other at-rules:

```typescript
import { atRule, selector } from '@inkline/core';

// Create a media query
atRule('@media (max-width: 768px)', [
    selector('button', {
        padding: '8px 12px',
        fontSize: '14px'
    }, { context })
], { context });
```

## Integration with UI Libraries

@inkline/core is designed to work seamlessly with UI component libraries like @inkline/ui:

```typescript
import { createContext } from '@inkline/core';
import { createInkline } from '@inkline/ui';

const context = createContext();
// Define your variables, themes, and selectors...

// Pass the generated CSS to Inkline
const inkline = createInkline({
    theme: {
        css: createCss({ context, themeName: 'default' })
    }
});
```

## Best Practices

1. **Organize tokens by purpose**: Group related tokens using namespaces.
2. **Use references**: Create relationships between tokens for maintainability.
3. **Define themes early**: Plan your themes structure before building components.
4. **Document tokens**: Use clear naming patterns to make token purpose obvious.
5. **Keep context centralized**: Share a single context across your application.

## Example Project Structure

```
src/
  theme/
    context.ts      # Create and export context
    colors.ts       # Define color tokens
    typography.ts   # Define typography tokens
    spacing.ts      # Define spacing tokens
    components/     # Component-specific tokens
      button.ts
      card.ts
    themes/
      light.ts      # Light theme setup
      dark.ts       # Dark theme setup
    index.ts        # Export everything
```

## Further Resources

- [Inkline Documentation](https://inkline.io/docs)
- [GitHub Repository](https://github.com/inkline/inkline)
- [Theme Customization](https://inkline.io/docs/customization)