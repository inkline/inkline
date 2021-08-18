---
title: Images
description: Documentation and examples for images, using lightweight styles and modifier classes. 
---

<script setup>
import * as examples from './examples';
</script>

# Images

## Documentation and examples for images, using lightweight styles and modifier classes. 

### Responsive Images
Images in Inkline need to have the `.image` class applied and are made responsive using the `.-responsive` modifier. 

To achieve that, we apply `max-width: 100%;` and `height: auto;` to the image so that it scales with the parent element, without surpassing the image's maximum native width.

<example :component="examples.ImagesResponsiveExample" :html="examples.ImagesResponsiveExampleHTML"></example>

#### SVG Images and IE 10
In Internet Explorer 10, SVG images with `.image.-responsive` are disproportionately sized. To fix this, Inkline adds `width: 100% \9;` where necessary. 

This fix improperly sizes other image formats, so we don’t apply it automatically unless the extension ends with `.svg`.

### Fluid Images
Images in Inkline can be made fluid using the `.-fluid` modifier. To achieve that, we apply `width: 100%;` and `height: auto;` to the image so that it scales with the parent element.

<example :component="examples.ImagesFluidExample" :html="examples.ImagesFluidExampleHTML"></example>

### Image Thumbnails
You can use the `.-thumbnail` modifier to give an image a rounded 1px border appearance.

<example :component="examples.ImagesThumbnailExample" :html="examples.ImagesThumbnailExampleHTML"></example>

### Polaroid
Besides thumbnails, you can opt for a retro look having a larger bottom border using the `.-polaroid` modifier.

<example :component="examples.ImagesPolaroidExample" :html="examples.ImagesPolaroidExampleHTML"></example>

### Image Alignment
Align images with the helper classes or text alignment classes. Block-level images can be centered using the `._margin-x-auto` margin utility class.

<example :component="examples.ImagesAlignmentLeftExample" :html="examples.ImagesAlignmentLeftExampleHTML"></example>

<example :component="examples.ImagesAlignmentRightExample" :html="examples.ImagesAlignmentRightExampleHTML"></example>

<example :component="examples.ImagesAlignmentCenterExample" :html="examples.ImagesAlignmentCenterExampleHTML"></example>

<example :component="examples.ImagesAlignmentMarginAutoExample" :html="examples.ImagesAlignmentMarginAutoExampleHTML"></example>

### Picture
If you are using the `<picture>` element to specify multiple `<source>` elements for a specific `<img>`, make sure to add 
the `.image` classes to the `<img>` and not to the `<picture>` tag.

<example :component="examples.ImagesPictureExample" :html="examples.ImagesPictureExampleHTML"></example>
