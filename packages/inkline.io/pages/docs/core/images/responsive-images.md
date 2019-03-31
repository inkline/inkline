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
