---
title: Visibility Utilities
description: Control the visibility, with or without modifying the display of elements. 
---

<script setup>
import * as examples from './examples';
</script>

# Visibility Utilities

## Control the visibility, with or without modifying the display of elements. 

### Basic Example

Set element visibility using visibility utilities. Content will be hidden both visually and for assistive technology/screen reader users.

~~~html
<div class="_hidden">...</div>
<div class="_visible">...</div>
~~~

Without modifying the element's display:

~~~html
<div class="_visibility:hidden">...</div>
<div class="_visibility:visible">...</div>
~~~

### Responsive Visibility
Visibility utilities can be applied responsively using the following helper classes:

- `._hidden`
- `._visible`
- `._{xs|sm|md|lg|xl|xxl}:hidden`
- `._{xs|sm|md|lg|xl|xxl}:visible`

<example :component="examples.VisibilityBasicExample" :html="examples.VisibilityBasicExampleHTML"></example>
