# Colors
Inkline uses a beautiful, consistent color scheme across the framework. { .lead }

### Brand
Attract your visitor's attention using brand colors. The main colors of Inkline used for branding are:

<i-code-preview title="Brand Color Background" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<i-row>
    <i-column xs="12" sm="6" md="3">
        <color-box type="primary" title="Primary" description="#178bb2"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="secondary" title="Secondary" description="#5d65b9"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="light" title="Light" description="#e9ecef"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="dark" title="Dark" description="#212529"></color-box>
    </i-column>
</i-row>

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

<i-code-preview title="Brand Color Text" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

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

### State
When displaying state information such as info, success, warning, or error messages, you will need to color your message accordingly. The state colors are:

<i-code-preview title="State Color Background" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<i-row>
    <i-column xs="12" sm="6" md="3">
        <color-box type="info" title="Info" description="#62bec1"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="success" title="Success" description="#5fb072"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="warning" title="Warning" description="#f1ac53"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="danger" title="Danger" description="#f25f5c"></color-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<div class="_background-info"></div>
<div class="_background-success"></div>
<div class="_background-warning"></div>
<div class="_background-danger"></div>
~~~

</template>
</i-code-preview>

You can also add state text colors using text-specific helper classes:

<i-code-preview title="State Color Text" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<ul class="-inline">
    <li class="_text-info">Info</li>
    <li class="_text-success">Success</li>
    <li class="_text-warning">Warning</li>
    <li class="_text-danger">Danger</li>
</ul>

<template slot="html">

~~~html
<p class="_text-info"></p>
<p class="_text-success"></p>
<p class="_text-warning"></p>
<p class="_text-danger"></p>
~~~

</template>
</i-code-preview>

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


### Neutral
Neutral colors are used for text, background and border colors. You can use different neutral colors to display your content:

<i-code-preview title="Neutral Color Background" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<i-row>
    <i-column xs="12" sm="6" md="3">
        <color-box type="white" title="White" description="#ffffff"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="gray-10" title="10% Gray" description="#f8f9fa"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="gray-20" title="20% Gray" description="#e9ecef"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="gray-30" title="30% Gray" description="#dee2e6"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="gray-40" title="40% Gray" description="#ced4da"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="gray-50" title="50% Gray" description="#adb5bd"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="gray-60" title="60% Gray" description="#868e96"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="gray-70" title="70% Gray" description="#495057"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="gray-80" title="80% Gray" description="#343a40"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="gray-90" title="90% Gray" description="#212529"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="black" title="Black" description="#000000"></color-box>
    </i-column>
</i-row>

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

<i-code-preview title="Neutral Color Text" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

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

### Social Media
Inkline provides social media colors from most of your favorite sites.

You can use helper classes to add social media color backgrounds:

<i-code-preview title="Social Media Color Background" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<i-row>
    <i-column xs="12" sm="6" md="3">
        <color-box type="facebook" title="Facebook" description="#3b5998"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="twitter" title="Twitter" description="#1da1f2"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="google" title="Google" description="#dd4b39"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="instagram" title="Instagram" description="#fd1d1d"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="dribbble" title="Dribbble" description="#ea4c89"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="behance" title="Behance" description="#1769ff"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="flickr" title="Flickr" description="#ff0084"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="linkedin" title="LinkedIn" description="#0077b5"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="youtube" title="YouTube" description="#b31217"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="pinterest" title="Pinterest" description="#bd081c"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="github" title="Github" description="#333333"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="tumblr" title="Tumblr" description="#35465c"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="twitch" title="Twitch" description="#6441a5"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="envato" title="Envato" description="#82b541"></color-box>
    </i-column>
    <i-column xs="12" sm="6" md="3">
        <color-box type="vine" title="Vine" description="#00bf8f"></color-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<div class="_background-facebook"></div>
<div class="_background-twitter"></div>
<div class="_background-google-plus"></div>
<div class="_background-instagram"></div>
<div class="_background-dribbble"></div>
<div class="_background-flickr"></div>
<div class="_background-linkedin"></div>
<div class="_background-youtube"></div>
<div class="_background-pinterest"></div>
<div class="_background-github"></div>
<div class="_background-tumblr"></div>
<div class="_background-twitch"></div>
<div class="_background-envato"></div>
<div class="_background-vine"></div>
~~~

</template>
</i-code-preview>

You can also add social media text colors using text-specific helper classes:

<i-code-preview title="Social Media Color Text" link="https://github.com/inkline/inkline/blob/master/src/css/config/_colors.styl" class="_padding-bottom-0">

<ul class="-inline">
    <li class="_text-facebook">Facebook</li>
    <li class="_text-twitter">Twitter</li>
    <li class="_text-google-plus">Google Plus</li>
    <li class="_text-instagram">Instagram</li>
    <li class="_text-dribbble">Dribbble</li>
    <li class="_text-flickr">Flickr</li>
    <li class="_text-linkedin">LinkedIn</li>
    <li class="_text-youtube">YouTube</li>
    <li class="_text-pinterest">Pinterest</li>
    <li class="_text-github">GitHub</li>
    <li class="_text-tumblr">Tumblr</li>
    <li class="_text-twitch">Twitch</li>
    <li class="_text-envato">Envato</li>
    <li class="_text-vine">Vine</li>
</ul>

<template slot="html">

~~~html
<p class="_text-facebook"></p>
<p class="_text-twitter"></p>
<p class="_text-google-plus"></p>
<p class="_text-instagram"></p>
<p class="_text-dribbble"></p>
<p class="_text-flickr"></p>
<p class="_text-linkedin"></p>
<p class="_text-youtube"></p>
<p class="_text-pinterest"></p>
<p class="_text-github"></p>
<p class="_text-tumblr"></p>
<p class="_text-twitch"></p>
<p class="_text-envato"></p>
<p class="_text-vine"></p>
~~~

</template>
</i-code-preview>

