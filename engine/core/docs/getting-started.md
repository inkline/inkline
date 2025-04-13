# Getting Started with @inkline/core

This guide will help you get started with @inkline/core, the design token engine powering Inkline's theming system.

## Installation

First, install @inkline/core in your project:

```bash
# npm
npm install @inkline/core

# yarn
yarn add @inkline/core

# pnpm
pnpm add @inkline/core
```

## Creating Your First Theme

Let's create a simple theme with basic color and spacing variables:

```typescript
import { 
  createContext, 
  variable, 
  nsvariable,
  selector, 
  createCss 
} from '@inkline/core';

// 1. Create a context
const context = createContext();
const options = { context };

// 2. Define color variables
const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);
const secondaryColor = nsvariable('color', 'secondary', '#6C757D', options);
const successColor = nsvariable('color', 'success', '#28a745', options);
const dangerColor = nsvariable('color', 'danger', '#dc3545', options);

// 3. Define spacing variables
const spacingBase = nsvariable('spacing', 'base', '16px', options);
const spacingSmall = nsvariable('spacing', 'small', '8px', options);
const spacingLarge = nsvariable('spacing', 'large', '24px', options);

// 4. Define typography variables
const fontFamily = nsvariable('typography', 'font-family', 
  'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', options);
const fontSize = nsvariable('typography', 'font-size', '16px', options);

// 5. Create selectors for elements
selector('body', {
  fontFamily,
  fontSize,
  color: nsvariable('color', 'text', '#333333', options),
  margin: '0',
  padding: '0'
}, options);

selector('button', {
  backgroundColor: primaryColor,
  color: '#ffffff',
  padding: `${spacingSmall} ${spacingBase}`,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
}, options);

// 6. Generate CSS
const css = createCss(options);
console.log(css);
```

## Integrating with an HTML Page

You can inject the generated CSS into your HTML:

```typescript
// Create a style element
const styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.head.appendChild(styleElement);
```

## Using with Build Systems

For more complex applications, you might want to save the generated CSS to a file:

```typescript
// Node.js example
import fs from 'fs';
import { createContext, /* your tokens */ createCss } from '@inkline/core';

const context = createContext();
// Define your tokens...

const css = createCss({ context });
fs.writeFileSync('path/to/theme.css', css);
```

## Next Steps

Now that you have a basic understanding of @inkline/core, you can:

1. Learn about [Core Concepts](./core-concepts/README.md) like variables, themes, and selectors
2. Explore different [Token Types](./token-types/README.md)
3. See how to use [CSS Generation](./css-generation.md) features
4. Check out [Advanced Usage](./advanced/README.md) for more complex scenarios

## Example Project Structure

A typical project structure might look like:

```
src/
  theme/
    context.ts        # Create and export context
    variables/
      colors.ts       # Define color variables
      spacing.ts      # Define spacing variables
      typography.ts   # Define typography variables
    selectors/
      elements.ts     # Define element selectors
      components/     # Component-specific selectors
        button.ts
        card.ts
    themes/
      light.ts        # Light theme setup
      dark.ts         # Dark theme setup
    index.ts          # Export everything
```

## Troubleshooting

If you encounter issues:

- Ensure you're passing the context correctly to all functions
- Check for typos in variable and selector names
- Verify that all imports are correct
- Use TypeScript for better type checking

For more help, refer to the [API Reference](./api/README.md) or check the [GitHub repository](https://github.com/inkline/inkline).