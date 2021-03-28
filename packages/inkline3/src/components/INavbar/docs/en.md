---
title: Navbar
description: A responsive navigation header that includes support for branding, navigation, forms and more.
---

<script setup>
import * as examples from '../examples';
</script>


# Navbar
## A responsive navigation header that includes support for branding, navigation, forms and more.

### Basic Example
Here’s an example of the basic components included in a  `<i-navbar>` that automatically collapses responsively.

<example :component="examples.INavbarBasicExample" :html="examples.INavbarBasicExampleHTML"></example>

### Sizes
You're able to use the `size` modifier to control the size of your navbar, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<example :component="examples.INavbarSizeVariantsExample" :html="examples.INavbarSizeVariantsExampleHTML"></example>

### Variants
Inkline includes two predefined navbar styles. You can set the style of a `<i-navbar>` using the `variant` property, which can have a value of `light` or `dark`. By default, modals use the `light` variant.

<example :component="examples.INavbarColorVariantsExample" :html="examples.INavbarColorVariantsExampleHTML"></example>

### Dropdown
You can use an `<i-dropdown>` component inside the `<i-nav>` component to create a contextual navbar menu. 

<router-link :to="{ name: 'docs-components-dropdown' }">Learn more about the Dropdown component.</router-link>

<example :component="examples.INavbarDropdownExample" :html="examples.INavbarDropdownExampleHTML"></example>

### Nav Placement
You can position the `<i-nav>` component to the `start`, `end`, or `center` of the `<i-navbar-collapsible>` component using flexbox utilities.

<router-link :to="{ name: 'docs-components-nav' }">Learn more about the Nav component.</router-link>

<example :component="examples.INavbarNavPlacementExample" :html="examples.INavbarNavPlacementExampleHTML"></example>

### Navbar Collapsing
You can control at which breakpoint your navbar will collapse at using the `collapse` property. By default, the navbar will collapse on the `md` screen size, but you can use any breakpoint value.

<example :component="examples.INavbarCollapseBreakpointExample" :html="examples.INavbarCollapseBreakpointExampleHTML"></example>

#### Always or Never Collapsible

Besides the breakpoint values, you can use a boolean value to set your navbar to be always collapsible, or never collapsible.

Setting a `collapse` value of `true` will set the navbar to be always collapsible.

<example :component="examples.INavbarCollapseTrueExample" :html="examples.INavbarCollapseTrueExampleHTML"></example>

Setting a `collapse` value of `false` will set the navbar to never be collapsible.

<example :component="examples.INavbarCollapseFalseExample" :html="examples.INavbarCollapseFalseExampleHTML"></example>

#### Manual Collapse
Sometimes, it's necessary to control whether the collapsed Navbar is open or not programmatically. Fort that, you can use the `v-model` directive.

<example :component="examples.INavbarCollapseManualExample" :html="examples.INavbarCollapseManualExampleHTML" :js="examples.INavbarCollapseManualExampleJS"></example>

### Linking and Routing
Nav items will be automatically converted to link anchors `<a>` when providing a `href` property. You can also specify `target` and `rel` properties.

The `<i-nav-item>` component is well integrated with the Vue Router plugin and will be converted to a `<router-link>` when using the `to` property.

<router-link :to="{ name: 'docs-components-nav' }">Learn more about the Nav Item component.</router-link>

<example :component="examples.INavbarRoutingExample" :html="examples.INavbarRoutingExampleHTML"></example>

#### Active State

You can control the active state of your `<i-nav-item>` using the `active` property. When you provide a `to` property you're converting the component into a `router-link`, therefore you can use the `active-class` and `exact-active-class` properties and set them to `-active`.

<router-link :to="{ name: 'docs-components-nav' }">Learn more about the Nav Item component.</router-link>

<example :component="examples.INavbarRoutingActiveExample" :html="examples.INavbarRoutingActiveExampleHTML"></example>
