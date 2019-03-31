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
