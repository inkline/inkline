---
title: Loader
description: Provide a loading state for a component or page using a customizable loading spinner. 
---

<script setup>
import * as examples from '../examples';
</script>

# Loader

## Provide a loading state for a component or page using a customizable loading spinner. 

### Color Variants
The loader component is available in a `light` or `dark` color, which you can choose using the `color` property.

<example type="icon" :component="examples.ILoaderColorVariantsExample" :html="examples.ILoaderColorVariantsExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the size of your loader component, using one of the available sizes: `sm`, `md`, and `lg`.

<example type="icon" :component="examples.ILoaderSizeVariantsExample" :html="examples.ILoaderSizeVariantsExampleHTML"></example>

If you set the `size` property to `auto`, the loader will fit the container that it is in. Make sure to use the same height and width to keep the correct aspect ratio.

<example type="icon" :component="examples.ILoaderSizeAutoExample" :html="examples.ILoaderSizeAutoExampleHTML"></example>

### Text Example
You're able to provide some additional text by using the `default` loader slot.

<example type="icon" :component="examples.ILoaderTextExample" :html="examples.ILoaderTextExampleHTML"></example>
