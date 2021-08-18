---
title: Border Utilities
description: Use border utilities to quickly apply border styles to an element. Great for images, buttons, or any other element. 
---

<script setup>
import * as examples from './examples';
</script>


# Border Utilities

## Use border utilities to quickly apply border styles to an element. Great for images, buttons, or any other element. 

### Adding Border
You can use border utilities to add borders on all sides or individually on an element.

<example type="border-utilities" :component="examples.BorderAddExample" :html="examples.BorderAddExampleHTML"></example>

### Removing Border
You can use border utilities to remove borders on all sides or individually on an element.

<example type="border-utilities -with-border" :component="examples.BorderRemoveExample" :html="examples.BorderRemoveExampleHTML"></example>

### Border Color
You can use border addition and removal utilities together with border color utilities to set their color.

<example type="border-utilities -with-border" :component="examples.BorderColorBrandExample" :html="examples.BorderColorBrandExampleHTML"></example>

<example type="border-utilities -with-border" :component="examples.BorderColorStateExample" :html="examples.BorderColorStateExampleHTML"></example>

<example type="border-utilities -with-border" :component="examples.BorderColorNeutralExample" :html="examples.BorderColorNeutralExampleHTML"></example>

Position specific border colors are also available. Use `._border-{position}-color-{variant}` to set the color of a specific border side (i.e. `._border-top-color-primary`). 

### Border Radius
You can use border radius utilities to add rounded corners to your elements.

<example type="border-utilities -with-border" :component="examples.BorderRadiusExample" :html="examples.BorderRadiusExampleHTML"></example>
