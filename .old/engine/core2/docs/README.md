# @inkline/core

> The design token engine powering Inkline's theming system

@inkline/core is the foundation of Inkline's theming and design token system. It provides a powerful API for creating, managing, and using design tokens to build consistent and maintainable UI components and themes.

## Documentation

- [Getting Started](./getting-started.md)
- [Core Concepts](./core-concepts/README.md)
  - [Context](./core-concepts/context.md)
  - [Variables](./core-concepts/variables.md)
  - [Themes](./core-concepts/themes.md)
  - [Selectors](./core-concepts/selectors.md)
  - [References](./core-concepts/references.md)
- [Token Types](./token-types/README.md)
  - [Color Tokens](./token-types/color.md)
  - [Spacing Tokens](./token-types/spacing.md)
  - [Typography Tokens](./token-types/typography.md)
  - [Border Tokens](./token-types/border.md)
  - [Shadow Tokens](./token-types/shadow.md)
  - [Transition Tokens](./token-types/transition.md)
  - [Animation Tokens](./token-types/animation.md)
- [CSS Generation](./css-generation.md)
- [Advanced Usage](./advanced/README.md)
  - [Custom Properties](./advanced/custom-properties.md)
  - [CSS At-Rules](./advanced/at-rules.md)
  - [Token Transforms](./advanced/transforms.md)
- [Integration](./integration/README.md)
  - [UI Libraries](./integration/ui-libraries.md)
  - [Framework Support](./integration/framework-support.md)
- [Best Practices](./best-practices.md)
- [API Reference](./api/README.md)
  - [Context API](./api/context.md)
  - [Variables API](./api/variables.md)
  - [Themes API](./api/themes.md)
  - [Selectors API](./api/selectors.md)
  - [Colors API](./api/colors.md)
  - [Utility Functions](./api/utils.md)

## Installation

```bash
# npm
npm install @inkline/core

# yarn
yarn add @inkline/core

# pnpm
pnpm add @inkline/core
```

## Basic Usage

```typescript
import { createContext, variable, selector, createCss } from '@inkline/core';

// Create a context to hold your themes and tokens
const context = createContext();

// Define variables (tokens)
const primaryColor = variable('primary-color', '#5E9ED6', { context });
const textColor = variable('text-color', '#333333', { context });

// Create CSS selectors using variables
selector('button', {
  backgroundColor: primaryColor,
  color: textColor,
  padding: '10px 15px',
  borderRadius: '4px',
  border: 'none'
}, { context });

// Generate CSS
const css = createCss({ context });
console.log(css);
```

## License

[ISC](./LICENSE)