# Variables API

The Variables API provides functions for creating and managing design token variables in @inkline/core.

## Overview

Variables are the fundamental building blocks of your design system, representing values like colors, spacing, typography, and more. The Variables API allows you to create, manipulate, and access these variables.

## Functions

### variable

Creates a basic variable token.

```typescript
function variable<Name extends string = string>(
    name: Name,
    value: TokenValue,
    options: VariableOptions
): Variable<Name>;
```

**Parameters**:
- `name`: The name of the variable
- `value`: The value of the variable
- `options`: Options for the variable (context, theme, register, default, transform)

**Returns**: A Variable token object

**Example**:

```typescript
import { createContext, variable } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);
```

### nsvariable

Creates a namespaced variable token, which helps with organization.

```typescript
function nsvariable<Namespace extends NamespaceType, Name extends string>(
    ns: Namespace,
    nameOrInstance: Variable<Name> | Name,
    value: TokenValue,
    options: VariablesOptions
): Variable<NamespacedKey<Namespace, Name>>;
```

**Parameters**:
- `ns`: The namespace (e.g., 'color', 'spacing')
- `nameOrInstance`: The variable name or an existing variable instance
- `value`: The value of the variable
- `options`: Options for the variable

**Returns**: A namespaced Variable token object

**Example**:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);
// Creates a variable named 'color-primary'
```

### set

Sets a variable's value.

```typescript
function set<Name extends string>(
    instance: Variable<Name>, 
    value: TokenValue
): void;
```

**Parameters**:
- `instance`: The variable to update
- `value`: The new value to set

**Example**:

```typescript
import { createContext, variable, set } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);

// Update the variable value
set(primaryColor, '#4A89DC');
```

### valueOf

Returns the value of a variable.

```typescript
function valueOf<Name extends string>(
    instance: Variable<Name>
): TokenValue;
```

**Parameters**:
- `instance`: The variable to get the value from

**Returns**: The value of the variable

**Example**:

```typescript
import { createContext, variable, valueOf } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);
const value = valueOf(primaryColor); // '#5E9ED6'
```

### toVariableKey

Returns the CSS variable name for a variable.

```typescript
function toVariableKey<Name extends string>(
    instance: Variable<Name>
): string;
```

**Parameters**:
- `instance`: The variable to get the CSS variable name for

**Returns**: The CSS variable name (e.g., '--primary-color')

**Example**:

```typescript
import { createContext, variable, toVariableKey } from '@inkline/core';

const context = createContext();
const options = { context };

const primaryColor = variable('primary-color', '#5E9ED6', options);
const cssVar = toVariableKey(primaryColor); // '--primary-color'
```

## Interfaces

### Variable

The Variable interface defines the structure of a variable token.

```typescript
interface Variable<Name extends string = string> {
    __type: TokenType.Variable;
    __name: Name;
    __value: TokenValue;
}
```

### VariableOptions

The VariableOptions interface defines the options for creating variables.

```typescript
interface VariableOptions extends DefinitionOptions {
    register?: boolean;   // Whether to register the variable in the theme (default: true)
    default?: boolean;    // Whether to use the existing value if already defined (default: false)
    transform?: (value: TokenValue) => TokenValue;  // Transform function for the value
}
```

### TokenValue

The TokenValue type defines the possible values for a variable.

```typescript
type TokenValue = string | number | boolean | Variable<string> | TokenValue[];
```

## Usage Patterns

### Basic Variables

Creating simple variables:

```typescript
import { createContext, variable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create variables with different types of values
const primaryColor = variable('primary-color', '#5E9ED6', options);
const fontSize = variable('font-size', '16px', options);
const gridColumns = variable('grid-columns', 12, options);
const isRounded = variable('is-rounded', true, options);
```

### Namespaced Variables

Organizing variables with namespaces:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create namespaced variables for better organization
const colorPrimary = nsvariable('color', 'primary', '#5E9ED6', options);
const colorSecondary = nsvariable('color', 'secondary', '#6C757D', options);
const colorSuccess = nsvariable('color', 'success', '#28a745', options);

const spacingBase = nsvariable('spacing', 'base', '16px', options);
const spacingSm = nsvariable('spacing', 'sm', '8px', options);
const spacingLg = nsvariable('spacing', 'lg', '24px', options);

const fontSizeBase = nsvariable('typography', 'font-size-base', '16px', options);
```

### Variable Transformations

Applying transformations to variable values:

```typescript
import { createContext, nsvariable, color } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a primary color
const colorPrimary = nsvariable('color', 'primary', '#5E9ED6', options);

// Create a lighter variant with transform
const colorPrimaryLight = nsvariable('color', 'primary-light', '#5E9ED6', {
    ...options,
    transform: (value) => color(value.toString()).lighten(0.2).hex()
});

// Create a darker variant with transform
const colorPrimaryDark = nsvariable('color', 'primary-dark', '#5E9ED6', {
    ...options,
    transform: (value) => color(value.toString()).darken(0.2).hex()
});
```

### Variables in Different Themes

Creating the same variable in different themes:

```typescript
import { createContext, theme, nsvariable } from '@inkline/core';

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

// Create dark theme variables
const darkPrimary = nsvariable('color', 'primary', '#3D7AB3', { 
    ...options, 
    theme: 'dark' 
});
```

### Default Variable Values

Using default values for variables:

```typescript
import { createContext, variable } from '@inkline/core';

const context = createContext();
const options = { context };

// Create a variable
variable('primary-color', '#5E9ED6', options);

// Try to create it again with a different value, but with default: true
// This will not override the existing value
variable('primary-color', '#4A89DC', { ...options, default: true });
```

## Best Practices

1. **Use namespaces**: Organize variables by type (color, spacing, etc.)
2. **Follow naming conventions**: Be consistent in how you name variables
3. **Document variables**: Make variable purpose clear from its name
4. **Create relationships**: Use references to connect related variables
5. **Think in systems**: Design variables as part of a cohesive system

## Related APIs

- [References API](./references.md): Functions for creating relationships between variables
- [Themes API](./themes.md): Functions for organizing variables into themes
- [Selectors API](./selectors.md): Functions for using variables in CSS rules
- [Colors API](./colors.md): Specialized functions for color variables