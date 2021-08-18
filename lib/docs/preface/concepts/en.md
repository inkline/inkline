---
title: Concepts
description: Learn more about the concepts used throughout the framework and Inkline's design decisions.
---

# Concepts 
## Learn more about the concepts used throughout the library and Inkline's design decisions.

### Component Naming Convention
When designing Inkline, component names and prop names were chosen to be as intuitive as possible. The naming rules are:

- ###### Namespacing
    <p>Component names should be namespaced using the <code>i-</code> prefix to be easily recognizable and to avoid conflicts.</p>
- ###### Simplicity
    <p>Component names should be simple words where possible in order for them to be easy to remember: <code>i-container</code>, <code>i-button</code>, <code>i-navbar</code>, etc.</p>
- ###### Clarity
    <p>Component names should clearly reflect parent-child component relationships: <code>i-nav</code> and <code>i-nav-item</code>.</p>
- ###### Consistency
    <p>Component prop names should be reused as often as possible to promote consistency: <code>variant</code>, <code>size</code>, <code>value</code>, etc.</p>

### Class Naming Convention
Inkline uses <a href="https://rscss.io/" rel="nofollow" target="_blank">RSCSS</a> (Reasonable System for CSS Stylesheet Structure) principles for naming classes, making them much easier to read and write. RSCSS is a simplified, more readable version of BEM.

The RSCSS naming convention encourages you to think in components and revolves around three core concepts: components, variants and utilities.

~~~html
<div class="container -fluid _text-center">
~~~

- `.container` represents a component
- `.-fluid` represents a variant specific to the component
- `._text-center` represents an utility

##### Components
Components are standalone entities that are meaningful on their own. Each component should be aware of its own design only, and should be usable without a specific context unless it's the only context they should be used in.

~~~scss
.navbar { /* ... */ }

.container { /* ... */ }

.button { /* ... */ }
~~~

##### Variants
Components may have variants that modify their appearance or behaviour. Class names for variants will be prefixed by a dash (`-`).

~~~scss
.button {
    &.-primary { /* ... */ }
    &.-disabled { /* ... */ }
    &.-block { /* ... */ }
}
~~~

##### Utilities
Utility classes are general-purpose helper classes meant to override values. Class names for helpers will be prefixed by an underscore (`_`). Helpers typically provide styles that are tagged with `!important`.

~~~scss
._margin-0 { margin: 0 !important; }

._text-center { text-align: center !important; }

._display-flex { display: flex !important; }
~~~


