# Animation Tokens

Animation tokens help create consistent motion effects across your UI. @inkline/core provides specialized functions for defining keyframe animations to create engaging user experiences.

## Creating Basic Animation Tokens

Define the core animation properties:

```typescript
import { createContext, nsvariable } from '@inkline/core';

const context = createContext();
const options = { context };

// Animation durations
const durationFast = nsvariable('animation', 'duration-fast', '300ms', options);
const durationDefault = nsvariable('animation', 'duration-default', '500ms', options);
const durationSlow = nsvariable('animation', 'duration-slow', '800ms', options);

// Animation timing functions
const timingEaseIn = nsvariable('animation', 'timing-ease-in', 'ease-in', options);
const timingEaseOut = nsvariable('animation', 'timing-ease-out', 'ease-out', options);
const timingEaseInOut = nsvariable('animation', 'timing-ease-in-out', 'ease-in-out', options);
const timingLinear = nsvariable('animation', 'timing-linear', 'linear', options);

// Animation iterations
const iterationInfinite = nsvariable('animation', 'iteration-infinite', 'infinite', options);
const iterationOnce = nsvariable('animation', 'iteration-once', '1', options);
const iterationTwice = nsvariable('animation', 'iteration-twice', '2', options);
```

## Defining Animation Tokens

@inkline/core provides a `defineAnimation` function for creating complete animation definitions:

```typescript
import { defineAnimation, atRule, selector } from '@inkline/core';

// First, define keyframes
atRule('@keyframes fadeIn', [
    selector('from', {
        opacity: 0
    }, options),
    selector('to', {
        opacity: 1
    }, options)
], options);

// Then, define the animation
const fadeInAnimation = defineAnimation({
    name: 'fadeIn',
    duration: '500ms',
    timingFunction: 'ease',
    delay: '0ms',
    iterationCount: '1',
    direction: 'normal',
    fillMode: 'forwards'
}, options);

// Define a simple animation with just a string
const pulseAnimation = defineAnimation('pulse 2s infinite ease-in-out', options);

// Define an animation with multiple properties
const slideInAnimation = defineAnimation({
    name: 'slideIn',
    duration: '300ms',
    timingFunction: 'ease-out',
    fillMode: 'forwards'
}, options);
```

## Creating Keyframe Animations

Define keyframe animations for common UI patterns:

```typescript
import { atRule, selector, defineAnimation } from '@inkline/core';

// Fade in animation
atRule('@keyframes fadeIn', [
    selector('from', {
        opacity: 0
    }, options),
    selector('to', {
        opacity: 1
    }, options)
], options);

// Fade in animation definition
const fadeInAnimation = defineAnimation({
    name: 'fadeIn',
    duration: '300ms',
    timingFunction: 'ease'
}, options);

// Slide in from top animation
atRule('@keyframes slideInFromTop', [
    selector('from', {
        transform: 'translateY(-20px)',
        opacity: 0
    }, options),
    selector('to', {
        transform: 'translateY(0)',
        opacity: 1
    }, options)
], options);

// Slide in animation definition
const slideInAnimation = defineAnimation({
    name: 'slideInFromTop',
    duration: '400ms',
    timingFunction: 'ease-out',
    fillMode: 'forwards'
}, options);

// Pulse animation
atRule('@keyframes pulse', [
    selector('0%', {
        transform: 'scale(1)'
    }, options),
    selector('50%', {
        transform: 'scale(1.05)'
    }, options),
    selector('100%', {
        transform: 'scale(1)'
    }, options)
], options);

// Pulse animation definition
const pulseAnimation = defineAnimation({
    name: 'pulse',
    duration: '1s',
    timingFunction: 'ease-in-out',
    iterationCount: 'infinite'
}, options);
```

## Using Animation Tokens in Selectors

Apply animation tokens to CSS selectors:

```typescript
import { selector, defineAnimation, atRule } from '@inkline/core';

// Define a fade in animation
atRule('@keyframes fadeIn', [
    selector('from', {
        opacity: 0
    }, options),
    selector('to', {
        opacity: 1
    }, options)
], options);

const fadeInAnimation = defineAnimation({
    name: 'fadeIn',
    duration: '300ms',
    timingFunction: 'ease',
    fillMode: 'forwards'
}, options);

// Apply to a selector
selector('.fade-in', {
    animation: fadeInAnimation
}, options);

// Apply with conditional class
selector('.modal', {
    opacity: 0,
    
    '&.is-open': {
        animation: fadeInAnimation
    }
}, options);

// Apply multiple animations
selector('.animated-element', {
    animation: `${fadeInAnimation}, ${pulseAnimation}`
}, options);
```

## Creating an Animation System

Define a system of animations for different elements and states:

```typescript
import { atRule, selector, defineAnimation } from '@inkline/core';

// Define keyframes for various animations
const animations = {
    // Fade animations
    fadeIn: {
        keyframes: [
            ['from', { opacity: 0 }],
            ['to', { opacity: 1 }]
        ],
        config: {
            duration: '300ms',
            timingFunction: 'ease',
            fillMode: 'forwards'
        }
    },
    fadeOut: {
        keyframes: [
            ['from', { opacity: 1 }],
            ['to', { opacity: 0 }]
        ],
        config: {
            duration: '300ms',
            timingFunction: 'ease',
            fillMode: 'forwards'
        }
    },
    
    // Slide animations
    slideInFromTop: {
        keyframes: [
            ['from', { 
                transform: 'translateY(-20px)', 
                opacity: 0 
            }],
            ['to', { 
                transform: 'translateY(0)', 
                opacity: 1 
            }]
        ],
        config: {
            duration: '400ms',
            timingFunction: 'ease-out',
            fillMode: 'forwards'
        }
    },
    slideInFromRight: {
        keyframes: [
            ['from', { 
                transform: 'translateX(20px)', 
                opacity: 0 
            }],
            ['to', { 
                transform: 'translateX(0)', 
                opacity: 1 
            }]
        ],
        config: {
            duration: '400ms',
            timingFunction: 'ease-out',
            fillMode: 'forwards'
        }
    },
    
    // Scale animations
    zoomIn: {
        keyframes: [
            ['from', { 
                transform: 'scale(0.95)', 
                opacity: 0 
            }],
            ['to', { 
                transform: 'scale(1)', 
                opacity: 1 
            }]
        ],
        config: {
            duration: '400ms',
            timingFunction: 'ease-out',
            fillMode: 'forwards'
        }
    },
    
    // Attention animations
    pulse: {
        keyframes: [
            ['0%', { transform: 'scale(1)' }],
            ['50%', { transform: 'scale(1.05)' }],
            ['100%', { transform: 'scale(1)' }]
        ],
        config: {
            duration: '1s',
            timingFunction: 'ease-in-out',
            iterationCount: 'infinite'
        }
    },
    shake: {
        keyframes: [
            ['0%, 100%', { transform: 'translateX(0)' }],
            ['10%, 30%, 50%, 70%, 90%', { transform: 'translateX(-5px)' }],
            ['20%, 40%, 60%, 80%', { transform: 'translateX(5px)' }]
        ],
        config: {
            duration: '0.8s',
            timingFunction: 'ease-in-out'
        }
    }
};

// Generate keyframes and animation definitions
const animationDefinitions = {};

Object.entries(animations).forEach(([name, { keyframes, config }]) => {
    // Define keyframes
    const keyframeSelectors = keyframes.map(([key, props]) => 
        selector(key, props, options)
    );
    
    atRule(`@keyframes ${name}`, keyframeSelectors, options);
    
    // Define animation
    animationDefinitions[name] = defineAnimation({
        name,
        ...config
    }, options);
    
    // Create utility class
    selector(`.${name}`, {
        animation: animationDefinitions[name]
    }, options);
});
```

## Component-Specific Animations

Create animations tailored for specific components:

```typescript
import { atRule, selector, defineAnimation } from '@inkline/core';

// Toast notification animations
atRule('@keyframes toastSlideIn', [
    selector('from', {
        transform: 'translateY(-20px)',
        opacity: 0
    }, options),
    selector('to', {
        transform: 'translateY(0)',
        opacity: 1
    }, options)
], options);

atRule('@keyframes toastSlideOut', [
    selector('from', {
        transform: 'translateY(0)',
        opacity: 1
    }, options),
    selector('to', {
        transform: 'translateY(-20px)',
        opacity: 0
    }, options)
], options);

const toastInAnimation = defineAnimation({
    name: 'toastSlideIn',
    duration: '300ms',
    timingFunction: 'ease-out',
    fillMode: 'forwards'
}, options);

const toastOutAnimation = defineAnimation({
    name: 'toastSlideOut',
    duration: '300ms',
    timingFunction: 'ease-in',
    fillMode: 'forwards'
}, options);

// Modal animations
atRule('@keyframes modalFadeIn', [
    selector('from', {
        opacity: 0
    }, options),
    selector('to', {
        opacity: 1
    }, options)
], options);

atRule('@keyframes modalScaleIn', [
    selector('from', {
        transform: 'scale(0.95)',
        opacity: 0
    }, options),
    selector('to', {
        transform: 'scale(1)',
        opacity: 1
    }, options)
], options);

const modalBackdropAnimation = defineAnimation({
    name: 'modalFadeIn',
    duration: '200ms',
    timingFunction: 'ease',
    fillMode: 'forwards'
}, options);

const modalContentAnimation = defineAnimation({
    name: 'modalScaleIn',
    duration: '300ms',
    timingFunction: 'ease-out',
    fillMode: 'forwards'
}, options);

// Apply to components
selector('.toast', {
    animation: toastInAnimation,
    
    '&.toast-closing': {
        animation: toastOutAnimation
    }
}, options);

selector('.modal-backdrop', {
    animation: modalBackdropAnimation
}, options);

selector('.modal-content', {
    animation: modalContentAnimation
}, options);
```

## Responsive Animations

Create animations that adapt to different screen sizes:

```typescript
import { atRule, selector, defineAnimation } from '@inkline/core';

// Define standard animation
atRule('@keyframes fadeIn', [
    selector('from', {
        opacity: 0
    }, options),
    selector('to', {
        opacity: 1
    }, options)
], options);

const fadeInAnimation = defineAnimation({
    name: 'fadeIn',
    duration: '500ms',
    timingFunction: 'ease',
    fillMode: 'forwards'
}, options);

// Define mobile animation (faster)
atRule('@keyframes fadeInMobile', [
    selector('from', {
        opacity: 0
    }, options),
    selector('to', {
        opacity: 1
    }, options)
], options);

const fadeInMobileAnimation = defineAnimation({
    name: 'fadeInMobile',
    duration: '300ms',  // Faster on mobile
    timingFunction: 'ease',
    fillMode: 'forwards'
}, options);

// Apply responsive animations
selector('.animated-element', {
    animation: fadeInAnimation
}, options);

atRule('@media (max-width: 768px)', [
    selector('.animated-element', {
        animation: fadeInMobileAnimation
    }, options)
], options);
```

## Respecting User Preferences

Support users who prefer reduced motion:

```typescript
import { atRule, selector } from '@inkline/core';

// Define animations
// ...

// Create a media query for reduced motion preference
atRule('@media (prefers-reduced-motion: reduce)', [
    selector('*', {
        animation: 'none !important',
        transition: 'none !important'
    }, options),
    
    // Alternative subtle animations for essential animations
    selector('.essential-animation', {
        animation: 'simpleFade 300ms ease-out forwards !important'
    }, options)
], options);

// Define simple fade for reduced motion
atRule('@keyframes simpleFade', [
    selector('from', {
        opacity: 0
    }, options),
    selector('to', {
        opacity: 1
    }, options)
], options);
```

## Best Practices

1. **Purpose-driven animations**: Use animations with purpose, not just for decoration
2. **Performance considerations**: Animate only transform and opacity for best performance
3. **Timing matters**: Adjust duration and easing based on the size and purpose of the element
4. **Subtlety is key**: Avoid excessive animations that can distract users
5. **Respect user preferences**: Always provide reduced motion alternatives
6. **Consistent feel**: Keep animations consistent across similar interactions
7. **State transitions**: Use animations to reinforce state changes
8. **Loading states**: Create meaningful loading animations that set expectations

## Next Steps

- [Transition Tokens](./transition.md): Explore transition token system
- [Color Tokens](./color.md): See how to create color tokens
- [API Reference](../api/variables.md): See the complete API for animation tokens