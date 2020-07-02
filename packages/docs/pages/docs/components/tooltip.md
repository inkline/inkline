---
title: Tooltip
description: Tooltips are useful for conveying information when an user hovers over an element.
---

# Tooltip
## Tooltips are useful for conveying information when an user hovers over an element.

### Example
Wrap both the tooltip's trigger element (such as an `<i-button>`) and the `<template slot="body">` inside a `<i-tooltip>` component.

<i-code title="Tooltip Example">
<i-tab type="preview">
<i-tooltip>
    <i-button>Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>

</i-tab>
<i-tab type="html">

~~~html
<i-tooltip>
    <i-button>Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~

</i-tab>
</i-code>

### Placement
Trigger tooltips at the `top`, `bottom`, `left` or `right` of elements by adding the `placement` property to the `<i-tooltip>` element. 

Each of the positions also has a `-start` or `-end` variant (`top-start`, `top-end`, `bottom-start`, `bottom-end`, etc.) that sets the tooltip to the start or end of the placement instead of centering it. 

<i-code title="Tooltip Placement">
<i-tab type="preview">
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

</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

### Freeform
Tooltips can contain text of virtually any size. You can control the wrapping and the maximum width of the tooltip by setting `white-space: normal` and a fixed `width` property on the tooltip content.

<i-code title="Freeform Tooltip">
<i-tab type="preview">
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

</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

### Trigger Type
You can use the `trigger` property to trigger the tooltip on `hover` or `click`. By default, tooltips are triggered on `hover`, a design decision made to improve user experience.

<i-code title="Tooltip Trigger Type">
<i-tab type="preview">
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

</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your tooltips, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Tooltip Sizes">
<i-tab type="preview">
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

</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>


### Variants
Inkline includes two predefined tooltip styles, each serving its own semantic purpose. You can set the style of a `<i-tooltip>` using the `variant` property, which can have a value of `light` or `dark`. By default, tooltips use the `dark` variant.

<i-code title="Tooltip Variants">
<i-tab type="preview">
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

</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the tooltip components as props, as well as available slots and events.

<i-code title="Tooltip API" markup="i-tooltip" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/ITooltip">
    <i-tab type="props">
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
    </i-tab>
    <i-tab type="slots">
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
    </i-tab>
    <i-tab type="events">
        <api-table>
            <api-table-row>
                <template slot="event">change</template>
                <template slot="description">Emitted when visibility changes.</template>
                <template slot="type"><code>(visible: Boolean) => {}</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the tooltip components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Tooltip" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$tooltip-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-font-weight</template>
                <template slot="default"><code>$font-weight-normal</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-line-height</template>
                <template slot="default"><code>$line-height</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-margin</template>
                <template slot="default"><code>spacers('1/2')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-padding-base</template>
                <template slot="default"><code>spacers('1/4') spacers('1/2')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-padding</template>
                <template slot="default"><code>size-map($tooltip-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-variant-{variant}</template>
                <template slot="default"><code>tooltip-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tooltip-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $tooltip-variant-light,
    dark: $tooltip-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">tooltip-variant</template>
<template slot="default-row">
                
~~~scss
@function tooltip-variant($variant) {
    $tooltip-variant-color: variant-color-by-luminance($variant, $tooltip-color-for-light-variant, $tooltip-color-for-dark-variant);
    $tooltip-variant-background: $variant;
    $tooltip-variant-border-color: variant-color-by-luminance($variant, $border-color-dark, $border-color-light);

    $variant-map: (
        color: $tooltip-variant-color,
        background: $tooltip-variant-background,
        border-color: $tooltip-variant-border-color,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
