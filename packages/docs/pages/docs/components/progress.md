---
title: Progress
description: A custom component for displaying progress with support for stacked progress bars.
---

# Progress
## A custom component for displaying progress with support for stacked progress bars.

### Example
Progress components are built with two components: a wrapper `<i-progress>` and at least one `<i-progress-bar>`. You can set the width of a progress bar by setting its `value` property.

<i-code title="Progress Example">
<i-tab type="preview">
    <i-progress>
        <i-progress-bar value="65" />
    </i-progress>
</i-tab>
<i-tab type="html">

~~~html
<i-progress>
    <i-progress-bar value="65" />
</i-progress>
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your progress, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Progress Sizes">
<i-tab type="preview">
    <div class="_margin-bottom-1">
        <i-progress size="sm">
            <i-progress-bar value="65" />
        </i-progress>
    </div>
    <div class="_margin-bottom-1">
        <i-progress size="md" class="_margin-bottom-1">
            <i-progress-bar value="65" />
        </i-progress>
    </div>
    <div class="_margin-bottom-1">
        <i-progress size="lg">
            <i-progress-bar value="65" />
        </i-progress>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-progress size="sm">
    <i-progress-bar value="65" />
</i-progress>
~~~
~~~html
<i-progress size="md">
    <i-progress-bar value="65" />
</i-progress>
~~~
~~~html
<i-progress size="lg">
    <i-progress-bar value="65" />
</i-progress>
~~~

</i-tab>
</i-code>


### Variants
Inkline includes multiple progress styles. You can change the style of a`<i-progress>` to set the background using the `variant` property.

<i-code title="Progress Variants">
<i-tab type="preview">
    <div class="_margin-bottom-1">
        <i-progress variant="light">
            <i-progress-bar value="65" />
        </i-progress>
    </div>
    <div class="_margin-bottom-1">
        <i-progress variant="dark">
            <i-progress-bar value="65" />
        </i-progress>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-progress variant="light">
    <i-progress-bar value="65" />
</i-progress>
~~~
~~~html
<i-progress variant="dark">
    <i-progress-bar value="65" />
</i-progress>
~~~

</i-tab>
</i-code>

### Bar Variants
Inkline includes multiple progress styles. You can change the style of a `<i-progress-bar>` to set the bar color using the `variant` property.

<i-code title="Progress Bar Variants">
<i-tab type="preview">
    <div class="_margin-bottom-1">
        <i-progress>
            <i-progress-bar variant="primary" value="65" />
        </i-progress>
    </div>
    <div class="_margin-bottom-1">
        <i-progress>
            <i-progress-bar variant="secondary" value="65" />
        </i-progress>
    </div>
    <div class="_margin-bottom-1">
        <i-progress>
            <i-progress-bar variant="info" value="65" />
        </i-progress>
    </div>
    <div class="_margin-bottom-1">
        <i-progress>
            <i-progress-bar variant="success" value="65" />
        </i-progress>
    </div>
    <div class="_margin-bottom-1">
        <i-progress>
            <i-progress-bar variant="warning" value="65" />
        </i-progress>
    </div>
    <div class="_margin-bottom-3">
        <i-progress>
            <i-progress-bar variant="danger" value="65" />
        </i-progress>
    </div>
    <div class="_margin-bottom-1">
        <i-progress variant="light">
            <i-progress-bar variant="dark" value="65" />
        </i-progress>
    </div>
    <div>
        <i-progress variant="dark">
            <i-progress-bar variant="light" value="65" />
        </i-progress>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-progress>
    <i-progress-bar variant="primary" value="65" />
</i-progress>
~~~
~~~html
<i-progress>
    <i-progress-bar variant="secondary" value="65" />
</i-progress>
~~~
~~~html
<i-progress>
    <i-progress-bar variant="info" value="65" />
</i-progress>
~~~
~~~html
<i-progress>
    <i-progress-bar variant="success" value="65" />
</i-progress>
~~~
~~~html
<i-progress>
    <i-progress-bar variant="warning" value="65" />
</i-progress>
~~~
~~~html
<i-progress>
    <i-progress-bar variant="danger" value="65" />
</i-progress>
~~~

~~~html
<i-progress variant="light">
    <i-progress-bar variant="dark" value="65" />
</i-progress>
~~~

~~~html
<i-progress variant="dark">
    <i-progress-bar variant="light" value="65" />
</i-progress>
~~~

</i-tab>
</i-code>


### Value
Inkline allows you to set a `min` and `max` modifier to calculate the progress based on a meaningful value. The new `min` will represent `0%` and the `max` will represent `100%`.

<i-code title="Progress Value">
<i-tab type="preview">
    <div class="_margin-bottom-1">
        <i-progress>
            <i-progress-bar min="100" max="200" value="150" />
        </i-progress>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-progress>
    <i-progress-bar min="100" max="200" value="150" />
</i-progress>
~~~

</i-tab>
</i-code>

### Stacked Bars
You can add multiple `<i-progress-bar>` inside the `<i-progress>` component to stack them, adding them up to a `100%` percentage.

<i-code title="Stacked Progress Bars Example">
<i-tab type="preview">
    <div class="_margin-bottom-1">
        <i-progress>
            <i-progress-bar variant="success" value="40" />
            <i-progress-bar variant="warning" value="20" />
            <i-progress-bar variant="danger" value="10" />
        </i-progress>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-progress>
    <i-progress-bar variant="success" value="40" />
    <i-progress-bar variant="warning" value="20" />
    <i-progress-bar variant="danger" value="10" />
</i-progress>
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the progress components as props, as well as available slots.

<i-code title="Progress API" markup="i-progress" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IProgress">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the progress component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the progress component.</template>
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
                <template slot="description">Slot for progresss's default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

<i-code title="Progress Bar API" markup="i-progress-bar" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IProgressBar">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">The current value based on which the progress percentage is calculated.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default"><code>0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">min</template>
                <template slot="description">The minimum / initial number based on which the progress percentage is calculated.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default"><code>0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">max</template>
                <template slot="description">The maximum / initial number based on which the progress percentage is calculated.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default"><code>100</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the button component.</template>
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
                <template slot="description">Slot for progress bars's default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the progress components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Progress" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$progress-background</template>
                <template slot="default"><code>$color-gray-30</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-height-base</template>
                <template slot="default"><code>$spacer-1-2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-height</template>
                <template slot="default"><code>size-map($progress-height-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-variant-{variant}</template>
                <template slot="default"><code>progress-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $progress-variant-light,
    dark: $progress-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">progress-variant</template>
<template slot="default-row">
                
~~~scss
@function progress-variant($variant) {
    $progress-variant-color: variant-color-by-luminance($variant, $progress-color-for-light-variant, $progress-color-for-dark-variant);
    $progress-variant-background: $variant;

    $variant-map: (
        color: $progress-variant-color,
        background: $progress-variant-background,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-bar-variant-{variant}</template>
                <template slot="default"><code>progress-bar-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-bar-variants</template>
<template slot="default-row">
                
~~~scss
(
    primary: $progress-bar-variant-primary,
    secondary: $progress-bar-variant-secondary,
    light: $progress-bar-variant-light,
    dark: $progress-bar-variant-dark,
    info: $progress-bar-variant-info,
    success: $progress-bar-variant-success,
    warning: $progress-bar-variant-warning,
    danger: $progress-bar-variant-danger
)

~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">progress-bar-variant</template>
<template slot="default-row">
                
~~~scss
@function progress-bar-variant($variant) {
    $progress-bar-variant-color: variant-color-by-luminance($variant, $progress-color-for-light-variant, $progress-color-for-dark-variant);
    $progress-bar-variant-background: $variant;

    $variant-map: (
        color: $progress-bar-variant-color,
        background: $progress-bar-variant-background,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
