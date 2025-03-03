# CSS Generation

@inkline/core provides powerful tools for generating CSS from your design tokens and selectors. This guide covers the various options and techniques for CSS generation.

## Basic CSS Generation

The simplest way to generate CSS is using the `createCss` function:

```typescript
import { createContext, variable, selector, createCss } from '@inkline/core';

const context = createContext();
const options = { context };

// Define variables and selectors
const primaryColor = variable('primary-color', '#5E9ED6', options);

selector('button', {
  backgroundColor: primaryColor,
  padding: '10px 15px',
  borderRadius: '4px'
}, options);

// Generate CSS
const css = createCss(options);
console.log(css);
```

This will produce CSS like:

```css
:root {
  --primary-color: #5E9ED6;
}

button {
  background-color: var(--primary-color);
  padding: 10px 15px;
  border-radius: 4px;
}
```

## Theme-Specific CSS Generation

You can generate CSS for a specific theme:

```typescript
import { createContext, theme, nsvariable, selector, createCss } from '@inkline/core';

const context = createContext();
const options = { context };

// Create themes
const lightTheme = theme('light', options);
const darkTheme = theme('dark', options);

// Light theme variables
const lightPrimary = nsvariable('color', 'primary', '#5E9ED6', { 
  ...options, 
  theme: 'light' 
});

// Dark theme variables
const darkPrimary = nsvariable('color', 'primary', '#3D7AB3', { 
  ...options, 
  theme: 'dark' 
});

// Create shared selectors
selector('button', {
  backgroundColor: nsvariable('color', 'primary', '#5E9ED6', options),
  color: '#ffffff',
  padding: '10px 15px'
}, options);

// Generate CSS for light theme
const lightCss = createCss({ ...options, themeName: 'light' });

// Generate CSS for dark theme
const darkCss = createCss({ ...options, themeName: 'dark' });
```

## CSS Variables Root Selector

By default, CSS variables are added to the `:root` selector. You can customize this:

```typescript
const css = createCss({ 
  ...options, 
  rootSelector: '.my-app' 
});
```

This will produce:

```css
.my-app {
  --color-primary: #5E9ED6;
  /* other variables... */
}
```

## Combining Multiple Themes

You can combine multiple themes with media queries:

```typescript
import { createContext, createCss } from '@inkline/core';

const context = createContext();
// Define light and dark theme variables...

// Generate combined CSS with media queries
const combinedCss = `
${createCss({ context, themeName: 'light' })}

@media (prefers-color-scheme: dark) {
  ${createCss({ 
    context, 
    themeName: 'dark', 
    includeSelectors: false, 
    rootSelector: ':root' 
  })}
}
`;
```

## Including/Excluding Selectors

You can control whether selectors are included in the output:

```typescript
// Generate CSS with only variables (no selectors)
const variablesOnlyCss = createCss({ 
  ...options, 
  includeSelectors: false 
});

// Generate CSS with only selectors (no variables)
const selectorsOnlyCss = createCss({ 
  ...options, 
  includeVariables: false 
});
```

## Pretty-Printing CSS

You can format the CSS output:

```typescript
const css = createCss({ 
  ...options, 
  pretty: true 
});
```

## Generating to Files

For Node.js environments, you can write the CSS directly to files:

```typescript
import fs from 'fs';
import { createContext, createCss } from '@inkline/core';

const context = createContext();
// Define variables and selectors...

// Generate CSS
const lightCss = createCss({ context, themeName: 'light' });
const darkCss = createCss({ context, themeName: 'dark' });

// Write to files
fs.writeFileSync('light-theme.css', lightCss);
fs.writeFileSync('dark-theme.css', darkCss);
```

## Working with CSS Modules

You can use the generated CSS with CSS Modules in various frameworks:

### React Example

```typescript
// theme.ts
import { createContext, /* define tokens... */, createCss } from '@inkline/core';

export const css = createCss({ /* options */ });

// App.tsx
import { css } from './theme';
import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  
  return <div>My App</div>;
};
```

### Vue Example

```typescript
// theme.ts
import { createContext, /* define tokens... */, createCss } from '@inkline/core';

export const css = createCss({ /* options */ });

// App.vue
<script setup>
import { css } from './theme';
import { onMounted, onUnmounted } from 'vue';

let styleElement;
onMounted(() => {
  styleElement = document.createElement('style');
  styleElement.innerHTML = css;
  document.head.appendChild(styleElement);
});

onUnmounted(() => {
  styleElement?.remove();
});
</script>

<template>
  <div>My App</div>
</template>
```

## Advanced: Custom CSS Generation

You can implement custom CSS generation logic:

```typescript
import { createContext } from '@inkline/core';

const context = createContext();
// Define themes and tokens...

// Custom CSS generation
function generateCustomCss() {
  let css = '';
  
  // Process variables
  const theme = context.themes.default;
  css += ':root {\n';
  Object.values(theme.variables).forEach(variable => {
    css += `  --${variable.__name}: ${variable.__value};\n`;
  });
  css += '}\n\n';
  
  // Process selectors
  theme.selectors.forEach(selector => {
    css += `${selector.selector} {\n`;
    Object.entries(selector.properties).forEach(([property, value]) => {
      css += `  ${property}: ${value};\n`;
    });
    css += '}\n\n';
  });
  
  return css;
}
```

## Best Practices

1. **Theme structure**: Plan your theme structure before generating CSS
2. **CSS organization**: Group related selectors together
3. **Minimize duplication**: Share selectors between themes where possible
4. **Performance**: Generate CSS at build time for production
5. **Server-side rendering**: Consider generating CSS server-side for immediate visibility

## Next Steps

- [Advanced Usage](./advanced/README.md): Learn about more complex features
- [Integration](./integration/README.md): See how to integrate with UI libraries
- [API Reference](./api/README.md): Explore the complete API