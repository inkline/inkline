---
title: Sizing Utilities
description: Make an element as wide or as tall as you need using width and height utilities. 
---
Width and height utilities provide support for `25%`, `50%`, `75%`, `100%`, and auto by default.

### Width

<i-code title="Width Utility Example">
<i-tab type="preview">
    <div class="_width-25 _padding-1 _background-gray-20">25% Width</div>
    <div class="_width-50 _padding-1 _background-gray-20">50% Width</div>
    <div class="_width-75 _padding-1 _background-gray-20">75% Width</div>
    <div class="_width-100 _padding-1 _background-gray-20">100% Width</div>
    <div class="_width-auto _padding-1 _background-gray-20">Auto Width</div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_width-25">25% Width</div>
~~~
~~~html
<div class="_width-50">50% Width</div>
~~~
~~~html
<div class="_width-75">75% Width</div>
~~~
~~~html
<div class="_width-100">100% Width</div>
~~~
~~~html
<div class="_width-auto">Auto Width</div>
~~~

</i-tab>
</i-code>

### Height

<i-code title="Height Utility Example">

<i-tab type="preview">
    <div style="height: 200px;" class="_display-flex">
        <div class="_height-25 _padding-1 _background-gray-20" style="width: 20%;">25% Height</div>
        <div class="_height-50 _padding-1 _background-gray-20" style="width: 20%;">50% Height</div>
        <div class="_height-75 _padding-1 _background-gray-20" style="width: 20%;">75% Height</div>
        <div class="_height-100 _padding-1 _background-gray-20" style="width: 20%;">100% Height</div>
        <div class="_height-auto _padding-1 _background-gray-20" style="width: 20%;">Auto Height</div>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_height-25">25% Height</div>
~~~
~~~html
<div class="_height-50">50% Height</div>
~~~
~~~html
<div class="_height-75">75% Height</div>
~~~
~~~html
<div class="_height-100">100% Height</div>
~~~
~~~html
<div class="_height-auto">Auto Height</div>
~~~

</i-tab>
</i-code>

### Max Width

<i-code title="Max Width Utility Example">
<i-tab type="preview">
    <div class="_max-width-100 _padding-1 _background-gray-20">100% Max Width</div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_max-width-100">100% Max Width</div>
~~~

</i-tab>
</i-code>

### Max Height

<i-code title="Max Height Utility Example">
<i-tab type="preview">
    <div style="height: 200px;" class="_display-flex">
        <div class="_max-height-100 _padding-1 _background-gray-20" style="width: 25%;">100% Max Height</div>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_max-height-100">100% Max Height</div>
~~~

</i-tab>
</i-code>

### Viewport Relative Sizing
You can also use utilities to set the width and height relative to the viewport.

~~~html
<div class="_vw-100">100% Viewport Width</div>
<div class="_vh-100">100% Viewport Height</div>
<div class="_max-vw-100">100% Max Viewport Width</div>
<div class="_max-vh-100">100% Max Viewport Height</div>
~~~
