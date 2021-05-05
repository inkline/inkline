---
title: Nav
description: Navs are basic navigation components that provide alignment and spacing between items.
---

<script setup>
import * as examples from '../examples';
</script>

# Nav
## Navs are basic navigation components that provide alignment and spacing between items.

### Example
Navigation components make use of the base `<i-nav>` component for building all types of navigation styles. 

<example :component="examples.INavBasicExample" :html="examples.INavBasicExampleHTML"></example>

Behind the scenes, the `<i-nav-item>` is converted into a `<router-link>` if it has the `:to` property, or a plain `<a>` tag if it has a `href` property. Otherwise, it uses a simple `<div>` tag.

### Vertical Variant
You can stack nav items into a vertical navigation component by setting the `vertical` property on your `<i-nav>`.

<example :component="examples.INavVerticalExample" :html="examples.INavVerticalExampleHTML"></example>

### Color Variants
You're able to use the `color` modifier to control the color of your navs, using one of the available variants: `light`, or `dark`. 

<example :component="examples.INavColorVariantsExample" :html="examples.INavColorVariantsExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the size of your navs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<example :component="examples.INavSizeVariantsExample" :html="examples.INavSizeVariantsExampleHTML"></example>

### Active State
You can control the active state of your `<i-nav-item>` using the `active` property. If you're providing a `:to` property, converting it into a `router-link`, you can use the `active-class` and `exact-active-class` properties and set them to `-active`.

<example :component="examples.INavStateActiveExample" :html="examples.INavStateActiveExampleHTML"></example>
