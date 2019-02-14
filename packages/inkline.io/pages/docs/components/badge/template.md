# Badge
Documentation and examples for badges, a small component used for counting and labeling.{.lead}


### Variants
Inkline includes several predefined badge styles, each serving its own semantic purpose, which you can control using the `variant` property.

<i-code-preview title="Badge Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Badge">
<i-badge variant="primary">
    Primary
</i-badge>&nbsp; 
<i-badge variant="secondary">
    Secondary
</i-badge>&nbsp; 
<i-badge variant="light">
    Light
</i-badge>&nbsp; 
<i-badge variant="dark">
    Dark
</i-badge>&nbsp; 
<i-badge variant="info">
    Info
</i-badge>&nbsp; 
<i-badge variant="success">
    Sucess
</i-badge>&nbsp; 
<i-badge variant="warning">
    Warning
</i-badge>&nbsp; 
<i-badge variant="danger">
    Danger
</i-badge>
    
<template slot="html">

~~~html
<i-badge variant="primary">Primary</i-badge>
~~~
~~~html
<i-badge variant="secondary">Secondary</i-badge>
~~~
~~~html
<i-badge variant="light">Light</i-badge>
~~~
~~~html
<i-badge variant="dark">Dark</i-badge>
~~~
~~~html
<i-badge variant="info">Info</i-badge>
~~~
~~~html
<i-badge variant="success">Success</i-badge>
~~~
~~~html
<i-badge variant="warning">Warning</i-badge>
~~~
~~~html
<i-badge variant="danger">Danger</i-badge>
~~~

</template>
</i-code-preview>

### Sizes

You're able to use the `size` modifier to control the text and spacing size of your badges, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code-preview title="Badge Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Badge">
<i-badge size="sm">
    Small
</i-badge>&nbsp; 
<i-badge size="md">
    Medium
</i-badge>&nbsp; 
<i-badge size="lg">
    Large
</i-badge>

<template slot="html">

~~~html
<i-badge size="sm">Small</i-badge>
~~~
~~~html
<i-badge size="md">Medium</i-badge>
~~~
~~~html
<i-badge size="lg">Large</i-badge>
~~~

</template>
</i-code-preview>

Badges always match the size of the immediate parent element by using relative font sizing and `em` units.

<i-code-preview title="Badge Heading Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Badge">
<h1 class="_margin-top-0">Heading 1 <i-badge variant="primary">New</i-badge></h1>
<h2 class="_margin-top-0">Heading 2 <i-badge variant="primary">New</i-badge></h2>
<h3 class="_margin-top-0">Heading 3 <i-badge variant="primary">New</i-badge></h3>
<h4 class="_margin-top-0">Heading 4 <i-badge variant="primary">New</i-badge></h4>
<h5 class="_margin-top-0">Heading 5 <i-badge variant="primary">New</i-badge></h5>
<h6 class="_margin-top-0">Heading 6 <i-badge variant="primary">New</i-badge></h6>

<template slot="html">

~~~html
<h1>Heading 1 <i-badge variant="primary">New</i-badge></h1>
~~~
~~~html
<h2>Heading 2 <i-badge variant="primary">New</i-badge></h2>
~~~
~~~html
<h3>Heading 3 <i-badge variant="primary">New</i-badge></h3>
~~~
~~~html
<h4>Heading 4 <i-badge variant="primary">New</i-badge></h4>
~~~
~~~html
<h5>Heading 5 <i-badge variant="primary">New</i-badge></h5>
~~~
~~~html
<h6>Heading 6 <i-badge variant="primary">New</i-badge></h6>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Badge API" expanded markup="i-badge" link="https://github.com/inkline/inkline/tree/master/src/components/Badge">
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
                    <td>size</td>
                    <td>Sets the size of the badge component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the badge component.</td>
                    <td><code>String</code></td>
                    <td><code>primary</code>, <code>secondary</code>, <code>light</code>, <code>dark</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></td>
                    <td><code>primary</code></td>
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
                    <td>Slot for badge default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
