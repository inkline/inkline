# Badge
## Documentation and examples for badges, a small component used for counting and labeling.{.lead}


### Variants
Inkline includes several predefined badge styles, each serving its own semantic purpose, which you can control using the `variant` property.

<i-code-preview title="Badge Variants">
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

<i-code-preview title="Badge Sizes">
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

<i-code-preview title="Badge Heading Sizes">
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

<i-api-preview title="Badge API" expanded markup="i-badge" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Badge">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the badge component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the badge component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>primary</code>, <code>secondary</code>, <code>light</code>, <code>dark</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></template>
                <template slot="default"><code>primary</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for badge default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
