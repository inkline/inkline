### Headings
All HTML headings, `<h1>` through `<h6>`, are available.

<i-code-preview title="Typography - Headings" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<div class="headings-list">
    <h1>h1. Inkline heading</h1>
    <h2>h2. Inkline heading</h2>
    <h3>h3. Inkline heading</h3>
    <h4>h4. Inkline heading</h4>
    <h5>h5. Inkline heading</h5>
    <h6>h6. Inkline heading</h6>
</div>

<template slot="html">

~~~html
<h1>h1. Inkline heading</h1>
<h2>h2. Inkline heading</h2>
<h3>h3. Inkline heading</h3>
<h4>h4. Inkline heading</h4>
<h5>h5. Inkline heading</h5>
<h6>h6. Inkline heading</h6>
~~~

</template>
</i-code-preview>

You can use helper classes to achieve heading styles. Classes `.h1` through `.h6` are available, for when you 
want to match the font styling of a heading but cannot use the associated HTML element.

<i-code-preview title="Typography - Heading Helpers" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<div class="headings-list">
    <div><span class="h1">h1. Inkline heading</span></div>
    <div><span class="h2">h2. Inkline heading</span></div>
    <div><span class="h3">h3. Inkline heading</span></div>
    <div><span class="h4">h4. Inkline heading</span></div>
    <div><span class="h5">h5. Inkline heading</span></div>
    <div><span class="h6">h6. Inkline heading</span></div>
</div>

<template slot="html">

~~~html
<span class="h1">h1. Inkline heading</span>
<span class="h2">h2. Inkline heading</span>
<span class="h3">h3. Inkline heading</span>
<span class="h4">h4. Inkline heading</span>
<span class="h5">h5. Inkline heading</span>
<span class="h6">h6. Inkline heading</span>
~~~

</template>
</i-code-preview>
