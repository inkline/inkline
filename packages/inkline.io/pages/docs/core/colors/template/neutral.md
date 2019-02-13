### Neutral
Neutral colors are used for text, background and border colors. You can use different neutral colors to display your content:

<i-code-preview title="Neutral Color Background" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl">

<i-row>
    <i-column xs="3">
        <color-box type="white" title="White" description="#ffffff"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="gray-10" title="10% Gray" description="#f8f9fa"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="gray-20" title="20% Gray" description="#e9ecef"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="gray-30" title="30% Gray" description="#dee2e6"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="gray-40" title="40% Gray" description="#ced4da"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="gray-50" title="50% Gray" description="#adb5bd"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="gray-60" title="60% Gray" description="#868e96"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="gray-70" title="70% Gray" description="#495057"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="gray-80" title="80% Gray" description="#343a40"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="gray-90" title="90% Gray" description="#212529"></color-box>
    </i-column>
    <i-column xs="3">
        <color-box type="black" title="Black" description="#000000"></color-box>
    </i-column>
</i-row>


You can use helper classes to add neutral color backgrounds:

<template slot="html">

~~~html
<div class="_background-white"></div>
<div class="_background-gray-10"></div>
<div class="_background-gray-20"></div>
<div class="_background-gray-30"></div>
<div class="_background-gray-40"></div>
<div class="_background-gray-50"></div>
<div class="_background-gray-60"></div>
<div class="_background-gray-70"></div>
<div class="_background-gray-80"></div>
<div class="_background-gray-90"></div>
<div class="_background-black"></div>
~~~

</template>
</i-code-preview>

You can also add neutral text colors using text-specific helper classes:

<i-code-preview title="Neutral Color Text" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl">

<ul class="-inline">
    <li class="_text-white _background-black">White</li>
    <li class="_text-gray-10">10% Gray</li>
    <li class="_text-gray-20">20% Gray</li>
    <li class="_text-gray-30">30% Gray</li>
    <li class="_text-gray-40">40% Gray</li>
    <li class="_text-gray-50">50% Gray</li>
    <li class="_text-gray-60">60% Gray</li>
    <li class="_text-gray-70">70% Gray</li>
    <li class="_text-gray-80">80% Gray</li>
    <li class="_text-gray-90">90% Gray</li>
    <li class="_text-black">Black</li>
</ul>

<template slot="html">

~~~html
<p class="_text-white"></p>
<p class="_text-gray-10"></p>
<p class="_text-gray-20"></p>
<p class="_text-gray-30"></p>
<p class="_text-gray-40"></p>
<p class="_text-gray-50"></p>
<p class="_text-gray-60"></p>
<p class="_text-gray-70"></p>
<p class="_text-gray-80"></p>
<p class="_text-gray-90"></p>
<p class="_text-black"></p>
~~~

</template>
</i-code-preview>
