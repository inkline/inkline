---
title: Sizing Utilities
description: Make an element as wide or as tall as you need using width and height utilities. 
---

<script setup>
import * as examples from './examples';
</script>

# Sizing Utilities

## Make an element as wide or as tall as you need using width and height utilities. 

Width and height utilities provide support for `25%`, `50%`, `75%`, `100%`, and auto by default.

### Width

<example type="sizing" :component="examples.SizingWidthExample" :html="examples.SizingWidthExampleHTML"></example>

### Height

<example type="sizing -vertical" :component="examples.SizingHeightExample" :html="examples.SizingHeightExampleHTML"></example>

### Max Width

<example type="sizing" :component="examples.SizingMaxWidthExample" :html="examples.SizingMaxWidthExampleHTML"></example>

### Max Height

<example type="sizing -vertical" :component="examples.SizingMaxHeightExample" :html="examples.SizingMaxHeightExampleHTML"></example>

### Viewport Relative Sizing
You can also use utilities to set the width and height relative to the viewport.

~~~html
<div class="_width:100vw">100% Viewport Width</div>

<div class="_height:100vh">100% Viewport Height</div>

<div class="_max-width:100vw">100% Viewport Max Width</div>

<div class="_max-height:100vh">100% Viewport Max Height</div>
~~~
