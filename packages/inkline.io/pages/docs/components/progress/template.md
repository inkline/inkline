# Progress
A custom component for displaying progress with support for stacked progress bars.{.lead}

### Example
Progress components are built with two components: a wrapper `<i-progress>` and at least one `<i-progress-bar>`. You can set the width of a progress bar by setting its `value` property.

<i-code-preview title="Progress Example" link="https://github.com/inkline/inkline/tree/master/src/components/Progress">

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

<i-code-preview title="Progress Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Progress">

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

<i-code-preview title="Progress Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Progress">

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

<i-code-preview title="Progress Bar Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Progress">

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
    <i-progress>
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
<i-progress>
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

<i-code-preview title="Progress Value" link="https://github.com/inkline/inkline/tree/master/src/components/Progress">

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

<i-code-preview title="Stacked Progress Bars Example" link="https://github.com/inkline/inkline/tree/master/src/components/Progress">

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


### API

<i-api-preview title="Progress API" markup="i-progress" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Progress">
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
                    <td>Sets the size of the progress component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the progress component.</td>
                    <td><code>String</code></td>
                    <td><code>light</code>, <code>dark</code></td>
                    <td><code>light</code></td>
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
                    <td>Slot for progress component's default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Progress Bar API" markup="i-progress-bar" expanded link="https://github.com/inkline/inkline/tree/master/src/components/ProgressBar">
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
                    <td>value</td>
                    <td>The current value based on which the progress percentage is calculated.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td><code>0</code></td>
                </tr>
                <tr>
                    <td>min</td>
                    <td>The minimum / initial number based on which the progress percentage is calculated.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td><code>0</code></td>
                </tr>
                <tr>
                    <td>max</td>
                    <td>The maximum / initial number based on which the progress percentage is calculated.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td><code>100</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the button component.</td>
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
                    <td>Slot for progress bar component's default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>