# Header
A responsive navigation header that includes support for branding, navigation, forms and more.{.lead}

### Example
Here’s an example of the basic components included in a  `<i-navbar>` that automatically collapses responsively.

<i-code-preview title="Header Example" link="https://github.com/inkline/inkline/tree/master/src/components/Header">

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

<i-code-preview title="Header Small Size" link="https://github.com/inkline/inkline/tree/master/src/components/Header">

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

<i-code-preview title="Header Medium Size" link="https://github.com/inkline/inkline/tree/master/src/components/Header">

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

<i-code-preview title="Header Large Size" link="https://github.com/inkline/inkline/tree/master/src/components/Header">

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

<i-code-preview title="Fullescreen Header" link="https://github.com/inkline/inkline/tree/master/src/components/Header">

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

<i-code-preview title="Header Cover Background" link="https://github.com/inkline/inkline/tree/master/src/components/Header">

<i-header id="header" class="_text-center _text-white">
    <p class="h1">Cover Inkline Header</p>
    <p>This is a fullscreen header paragraph lorem ipsum dolor sit amet.</p>
    <i-button variant="primary">Button</i-button>
</i-header>

<template slot="html">

~~~html
<i-header id="header" class="_text-center _text-white">
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

<i-api-preview title="Header API" expanded markup="i-header" link="https://github.com/inkline/inkline/tree/master/src/components/Header">
    <template slot="props">
        <table class="table -bordered">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>fluid</td>
                    <td>Sets the <code>IContainer</code> wrapping the header component's content as fluid.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>fullscreen</td>
                    <td>Sets the Header component to cover the whole screen width and height.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the header component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for header default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>