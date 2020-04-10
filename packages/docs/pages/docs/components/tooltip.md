# Tooltip
## Tooltips are useful for conveying information when an user hovers over an element.{.lead}

### Example
Wrap both the tooltip's trigger element (such as an `<i-button>`) and the `<template slot="body">` inside a `<i-tooltip>` component.

<i-code-preview title="Tooltip Example">

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

<i-code-preview title="Tooltip Placement">

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

<i-code-preview title="Freeform Tooltip">

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

<i-code-preview title="Tooltip Trigger Type">

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

<i-code-preview title="Tooltip Sizes">

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

<i-code-preview title="Tooltip Variants">

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

<i-api-preview title="Tooltip API" markup="i-tooltip" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Tooltip">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">arrow</template>
                <template slot="description">Sets whether to attach an arrow to the tooltip.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the tooltip state as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">id</template>
                <template slot="description">Sets the identifier of the tooltip.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"><code>tooltip-&lt;uid&gt;</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">placement</template>
                <template slot="description">Sets the placement of the tooltip.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values">
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
                </template>
                <template slot=""><code>top</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">popperOptions</template>
                <template slot="description">Sets custom options for the Popper.js plugin.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">trigger</template>
                <template slot="description">Sets the trigger event of the tooltip.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>click</code>, <code>hover</code></template>
                <template slot="default"><code>hover</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">transformOrigin</template>
                <template slot="description">Sets the transform origin of the tooltip.</template>
                <template slot="type">
                    <code>Boolean</code>, 
                    <code>String</code> 
                </template>
                <template slot=""></template>
                <template slot=""><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the popover.</template>
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
                <template slot="description">Slot for tooltip component trigger.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">body</template>
                <template slot="description">Slot for tooltip component body.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">change</template>
                <template slot="description">Emitted when visibility changes.</template>
                <template slot="type"><code>(visible: Boolean) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
