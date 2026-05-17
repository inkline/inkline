# Utility Functions API

The Utility Functions API provides helper functions for working with design tokens in @inkline/core.

## Overview

@inkline/core includes various utility functions to help you work with design tokens, manipulate values, create CSS output, and more. These utilities make it easier to create and manage a consistent design system.

## CSS Generation Functions

### createCss

Generates CSS from your design tokens.

```typescript
function createCss(options: CssOptions): string;
```

**Parameters**:
- `options`: Options for CSS generation (context, themeName, rootSelector, includeVariables, includeSelectors, pretty)

**Returns**: A string containing the generated CSS

**Example**:

```typescript
import { createContext, variable, selector, createCss } from '@inkline/core';

const context = createContext();
const options = { context };

// Define variables and selectors
const primaryColor = variable('primary-color', '#5E9ED6', options);
selector('button', { backgroundColor: primaryColor }, options);

// Generate CSS
const css = createCss(options);
console.log(css);
```

## Calculation Functions

### calc

Performs calculations with variable values.

```typescript
function calc(
    operand1: TokenValue | Variable<string>,
    operator: string,
    operand2: TokenValue | Variable<string>
): CalcFunction;
```

**Parameters**:
- `operand1`: First operand (value or variable)
- `operator`: Operator ('+', '-', '*', '/')
- `operand2`: Second operand (value or variable)

**Returns**: A CalcFunction object

**Example**:

```typescript
import { createContext, variable, calc, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a base size variable
const spacingBase = variable('spacing-base', '16px', options);

// Create calculations based on the base
const spacingSmall = nsvariable('spacing', 'small', calc(spacingBase, '*', 0.5), options);
const spacingLarge = nsvariable('spacing', 'large', calc(spacingBase, '*', 1.5), options);
```

## Transformation Functions

### toCssName

Converts a camelCase property name to kebab-case CSS property name.

```typescript
function toCssName(propertyName: string): string;
```

**Parameters**:
- `propertyName`: The property name to convert

**Returns**: The CSS property name

**Example**:

```typescript
import { toCssName } from '@inkline/core';

const cssProperty = toCssName('backgroundColor'); // 'background-color'
const anotherProperty = toCssName('borderTopLeftRadius'); // 'border-top-left-radius'
```

### toExportedName

Converts a token name to an exported variable name format.

```typescript
function toExportedName(name: string): string;
```

**Parameters**:
- `name`: The token name to convert

**Returns**: The exported name format

**Example**:

```typescript
import { toExportedName } from '@inkline/core';

const exportedName = toExportedName('color-primary'); // 'colorPrimary'
```

### normalizeTokenName

Normalizes a token name by converting special characters to a standardized format.

```typescript
function normalizeTokenName(name: string): string;
```

**Parameters**:
- `name`: The token name to normalize

**Returns**: The normalized token name

**Example**:

```typescript
import { normalizeTokenName } from '@inkline/core';

const normalizedName = normalizeTokenName('color--primary'); // 'color-primary'
```

## Namespace Functions

### createNamespacedTokenName

Creates a namespaced token name.

```typescript
function createNamespacedTokenName<Namespace extends string, Name extends string>(
    ns: Namespace,
    name: Name
): NamespacedKey<Namespace, Name>;
```

**Parameters**:
- `ns`: The namespace
- `name`: The token name

**Returns**: The namespaced token name

**Example**:

```typescript
import { createNamespacedTokenName } from '@inkline/core';

const namespacedName = createNamespacedTokenName('color', 'primary'); // 'color-primary'
```

### createNamespaceString

Creates a namespace string with appropriate formatting.

```typescript
function createNamespaceString(namespace: string): string;
```

**Parameters**:
- `namespace`: The namespace

**Returns**: The formatted namespace string

**Example**:

```typescript
import { createNamespaceString } from '@inkline/core';

const nsString = createNamespaceString('color'); // 'color'
```

### addVariableNamespace

Adds a namespace to a variable name.

```typescript
function addVariableNamespace(
    name: string,
    namespace: string
): string;
```

**Parameters**:
- `name`: The variable name
- `namespace`: The namespace to add

**Returns**: The namespaced variable name

**Example**:

```typescript
import { addVariableNamespace } from '@inkline/core';

const namespacedVar = addVariableNamespace('primary', 'color'); // 'color-primary'
```

### extractVariableNamespace

Extracts the namespace from a variable name.

```typescript
function extractVariableNamespace(
    name: string
): { namespace: string; name: string } | null;
```

**Parameters**:
- `name`: The variable name

**Returns**: Object containing namespace and name, or null if no namespace

**Example**:

```typescript
import { extractVariableNamespace } from '@inkline/core';

const result = extractVariableNamespace('color-primary');
console.log(result); // { namespace: 'color', name: 'primary' }
```

## Type Guard Functions

### isVariable

Checks if a value is a Variable token.

```typescript
function isVariable(value: any): value is Variable<string>;
```

**Parameters**:
- `value`: The value to check

**Returns**: Boolean indicating if the value is a Variable

**Example**:

```typescript
import { createContext, variable, isVariable } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);

console.log(isVariable(primaryColor)); // true
console.log(isVariable('#5E9ED6')); // false
```

### isRef

Checks if a value is a Reference token.

```typescript
function isRef(value: any): value is Ref;
```

**Parameters**:
- `value`: The value to check

**Returns**: Boolean indicating if the value is a Reference

**Example**:

```typescript
import { createContext, variable, ref, isRef } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);
const buttonColor = variable('button-color', ref(primaryColor), options);

console.log(isRef(ref(primaryColor))); // true
console.log(isRef(primaryColor)); // false
```

### isSelector

Checks if a value is a Selector token.

```typescript
function isSelector(value: any): value is Selector;
```

**Parameters**:
- `value`: The value to check

**Returns**: Boolean indicating if the value is a Selector

**Example**:

```typescript
import { createContext, selector, isSelector } from '@inkline/core';

const context = createContext();
const options = { context };

const buttonSelector = selector('button', { 
    backgroundColor: '#5E9ED6' 
}, options);

console.log(isSelector(buttonSelector)); // true
console.log(isSelector('button')); // false
```

## Value Resolution Functions

### resolveStringPropertyValue

Resolves a property value to a string.

```typescript
function resolveStringPropertyValue(
    value: any,
    options: ResolveOptions
): string;
```

**Parameters**:
- `value`: The value to resolve
- `options`: Resolution options

**Returns**: The resolved string value

**Example**:

```typescript
import { createContext, variable, resolveStringPropertyValue } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);

const resolvedValue = resolveStringPropertyValue(primaryColor, options);
console.log(resolvedValue); // 'var(--primary-color)'
```

### resolveStringColorPropertyValue

Resolves a color property value to a string.

```typescript
function resolveStringColorPropertyValue(
    value: any,
    options: ResolveOptions
): string;
```

**Parameters**:
- `value`: The color value to resolve
- `options`: Resolution options

**Returns**: The resolved color string

**Example**:

```typescript
import { createContext, nsvariable, resolveStringColorPropertyValue, color } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);
const resolvedColor = resolveStringColorPropertyValue(color('#5E9ED6'), options);
console.log(resolvedColor); // '#5E9ED6'
```

## Miscellaneous Functions

### hash

Generates a hash from a string.

```typescript
function hash(str: string): string;
```

**Parameters**:
- `str`: The string to hash

**Returns**: The hashed string

**Example**:

```typescript
import { hash } from '@inkline/core';

const hashValue = hash('some-unique-string');
console.log(hashValue); // 'a8f37d7f'
```

### insertInBetweenElements

Inserts an element between each element of an array.

```typescript
function insertInBetweenElements<T>(arr: T[], element: T): T[];
```

**Parameters**:
- `arr`: The array
- `element`: The element to insert

**Returns**: A new array with the element inserted between each original element

**Example**:

```typescript
import { insertInBetweenElements } from '@inkline/core';

const result = insertInBetweenElements(['a', 'b', 'c'], ',');
console.log(result); // ['a', ',', 'b', ',', 'c']
```

## Usage Patterns

### Working with CSS Generation

Generate CSS with different options:

```typescript
import { createContext, createCss, nsvariable, selector } from '@inkline/core';

const context = createContext();
const options = { context };

// Define variables and selectors
const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);
selector('button', { backgroundColor: primaryColor }, options);

// Generate basic CSS
const css = createCss(options);

// Generate CSS with custom root selector
const cssWithCustomRoot = createCss({ 
    ...options, 
    rootSelector: '.my-app' 
});

// Generate CSS with only variables
const cssVarsOnly = createCss({ 
    ...options, 
    includeSelectors: false 
});

// Generate CSS with only selectors
const cssSelectorsOnly = createCss({ 
    ...options, 
    includeVariables: false 
});

// Generate pretty-printed CSS
const prettyCSS = createCss({ 
    ...options, 
    pretty: true 
});
```

### Using Calculation Functions

Perform calculations with variables:

```typescript
import { createContext, variable, calc, selector } from '@inkline/core';

const context = createContext();
const options = { context };

// Define base variables
const spacingBase = variable('spacing-base', '16px', options);
const fontSizeBase = variable('font-size-base', '16px', options);

// Create calculations
const padding = calc(spacingBase, '*', 1.5);
const margin = calc(spacingBase, '*', 2);
const lineHeight = calc(fontSizeBase, '*', 1.5);

// Use calculations in selectors
selector('p', {
    fontSize: fontSizeBase,
    lineHeight: lineHeight,
    margin: margin
}, options);

selector('.button', {
    padding: `${calc(spacingBase, '*', 0.5)} ${padding}`
}, options);

// Nested calculations
const complexCalc = calc(
    calc(spacingBase, '*', 2),
    '+',
    calc(spacingBase, '*', 0.5)
);
```

### Type Checking

Use type guards to ensure proper token handling:

```typescript
import { createContext, variable, ref, isVariable, isRef } from '@inkline/core';

const context = createContext();
const options = { context };

function processToken(token: any) {
    if (isVariable(token)) {
        console.log(`Variable: ${token.__name}`);
        return `var(--${token.__name})`;
    } else if (isRef(token)) {
        console.log(`Reference to: ${token.__target.__name}`);
        return `var(--${token.__target.__name})`;
    } else {
        console.log(`Raw value: ${token}`);
        return token;
    }
}

const primaryColor = variable('primary-color', '#5E9ED6', options);
const buttonColor = variable('button-color', ref(primaryColor), options);

processToken(primaryColor); // "Variable: primary-color"
processToken(buttonColor); // "Variable: button-color"
processToken(ref(primaryColor)); // "Reference to: primary-color"
processToken('#FF0000'); // "Raw value: #FF0000"
```

## Best Practices

1. **Use appropriate utils**: Choose the right utility function for each task
2. **Leverage calculations**: Use calc for maintaining mathematical relationships
3. **Type checking**: Use type guards to ensure proper token handling
4. **Consistent naming**: Use namespace functions to maintain naming consistency
5. **Resolution helpers**: Use resolution functions to convert tokens to strings
6. **CSS generation options**: Customize CSS output using the available options

## Related APIs

- [Context API](./context.md): Functions for creating contexts
- [Variables API](./variables.md): Functions for creating variables
- [Selectors API](./selectors.md): Functions for creating selectors
- [CSS Generation](../css-generation.md): Generate CSS from your tokens