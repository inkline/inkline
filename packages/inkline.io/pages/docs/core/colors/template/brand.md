### Brand
Attract your visitor's attention using brand colors. The main colors of Inkline used for branding are:

<i-code-preview title="Brand Color Background" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl">

<i-row>
    <i-column xs="3">
        <color-box type="primary" title="Primary" description="#178bb2"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="secondary" title="Secondary" description="#5d65b9"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="light" title="Light" description="#e9ecef"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="dark" title="Dark" description="#212529"></color-box>
    </i-column>
</i-row>

You can use helper classes to add brand color backgrounds:

<template slot="html">

~~~html
<div class="_background-primary"></div>
<div class="_background-secondary"></div>
<div class="_background-light"></div>
<div class="_background-dark"></div>
~~~

</template>
</i-code-preview>

You can also add brand text colors using text-specific helper classes:

<i-code-preview title="Brand Color Text" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl">

<ul class="-inline">
    <li class="_text-primary">Primary</li>
    <li class="_text-secondary">Secondary</li>
    <li class="_text-light">Light</li>
    <li class="_text-dark">Dark</li>
</ul>

<template slot="html">

~~~html
<p class="_text-primary"></p>
<p class="_text-secondary"></p>
<p class="_text-light"></p>
<p class="_text-dark"></p>
~~~

</template>
</i-code-preview>
