# Token Types

@inkline/core provides specialized token types for different design elements. Each token type offers specific functionality tailored to that particular design aspect.

## Overview

Design tokens are the fundamental building blocks of your design system. @inkline/core provides specialized tokens for:

- [Color Tokens](./color.md): Define and manipulate colors
- [Spacing Tokens](./spacing.md): Manage margins, padding, and spacing
- [Typography Tokens](./typography.md): Control text styles and fonts
- [Border Tokens](./border.md): Create consistent border styles
- [Shadow Tokens](./shadow.md): Define box shadows and elevation
- [Transition Tokens](./transition.md): Standardize animation timing
- [Animation Tokens](./animation.md): Create reusable animations

## Common Patterns

While each token type has its own specific features, they all follow common patterns:

### Creation

All token types can be created using the standard variable functions or specialized constructors:

```typescript
// Using standard variable function
const primaryColor = nsvariable('color', 'primary', '#5E9ED6', options);

// Using specialized function
import { color } from '@inkline/core';
const primary = color('#5E9ED6');
```

### Definition

Complex token types can be defined using `define*` functions:

```typescript
import { defineTransition, defineBoxShadow } from '@inkline/core';

// Define a transition token
const buttonTransition = defineTransition({
    property: 'all',
    duration: '300ms',
    timingFunction: 'ease-in-out'
}, options);

// Define a box shadow token
const cardShadow = defineBoxShadow({
    x: '0',
    y: '4px',
    blur: '6px',
    spread: '0',
    color: 'rgba(0, 0, 0, 0.1)'
}, options);
```

### Manipulation

Most token types provide methods for manipulating their values:

```typescript
import { color } from '@inkline/core';

const primary = color('#5E9ED6');

// Manipulate color
const primaryLight = color(primary).lighten(0.2).hex();
```

### Usage in Selectors

All token types are designed to be used in selectors:

```typescript
import { selector } from '@inkline/core';

selector('button', {
    backgroundColor: primaryColor,
    boxShadow: cardShadow,
    transition: buttonTransition
}, options);
```

## Next Steps

Explore each token type in detail:

- [Color Tokens](./color.md): Learn about color manipulation and color systems
- [Spacing Tokens](./spacing.md): Discover how to create consistent spacing scales
- [Typography Tokens](./typography.md): See how to build a type system
- [Border Tokens](./border.md): Learn about border styling tokens
- [Shadow Tokens](./shadow.md): Explore elevation and shadow systems
- [Transition Tokens](./transition.md): Create consistent motion patterns
- [Animation Tokens](./animation.md): Build reusable animations