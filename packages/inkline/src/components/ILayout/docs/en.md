---
title: Layout
description: Build basic layouts using Inkline's built-in layout components. 
---

<script setup>
import * as examples from '../examples';
</script>

# Layout

## Build basic layouts using Inkline's built-in layout components. 

The layout components are used for scaffolding the basic structure of the page:
- `<i-layout>` is the main layout wrapper in which `i-layout-header`, `i-layout-aside`, `i-layout-content`, `i-layout-footer`, or `i-layout` itself can be nested, and can be placed in any parent container.
- `<i-layout-header>` is the header area that can also serve as navigation
- `<i-layout-aside>` is a container for side sections (usually a side nav).
- `<i-layout-content>` is the main content container
- `<i-layout-footer>` is a container for footer elements

### Common Layouts

The previewed layouts are styled for documentation purposes only. When using the components, they will only 
provide the correct element positioning without colors and paddings.

Layouts are based on flexbox, so please make sure your browser fully supports it. 

<example type="layout" :component="examples.ILayoutContentHeader" :html="examples.ILayoutContentHeaderHTML"></example>

<example type="layout" :component="examples.ILayoutContentHeaderFooter" :html="examples.ILayoutContentHeaderFooterHTML"></example>

<example type="layout" :component="examples.ILayoutContentWithLeftAsideHeaderFooter" :html="examples.ILayoutContentWithLeftAsideHeaderFooterHTML"></example>

<example type="layout" :component="examples.ILayoutContentWithRightAsideHeaderFooter" :html="examples.ILayoutContentWithRightAsideHeaderFooterHTML" :css="examples.ILayoutWithAsideCSS"></example>

<example type="layout" :component="examples.ILayoutContentWithLeftAndRightAsidesHeaderFooter" :html="examples.ILayoutContentWithLeftAndRightAsidesHeaderFooterHTML" :css="examples.ILayoutWithAsideCSS"></example>

<example type="layout" :component="examples.ILayoutLeftAsideWithContentHeaderFooter" :html="examples.ILayoutLeftAsideWithContentHeaderFooterHTML" :css="examples.ILayoutWithAsideCSS"></example>

<example type="layout" :component="examples.ILayoutRightAsideWithContentHeaderFooter" :html="examples.ILayoutRightAsideWithContentHeaderFooterHTML" :css="examples.ILayoutWithAsideCSS"></example>

<example type="layout" :component="examples.ILayoutLeftAndRightAsidesWithContentHeaderFooter" :html="examples.ILayoutLeftAndRightAsidesWithContentHeaderFooterHTML" :css="examples.ILayoutWithAsideCSS"></example>
