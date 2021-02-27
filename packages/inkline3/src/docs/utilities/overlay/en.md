---
title: Overlay Utilities
description: Make an element overlay its container by adding overlay utilities. 
---

<script setup>
import * as examples from './examples';
</script>

# Overlay Utilities

## Make an element overlay its container by adding overlay utilities. 

### Basic Example
Add the `._overlay` utility class to an element to make it cover the entire containing block. The containing block refers to a parent element with `position: relative;`.

<example :component="examples.OverlayBasicExample" :html="examples.OverlayBasicExampleHTML"></example>

### Overlay Link

Add the `._overlay-link` utility class to a link to make the entire containing block clickable using a `::after` pseudo element. In most cases, the containing block refers to the parent element with `position: relative;`.

<example type="card" :component="examples.OverlayLinkExample" :html="examples.OverlayLinkExampleHTML"></example>
