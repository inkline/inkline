---
title: Breadcrumb
description: Indicate the current page’s location depth using a navigation list that automatically adds separators using CSS.
---

# Breadcrumb
## Indicate the current page’s location depth using a navigation list that automatically adds separators using CSS.

### Examples
Separators are automatically added in CSS through `::before` and `content`. You can change the separator by changing the `$breadcrumb-divider` Sass variable.

<i-code title="Breadcrumbs Example">
<i-tab type="preview">
    <i-breadcrumb>
        <i-breadcrumb-item onclick="return false;">Home</i-breadcrumb-item>
        <i-breadcrumb-item active>Breadcrumbs</i-breadcrumb-item>
    </i-breadcrumb>
    <i-breadcrumb>
        <i-breadcrumb-item href="https://inkline.io" onclick="return false;">Home</i-breadcrumb-item>
        <i-breadcrumb-item href="https://inkline.io" onclick="return false;">Library</i-breadcrumb-item>
        <i-breadcrumb-item active>Data</i-breadcrumb-item>
    </i-breadcrumb>
</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

### Dynamically Generated
You can generate and bind breadcrumbs from your JS data using a combination of `v-for` and `v-bind` as follows:

<i-code title="Dynamically Generated Breadcrumbs">
<i-tab type="preview">
    <i-breadcrumb>
        <i-breadcrumb-item v-bind="item" v-for="item in items" :key="item.title" onclick="return false;">{{item.title}}</i-breadcrumb-item>
    </i-breadcrumb>
</i-tab>
<i-tab type="html">
<div v-pre>

~~~html
<i-breadcrumb>
    <i-breadcrumb-item v-bind="item" v-for="item in items" :key="item.title">{{item.title}}</i-breadcrumb-item>
</i-breadcrumb>
~~~

</div>
</i-tab>
<i-tab type="js">

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

</i-tab>
</i-code>


### Sizes
You're able to use the `size` modifier to control the text and spacing size of your breadcrumb, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code title="Breadcrumbs Sizes">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>


### Components API
Here you can find a list of the various customization options you can use for the breadcrumb components as props, as well as available slots.

<i-code title="Breadcrumb API" expanded markup="i-breadcrumb" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IBreadcrumb">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the breadcrumb component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for breadcrumb default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

<i-code title="Breadcrumb Item API" expanded markup="i-breadcrumb-item" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IBreadcrumbItem">
    <i-tab type="props">
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
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the breadcrumb component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code></template>
                <template slot="default"><code>primary</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for breadcrumb item default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>



### Sass Variables
Here you can find a list of the Sass variables you can use for the breadcrumb components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Breadcrumb" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$breadcrumb-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-padding-base</template>
                <template slot="default"><code>$spacer-1-2 $spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-padding</template>
                <template slot="default"><code>size-map($breadcrumb-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-item-padding-base</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-item-padding</template>
                <template slot="default"><code>size-map($breadcrumb-item-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-margin-bottom</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-divider</template>
                <template slot="default"><code>'/'</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-variant-{variant}</template>
                <template slot="default"><code>breadcrumb-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$breadcrumb-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $breadcrumb-variant-light,
    dark: $breadcrumb-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">breadcrumb-variant</template>
<template slot="default-row">
                
~~~scss
@function breadcrumb-variant($variant) {
    $breadcrumb-variant-color: variant-color-by-luminance($variant, $breadcrumb-color-for-light-variant, $breadcrumb-color-for-dark-variant);
    $breadcrumb-variant-color-active: variant-color-by-luminance($variant, darken($breadcrumb-variant-color, 15%), lighten($breadcrumb-variant-color, 15%));

    $variant-map: (
        color: $breadcrumb-variant-color,
        color-active: $breadcrumb-variant-color-active,
    ) !default;

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
