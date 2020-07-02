---
title: Badge
description: Documentation and examples for badges, a small component used for counting and labeling.
---

# Badge
## Documentation and examples for badges, a small component used for counting and labeling.

### Variants
Inkline includes several predefined badge styles, each serving its own semantic purpose, which you can control using the `variant` property.

<i-code title="Badge Variants">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

### Sizes

You're able to use the `size` modifier to control the text and spacing size of your badges, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code title="Badge Sizes">
<i-tab type="preview">
    <i-badge size="sm">
        Small
    </i-badge>&nbsp; 
    <i-badge size="md">
        Medium
    </i-badge>&nbsp; 
    <i-badge size="lg">
        Large
    </i-badge>
</i-tab>
<i-tab type="html">

~~~html
<i-badge size="sm">Small</i-badge>
~~~
~~~html
<i-badge size="md">Medium</i-badge>
~~~
~~~html
<i-badge size="lg">Large</i-badge>
~~~

</i-tab>
</i-code>

Badges always match the size of the immediate parent element by using relative font sizing and `em` units.

<i-code title="Badge Heading Sizes">
<i-tab type="preview">
    <h1 class="_margin-top-0">Heading 1 <i-badge variant="primary">New</i-badge></h1>
    <h2 class="_margin-top-0">Heading 2 <i-badge variant="primary">New</i-badge></h2>
    <h3 class="_margin-top-0">Heading 3 <i-badge variant="primary">New</i-badge></h3>
    <h4 class="_margin-top-0">Heading 4 <i-badge variant="primary">New</i-badge></h4>
    <h5 class="_margin-top-0">Heading 5 <i-badge variant="primary">New</i-badge></h5>
    <h6 class="_margin-top-0">Heading 6 <i-badge variant="primary">New</i-badge></h6>
</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>


### Component API
Here you can find a list of the customization options you can use for the badge component as props, as well as available slots.

<i-code title="Badge API" expanded markup="i-badge" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IBadge">
    <i-tab type="props">
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
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for badge default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for the badge component. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

The `{variant}` placeholder below can be one of the following: 
- `primary`
- `secondary`
- `light`
- `dark`
- `info`
- `success`
- `warning`
- `danger`

<i-code title="Badge" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$badge-font-size</template>
                <template slot="default"><code>('sm': 65%, 'md': 75%, 'lg': 85%)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-font-weight</template>
                <template slot="default"><code>font-weight(bold)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-line-height</template>
                <template slot="default"><code>$line-height</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-padding-base</template>
                <template slot="default"><code>$spacer-1-2 $spacer-2-3</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-padding</template>
                <template slot="default"><code>size-map($badge-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-pill-border-radius</template>
                <template slot="default"><code>10rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-background-color-hover-darken</template>
                <template slot="default"><code>10%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-variant-{variant}</template>
                <template slot="default"><code>badge-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$badge-variants</template>
<template slot="default-row">
                
~~~scss
(
    primary: $badge-variant-primary,
    secondary: $badge-variant-secondary,
    light: $badge-variant-light,
    dark: $badge-variant-dark,
    info: $badge-variant-info,
    success: $badge-variant-success,
    warning: $badge-variant-warning,
    danger: $badge-variant-danger
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">badge-variant</template>
<template slot="default-row">
                
~~~scss
@function badge-variant($variant) {
    $badge-variant-background: $variant;
    $badge-variant-color: variant-color-by-luminance($variant, $badge-color-for-light-variant, $badge-color-for-dark-variant);

    $variant-map: (
        background: $badge-variant-background,
        color: $badge-variant-color
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
