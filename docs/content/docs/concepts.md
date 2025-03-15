---
title: Concepts - Inkline
description: Learn about key concepts that shape the Inkline UI Library and why our approach sets a new standard.
---

# Concepts

Learn about key concepts that shape the Inkline UI Library and why our approach sets a new standard. 

## Fluid Responsive Design

Inkline takes advantage of the [Utopia.fyi](https://utopia.fyi){target="_blank"} design philosophy to create interfaces that adapt fluidly to every screen size. This approach ensures that our typography and spacing remain visually consistent while reducing the overhead of managing multiple breakpoints.


### The Challenge — Traditional Responsive Design

In traditional responsive design, designers often define fixed values at discrete breakpoints (e.g., mobile, tablet, desktop). This usually leads to abrupt changes in UI elements and increased maintenance. 

##### Fixed Breakpoints

Conventional methods force designers to pick several fixed sizes. For example, a heading might be 1.5rem on mobile and 2.5rem on desktop, with nothing in between.

##### Manual Media Queries

Developers need to write multiple @media queries to cover the entire range of devices. This results in code bloat and often leads to inconsistent designs between breakpoints.

##### Limited Flexibility

With fixed values, typography and spacing can look mismatched on devices that fall between defined breakpoints. The UI can feel “stair-stepped” rather than fluid.

### The Solution — Fluid Responsive Design 

Utopia.fyi provides a way to define design values fluidly. Instead of hardcoding many discrete values, you set a **minimum** and **maximum** value for design tokens like typography font size and spacing. 

The browser then calculates the in-between values using complex CSS computations and CSS Locks. This means that we interpolate values smoothly for all screen sizes.

##### CSS Locks

CSS Locks manage the responsive, screen-width–dependent behavior in our design tokens. They ensure that values like font-size scale with the viewport but don’t grow without bound.

```css
:root {
    --fluid--min-width: 320;
    --fluid--max-width: 1440;
    --fluid--screen: 100vw;
    
    --fluid--breakpoint: calc((var(--fluid--screen) - var(--fluid--min-width) / 16 * 1rem) / (var(--fluid--max-width) - var(--fluid--min-width)));
}
```

This calculation (`--fluid--breakpoint`) forms the backbone of our fluid scale, dynamically adjusting based on the current viewport width.

To prevent the scaling from going on indefinitely on very wide screens, we cap the value with a media query:

```css
@media screen and (min-width: 1440px) {
    :root {
        --fluid--screen: calc(var(--fluid--max-width) * 1px);
    }
}
```

##### Fluid Scaling

The idea is to let the value scale smoothly. For example, a heading size could start at `1.5rem` on smaller devices and gradually grow to `2.5rem` on larger screens.

```css
:root {
    --font-size-min: 16;
    --font-size-max: 18;
    
    --font-size: calc(((var(--font-size-min) / 16) * 1rem) + (var(--font-size-max) - var(--font-size-min)) * var(--fluid--breakpoint));
}
```

##### Design Token Generation

We define our base typography and spacing scales for the smallest and largest expected screen sizes. Using [Utopia.fyi](https://utopia.fyi){target="_blank"}’s guidelines and calculations, we create tokens that cover every screen width.

```css
.button {
    padding: var(--spacing-md);
    font-size: var(--font-size-lg);
}
```

### The Benefits of Using Fluid Responsive Design in Inkline

Adopting the Utopia.fyi methodology in Inkline has revolutionized how we approach responsive design. By defining a fluid range for typography and spacing, we’ve achieved a UI that scales gracefully on any device while reducing the maintenance burden. 

##### Simplicity

With fluid design tokens, one fluid value can replace multiple hardcoded values. This minimizes errors and simplifies the overall style management.

##### Future-Proof

As new devices with varying screen sizes emerge, our fluid design tokens adapt automatically without the need for constant manual adjustments.

Both designers and developers now speak a common language—fluid scales. Designers can specify the desired visual effect at the extreme screen sizes, and developers can implement it knowing the browser will handle the interpolation.

##### Simplified CSS

By adopting fluid design tokens, we reduce the need for extensive `@media` queries. Our CSS can rely on a single declaration that adapts continuously rather than multiple discrete overrides.

##### Enhanced Developer Experience

Developers working with Inkline can use these tokens out-of-the-box. The consistency of the fluid tokens means less time tweaking and more focus on feature development.


This technique not only creates a more harmonious visual experience but also empowers developers to focus on building robust features rather than micromanaging breakpoints.


