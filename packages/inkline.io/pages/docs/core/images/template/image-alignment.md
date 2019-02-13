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
