# Loader
## Provide a loading state for a component or page using a customizable loading spinner. {.lead}

### Variants
The loader component is available in a `light` or `dark` color, which you can choose using the `variant` property.

<i-code-preview title="Loader Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Loader">

<div>
    <div id="light-loader-example">
        <i-loader variant="light" />
    </div>
    <i-loader variant="dark" />
</div>

<template slot="html">

~~~html
<i-loader variant="light" />
~~~
~~~html
<i-loader variant="dark" />
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your loader component, using one of the available sizes: `sm`, `md`, and `lg`. 

By default, loaders are set to have a `64px` width and height.

<i-code-preview title="Loader Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Loader">

<div>
    <i-loader size="sm" variant="dark" class="_margin-right-1" />
    <i-loader size="md" variant="dark" class="_margin-right-1" />
    <i-loader size="lg" variant="dark" />
</div>

<template slot="html">

~~~html
<i-loader size="sm" variant="dark" />
~~~

~~~html
<i-loader size="md" variant="dark" />
~~~

~~~html
<i-loader size="lg" variant="dark" />
~~~

</template>
</i-code-preview>

You can set the loader size to fit the container that it is in by using the `auto` size property. Make sure to use the same height and width to keep the correct aspect ratio.

<i-code-preview title="Loader Auto Size" link="https://github.com/inkline/inkline/tree/master/src/components/Loader">

<div style="width: 100px; height: 100px;">
    <i-loader size="auto" variant="dark" />
</div>

<template slot="html">

~~~html
<div style="height: 100px; width: 100px">
    <i-loader size="auto" variant="dark" />
</div>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Alert API" markup="i-alert" expanded>
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
                    <td>dismissLabel</td>
                    <td>Sets the dismiss lable, replaceable using the <code>dismiss</code> slot.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>×</code></td>
                </tr>
                <tr>
                    <td>dismissible</td>
                    <td>Sets the alert as dismissible.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>show</td>
                    <td>Sets the dismiss <code>v-model</code> for the alert component. Alert is only visible if show is <code>true</code>.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the alert component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the alert component.</td>
                    <td><code>String</code></td>
                    <td><code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></td>
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
                    <td>Slot for alert default content.</td>
                </tr>
                <tr>
                    <td>dismiss</td>
                    <td>Slot for alert dismiss button.</td>
                </tr>
                <tr>
                    <td>icon</td>
                    <td>Slot for alert icon.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
