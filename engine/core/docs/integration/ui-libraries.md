# Integrating with UI Libraries

@inkline/core is designed to work seamlessly with UI component libraries. This guide shows how to integrate it with various UI libraries, with a focus on Inkline's own UI components.

## Integration with @inkline/ui

@inkline/core provides the foundation for @inkline/ui's theming system. Here's how to integrate them:

```typescript
import { createContext, nsvariable, selector, createCss } from '@inkline/core';
import { createInkline } from '@inkline/ui';
import { ref, computed } from 'vue';

// Create a context for your design tokens
const context = createContext();
const options = { context };

// Define your custom variables
const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);
const secondaryColor = nsvariable('color', 'secondary', '#6C757D', options);
const fontFamily = nsvariable('typography', 'font-family', 
  'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', options);

// Generate CSS
const css = createCss(options);

// Create Inkline instance with your custom theme
const inkline = createInkline({
  theme: {
    css, // Provide your custom CSS
    colorMode: 'system' // 'light', 'dark', or 'system'
  }
});
```

## Dynamic Theme Switching

You can implement dynamic theme switching:

```typescript
import { createContext, theme, nsvariable, createCss } from '@inkline/core';
import { createInkline } from '@inkline/ui';
import { ref, computed, watch } from 'vue';

// Create context
const context = createContext();
const options = { context };

// Create themes
theme('light', options);
theme('dark', options);

// Light theme variables
nsvariable('color', 'primary', '#5E9ED6', { ...options, theme: 'light' });
nsvariable('color', 'background', '#ffffff', { ...options, theme: 'light' });
nsvariable('color', 'text', '#333333', { ...options, theme: 'light' });

// Dark theme variables
nsvariable('color', 'primary', '#3D7AB3', { ...options, theme: 'dark' });
nsvariable('color', 'background', '#222222', { ...options, theme: 'dark' });
nsvariable('color', 'text', '#f5f5f5', { ...options, theme: 'dark' });

// Theme state
const currentTheme = ref('light');

// Generate CSS for current theme
const themeCss = computed(() => {
  return createCss({ ...options, themeName: currentTheme.value });
});

// Create Inkline instance with reactive theme
const inkline = createInkline({
  theme: {
    css: themeCss.value
  }
});

// Update theme when it changes
watch(themeCss, (newCss) => {
  inkline.options.theme.css = newCss;
  
  // Update style element
  const styleElement = document.getElementById('inkline-theme') || document.createElement('style');
  styleElement.id = 'inkline-theme';
  styleElement.innerHTML = newCss;
  if (!styleElement.parentNode) {
    document.head.appendChild(styleElement);
  }
});

// Function to toggle theme
function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
}
```

## Customizing Component Styles

You can customize specific component styles:

```typescript
import { selector } from '@inkline/core';

// Customize button styles
selector('.inkline-button', {
  borderRadius: '8px',
  fontWeight: 600,
  transition: 'all 0.3s ease'
}, options);

// Style variants
selector('.inkline-button.-primary', {
  backgroundColor: nsvariable('color', 'primary', '#5E9ED6', options),
  color: '#ffffff'
}, options);

selector('.inkline-button.-secondary', {
  backgroundColor: nsvariable('color', 'secondary', '#6C757D', options),
  color: '#ffffff'
}, options);
```

## Integration with Other UI Libraries

### Vue UI Libraries

```typescript
import { createApp } from 'vue';
import { createContext, createCss } from '@inkline/core';
import SomeUILibrary from 'some-ui-library';

// Create and configure your design tokens
const context = createContext();
// Define your variables...

// Generate CSS
const css = createCss({ context });

// Inject CSS
const styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.head.appendChild(styleElement);

// Create Vue app with UI library
const app = createApp(App);
app.use(SomeUILibrary);
app.mount('#app');
```

### React UI Libraries

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { createContext, createCss } from '@inkline/core';
import { ThemeProvider } from 'some-react-ui-library';

// Create and configure your design tokens
const context = createContext();
// Define your variables...

// Generate CSS
const css = createCss({ context });

// Custom Theme Provider component
const MyThemeProvider = ({ children }) => {
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
    return () => styleElement.remove();
  }, []);
  
  return (
    <ThemeProvider theme={/* your theme config */}>
      {children}
    </ThemeProvider>
  );
};

// Use in your app
ReactDOM.render(
  <MyThemeProvider>
    <App />
  </MyThemeProvider>,
  document.getElementById('root')
);
```

## Server-Side Rendering

For server-side rendering (SSR) applications:

```typescript
// server.js
import { createContext, createCss } from '@inkline/core';

export function renderHead() {
  const context = createContext();
  // Define your variables...
  
  const css = createCss({ context });
  
  return `
    <style id="inkline-theme">
      ${css}
    </style>
  `;
}
```

## Best Practices

1. **Define tokens first**: Create your design tokens before integrating with UI libraries
2. **Use consistent naming**: Follow the UI library's naming conventions for variables
3. **Minimize overrides**: Extend the UI library's theme rather than overriding it
4. **Document customizations**: Keep track of what you've customized
5. **Theme isolation**: Use CSS selectors to isolate themes when needed

## Next Steps

- [Framework Support](./framework-support.md): Learn about integration with specific frameworks
- [Best Practices](../best-practices.md): Discover best practices for design token systems
- [API Reference](../api/README.md): Explore the complete API