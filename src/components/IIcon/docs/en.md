---
title: Icon
description: Inkline provides you with an awesome universal icon component that you can use with your favorite icon library.
---

<script setup>
import IntegrationsTable from '../examples/integrations.vue';
import * as examples from '../examples';
</script>

# Icon

## Inkline provides you with an awesome universal icon component that you can use with your favorite icon library.

### Integrations

Inkline provides integrations with the most popular free icon packs, out of the box. Here's why we chose this approach:
- You have one simple component for all icon packs
- The icons are rendered as SVGs and can be scaled up to any size
- Small file size, natively tree-shakeable

<integrations-table></integrations-table>

### Basic Example

Here’s an example of the basic icons included with the `<i-icon>` component.

<example type="icon" :component="examples.IIconBasicExample" :html="examples.IIconBasicExampleHTML"></example>

### Color Variants
You can use text color utility classes to set the color of Inkline's icons.

<example type="icon" :component="examples.IIconColorVariantsExample" :html="examples.IIconColorVariantsExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the size of your icon, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

You can also use text size utility classes to set the size of Inkline's icons.

<example type="icon" :component="examples.IIconSizeVariantsExample" :html="examples.IIconSizeVariantsExampleHTML"></example>
