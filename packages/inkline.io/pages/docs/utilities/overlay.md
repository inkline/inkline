# Overlay Utilities
Make an element overlay its container by adding overlay utilities. {.lead}

### Example
Add the `._overlay` utility class to an element to make it cover the entire containing block. The containing block refers to a parent element with `position: relative;`.

<i-code-preview title="Overlay Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div style="width: 100%; height: 60px;" class="_position-relative _padding-1">
This text is covered by an element with an overlay helper class.
<div class="_overlay" style="background: rgba(0, 0, 0, 0.1);"></div>
</div>

<template slot="html">

~~~html
<div class="_overlay"></div>
~~~

~~~html
<div class="_position-relative">
    <p>This text is covered by an element with an overlay helper class.</p>
    <div class="_overlay" style="background: rgba(0, 0, 0, 0.1);"></div>
</div>
~~~

</template>
</i-code-preview>

### Overlay Link

Add the `._overlay-link` utility class to a link to make the entire containing block clickable using a `::after` pseudo element. In most cases, the containing block refers to the parent element with `position: relative;`.

<i-code-preview title="Link Overlay Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<i-row>
    <i-column md="6">
        <i-card>
            Some quick example text to build on the card title and make up the bulk of the card's content.
            <a class="link _overlay-link" href="http://inkline.io">Example Link</a>
        </i-card>
    </i-column>
</i-row>

<template slot="html">

~~~html
<a class="_overlay-link" href="...">Example Link</a>
~~~

~~~html
<i-card>
    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a class="link _overlay-link" href="http://inkline.io">Example Link</a>
</i-card>
~~~

</template>
</i-code-preview>
