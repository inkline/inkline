# Breadcrumb
## Indicate the current page’s location depth using a navigation list that automatically adds separators using CSS.{.lead}

### Examples
Separators are automatically added in CSS through `::before` and `content`. You can change the separator by changing the `--breadcrumb-separator` stylus variable.

<i-code-preview title="Breadcrumbs Example" link="https://github.com/inkline/inkline/tree/master/src/components/Breadcrumb">

<i-breadcrumb>
    <i-breadcrumb-item>Home</i-breadcrumb-item>
    <i-breadcrumb-item active>Breadcrumbs</i-breadcrumb-item>
</i-breadcrumb>

<i-breadcrumb>
    <i-breadcrumb-item href="/">Home</i-breadcrumb-item>
    <i-breadcrumb-item href="/">Library</i-breadcrumb-item>
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

<i-code-preview title="Dynamically Generated Breadcrumbs" link="https://github.com/inkline/inkline/tree/master/src/components/Breadcrumb">

<i-breadcrumb>
    <i-breadcrumb-item v-bind="item" v-for="item in items" :key="item.title">{{item.title}}</i-breadcrumb-item>
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

<i-code-preview title="Breadcrumbs Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Breadcrumb">

<i-breadcrumb size="sm">
    <i-breadcrumb-item href="/">Sizes</i-breadcrumb-item>
    <i-breadcrumb-item active>Small</i-breadcrumb-item>
</i-breadcrumb>
<i-breadcrumb size="md">
    <i-breadcrumb-item href="/">Sizes</i-breadcrumb-item>
    <i-breadcrumb-item active>Medium</i-breadcrumb-item>
</i-breadcrumb>
<i-breadcrumb size="lg">
    <i-breadcrumb-item href="/">Sizes</i-breadcrumb-item>
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

<i-api-preview title="Breadcrumb API" expanded markup="i-breadcrumb" link="https://github.com/inkline/inkline/tree/master/src/components/Breadcrumb">
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
                    <td>Sets the size of the breadcrumb component.</td>
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
                    <td>Slot for breadcrumb default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Breadcrumb Item API" expanded markup="i-breadcrumb-item" link="https://github.com/inkline/inkline/tree/master/src/components/BreadcrumbItem">
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
                    <td>active</td>
                    <td>Sets the breadcrumb item component as active.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the breadcrumb item component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>href</td>
                    <td>Treats the breadcrumb item component as an anchor.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>to</td>
                    <td>Treats the breadcrumb item component as a <code>router-link</code>.</td>
                    <td>Object</td>
                    <td></td>
                    <td></td>
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
                    <td>Slot for breadcrumb item default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
