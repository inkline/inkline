---
title: Overlay Utilities
description: Make an element overlay its container by adding overlay utilities. 
---
### Example
Add the `._overlay` utility class to an element to make it cover the entire containing block. The containing block refers to a parent element with `position: relative;`.

<i-code title="Overlay Utility Example">
<i-tab type="preview">
    <div style="width: 100%; height: 60px;" class="_position-relative _padding-1">
        This text is covered by an element with an overlay helper class.
        <div class="_overlay" style="background: rgba(0, 0, 0, 0.1);"></div>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_overlay"></div>
~~~

~~~html
<div class="_position-relative">
    <p>This text is covered by an element with an overlay helper class.</p>
    <div class="_overlay" style="background: rgba(0, 0, 0, 0.1);"></div>
</div>
~~~

</i-tab>
</i-code>

### Overlay Link

Add the `._overlay-link` utility class to a link to make the entire containing block clickable using a `::after` pseudo element. In most cases, the containing block refers to the parent element with `position: relative;`.

<i-code title="Link Overlay Utility Example">
<i-tab type="preview">
    <i-row>
        <i-column md="6">
            <i-card>
                Some quick example text to build on the card title and make up the bulk of the card's content.
                <a class="link _overlay-link" href="https://inkline.io">Example Link</a>
            </i-card>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<a class="_overlay-link" href="...">Example Link</a>
~~~

~~~html
<i-card>
    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a class="link _overlay-link" href="https://inkline.io">Example Link</a>
</i-card>
~~~

</i-tab>
</i-code>
