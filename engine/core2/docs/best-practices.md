# Best Practices

This guide outlines best practices for using @inkline/core to create maintainable, consistent, and scalable design systems.

## Design Token Structure

### 1. Establish a Clear Hierarchy

Create a clear hierarchy of design tokens:

1. **Global tokens**: Foundation level values (primary colors, base spacing)
2. **Semantic tokens**: Purpose-driven tokens (text color, button color)
3. **Component tokens**: Component-specific tokens (button padding, card border)

```typescript
// 1. Global tokens
const colorBlue500 = nsvariable('color', 'blue-500', '#0066cc', options);
const spacingBase = nsvariable('spacing', 'base', '16px', options);

// 2. Semantic tokens
const colorPrimary = nsvariable('color', 'primary', ref(colorBlue500), options);
const spacingContent = nsvariable('spacing', 'content', ref(spacingBase), options);

// 3. Component tokens
const buttonPadding = nsvariable('button', 'padding', 
  `${calc(spacingBase, '*', 0.5)} ${calc(spacingBase, '*', 1)}`, options);
const cardBorderRadius = nsvariable('card', 'border-radius', '4px', options);
```

### 2. Use Consistent Naming Conventions

Adopt a consistent naming pattern:

```typescript
// Pattern: [namespace]-[concept]-[property]-[variant]

// Color tokens
nsvariable('color', 'primary', '#0066cc', options);
nsvariable('color', 'primary-light', '#4d94db', options);
nsvariable('color', 'primary-dark', '#004c99', options);

// Spacing tokens
nsvariable('spacing', 'xs', '4px', options);
nsvariable('spacing', 'sm', '8px', options);
nsvariable('spacing', 'md', '16px', options);

// Component tokens
nsvariable('button', 'padding-sm', '4px 8px', options);
nsvariable('button', 'padding-md', '8px 16px', options);
nsvariable('button', 'padding-lg', '12px 24px', options);
```

### 3. Create Mathematical Relationships

Use calculations to create meaningful relationships:

```typescript
const spacingBase = nsvariable('spacing', 'base', '16px', options);

// Geometric scale (1.5x ratio)
const spacingXs = nsvariable('spacing', 'xs', calc(spacingBase, '/', 2.25), options);
const spacingSm = nsvariable('spacing', 'sm', calc(spacingBase, '/', 1.5), options);
const spacingMd = nsvariable('spacing', 'md', spacingBase, options);
const spacingLg = nsvariable('spacing', 'lg', calc(spacingBase, '*', 1.5), options);
const spacingXl = nsvariable('spacing', 'xl', calc(spacingBase, '*', 2.25), options);
```

## Organization

### 1. Structure Files by Domain

Organize your design system files by domain:

```
src/
  tokens/
    global/
      colors.ts     # Base color values
      spacing.ts    # Base spacing values
      typography.ts # Base typography values
    semantic/
      colors.ts     # Semantic color assignments
      spacing.ts    # Semantic spacing assignments
    components/
      button.ts     # Button-specific tokens
      card.ts       # Card-specific tokens
    themes/
      light.ts      # Light theme overrides
      dark.ts       # Dark theme overrides
    index.ts        # Main exports
```

### 2. Share Context Across Files

Create and share a single context:

```typescript
// context.ts
import { createContext } from '@inkline/core';

export const context = createContext();
export const options = { context };

// colors.ts
import { nsvariable } from '@inkline/core';
import { options } from './context';

export const colorPrimary = nsvariable('color', 'primary', '#0066cc', options);
```

### 3. Document Intent and Usage

Document the purpose of your tokens:

```typescript
/**
 * Primary brand color
 * Use for primary buttons, active states, and links
 */
export const colorPrimary = nsvariable('color', 'primary', '#0066cc', options);

/**
 * Base spacing unit (16px)
 * All spacing values should be derived from this
 */
export const spacingBase = nsvariable('spacing', 'base', '16px', options);
```

## Theming

### 1. Create Theme Variations

Organize token variations by theme:

```typescript
// Define tokens in the light theme
nsvariable('color', 'primary', '#0066cc', { ...options, theme: 'light' });
nsvariable('color', 'background', '#ffffff', { ...options, theme: 'light' });
nsvariable('color', 'text', '#333333', { ...options, theme: 'light' });

// Define tokens in the dark theme
nsvariable('color', 'primary', '#4d94db', { ...options, theme: 'dark' });
nsvariable('color', 'background', '#121212', { ...options, theme: 'dark' });
nsvariable('color', 'text', '#f5f5f5', { ...options, theme: 'dark' });
```

### 2. Maintain Theme Consistency

Keep the same token names across themes:

```typescript
// Use the same token names with different values per theme
const themes = ['light', 'dark'];

themes.forEach(themeName => {
    nsvariable('color', 'primary', 
        themeName === 'light' ? '#0066cc' : '#4d94db', 
        { ...options, theme: themeName }
    );
    
    nsvariable('color', 'background', 
        themeName === 'light' ? '#ffffff' : '#121212', 
        { ...options, theme: themeName }
    );
    
    nsvariable('color', 'text', 
        themeName === 'light' ? '#333333' : '#f5f5f5', 
        { ...options, theme: themeName }
    );
});
```

### 3. Limit Theme-Specific Logic

Minimize theme-specific branching in your code:

```typescript
// Avoid this pattern in components
const buttonColor = theme === 'dark' ? darkButtonColor : lightButtonColor;

// Instead, use theme-specific variables and selectors
selector('.button', {
    backgroundColor: nsvariable('color', 'primary', '#0066cc', options)
}, options);
```

## References

### 1. Create Meaningful References

Use references to create semantic relationships:

```typescript
// Base color
const brandBlue = nsvariable('color', 'brand-blue', '#0066cc', options);

// Semantic references
const colorPrimary = nsvariable('color', 'primary', ref(brandBlue), options);
const colorLink = nsvariable('color', 'link', ref(brandBlue), options);

// If brandBlue changes, both colorPrimary and colorLink will update
```

### 2. Transform References Consistently

Apply consistent transformations to references:

```typescript
// Base color
const colorPrimary = nsvariable('color', 'primary', '#0066cc', options);

// Create a consistent pattern of variations
const colorPrimaryLight = nsvariable('color', 'primary-light', ref(colorPrimary), {
    ...options,
    transform: (value) => color(value.toString()).lighten(0.2).hex()
});

const colorPrimaryDark = nsvariable('color', 'primary-dark', ref(colorPrimary), {
    ...options,
    transform: (value) => color(value.toString()).darken(0.2).hex()
});
```

### 3. Avoid Circular References

Prevent circular dependencies in references:

```typescript
// This will cause problems
const tokenA = variable('token-a', ref(tokenB), options);
const tokenB = variable('token-b', ref(tokenA), options);

// Instead, establish a clear parent-child relationship
const tokenA = variable('token-a', '#0066cc', options);
const tokenB = variable('token-b', ref(tokenA), options);
```

## CSS Generation

### 1. Generate CSS at Build Time

For better performance, generate CSS at build time:

```typescript
// build-css.js
import fs from 'fs';
import { createContext, createCss } from './tokens';

const context = createContext();
// Define tokens...

// Generate CSS for different themes
const lightCSS = createCss({ context, themeName: 'light' });
const darkCSS = createCss({ context, themeName: 'dark' });

// Write to files
fs.writeFileSync('dist/light-theme.css', lightCSS);
fs.writeFileSync('dist/dark-theme.css', darkCSS);
```

### 2. Organize Output Files

Structure CSS output logically:

```typescript
// Generate base variables only
const variables = createCss({
    context,
    includeSelectors: false
});

// Generate utility classes
const utilities = createCss({
    context,
    includeVariables: false,
    themeName: 'default'
});

// Generate component styles
const components = createCss({
    context,
    includeVariables: false,
    themeName: 'default'
});

// Write to separate files
fs.writeFileSync('dist/variables.css', variables);
fs.writeFileSync('dist/utilities.css', utilities);
fs.writeFileSync('dist/components.css', components);
```

### 3. Consider Media Queries

Use media queries for responsive design:

```typescript
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

## Component Design

### 1. Create Component-Specific Tokens

Encapsulate component styling with specific tokens:

```typescript
// Button component tokens
const buttonPadding = nsvariable('button', 'padding', '8px 16px', options);
const buttonBorderRadius = nsvariable('button', 'border-radius', '4px', options);
const buttonFontSize = nsvariable('button', 'font-size', '16px', options);

// Button variations
const buttonPrimarySm = nsvariable('button-primary', 'sm-padding', '4px 8px', options);
const buttonPrimaryMd = nsvariable('button-primary', 'md-padding', '8px 16px', options);
const buttonPrimaryLg = nsvariable('button-primary', 'lg-padding', '12px 24px', options);

// Apply to selectors
selector('.button', {
    padding: buttonPadding,
    borderRadius: buttonBorderRadius,
    fontSize: buttonFontSize
}, options);
```

### 2. Create Design Patterns

Establish reusable design patterns:

```typescript
// Create a shadow system
function createShadow(elevation) {
    const shadowMap = {
        1: '0 1px 2px rgba(0, 0, 0, 0.05)',
        2: '0 2px 4px rgba(0, 0, 0, 0.1)',
        3: '0 4px 8px rgba(0, 0, 0, 0.15)',
        4: '0 8px 16px rgba(0, 0, 0, 0.2)',
        5: '0 16px 32px rgba(0, 0, 0, 0.25)'
    };
    
    return nsvariable('shadow', `elevation-${elevation}`, shadowMap[elevation], options);
}

// Create shadows for different elevations
const shadowLow = createShadow(1);
const shadowMedium = createShadow(3);
const shadowHigh = createShadow(5);
```

### 3. Support Accessibility

Ensure tokens support accessible design:

```typescript
// Check color contrast
function ensureAccessibleColor(bgColor, textColor) {
    const bg = color(bgColor);
    const text = color(textColor);
    const contrast = bg.contrast(text);
    
    // WCAG AA requires 4.5:1 for normal text
    if (contrast < 4.5) {
        console.warn(`Contrast ratio ${contrast} is below 4.5:1 for ${bgColor} and ${textColor}`);
        
        // Suggest alternative
        const black = color('#000000');
        const white = color('#FFFFFF');
        const blackContrast = bg.contrast(black);
        const whiteContrast = bg.contrast(white);
        
        return blackContrast > whiteContrast ? '#000000' : '#FFFFFF';
    }
    
    return textColor;
}

// Use for text colors
const backgroundColor = nsvariable('color', 'primary', '#0066cc', options);
const textColor = nsvariable('color', 'primary-text', 
    ensureAccessibleColor('#0066cc', '#ffffff'), options);
```

## Performance

### 1. Minimize Token Count

Keep your token set manageable:

```typescript
// Instead of creating dozens of one-off tokens
nsvariable('spacing', 'header-top', '24px', options);
nsvariable('spacing', 'header-right', '32px', options);
nsvariable('spacing', 'header-bottom', '24px', options);
nsvariable('spacing', 'header-left', '32px', options);

// Create a scale and use combinations
nsvariable('spacing', 'md', '24px', options);
nsvariable('spacing', 'lg', '32px', options);

selector('.header', {
    paddingTop: nsvariable('spacing', 'md', '24px', options),
    paddingRight: nsvariable('spacing', 'lg', '32px', options),
    paddingBottom: nsvariable('spacing', 'md', '24px', options),
    paddingLeft: nsvariable('spacing', 'lg', '32px', options)
}, options);
```

### 2. Batch Operations

Group related operations:

```typescript
// Define a color palette in one batch
function createColorPalette(baseColor, name) {
    const base = color(baseColor);
    
    return {
        50: nsvariable(name, '50', base.lighten(0.4).hex(), options),
        100: nsvariable(name, '100', base.lighten(0.3).hex(), options),
        200: nsvariable(name, '200', base.lighten(0.2).hex(), options),
        300: nsvariable(name, '300', base.lighten(0.1).hex(), options),
        400: nsvariable(name, '400', base.lighten(0.05).hex(), options),
        500: nsvariable(name, '500', base.hex(), options),
        600: nsvariable(name, '600', base.darken(0.05).hex(), options),
        700: nsvariable(name, '700', base.darken(0.1).hex(), options),
        800: nsvariable(name, '800', base.darken(0.2).hex(), options),
        900: nsvariable(name, '900', base.darken(0.3).hex(), options)
    };
}

// Create multiple palettes
const primaryPalette = createColorPalette('#0066cc', 'primary');
const successPalette = createColorPalette('#28a745', 'success');
const dangerPalette = createColorPalette('#dc3545', 'danger');
```

### 3. Optimize CSS Output

Generate optimized CSS:

```typescript
// Separate core variables (unlikely to change) from theme variables
const coreVariables = createCss({
    context,
    includeSelectors: false,
    rootSelector: ':root',
    themeName: 'default'
});

// Theme-specific variables
const lightThemeVariables = createCss({
    context,
    includeSelectors: false,
    rootSelector: '.theme-light',
    themeName: 'light'
});

const darkThemeVariables = createCss({
    context,
    includeSelectors: false,
    rootSelector: '.theme-dark',
    themeName: 'dark'
});
```

## Collaboration

### 1. Document the System

Document your design system:

```typescript
/**
 * @inkline/tokens
 * 
 * Design tokens for the Inkline design system
 * 
 * Usage:
 * - Import tokens directly: import { colorPrimary } from '@inkline/tokens'
 * - Import CSS: import '@inkline/tokens/css/light.css'
 * 
 * Token structure:
 * - Global: Raw values (colors, spacing, etc.)
 * - Semantic: Purpose-based tokens (primary, danger, etc.)
 * - Component: Component-specific tokens
 */

// Export public API
export { 
    // Colors
    colorPrimary, colorSecondary, colorSuccess, colorDanger,
    
    // Spacing
    spacingXs, spacingSm, spacingMd, spacingLg, spacingXl,
    
    // Typography
    fontFamilyBase, fontSizeBase, fontWeightNormal, fontWeightBold,
    
    // Component tokens
    buttonPadding, buttonBorderRadius, buttonFontWeight
};
```

### 2. Version Control

Manage versions carefully:

```typescript
/**
 * @version 2.0.0
 * 
 * BREAKING CHANGES:
 * - Renamed 'color-primary' to 'color-brand-primary'
 * - Changed base spacing from 16px to 8px
 * 
 * ADDITIONS:
 * - Added shadow tokens
 * - Added animation tokens
 */
```

### 3. Provide Migration Paths

Help users upgrade:

```typescript
// Maintain backwards compatibility
export const colorPrimary = nsvariable('color', 'primary', '#0066cc', options);

// New name
export const colorBrandPrimary = nsvariable('color', 'brand-primary', '#0066cc', options);

// Deprecation notice
/**
 * @deprecated Use colorBrandPrimary instead
 */
export const colorPrimary;
```

## Documentation

Include examples of how to generate comprehensive documentation for your design system:

```typescript
/**
 * Primary Color
 * 
 * Our main brand color, used for primary actions, 
 * links, and active states.
 * 
 * Value: #0066cc
 * 
 * Usage:
 * - Primary buttons
 * - Active states
 * - Links
 * - Primary indicators
 * 
 * @type {Variable<string>}
 */
export const colorPrimary = nsvariable('color', 'primary', '#0066cc', options);
```

Generate token documentation:

```typescript
// Extract documentation from tokens
function generateTokenDocs(tokens) {
    return Object.entries(tokens).map(([name, token]) => {
        const comments = extractJSDocComments(token);
        return {
            name,
            value: token.__value,
            description: comments.description,
            usage: comments.usage,
            type: comments.type
        };
    });
}

// Output as JSON or Markdown
const docs = generateTokenDocs(exportedTokens);
fs.writeFileSync('docs/tokens.json', JSON.stringify(docs, null, 2));
```