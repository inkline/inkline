---
title: Tooltip
description: Tooltips are useful for conveying information when an user hovers over an element.
---

<script setup>
import * as examples from '../examples';
</script>

# Tooltip
## Tooltips are useful for conveying information when an user hovers over an element.

### Basic Example
Wrap the trigger element (such as an `<i-button>`) and provide a `<template #body>` inside an `<i-tooltip>` component to create a tooltip.

<example :component="examples.ITooltipBasicExample" :html="examples.ITooltipBasicExampleHTML"></example>

### Placement
Trigger tooltips at the `top`, `bottom`, `left` or `right` of elements by using the `placement` property. 

Each position also has a `-start` or `-end` variant that sets the tooltip to the start or end of the placement instead of centering it. The possible placements are:

- `top`
- `top-start`
- `top-end`
- `bottom`
- `bottom-start`
- `bottom-end`
- `left`
- `left-start`
- `left-end`
- `right`
- `right-start`
- `right-end`

<example :component="examples.ITooltipPlacementExample" :html="examples.ITooltipPlacementExampleHTML"></example>

### Freeform
Tooltips can contain text of virtually any size. You can control the wrapping and the maximum width of the tooltip by setting `white-space: normal` and a fixed `width` property on the tooltip content.

<example :component="examples.ITooltipFreeformExample" :html="examples.ITooltipFreeformExampleHTML"></example>

### Trigger Type
You can use the `trigger` property to trigger the tooltip on `hover` or `click`. By default, tooltips are triggered on `hover`, a design decision made to improve user experience.

<example :component="examples.ITooltipTriggerExample" :html="examples.ITooltipTriggerExampleHTML" :js="examples.ITooltipTriggerExampleJS"></example>

### Size Variants
You're able to use the `size` property to control the size of your tooltips, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<example :component="examples.ITooltipSizeVariantsExample" :html="examples.ITooltipSizeVariantsExampleHTML"></example>

### Color Variants
You can choose a light or dark color for your tooltip using the `color` modifier.

<example :component="examples.ITooltipColorVariantsExample" :html="examples.ITooltipColorVariantsExampleHTML"></example>
