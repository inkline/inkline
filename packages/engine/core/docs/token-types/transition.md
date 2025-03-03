# Transition Tokens

Transition tokens help create consistent motion patterns across your UI components. @inkline/core provides specialized functions for defining transitions to ensure your animations are predictable and cohesive.

## Creating Basic Transition Tokens

Define the core transition properties:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Transition durations
const durationFast = nsvariable('transition', 'duration-fast', '150ms', options);
const durationDefault = nsvariable('transition', 'duration-default', '250ms', options);
const durationSlow = nsvariable('transition', 'duration-slow', '400ms', options);

// Transition timing functions
const timingEaseIn = nsvariable('transition', 'timing-ease-in', 'ease-in', options);
const timingEaseOut = nsvariable('transition', 'timing-ease-out', 'ease-out', options);
const timingEaseInOut = nsvariable('transition', 'timing-ease-in-out', 'ease-in-out', options);
const timingLinear = nsvariable('transition', 'timing-linear', 'linear', options);

// Common transition properties
const transitionAll = nsvariable('transition', 'property-all', 'all', options);
const transitionOpacity = nsvariable('transition', 'property-opacity', 'opacity', options);
const transitionTransform = nsvariable('transition', 'property-transform', 'transform', options);
const transitionColors = nsvariable('transition', 'property-colors', 'background-color, border-color, color, fill, stroke', options);
```

## Defining Transition Tokens

@inkline/core provides a `defineTransition` function for creating complete transition definitions:

```typescript
import { defineTransition } from '@inkline/core';

// Define a simple transition
const defaultTransition = defineTransition('all 250ms ease-in-out', options);

// Define a transition with individual properties
const buttonTransition = defineTransition({
    property: 'all',
    duration: '250ms',
    timingFunction: 'ease-in-out',
    delay: '0ms'
}, options);

// Define multiple transitions
const complexTransition = defineTransition([
    {
        property: 'transform',
        duration: '300ms',
        timingFunction: 'ease-out'
    },
    {
        property: 'opacity',
        duration: '200ms',
        timingFunction: 'linear'
    }
], options);
```

## Creating a Transition System

Define a system of transitions for different interaction types:

```typescript
import { defineTransition, nsvariable } from '@inkline/core';

// Base duration and easing
const durationBase = nsvariable('transition', 'duration-base', '250ms', options);
const easingStandard = nsvariable('transition', 'easing-standard', 'ease-in-out', options);

// Create a system of transitions for different purposes
const transitions = {
    // Button transitions
    button: defineTransition(`all ${durationBase} ${easingStandard}`, options),
    
    // Fade transitions
    fade: defineTransition({
        property: 'opacity',
        duration: durationBase,
        timingFunction: easingStandard
    }, options),
    
    // Expand/collapse transitions
    expand: defineTransition([
        {
            property: 'height',
            duration: durationBase,
            timingFunction: easingStandard
        },
        {
            property: 'opacity',
            duration: durationBase,
            timingFunction: easingStandard
        }
    ], options),
    
    // Transform transitions
    transform: defineTransition({
        property: 'transform',
        duration: durationBase,
        timingFunction: easingStandard
    }, options),
    
    // Color transitions
    color: defineTransition({
        property: 'background-color, border-color, color',
        duration: durationBase,
        timingFunction: easingStandard
    }, options)
};

// Store as variables
Object.entries(transitions).forEach(([key, value]) => {
    nsvariable('transition', key, value, options);
});
```

## Using Transition Tokens in Selectors

Apply transition tokens to CSS selectors:

```typescript
import { selector, nsvariable, defineTransition } from '@inkline/core';

// Define transition variables
const buttonTransition = defineTransition('all 250ms ease-in-out', options);
const fadeTransition = defineTransition('opacity 200ms ease', options);
const transformTransition = defineTransition('transform 300ms ease-out', options);

// Use in selectors
selector('.button', {
    transition: buttonTransition,
    backgroundColor: '#5E9ED6',
    color: '#ffffff',
    
    '&:hover': {
        backgroundColor: '#4A89DC'
    }
}, options);

selector('.modal', {
    opacity: 0,
    transform: 'translateY(-20px)',
    transition: transformTransition,
    
    '&.is-open': {
        opacity: 1,
        transform: 'translateY(0)'
    }
}, options);

selector('.fade', {
    opacity: 0,
    transition: fadeTransition,
    
    '&.in': {
        opacity: 1
    }
}, options);
```

## Speed-Based Transition System

Create a system based on transition speeds:

```typescript
import { defineTransition, nsvariable } from '@inkline/core';

// Define speed-based durations
const speedVeryFast = nsvariable('transition', 'speed-very-fast', '100ms', options);
const speedFast = nsvariable('transition', 'speed-fast', '150ms', options);
const speedNormal = nsvariable('transition', 'speed-normal', '250ms', options);
const speedSlow = nsvariable('transition', 'speed-slow', '350ms', options);
const speedVerySlow = nsvariable('transition', 'speed-very-slow', '500ms', options);

// Create transitions for different speeds
const transitionVeryFast = defineTransition(`all ${speedVeryFast} ease-in-out`, options);
const transitionFast = defineTransition(`all ${speedFast} ease-in-out`, options);
const transitionNormal = defineTransition(`all ${speedNormal} ease-in-out`, options);
const transitionSlow = defineTransition(`all ${speedSlow} ease-in-out`, options);
const transitionVerySlow = defineTransition(`all ${speedVerySlow} ease-in-out`, options);

// Use with selectors
selector('.button-speed-normal', {
    transition: transitionNormal,
    // Other properties...
}, options);

selector('.button-speed-fast', {
    transition: transitionFast,
    // Other properties...
}, options);
```

## Creating Custom Timing Functions

Define custom easing curves for more refined transitions:

```typescript
import { nsvariable } from '@inkline/core';

// Cubic Bezier timing functions
const easeInQuad = nsvariable('transition', 'ease-in-quad', 'cubic-bezier(0.55, 0.085, 0.68, 0.53)', options);
const easeOutQuad = nsvariable('transition', 'ease-out-quad', 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', options);
const easeInOutQuad = nsvariable('transition', 'ease-in-out-quad', 'cubic-bezier(0.455, 0.03, 0.515, 0.955)', options);

const easeInCubic = nsvariable('transition', 'ease-in-cubic', 'cubic-bezier(0.55, 0.055, 0.675, 0.19)', options);
const easeOutCubic = nsvariable('transition', 'ease-out-cubic', 'cubic-bezier(0.215, 0.61, 0.355, 1)', options);
const easeInOutCubic = nsvariable('transition', 'ease-in-out-cubic', 'cubic-bezier(0.645, 0.045, 0.355, 1)', options);

// Advanced easing curves
const easeInBack = nsvariable('transition', 'ease-in-back', 'cubic-bezier(0.6, -0.28, 0.735, 0.045)', options);
const easeOutBack = nsvariable('transition', 'ease-out-back', 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', options);
const easeInOutBack = nsvariable('transition', 'ease-in-out-back', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', options);

// Use with transitions
const advancedTransition = defineTransition({
    property: 'transform',
    duration: '300ms',
    timingFunction: easeOutBack
}, options);
```

## Transition Presets for Common Interactions

Create transition presets for common UI interactions:

```typescript
import { defineTransition } from '@inkline/core';

// Button interaction transition
const buttonInteractionTransition = defineTransition({
    property: 'background-color, border-color, color, box-shadow',
    duration: '200ms',
    timingFunction: 'ease-out'
}, options);

// Modal/dialog transition
const modalTransition = defineTransition([
    {
        property: 'opacity',
        duration: '150ms',
        timingFunction: 'ease'
    },
    {
        property: 'transform',
        duration: '300ms',
        timingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // ease-out-quad
    }
], options);

// Dropdown/menu transition
const dropdownTransition = defineTransition([
    {
        property: 'opacity',
        duration: '100ms',
        timingFunction: 'ease'
    },
    {
        property: 'transform',
        duration: '200ms',
        timingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // ease-out-quad
    }
], options);

// Tooltip transition
const tooltipTransition = defineTransition({
    property: 'opacity, transform',
    duration: '150ms',
    timingFunction: 'ease-out'
}, options);

// Page transition
const pageTransition = defineTransition({
    property: 'opacity',
    duration: '300ms',
    timingFunction: 'ease'
}, options);
```

## Best Practices

1. **Consistent durations**: Use a limited set of transition durations
2. **Purposeful timing functions**: Choose timing functions that match the type of motion
3. **Property-specific durations**: Consider using different durations for different properties
4. **Motion hierarchy**: Create a hierarchy with faster transitions for smaller elements
5. **Subtle is better**: Avoid excessive or distracting transitions
6. **Accessibility considerations**: Respect user preferences for reduced motion
7. **Transition proper properties**: Not all CSS properties animate well; focus on transform and opacity for better performance

## Respecting User Preferences

Support users who prefer reduced motion:

```typescript
import { atRule, selector } from '@inkline/core';

// Default transitions
selector('.button', {
    transition: 'all 250ms ease-in-out'
}, options);

// Create a media query for reduced motion preference
atRule('@media (prefers-reduced-motion: reduce)', [
    selector('*', {
        transition: 'none !important',
        animation: 'none !important'
    }, options)
], options);
```

## Next Steps

- [Animation Tokens](./animation.md): Explore keyframe animation tokens
- [Color Tokens](./color.md): See how to create color tokens
- [API Reference](../api/variables.md): See the complete API for transition tokens