---
title: Sidebar
description: A responsive navigation sidebar that includes support for branding, navigation, forms and more.
---

<script setup>
import * as examples from '../examples';
</script>


# Sidebar
## A responsive navigation sidebar that includes support for branding, navigation, forms and more.

### Basic Example
Here’s an example on how to use the `<i-sidebar>` inside a dashboard layout. The sidebar automatically collapses responsively.

<example type="sidebar" :component="examples.ISidebarBasicExample" :html="examples.ISidebarBasicExampleHTML" :js="examples.ISidebarBasicExampleJS"></example>

### Sizes
You're able to use the `size` modifier to control the size of your sidebar, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<example type="sidebar" :component="examples.ISidebarSizeVariantsExample" :html="examples.ISidebarSizeVariantsExampleHTML" :js="examples.ISidebarSizeVariantsExampleJS"></example>

### Variants
Inkline includes two predefined sidebar styles. You can set the style of a `<i-sidebar>` using the `variant` property, which can have a value of `light` or `dark`. By default, modals use the `light` variant.

<example type="sidebar" :component="examples.ISidebarColorVariantsExample" :html="examples.ISidebarColorVariantsExampleHTML" :js="examples.ISidebarColorVariantsExampleJS"></example>

### Placement
You can easily place your sidebar on the `left` or `right` side of a layout by setting the `placement` property . By default, sidebars are on the left side.

<example type="sidebar" :component="examples.ISidebarPlacementExample" :html="examples.ISidebarPlacementExampleHTML" :js="examples.ISidebarPlacementExampleJS"></example>

### Collapsible Menu
You can use an `<i-collapsible>` component with one or more `<i-collapsible-item>` components inside the `<i-nav>` component to create a contextual sidebar menu. 

<router-link :to="{ name: 'docs-components-collapsible' }">Learn more about the Collapsible component.</router-link>

<example type="sidebar" :component="examples.ISidebarCollapsibleExample" :html="examples.ISidebarCollapsibleExampleHTML" :js="examples.ISidebarCollapsibleExampleJS"></example>

### Sidebar Collapsing
You can control at which breakpoint your sidebar will collapse at using the `collapse` property. By default, the sidebar will collapse on the `md` screen size, but you can use any breakpoint value.

<example type="sidebar" :component="examples.ISidebarCollapseBreakpointExample" :html="examples.ISidebarCollapseBreakpointExampleHTML" :js="examples.ISidebarCollapseBreakpointExampleJS"></example>

#### Always or Never Collapsible

Besides the breakpoint values, you can use a boolean value to set your sidebar to be always collapsible, or never collapsible.

Setting a `collapse` value of `true` will set the sidebar to be always collapsible.

<example type="sidebar" :component="examples.ISidebarCollapseTrueExample" :html="examples.ISidebarCollapseTrueExampleHTML"></example>

Setting a `collapse` value of `false` will set the sidebar to never be collapsible.

<example type="sidebar" :component="examples.ISidebarCollapseFalseExample" :html="examples.ISidebarCollapseFalseExampleHTML"></example>

### Collapse Position
You can set the collapsed sidebar position to `relative`, `absolute` or `fixed` using the `collapse-position` property.

This property allows you to control whether the sidebar will affect the content that it is next to it when reaching the collapse breakpoint.

<example type="sidebar" :component="examples.ISidebarCollapsePositionExample" :html="examples.ISidebarCollapsePositionExampleHTML" :js="examples.ISidebarCollapsePositionExampleJS"></example>

### Linking and Routing
Nav items will be automatically converted to link anchors `<a>` when providing a `href` property. You can also specify `target` and `rel` properties.

The `<i-nav-item>` component is well integrated with the Vue Router plugin and will be converted to a `<router-link>` when using the `to` property.

<router-link :to="{ name: 'docs-components-nav' }">Learn more about the Nav Item component.</router-link>

<example type="sidebar" :component="examples.ISidebarRoutingExample" :html="examples.ISidebarRoutingExampleHTML"></example>

#### Active State

You can control the active state of your `<i-nav-item>` using the `active` property. When you provide a `to` property you're converting the component into a `router-link`, therefore you can use the `active-class` and `exact-active-class` properties and set them to `-active`.

<router-link :to="{ name: 'docs-components-nav' }">Learn more about the Nav Item component.</router-link>

<example type="sidebar" :component="examples.ISidebarRoutingActiveExample" :html="examples.ISidebarRoutingActiveExampleHTML"></example>
