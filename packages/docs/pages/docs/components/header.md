# Header
## A lightweight, responsive header component used for showcasing hero unit style content.{.lead}

### Example
Here’s an example of the basic components included in a  `<i-navbar>` that automatically collapses responsively.

<i-code-preview title="Header Example">

<i-header class="_text-center">
    <p class="h1">Inkline Header</p>
    <p>This is a header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>

<template slot="html">

~~~html
<i-header class="_text-center">
    <h1>Inkline Header</h1>
    <p>This is a header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your header, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Header Small Size">

<i-header size="sm" class="_text-center">
    <p class="h1">Small Inkline Header</p>
    <p>This is a small header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>

<template slot="html">

~~~html
<i-header size="sm" class="_text-center">
    <h1>Small Inkline Header</h1>
    <p>This is a small header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</template>
</i-code-preview>

<i-code-preview title="Header Medium Size">

<i-header size="md" class="_text-center">
    <p class="h1">Medium Inkline Header</p>
    <p>This is a medium header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>

<template slot="html">

~~~html
<i-header size="md" class="_text-center">
    <h1>Medium Inkline Header</h1>
    <p>This is a medium header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</template>
</i-code-preview>

<i-code-preview title="Header Large Size">

<i-header size="lg" class="_text-center">
    <p class="h1">Large Inkline Header</p>
    <p>This is a large header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>

<template slot="html">

~~~html
<i-header size="lg" class="_text-center">
    <h1>Large Inkline Header</h1>
    <p>This is a large header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</template>
</i-code-preview>

### Fullscreen
You can make headers cover the whole screen width and height (using `vw` and `vh`) by adding the `fullscreen` property. The width and height do not overflow the size of the parent container.

<i-code-preview title="Fullescreen Header">

<i-header fullscreen class="_text-center">
    <p class="h1">Fullscreen Inkline Header</p>
    <p>This is a fullscreen header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>

<template slot="html">

~~~html
<i-header fullscreen class="_text-center">
    <h1>Fullscreen Inkline Header</h1>
    <p>This is a fullscreen header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</template>
</i-code-preview>

### Cover Background
The goal of cover background images on a website is to cover the entire browser window at all times. Simply set a background for the header

<i-code-preview title="Header Cover Background">

<i-header id="cover-inkline-header" :cover="true" class="_text-center _text-white">
    <p class="h1">Cover Inkline Header</p>
    <p>This is a fullscreen header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>

<template slot="html">

~~~html
<i-header id="header" :cover="true" class="_text-center _text-white">
    <h1>Cover Inkline Header</h1>
    <p>This is a cover background header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>
~~~

</template>
<template slot="css">

~~~css
#header {
    background-image: url(images/background.jpg);
}
~~~

</template>
</i-code-preview>

### API

<i-api-preview title="Header API" expanded markup="i-header" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Header">
    <template slot="props">
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
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for header default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
