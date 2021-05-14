---
title: Badge
description: Documentation and examples for badges, a small component used for counting and labeling.
---

<script setup>
import * as examples from '../examples';
</script>

# Badge

## Documentation and examples for badges, a small component used for counting and labeling.

### Color Variants

Inkline includes several predefined badge color variants, each serving its own semantic purpose, which you can control using the `color` property.

<example :component="examples.IBadgeColorVariantsExample" :html="examples.IBadgeColorVariantsExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the text and spacing size of your badges, using one of the available sizes: `sm`, `md`, and `lg`. 

<example :component="examples.IBadgeSizeVariantsExample" :html="examples.IBadgeSizeVariantsExampleHTML"></example>

### Relative Size

Badges always match the size of the immediate parent element by using relative font sizing and `em` units.

<example :component="examples.IBadgeHeadingExample" :html="examples.IBadgeHeadingExampleHTML"></example>
