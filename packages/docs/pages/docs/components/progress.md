# Progress
## A custom component for displaying progress with support for stacked progress bars.{.lead}

### Example
Progress components are built with two components: a wrapper `<i-progress>` and at least one `<i-progress-bar>`. You can set the width of a progress bar by setting its `value` property.

<i-code-preview title="Progress Example">

<i-progress>
    <i-progress-bar value="65" />
</i-progress>

<template slot="html">

~~~html
<i-progress>
    <i-progress-bar value="65" />
</i-progress>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your progress, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Progress Sizes">

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

<template slot="html">

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

</template>
</i-code-preview>


### Variants
Inkline includes multiple progress styles. You can change the style of a`<i-progress>` to set the background using the `variant` property.

<i-code-preview title="Progress Variants">

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


<template slot="html">

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

</template>
</i-code-preview>

### Bar Variants
Inkline includes multiple progress styles. You can change the style of a `<i-progress-bar>` to set the bar color using the `variant` property.

<i-code-preview title="Progress Bar Variants">

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

<template slot="html">

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

</template>
</i-code-preview>


### Value
Inkline allows you to set a `min` and `max` modifier to calculate the progress based on a meaningful value. The new `min` will represent `0%` and the `max` will represent `100%`.

<i-code-preview title="Progress Value">

<div class="_margin-bottom-1">
    <i-progress>
        <i-progress-bar min="100" max="200" value="150" />
    </i-progress>
</div>

<template slot="html">

~~~html
<i-progress>
    <i-progress-bar min="100" max="200" value="150" />
</i-progress>
~~~

</template>
</i-code-preview>

### Stacked Bars
You can add multiple `<i-progress-bar>` inside the `<i-progress>` component to stack them, adding them up to a `100%` percentage.

<i-code-preview title="Stacked Progress Bars Example">

<div class="_margin-bottom-1">
    <i-progress>
        <i-progress-bar variant="success" value="40" />
        <i-progress-bar variant="warning" value="20" />
        <i-progress-bar variant="danger" value="10" />
    </i-progress>
</div>

<template slot="html">

~~~html
<i-progress>
    <i-progress-bar variant="success" value="40" />
    <i-progress-bar variant="warning" value="20" />
    <i-progress-bar variant="danger" value="10" />
</i-progress>
~~~

</template>
</i-code-preview>


### Component API
Here you can find a list of the various customization options you can use for the progress components as props, as well as available slots.

<i-api-preview title="Progress API" markup="i-progress" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Progress">
    <template slot="props">
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
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for progresss's default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Progress Bar API" markup="i-progress-bar" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/ProgressBar">
    <template slot="props">
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
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for progress bars's default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

### Sass Variables
Here you can find a list of the Sass variables you can use for the progress components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-introduction-sass-variables' }">Sass Variables</nuxt-link> page.

<i-scss-preview title="Progress" expanded>
    <template slot="scss">
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
                <template slot="default"><code>spacers('1/2')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-height</template>
                <template slot="default"><code>size-map($progress-height-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$progress-variants</template>
                <template slot="default"><code>('monochrome')</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview> 
