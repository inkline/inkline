---
title: Media
description: Media objects provide you with a flexible component that can be easily nested and repeated, such as blog comments and tweets.
---

<script setup>
import * as examples from '../examples';
</script>

# Media
## Media objects provide you with a flexible component that can be easily nested and repeated, such as blog comments and tweets.

### Example
Media objects are useful for repetitive components that have a media element positioned alongside them, such as an user image or blog post image.

<example :component="examples.IMediaBasicExample" :html="examples.IMediaBasicExampleHTML"></example>

### Nesting
Media components can be nested inside one another to create a parent-child relationship between related components.

<example :component="examples.IMediaNestingExample" :html="examples.IMediaNestingExampleHTML"></example>

### Alignment
The media element in a media component can be aligned with flexbox helper classes to the top (default), middle, or end of the `.media-body` content.

<example :component="examples.IMediaAlignmentExample" :html="examples.IMediaAlignmentExampleHTML"></example>
