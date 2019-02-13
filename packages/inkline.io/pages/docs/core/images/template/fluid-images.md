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
