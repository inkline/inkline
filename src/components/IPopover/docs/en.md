---
title: Popover
description: Popovers are useful for conveying information when an user clicks an element.
---

<script setup>
import * as examples from '../examples';
</script>

# Popover
## Popovers are useful for conveying information when an user clicks an element.

### Basic Example
Wrap the trigger element (such as an `<i-button>`) and provide a `<template #body>` inside an `<i-popover>` component to create a popover.

Optionally, you can provide a popover `header` and `footer` using slots.

<example :component="examples.IPopoverBasicExample" :html="examples.IPopoverBasicExampleHTML"></example>

### Placement
Trigger popovers at the `top`, `bottom`, `left` or `right` of elements by using the `placement` property. 

Each position also has a `-start` or `-end` variant that sets the popover to the start or end of the placement instead of centering it. The possible placements are:

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

<example :component="examples.IPopoverPlacementExample" :html="examples.IPopoverPlacementExampleHTML"></example>

### Trigger Type
You can use the `trigger` property to trigger the popover on `hover` or `click`. By default, popovers are triggered on `hover`, a design decision made to improve user experience.

<example :component="examples.IPopoverTriggerExample" :html="examples.IPopoverTriggerExampleHTML" :js="examples.IPopoverTriggerExampleJS"></example>

### Size Variants
You're able to use the `size` property to control the size of your popovers, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<example :component="examples.IPopoverSizeVariantsExample" :html="examples.IPopoverSizeVariantsExampleHTML"></example>

### Color Variants
You can choose a light or dark color for your popover using the `color` modifier.

<example :component="examples.IPopoverColorVariantsExample" :html="examples.IPopoverColorVariantsExampleHTML"></example>
