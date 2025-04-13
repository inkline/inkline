# References

References create connections between variables in your design system. In @inkline/core, references allow you to define relationships that make your design system more maintainable and consistent.

## Creating References

You can create references using the `ref` function:

```typescript
import { createContext, variable, ref } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a primary color variable
const primaryColor = variable('primary-color', '#5E9ED6', options);

// Create a button color that references the primary color
const buttonColor = variable('button-color', ref(primaryColor), options);
```

When used like this, the `buttonColor` variable will always have the same value as `primaryColor`. If `primaryColor` changes, `buttonColor` will automatically reflect that change.

## Transforming Referenced Values

You can transform the value of a reference when creating a variable:

```typescript
import { createContext, variable, ref, color } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a primary color variable
const primaryColor = variable('primary-color', '#5E9ED6', options);

// Create a lighter variant of the primary color
const primaryLightColor = variable('primary-light-color', ref(primaryColor), {
    ...options,
    transform: (value) => color(value.toString()).lighten(0.2).hex()
});

// Create a darker variant of the primary color
const primaryDarkColor = variable('primary-dark-color', ref(primaryColor), {
    ...options,
    transform: (value) => color(value.toString()).darken(0.2).hex()
});
```

Now, if `primaryColor` changes, both `primaryLightColor` and `primaryDarkColor` will update while maintaining their relationships (lighter and darker variants).

## Creating Reference Chains

References can form chains, where variables reference other variables that reference other variables:

```typescript
import { createContext, variable, ref } from '@inkline/core';

const context = createContext();
const options = { context };

// Create base variables
const colorPrimary = variable('color-primary', '#5E9ED6', options);
const fontSizeBase = variable('font-size-base', '16px', options);

// Create references to base variables
const buttonColor = variable('button-color', ref(colorPrimary), options);
const buttonFontSize = variable('button-font-size', ref(fontSizeBase), options);

// Create references to references
const buttonPrimaryColor = variable('button-primary-color', ref(buttonColor), options);
const buttonLargeFont = variable('button-large-font', ref(buttonFontSize), {
    ...options,
    transform: (value) => `calc(${value} * 1.25)`
});
```

In this example, changing `colorPrimary` will cascade to update both `buttonColor` and `buttonPrimaryColor`. Similarly, changing `fontSizeBase` will update both `buttonFontSize` and `buttonLargeFont`.

## Using References in Selectors

References are particularly useful when creating selectors:

```typescript
import { createContext, variable, ref, selector } from '@inkline/core';

const context = createContext();
const options = { context };

// Create base variables
const colorPrimary = variable('color-primary', '#5E9ED6', options);
const spacingBase = variable('spacing-base', '16px', options);

// Create references
const buttonColor = variable('button-color', ref(colorPrimary), options);
const buttonPadding = variable('button-padding', ref(spacingBase), {
    ...options,
    transform: (value) => `calc(${value} * 0.75) calc(${value} * 1.5)`
});

// Use in selectors
selector('.button', {
    backgroundColor: buttonColor,
    padding: buttonPadding,
    borderRadius: '4px',
    border: 'none'
}, options);
```

Now, if you change `colorPrimary` or `spacingBase`, the button styling will automatically update to reflect those changes.

## Combining References with Calculations

You can combine references with calculations to create more complex relationships:

```typescript
import { createContext, variable, ref, calc } from '@inkline/core';

const context = createContext();
const options = { context };

// Create base variables
const spacingBase = variable('spacing-base', '16px', options);

// Create derived spacing variables using calculations
const spacingXs = variable('spacing-xs', calc(ref(spacingBase), '*', 0.25), options);
const spacingSm = variable('spacing-sm', calc(ref(spacingBase), '*', 0.5), options);
const spacingLg = variable('spacing-lg', calc(ref(spacingBase), '*', 1.5), options);
const spacingXl = variable('spacing-xl', calc(ref(spacingBase), '*', 2), options);
```

In this example, all spacing variables are calculated based on `spacingBase`. If you change `spacingBase` from `16px` to `20px`, all the derived spacing values will update proportionally.

## References Across Themes

References can work across themes to maintain relationships:

```typescript
import { createContext, theme, nsvariable, ref } from '@inkline/core';

const context = createContext();
const options = { context };

// Create themes
const lightTheme = theme('light', options);
const darkTheme = theme('dark', options);

// Create light theme variables
const lightPrimary = nsvariable('color', 'primary', '#5E9ED6', { 
    ...options, 
    theme: 'light' 
});

// Create dark theme variables that reference light theme
const darkPrimary = nsvariable('color', 'primary', ref(lightPrimary), { 
    ...options, 
    theme: 'dark',
    transform: (value) => color(value.toString()).darken(0.2).hex()
});
```

This approach ensures that your dark theme colors maintain a consistent relationship with your light theme colors.

## Creating Design Systems with References

References are powerful for creating cohesive design systems:

```typescript
import { createContext, variable, ref, color } from '@inkline/core';

const context = createContext();
const options = { context };

// Create base token
const brandBlue = variable('brand-blue', '#0066cc', options);

// Create a complete color system using references
const colorPrimary = variable('color-primary', ref(brandBlue), options);
const colorSecondary = variable('color-secondary', ref(brandBlue), {
    ...options,
    transform: (value) => color(value.toString()).setHue(color(value.toString()).hue() + 20).hex()
});

// Create intent-based colors
const colorSuccess = variable('color-success', '#28a745', options);
const colorInfo = variable('color-info', ref(brandBlue), options);
const colorWarning = variable('color-warning', '#ffc107', options);
const colorDanger = variable('color-danger', '#dc3545', options);

// Create scales for each color
function createColorScale(baseVar, name) {
    return {
        50: variable(`${name}-50`, ref(baseVar), {
            ...options,
            transform: (value) => color(value.toString()).lighten(0.4).hex()
        }),
        100: variable(`${name}-100`, ref(baseVar), {
            ...options,
            transform: (value) => color(value.toString()).lighten(0.3).hex()
        }),
        // ... more scale values
        900: variable(`${name}-900`, ref(baseVar), {
            ...options,
            transform: (value) => color(value.toString()).darken(0.3).hex()
        })
    };
}

const primaryScale = createColorScale(colorPrimary, 'primary');
const secondaryScale = createColorScale(colorSecondary, 'secondary');
const successScale = createColorScale(colorSuccess, 'success');
```

With this approach, changing the base `brandBlue` token will cascade through the entire design system, updating all derived colors while maintaining their relationships.

## Best Practices

1. **Use references for related values**: Connect values that should change together
2. **Create a clear hierarchy**: Design a hierarchical structure of base tokens and derived ones
3. **Document references**: Keep track of reference relationships in your design system
4. **Avoid circular references**: Ensure references don't form circular dependencies
5. **Use meaningful transformations**: When transforming referenced values, use meaningful operations
6. **Keep it maintainable**: Don't create overly complex reference chains

## Next Steps

- [Variables](./variables.md): Learn more about creating and using variables
- [Selectors](./selectors.md): See how to use references in CSS selectors
- [Themes](./themes.md): Organize variables with references into themes