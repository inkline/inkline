---
title: Header
description: A lightweight, responsive header component used for showcasing hero unit style content.
---

<script setup>
import * as examples from '../examples';
</script>

# Header

## A lightweight, responsive header component used for showcasing hero unit style content.

### Basic Example
Here’s an example of a basic header component. Usually, this component is used on homepages and landing pages and has an attractive background image.

<example :component="examples.IHeaderBasicExample" :html="examples.IHeaderBasicExampleHTML"></example>

### Color Variants
You can set the style of a `<i-header>` using the `color` property.

<example :component="examples.IHeaderColorVariantsExample" :html="examples.IHeaderColorVariantsExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the size of your header, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<example :component="examples.IHeaderSizeVariantsExample" :html="examples.IHeaderSizeVariantsExampleHTML"></example>

### Fullscreen
You can make headers cover the whole screen width and height (using `vw` and `vh`) by adding the `fullscreen` property. The width and height do not overflow the size of the parent container.

<example :component="examples.IHeaderFullscreenExample" :html="examples.IHeaderFullscreenExampleHTML"></example>

### Cover Background
The goal of cover background images on a website is to cover the entire browser window at all times. Simply set a background for the header

<example :component="examples.IHeaderCoverExample" :html="examples.IHeaderCoverExampleHTML" :css="examples.IHeaderCoverExampleCSS"></example>
