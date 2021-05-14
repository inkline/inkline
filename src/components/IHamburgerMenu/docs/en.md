---
title: Hamburger Menu
description: Inkline's hamburger menu is used to control opening and closing elements using various animation options.
---

<script setup>
import * as examples from '../examples';
</script>

# Hamburger Menu

## Inkline's hamburger menu is used to control opening and closing elements using various animation options.

### Basic Example
Here’s an example of a basic use case for the `<i-hamburger-menu>` component. This component is usually used together with the <router-link :to="{ name: 'docs-components-navbar' }">Navbar Component</router-link> and <router-link to="{ name: 'docs-components-sidebar' }">Sidebar Component</router-link> to control their collapsed state.

<example :component="examples.IHamburgerMenuBasicExample" :html="examples.IHamburgerMenuBasicExampleHTML" :js="examples.IHamburgerMenuBasicExampleJS"></example>

### Color Variants
You can set the style of a `<i-hamburger-menu>` using the `color` property, which can have a value of `light` or `dark`. By default, hamburger menus have the `light` color variant.

<example :component="examples.IHamburgerMenuColorVariantsExample" :html="examples.IHamburgerMenuColorVariantsExampleHTML" :js="examples.IHamburgerMenuColorVariantsExampleJS"></example>

### Animation
The `<i-hamburger-menu>` menu component supports various closed state animations. You can choose a closed state icon using the `animation` property.

<example :component="examples.IHamburgerMenuAnimationExample" :html="examples.IHamburgerMenuAnimationExampleHTML" :js="examples.IHamburgerMenuAnimationExampleJS"></example>
