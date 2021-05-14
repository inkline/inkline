---
title: Collapsible
description: Collapsible elements are used to show and hide content using a smooth reveal transition. 
---

<script setup>
import * as examples from '../examples';
</script>

# Collapsible

## Collapsible elements are used to show and hide content using a smooth reveal transition. 

### Basic Example
Collapsing an element will animate the height from zero to its default value. This component is useful for creating clearly separated content sections such as FAQ pages.

<example :component="examples.ICollapsibleBasicExample" :html="examples.ICollapsibleBasicExampleHTML"></example>

### Item Header
You can use the `header` slot to provide a custom title for the collapsible panel's heading. 

<example :component="examples.ICollapsibleHeaderExample" :html="examples.ICollapsibleHeaderExampleHTML"></example>

### Default Open Panels
Panels can be opened by default, on page load, using the `v-model` directive of the `<i-collapsible>` component. First, you'll need to assign an `id` to the `<i-collapsible-item>` components which will identify the open panels.
 
 <example :component="examples.ICollapsibleDefaultOpenExample" :html="examples.ICollapsibleDefaultOpenExampleHTML" :js="examples.ICollapsibleDefaultOpenExampleJS"></example>

### Accordion
Accordion collapsible groups can have only one content panel open at a single time. This behaviour can be set using the `accordion` property.

<example :component="examples.ICollapsibleAccordionExample" :html="examples.ICollapsibleAccordionExampleHTML"></example>

### Color Variants
Inkline includes basic predefined collapsible colors that you can use within your application. You can apply a style using the `color` property.

<example :component="examples.ICollapsibleColorVariantsExample" :html="examples.ICollapsibleColorVariantsExampleHTML"></example>
