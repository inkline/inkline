# Breadcrumb
## Indicate the current page’s location depth using a navigation list that automatically adds separators using CSS.{.lead}

### Examples
Separators are automatically added in CSS through `::before` and `content`. You can change the separator by changing the `$breadcrumb-divider` Sass variable.

<i-code-preview title="Breadcrumbs Example">

<i-breadcrumb>
    <i-breadcrumb-item onclick="return false;">Home</i-breadcrumb-item>
    <i-breadcrumb-item active>Breadcrumbs</i-breadcrumb-item>
</i-breadcrumb>

<i-breadcrumb>
    <i-breadcrumb-item href="https://inkline.io" onclick="return false;">Home</i-breadcrumb-item>
    <i-breadcrumb-item href="https://inkline.io" onclick="return false;">Library</i-breadcrumb-item>
    <i-breadcrumb-item active>Data</i-breadcrumb-item>
</i-breadcrumb>

<template slot="html">

~~~html
<i-breadcrumb>
    <i-breadcrumb-item>Home</i-breadcrumb-item>
    <i-breadcrumb-item active>Breadcrumbs</i-breadcrumb-item>
</i-breadcrumb>
~~~
~~~html
<i-breadcrumb>
    <i-breadcrumb-item href="/">Home</i-breadcrumb-item>
    <i-breadcrumb-item :to="{ name: 'docs' }">Library</i-breadcrumb-item>
    <i-breadcrumb-item active>Data</i-breadcrumb-item>
</i-breadcrumb>
~~~

</template>
</i-code-preview>

### Dynamically Generated
You can generate and bind breadcrumbs from your JS data using a combination of `v-for` and `v-bind` as follows:

<i-code-preview title="Dynamically Generated Breadcrumbs">

<i-breadcrumb>
    <i-breadcrumb-item v-bind="item" v-for="item in items" :key="item.title" onclick="return false;">{{item.title}}</i-breadcrumb-item>
</i-breadcrumb>

<template slot="html">
<div v-pre>

~~~html
<i-breadcrumb>
    <i-breadcrumb-item v-bind="item" v-for="item in items" :key="item.title">{{item.title}}</i-breadcrumb-item>
</i-breadcrumb>
~~~

</div>
</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            items: [
                { title: 'Home', href: '/' },
                { title: 'Components', to: 'components' },
                { title: 'Breadcrumbs', active: true }
            ]
        };
    }
};
~~~

</template>
</i-code-preview>


### Sizes
You're able to use the `size` modifier to control the text and spacing size of your breadcrumb, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code-preview title="Breadcrumbs Sizes">

<i-breadcrumb size="sm">
    <i-breadcrumb-item href="/" onclick="return false;">Sizes</i-breadcrumb-item>
    <i-breadcrumb-item active>Small</i-breadcrumb-item>
</i-breadcrumb>
<i-breadcrumb size="md">
    <i-breadcrumb-item href="/" onclick="return false;">Sizes</i-breadcrumb-item>
    <i-breadcrumb-item active>Medium</i-breadcrumb-item>
</i-breadcrumb>
<i-breadcrumb size="lg">
    <i-breadcrumb-item href="/" onclick="return false;">Sizes</i-breadcrumb-item>
    <i-breadcrumb-item active>Large</i-breadcrumb-item>
</i-breadcrumb>

<template slot="html">

~~~html
<i-breadcrumb size="sm">
    <i-breadcrumb-item href="/">Sizes</i-breadcrumb-item>
    <i-breadcrumb-item active>Small</i-breadcrumb-item>
</i-breadcrumb>
~~~
~~~html
<i-breadcrumb size="md">
    <i-breadcrumb-item href="/">Sizes</i-breadcrumb-item>
    <i-breadcrumb-item active>Medium</i-breadcrumb-item>
</i-breadcrumb>
~~~
~~~html
<i-breadcrumb size="lg">
    <i-breadcrumb-item href="/">Sizes</i-breadcrumb-item>
    <i-breadcrumb-item active>Large</i-breadcrumb-item>
</i-breadcrumb>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Breadcrumb API" expanded markup="i-breadcrumb" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Breadcrumb">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the breadcrumb component.</template>
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
                <template slot="description">Slot for breadcrumb default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Breadcrumb Item API" expanded markup="i-breadcrumb-item" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/BreadcrumbItem">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">active</template>
                <template slot="description">Sets the breadcrumb item component as active.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the breadcrumb item component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">href</template>
                <template slot="description">Treats the breadcrumb item component as an anchor.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">to</template>
                <template slot="description">Treats the breadcrumb item component as a <code>router-link</code>.</template>
                <template slot="type">Object</template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for breadcrumb item default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
