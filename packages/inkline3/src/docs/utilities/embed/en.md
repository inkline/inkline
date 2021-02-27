---
title: Embed Utilities
description: Create responsive video embeds by keeping the aspect ratio based on the parent element width. 
---

<script setup>
import * as examples from './examples';
</script>

# Embed Utilities

## Create responsive video embeds by keeping the aspect ratio based on the parent element width. 

### Basic Example
Embed styles are directly applied to `<iframe>`, `<embed>`, `<video>`, and `<object>` elements.

<example :component="examples.EmbedBasicExample" :html="examples.EmbedBasicExampleHTML"></example>

### Aspect Ratios
Aspect ratios can be customized with embed helper classes. The following aspect ratio classes are available:

~~~html
<!-- 21:9 aspect ratio -->
<div class="_embed _embed-21by9">
    <iframe src="..."></iframe>
</div>
~~~

~~~html
<!-- 16:9 aspect ratio -->
<div class="_embed _embed-16by9">
    <iframe src="..."></iframe>
</div>
~~~

~~~html
<!-- 4:3 aspect ratio -->
<div class="_embed _embed-4by3">
    <iframe src="..."></iframe>
</div>
~~~

~~~html
<!-- 1:1 aspect ratio -->
<div class="_embed _embed-1by1">
    <iframe src="..."></iframe>
</div>
~~~
