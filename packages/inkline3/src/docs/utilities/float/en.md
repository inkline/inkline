---
title: Float Utilities
description: You can use the float utility on any element, for any breakpoint. 
---

<script setup>
import * as examples from './examples';
</script>

# Float Utilities

## You can use the float utility on any element, for any breakpoint. 

### Basic Example
You can use the float utility classes to float an element to the left or right, or to disable floating, responsively. The utilities use the same viewport breakpoints as the grid system. 

<example :component="examples.FloatBasicExample" :html="examples.FloatBasicExampleHTML"></example>

<i-alert variant="info" class="_margin-top-1">
    <template #icon><i-icon icon="info"></i-icon></template>
     Float utilities do not affect flex items.
</i-alert>

### Responsive
Float utilities can be applied responsively using the following helper classes:

- `._float-{xs|sm|md|lg|xl}-left`
- `._float-{xs|sm|md|lg|xl}-right`
- `._float-{xs|sm|md|lg|xl}-none`

<example :component="examples.FloatResponsiveExample" :html="examples.FloatResponsiveExampleHTML"></example>
