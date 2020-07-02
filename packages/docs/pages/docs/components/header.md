---
title: Header
description: A lightweight, responsive header component used for showcasing hero unit style content.
---

# Header
## A lightweight, responsive header component used for showcasing hero unit style content.

### Example
Here’s an example of the basic components included in a  `<i-navbar>` that automatically collapses responsively.

<i-code title="Header Example">
<i-tab type="preview">
    <i-header class="_text-center">
        <p class="h1">Inkline Header</p>
        <p>This is a header paragraph lorem ipsum dolor sit amet.</p>
        <i-button variant="primary">Button</i-button>
    </i-header>
</i-tab>
<i-tab type="html">

~~~html
<i-header class="_text-center">
    <h1>Inkline Header</h1>
    <p>This is a header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your header, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Header Small Size">
<i-tab type="preview">
    <i-header size="sm" class="_text-center">
        <p class="h1">Small Inkline Header</p>
        <p>This is a small header paragraph lorem ipsum dolor sit amet.</p>
        <i-button variant="primary">Button</i-button>
    </i-header>
</i-tab>
<i-tab type="html">

~~~html
<i-header size="sm" class="_text-center">
    <h1>Small Inkline Header</h1>
    <p>This is a small header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</i-tab>
</i-code>

<i-code title="Header Medium Size">
<i-tab type="preview">
    <i-header size="md" class="_text-center">
        <p class="h1">Medium Inkline Header</p>
        <p>This is a medium header paragraph lorem ipsum dolor sit amet.</p>
        <i-button variant="primary">Button</i-button>
    </i-header>
</i-tab>
<i-tab type="html">

~~~html
<i-header size="md" class="_text-center">
    <h1>Medium Inkline Header</h1>
    <p>This is a medium header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</i-tab>
</i-code>

<i-code title="Header Large Size">
<i-tab type="preview">
    <i-header size="lg" class="_text-center">
        <p class="h1">Large Inkline Header</p>
        <p>This is a large header paragraph lorem ipsum dolor sit amet.</p>
        <i-button variant="primary">Button</i-button>
    </i-header>
</i-tab>
<i-tab type="html">

~~~html
<i-header size="lg" class="_text-center">
    <h1>Large Inkline Header</h1>
    <p>This is a large header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</i-tab>
</i-code>

### Fullscreen
You can make headers cover the whole screen width and height (using `vw` and `vh`) by adding the `fullscreen` property. The width and height do not overflow the size of the parent container.

<i-code title="Fullescreen Header">
<i-tab type="preview">
    <i-header fullscreen class="_text-center">
        <p class="h1">Fullscreen Inkline Header</p>
        <p>This is a fullscreen header paragraph lorem ipsum dolor sit amet.</p>
        <i-button variant="primary">Button</i-button>
    </i-header>
</i-tab>
<i-tab type="html">

~~~html
<i-header fullscreen class="_text-center">
    <h1>Fullscreen Inkline Header</h1>
    <p>This is a fullscreen header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</i-tab>
</i-code>

### Cover Background
The goal of cover background images on a website is to cover the entire browser window at all times. Simply set a background for the header

<i-code title="Header Cover Background">
<i-tab type="preview">
    <i-header id="cover-inkline-header" :cover="true" class="_text-center _text-white">
        <p class="h1">Cover Inkline Header</p>
        <p>This is a fullscreen header paragraph lorem ipsum dolor sit amet.</p>
        <i-button variant="primary">Button</i-button>
    </i-header>
</i-tab>
<i-tab type="html">

~~~html
<i-header id="header" :cover="true" class="_text-center _text-white">
    <h1>Cover Inkline Header</h1>
    <p>This is a cover background header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</i-tab>
<i-tab slot="css">

~~~css
#header {
    background-image: url(images/background.jpg);
}
~~~

</i-tab>
</i-code>

### Component API
Here you can find a list of the various customization options you can use for the header component as props, as well as available slots.

<i-code title="Header API" expanded markup="i-header" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IHeader">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">cover</template>
                <template slot="description">Sets the background image as cover, resizing itself responsively to fit the header size.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">fluid</template>
                <template slot="description">Sets the <code>IContainer</code> wrapping the headers's content as fluid.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">fullscreen</template>
                <template slot="description">Sets the Header component to cover the whole screen width and height.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the header component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the header component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for header default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the header components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Header" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$header-padding-base</template>
                <template slot="default"><code>10rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$header-padding</template>
                <template slot="default"><code>size-map($header-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$header-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$header-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$header-variant-{variant}</template>
                <template slot="default"><code>header-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$header-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $header-variant-light,
    dark: $header-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">header-variant</template>
<template slot="default-row">
                
~~~scss
@function header-variant($variant) {
    $header-variant-background: $variant;

    $variant-map: (
        background: $header-variant-background
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
