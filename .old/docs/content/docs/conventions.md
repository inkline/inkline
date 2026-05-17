---
title: Conventions - Inkline
description: Learn about our Inkline's conventions for clear component naming, an organized RSCSS approach, and an intuitive design token system.
---

# Conventions

Learn about our Inkline's conventions for clear component naming, an organized RSCSS approach, and an intuitive design token system.

Understanding these conventions will help you build more consistent applications and customize Inkline to match your design needs.

## Why Conventions Matter

Conventions aren't just rules — they're the key to a faster, more enjoyable development experience. By following consistent patterns across our entire library, you'll:

- Write code more efficiently with predictable naming patterns
- Troubleshoot more easily due to the consistent structure
- Customize components with confidence
- Create your own components that seamlessly integrate with Inkline

Inkline is built on a foundation of clear and consistent conventions.

### Component Naming Convention

Our component naming guidelines ensure that your development experience is smooth and consistent. The following rules should be followed when naming components:

- **Semantic and Intuitive**

  Component names are simple, descriptive words that instantly communicate purpose: 

  ```ts
  import { IButton, IContainer, INavbar } from '@inkline/inkline';
  ```
  
- **Parent-Child Relationships**
  
  Component names clearly reflect parent-child component relationships: 

  ```html
  <INav>
    <INavItem>Home</INavItem>
    <INavItem>About</INavItem>
  </INav>
  ```

- **Consistent Props**
  
  You'll notice the same prop names used across multiple components, reducing the learning curve:

  ```vue
  <IButton size="sm" color="primary" disabled />
  <IBadge size="sm" color="secondary" />
  <IAlert size="sm" color="info" />
  ```

- **Optional Namespacing** 

  All Inkline components are prefixed with `I` to prevent conflicts with your custom components and make them easily identifiable in your codebase:

  ```vue
  <IButton>Inkline Button</IButton>
  <CustomButton>Your Custom Button</CustomButton>
  ```

### CSS Naming Methodology

Inkline CSS classes follow <a href="https://ricostacruz.com/rscss/" rel="nofollow" target="_blank">RSCSS</a> (Reasonable System for CSS Stylesheet Structure), making your stylesheets more maintainable and readable.

#### RSCSS in Practice

**RSCSS is a simplified, more readable version of BEM.**

The RSCSS naming convention encourages you to have components in mind and revolves around three core concepts: 

~~~html
<div class="container -fluid _text:center">
               ↑         ↑        ↑
           Component  Variant  Utility 
~~~

#### Components, Variants, and Utilities

**Components**

Components are standalone elements that are meaningful on their own. Each component should be aware of its own design only, and should be usable without a specific context unless it's the only context they should be used in.

~~~scss
.navbar { /* ... */ }

.container { /* ... */ }

.button { /* ... */ }
~~~

**Variants**

Components may have variants that modify their appearance or behaviour. Class names for variants will be prefixed by a dash (`-`).

~~~scss
.button {
    &.-primary { /* ... */ }
    &.-disabled { /* ... */ }
    &.-block { /* ... */ }
}
~~~

**🚧 Utilities (WIP)**

Utility classes are general-purpose helper classes meant to override values. Class names for helpers will be prefixed by an underscore (`_`). When adding the `!` suffix, helpers provide styles that are tagged with `!important`.

~~~scss
._margin:0 { margin: 0; }

._text:center { text-align: center; }

._display:flex! { display: flex !important; }
~~~

Using utilities in your templates:

```html
<div class="_margin:0 _text:center">Centered content with no margin</div>
```

### Design Token Naming System

Inkline's design tokens (CSS variables) follow a structured naming pattern that makes customization intuitive and consistent.

##### Global Design Tokens

Global tokens use simple, intuitive names with single hyphens (`-`):

**Base Tokens**:
```scss
var(--spacing)
var(--color-primary)
var(--font-weight-bold);
...
```

**Composed Tokens**:
```scss
var(--transition); 
var(--border); 
...
```

##### Component Design Tokens

Component-specific tokens follow this structured format for a more granular control:

```scss
var(--<component>--[variant]--[state]--[element]--[element-variant]--[element-state]--<property>)
```

```scss
var(--button--sm--padding-top);
var(--button--primary--disabled--background);
```

## Applying These Concepts

Understanding these conventions empowers you to:

1. **Navigate the codebase** more efficiently
2. **Create custom components** that feel like native Inkline components
3. **Override styles** in a structured, maintainable way
4. **Customize the design system** using the design token hierarchy

For a deeper dive into design tokens and customization, [check out our Design Tokens documentation](/docs/ui/design-tokens).

Ready to put these concepts into practice? Head to our [Components section](/docs/components) to see these conventions in action.
