# Tooltip
## Tooltips are useful for conveying information when an user hovers over an element.{.lead}

### Example
Wrap both the tooltip's trigger element (such as an `<i-button>`) and the `<template slot="body">` inside a `<i-tooltip>` component.

<i-code-preview title="Tooltip Example" link="https://github.com/inkline/inkline/tree/master/src/components/Tooltip" class="_padding-bottom-0">

<i-tooltip>
    <i-button>Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>

<template slot="html">

~~~html
<i-tooltip>
    <i-button>Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~

</template>
</i-code-preview>

### Placement
Trigger tooltips at the `top`, `bottom`, `left` or `right` of elements by adding the `placement` property to the `<i-tooltip>` element. 

Each of the positions also has a `-start` or `-end` variant (`top-start`, `top-end`, `bottom-start`, `bottom-end`, etc.) that sets the tooltip to the start or end of the placement instead of centering it. 

<i-code-preview title="Tooltip Placement" link="https://github.com/inkline/inkline/tree/master/src/components/Tooltip" class="_padding-bottom-0">

<div>
<i-tooltip placement="top">
    <i-button>Top Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip placement="bottom">
    <i-button>Bottom Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip placement="left">
    <i-button>Left Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip placement="right">
    <i-button>Right Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
</div>

<template slot="html">

~~~html
<i-tooltip placement="top">
    <i-button>Top Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip placement="bottom">
    <i-button>Bottom Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip placement="left">
    <i-button>Left Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip placement="right">
    <i-button>Right Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~

</template>
</i-code-preview>

### Freeform
Tooltips can contain text of virtually any size. You can control the wrapping and the maximum width of the tooltip by setting `white-space: normal` and a fixed `width` property on the tooltip content.

<i-code-preview title="Freeform Tooltip" link="https://github.com/inkline/inkline/tree/master/src/components/Tooltip" class="_padding-bottom-0">

<div>
<i-tooltip>
    <i-button>Normal Tooltip</i-button>
    <template slot="body">
        This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is not controlled.
    </template>
</i-tooltip>&nbsp;

<i-tooltip>
    <i-button>Fixed Width Tooltip</i-button>
    <div style="white-space: normal; width: 240px" slot="body">
        This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is controlled.
    </div>
</i-tooltip>
</div>

<template slot="html">

~~~html
<i-tooltip>
    <i-button>Normal Tooltip</i-button>
    <template slot="body">
        This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is not controlled.
    </template>
</i-tooltip>
~~~
~~~html
<i-tooltip>
    <i-button>Fixed Width Tooltip</i-button>
    <div style="white-space: normal; width: 240px" slot="body">
        This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is controlled.
    </div>
</i-tooltip>
~~~

</template>
</i-code-preview>

### Trigger Type
You can use the `trigger` property to trigger the tooltip on `hover` or `click`. By default, tooltips are triggered on `hover`, a design decision made to improve user experience.

<i-code-preview title="Tooltip Trigger Type" link="https://github.com/inkline/inkline/tree/master/src/components/Tooltip" class="_padding-bottom-0">

<i-tooltip trigger="click">
    <i-button>Click Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip trigger="hover">
    <i-button>Hover Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip trigger="focus">
    <i-button>Focus Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip :trigger="['focus', 'hover']">
    <i-button>Multiple Events Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip trigger="manual" v-model="manualTooltip">
    <i-button @click="manualTooltip = !manualTooltip">Manual Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<template slot="html">

~~~html
<i-tooltip trigger="click">
    <i-button>Click Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip trigger="hover">
    <i-button>Hover Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip trigger="focus">
    <i-button>Focus Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip :trigger="['focus', 'hover']">
    <i-button>Multiple Events Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;
~~~
~~~html
<i-tooltip trigger="manual" v-model="visible">
    <i-button @click="visible = !visible">Manual Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your tooltips, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Tooltip Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Tooltip" class="_padding-bottom-0">

<div>
<i-tooltip size="sm">
    <i-button>Small Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip size="md">
    <i-button>Medium Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip size="lg">
    <i-button>Large Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
</div>

<template slot="html">

~~~html
<i-tooltip size="sm">
    <i-button>Small Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip size="md">
    <i-button>Medium Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip size="lg">
    <i-button>Large Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~

</template>
</i-code-preview>


### Variants
Inkline includes two predefined tooltip styles, each serving its own semantic purpose. You can set the style of a `<i-tooltip>` using the `variant` property, which can have a value of `light` or `dark`. By default, tooltips use the `dark` variant.

<i-code-preview title="Tooltip Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Tooltip" class="_padding-bottom-0">

<div>
<i-tooltip variant="light">
    <i-button variant="light">Light Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip variant="dark">
    <i-button variant="dark">Dark Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
</div>

<template slot="html">

~~~html
<i-tooltip variant="light">
    <i-button variant="light">Light Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip variant="dark">
    <i-button variant="dark">Dark Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Tooltip API" markup="i-tooltip" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Tooltip">
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
                    <td>arrow</td>
                    <td>Sets whether to attach an arrow to the tooltip.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Sets the tooltip state as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>Sets the identifier of the tooltip.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>tooltip-&lt;uid&gt;</code></td>
                </tr>
                <tr>
                    <td>placement</td>
                    <td>Sets the placement of the tooltip.</td>
                    <td><code>String</code></td>
                    <td>
                        <code>top</code>, 
                        <code>top-start</code>,
                        <code>top-end</code>,
                        <code>bottom</code>, 
                        <code>bottom-start</code>,
                        <code>bottom-end</code>,
                        <code>left</code>, 
                        <code>left-start</code>,
                        <code>left-end</code>,
                        <code>right</code>, 
                        <code>right-start</code>,
                        <code>right-end</code>
                    </td>
                    <td><code>top</code></td>
                </tr>
                <tr>
                    <td>popperOptions</td>
                    <td>Sets custom options for the Popper.js plugin.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>trigger</td>
                    <td>Sets the trigger event of the tooltip.</td>
                    <td><code>String</code></td>
                    <td><code>click</code>, <code>hover</code></td>
                    <td><code>hover</code></td>
                </tr>
                <tr>
                    <td>transformOrigin</td>
                    <td>Sets the transform origin of the tooltip.</td>
                    <td>
                        <code>Boolean</code>, 
                        <code>String</code> 
                    </td>
                    <td></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the popover.</td>
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
                    <td>Slot for tooltip component trigger.</td>
                </tr>
                <tr>
                    <td>body</td>
                    <td>Slot for tooltip component body.</td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="events">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prototype</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>change</td>
                    <td>Emitted when visibility changes.</td>
                    <td><code>(visible: Boolean) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
