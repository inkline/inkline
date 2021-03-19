---
title: Progress
description: A custom component for displaying progress with support for stacked progress bars.
---

<script setup>
import * as examples from '../examples';
</script>

# Progress
## A custom component for displaying progress with support for stacked progress bars.

### Basic Example
Progress components are built with two components: a wrapper `<i-progress>` and at least one `<i-progress-bar>`. You can set the width of a progress bar by setting its `value` property.

<example :component="examples.IProgressBasicExample" :html="examples.IProgressBasicExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the size of your progress, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<example :component="examples.IProgressSizeVariantsExample" :html="examples.IProgressSizeVariantsExampleHTML"></example>

### Color Variants
Inkline includes multiple progress styles. You set the wrapper `<i-progress>` background using the `color` property.

<example :component="examples.IProgressColorVariantsExample" :html="examples.IProgressColorVariantsExampleHTML"></example>

More importantly, you can change the color of an `<i-progress-bar>` using the `color` property.

<example :component="examples.IProgressBarColorVariantsExample" :html="examples.IProgressBarColorVariantsExampleHTML"></example>

### Value
Inkline allows you to set a `min` and `max` modifier to calculate the progress based on a meaningful value. The new `min` will represent `0%` and the `max` will represent `100%`.

<example :component="examples.IProgressValueExample" :html="examples.IProgressValueExampleHTML"></example>

### Stacked Bars
You can add multiple `<i-progress-bar>` inside the `<i-progress>` component to stack them, adding them up to `100%`.

<example :component="examples.IProgressStackedExample" :html="examples.IProgressStackedExampleHTML"></example>
