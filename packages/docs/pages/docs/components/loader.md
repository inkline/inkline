---
title: Loader
description: Provide a loading state for a component or page using a customizable loading spinner. 
---

# Loader
## Provide a loading state for a component or page using a customizable loading spinner. 

### Variants
The loader component is available in a `light` or `dark` color, which you can choose using the `variant` property.

<i-code title="Loader Variants">
<i-tab type="preview">
    <div>
        <div id="light-loader-example">
            <i-loader variant="light" />
        </div>
        <div id="dark-loader-example">
            <i-loader variant="dark" />
        </div>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-loader variant="light" />
~~~
~~~html
<i-loader variant="dark" />
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your loader component, using one of the available sizes: `sm`, `md`, and `lg`. 

By default, loaders are set to have a `64px` width and height.

<i-code title="Loader Sizes" class="themed">
<i-tab type="preview">
<div>
    <i-loader size="sm" variant="dark" class="_margin-right-1" />
    <i-loader size="md" variant="dark" class="_margin-right-1" />
    <i-loader size="lg" variant="dark" />
</div>

</i-tab>
<i-tab type="html">

~~~html
<i-loader size="sm" variant="dark" />
~~~

~~~html
<i-loader size="md" variant="dark" />
~~~

~~~html
<i-loader size="lg" variant="dark" />
~~~

</i-tab>
</i-code>

You can set the loader size to fit the container that it is in by using the `auto` size property. Make sure to use the same height and width to keep the correct aspect ratio.

<i-code title="Loader Auto Size" class="themed">
<i-tab type="preview">
<div style="width: 100px; height: 100px;">
    <i-loader size="auto" variant="dark" />
</div>

</i-tab>
<i-tab type="html">

~~~html
<div style="height: 100px; width: 100px">
    <i-loader size="auto" variant="dark" />
</div>
~~~

</i-tab>
</i-code>


### Slots
You're able to provide some additional text by using the `default` loader slot.

<i-code title="Loader Default Slot" class="themed">
<i-tab type="preview">
<div>
    <i-loader variant="dark">100%</i-loader>
</div>

</i-tab>
<i-tab type="html">

~~~html
<i-loader variant="dark">100%</i-loader>
~~~

</i-tab>
</i-code>

### Component API
Here you can find a list of the various customization options you can use for the loader component as props, as well as available slots.

<i-code title="Loader API" markup="i-loader" expanded>
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">count</template>
                <template slot="description">Sets the number of elements that make up the loading spinner. To be used together with the <code>$loader-item-count</code> Sass variable.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default"><code>12</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the loader component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the loader component.</template>
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
                <template slot="description">Slot for loader default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the loader components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Loader" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$loader-size-base</template>
                <template slot="default"><code>64px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$loader-size</template>
                <template slot="default"><code>size-map($loader-size-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$loader-animation-duration</template>
                <template slot="default"><code>1.2s</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$loader-item-count</template>
                <template slot="default"><code>12</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$loader-item-size</template>
                <template slot="default"><code>8%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$loader-variant-{variant}</template>
                <template slot="default"><code>loader-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$loader-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $loader-variant-light,
    dark: $loader-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">loader-variant</template>
<template slot="default-row">
                
~~~scss
@function loader-variant($variant) {
    $loader-variant-background: $variant;

    $variant-map: (
        background: $loader-variant-background,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
