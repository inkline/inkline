# Border Utilities
Use border utilities to quickly apply border styles to an element. Great for images, buttons, or any other element. { .lead }

### Adding Border
You can use border utilities to add borders on all sides or individually on an element.

<i-code-preview title="Border Addition Utilities" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="border-square _border"></div>
<div class="border-square _border-top"></div>
<div class="border-square _border-right"></div>
<div class="border-square _border-bottom"></div>
<div class="border-square _border-left"></div>

<template slot="html">

~~~html
<div class="_border"></div>
<div class="_border-top"></div>
<div class="_border-right"></div>
<div class="_border-bottom"></div>
<div class="_border-left"></div>
~~~

</template>
</i-code-preview>

### Removing Border
You can use border utilities to remove borders on all sides or individually on an element.

<i-code-preview title="Border Removal Utilities" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="border-square _border _border-0"></div>
<div class="border-square _border _border-top-0"></div>
<div class="border-square _border _border-right-0"></div>
<div class="border-square _border _border-bottom-0"></div>
<div class="border-square _border _border-left-0"></div>

<template slot="html">

~~~html
<div class="_border-0"></div>
<div class="_border-top-0"></div>
<div class="_border-right-0"></div>
<div class="_border-bottom-0"></div>
<div class="_border-left-0"></div>
~~~

</template>
</i-code-preview>


### Border Color
You can use border addition and removal utilities together with border color utilities to set their color.

<i-code-preview title="Border Removal Utilities" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div><strong><small>Brand</small></strong></div>
<div class="border-square _border _border-color-primary"></div>
<div class="border-square _border _border-color-secondary"></div>
<div class="border-square _border _border-color-light"></div>
<div class="border-square _border _border-color-dark"></div>
<div><strong><small>Monochrome</small></strong></div>
<div class="border-square _border _border-color-white"></div>
<div class="border-square _border _border-color-gray-10"></div>
<div class="border-square _border _border-color-gray-20"></div>
<div class="border-square _border _border-color-gray-30"></div>
<div class="border-square _border _border-color-gray-40"></div>
<div class="border-square _border _border-color-gray-50"></div>
<div class="border-square _border _border-color-gray-60"></div>
<div class="border-square _border _border-color-gray-70"></div>
<div class="border-square _border _border-color-gray-80"></div>
<div class="border-square _border _border-color-gray-90"></div>
<div class="border-square _border _border-color-black"></div>
<div><strong><small>State</small></strong></div>
<div class="border-square _border _border-color-info"></div>
<div class="border-square _border _border-color-success"></div>
<div class="border-square _border _border-color-warning"></div>
<div class="border-square _border _border-color-danger"></div>

<template slot="html">

~~~html
<div class="_border-color-primary"></div>
<div class="_border-color-secondary"></div>
<div class="_border-color-light"></div>
<div class="_border-color-dark"></div>
~~~
~~~html
<div class="_border-color-white"></div>
<div class="_border-color-gray-10"></div>
<div class="_border-color-gray-20"></div>
<div class="_border-color-gray-30"></div>
<div class="_border-color-gray-40"></div>
<div class="_border-color-gray-50"></div>
<div class="_border-color-gray-60"></div>
<div class="_border-color-gray-70"></div>
<div class="_border-color-gray-80"></div>
<div class="_border-color-gray-90"></div>
<div class="_border-color-black"></div>
~~~
~~~html
<div class="_border-color-info"></div>
<div class="_border-color-success"></div>
<div class="_border-color-warning"></div>
<div class="_border-color-danger"></div>
~~~

</template>
</i-code-preview>

Position specific border colors are also available. Use `._border-{position}-color-{variant}` to set the color of a specific border side (i.e. `._border-top-color-primary`). 


### Border Radius
You can use border radius utilities to add rounded corners to your elements.

<i-code-preview title="Border Radius Utilities" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="border-square _border _rounded"></div>
<div class="border-square _border _rounded-top"></div>
<div class="border-square _border _rounded-right"></div>
<div class="border-square _border _rounded-bottom"></div>
<div class="border-square _border _rounded-left"></div>
<div class="border-square _border _rounded-top-left"></div>
<div class="border-square _border _rounded-top-right"></div>
<div class="border-square _border _rounded-bottom-right"></div>
<div class="border-square _border _rounded-bottom-left"></div>
<div class="border-square _border _rounded-circle"></div>
<div class="border-square _border _rounded-0"></div>

<template slot="html">

~~~html
<div class="_rounded"></div>
<div class="_rounded-top"></div>
<div class="_rounded-right"></div>
<div class="_rounded-bottom"></div>
<div class="_rounded-left"></div>
<div class="_rounded-top-left"></div>
<div class="_rounded-top-right"></div>
<div class="_rounded-bottom-right"></div>
<div class="_rounded-bottom-left"></div>
<div class="_rounded-circle"></div>
<div class="_rounded-0"></div>
~~~

</template>
</i-code-preview>
