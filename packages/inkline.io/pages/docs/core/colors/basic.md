### Basic
Basic colors are useful when working with multiple colors on the same page. The following basic colors are 
available when using the default variant.

You can use helper classes to add state color backgrounds:

<i-code-preview title="Basic Color Background" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<i-row>
    <i-column xs="12" sm="6" md="3">
        <color-box type="red" title="Red" description="#f25f5c"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="orange" title="Orange" description="#f1ac53"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="yellow" title="Yellow" description="#ffe066"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="green" title="Green" description="#5fb072"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="teal" title="Teal" description="#62bec1"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="blue" title="Blue" description="#178bb2"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="purple" title="Purple" description="#5d65b9"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="pink" title="Pink" description="#ff6f80"></color-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<div class="_background-red"></div>
<div class="_background-orange"></div>
<div class="_background-yellow"></div>
<div class="_background-green"></div>
<div class="_background-teal"></div>
<div class="_background-blue"></div>
<div class="_background-purple"></div>
<div class="_background-pink"></div>
~~~

</template>
</i-code-preview>

You can also add state text colors using text-specific helper classes:

<i-code-preview title="Basic Color Text" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<ul class="-inline">
    <li class="_text-red">Red</li>
    <li class="_text-orange">Orange</li>
    <li class="_text-yellow">Yellow</li>
    <li class="_text-green">Green</li>
    <li class="_text-teal">Teal</li>
    <li class="_text-blue">Blue</li>
    <li class="_text-purple">Purple</li>
    <li class="_text-pink">Pink</li>
</ul>

<template slot="html">

~~~html
<p class="_text-red"></p>
<p class="_text-orange"></p>
<p class="_text-yellow"></p>
<p class="_text-green"></p>
<p class="_text-teal"></p>
<p class="_text-blue"></p>
<p class="_text-purple"></p>
<p class="_text-pink"></p>
~~~

</template>
</i-code-preview>
