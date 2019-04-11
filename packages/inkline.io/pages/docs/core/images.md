# Images
Documentation and examples for images, using lightweight styles and modifier classes. { .lead }

### Responsive Images
Images in Inkline are made responsive using the `.-responsive` modifier. To achieve that, we apply `max-width: 100%;` 
and `height: auto;` to the image so that it scales with the parent element, without surpassing the image's native width.

<i-code-preview title="Responsive Images" link="https://github.com/inkline/inkline/tree/master/src/css/core/images">

<img src="https://placehold.it/1000x400" width="1000" height="400" class="image -responsive" alt="Responsive image" link="https://github.com/inkline/inkline/tree/master/src/css/core/images">

<template slot="html">

~~~html
<img src="..." width="1000" height="400" class="image -responsive" alt="Responsive image">
~~~

</template>
</i-code-preview>

#### SVG Images and IE 10
In Internet Explorer 10, SVG images with `.img.-responsive` are disproportionately sized. 
To fix this, we add `width: 100% \9;` where necessary. This fix improperly sizes other image formats, so we don’t 
apply it automatically unless the extension ends with `.svg`.

### Fluid Images
Images in Inkline can be made fluid using the `.-fluid` modifier. To achieve that, we apply `width: 100%;` 
and `height: auto;` to the image so that it scales with the parent element.

<i-code-preview title="Fluid Images" link="https://github.com/inkline/inkline/tree/master/src/css/core/images">

<img src="https://placehold.it/1200x400" width="1200" height="400" class="image -fluid" alt="Fluid image">

<template slot="html">

~~~html
<img src="..." width="1200" height="400" class="image -fluid" alt="Fluid image">
~~~

</template>
</i-code-preview>

### Image Thumbnails
You can use the `.-thumbnail` modifier to give an image a rounded 1px border appearance.

<i-code-preview title="Image Thumbnails" link="https://github.com/inkline/inkline/tree/master/src/css/core/images">

<img src="https://placehold.it/200x200" class="image -thumbnail" alt="Thumbnail">

<template slot="html">

~~~html
<img src="..." class="image -thumbnail" alt="Thumbnail">
~~~

</template>
</i-code-preview>

### Polaroid
Besides thumbnails, you can opt for a retro look having a larger bottom border using the `.-polaroid` modifier.

<i-code-preview title="Polaroid Image" link="https://github.com/inkline/inkline/tree/master/src/css/core/images">

<img src="https://placehold.it/200x200" class="image -polaroid" alt="Polaroid">

<template slot="html">

~~~html
<img src="..." class="image -polaroid" alt="Polaroid">
~~~

</template>
</i-code-preview>

### Image Alignment
Align images with the helper classes or text alignment classes. Block-level images can be centered using the `._margin-x-auto` 
margin utility class.

<i-code-preview title="Image Alignment - Float Left and Right" link="https://github.com/inkline/inkline/tree/master/src/css/core/images">

<div class="_clearfix">
    <img src="https://placehold.it/200x200" class="image _float-left" alt="Left floating image">
    <img src="https://placehold.it/200x200" class="image _float-right" alt="Right floating image">
</div>

<template slot="html">

~~~html
<img src="..." class="image _float-left" alt="Left floating image">
<img src="..." class="image _float-right" alt="Right floating image">
~~~

</template>
</i-code-preview>

<i-code-preview title="Image Alignment - Text Center" link="https://github.com/inkline/inkline/tree/master/src/css/core/images">

<div class="_text-center">
    <img src="https://placehold.it/200x200" alt="Centered image">
</div>

<template slot="html">

~~~html
<div class="_text-center">
    <img src="https://placehold.it/200x200" alt="Centered image">
</div>
~~~

</template>
</i-code-preview>

<i-code-preview title="Image Alignment - Margin Auto" link="https://github.com/inkline/inkline/tree/master/src/css/core/images">

<img src="https://placehold.it/200x200" class="_display-block _margin-x-auto" alt="Centered image">

<template slot="html">

~~~html
<img src="https://placehold.it/200x200" class="_display-block _margin-x-auto" alt="Centered image">
~~~

</template>
</i-code-preview>

### Picture
If you are using the `<picture>` element to specify multiple `<source>` elements for a specific `<img>`, make sure to add 
the `.img` classes to the `<img>` and not to the `<picture>` tag.

<i-code-preview title="Image Alignment - Margin Auto" default-active="html" link="https://github.com/inkline/inkline/tree/master/src/css/core/images">
<template slot="html">

~~~html
​<picture>
    <source srcset="..." type="image/svg+xml">
    <img src="..." class="img -fluid -thumbnail" alt="...">
</picture>
~~~

</template>
</i-code-preview>
