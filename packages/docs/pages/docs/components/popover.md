---
title: Popover
description: Popovers are useful for conveying information when an user clicks or hovers an element.
---

# Popover
## Popovers are useful for conveying information when an user clicks or hovers an element.

### Example
Wrap both the popover's trigger element (such as an `<i-button>`) and the `<template slot="body">` inside a `<i-popover>` component. Optionally, you can provide a popover header and footer using `slot="header"` and `slot="footer"`.

<i-code title="Popover Example">
<i-tab type="preview">
    <i-popover>
        <i-button>Popover</i-button>
        <template slot="header">Popover Header</template>
        <template slot="body">This is the popover body. Useful information goes here.</template>
        <template slot="footer">Popover Footer</template>
    </i-popover>
</i-tab>
<i-tab type="html">

~~~html
<i-popover>
    <i-button>Popover</i-button>
    <template slot="header">Popover Header</template>
    <template slot="body">This is the popover body. Useful information goes here.</template>
    <template slot="footer">Popover Footer</template>
</i-popover>

~~~

</i-tab>
</i-code>

### Placement
Trigger popovers at the `top`, `bottom`, `left` or `right` of elements by adding the `placement` property to the `<i-popover>` element. 

Each of the positions also has a `-start` or `-end` variant (`top-start`, `top-end`, `bottom-start`, `bottom-end`, etc.) that sets the popover to the start or end of the placement instead of centering it. 

<i-code title="Popover Placement">
<i-tab type="preview">
    <div>
        <i-popover placement="top">
            <i-button>Top Popover</i-button>
            <template slot="body">This is the popover body. Useful information goes here.</template>
        </i-popover>&nbsp;
        <i-popover placement="bottom">
            <i-button>Bottom Popover</i-button>
            <template slot="body">This is the popover body. Useful information goes here.</template>
        </i-popover>&nbsp;
        <i-popover placement="left">
            <i-button>Left Popover</i-button>
            <template slot="body">This is the popover body. Useful information goes here.</template>
        </i-popover>&nbsp;
        <i-popover placement="right">
            <i-button>Right Popover</i-button>
            <template slot="body">This is the popover body. Useful information goes here.</template>
        </i-popover>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-popover placement="top">
    <i-button>Top Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>

<i-popover placement="bottom">
    <i-button>Bottom Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover placement="left">
    <i-button>Left Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover placement="right">
    <i-button>Right Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~

</i-tab>
</i-code>

## Trigger type
You can use the `trigger` property to trigger the popover on `hover` or `click`. By default, popovers are triggered on `click`, a design decision made to improve user experience.

<i-code title="Popover Trigger Type">
<i-tab type="preview">
    <i-popover trigger="click">
        <i-button>Click Popover</i-button>
        <template slot="body">This is the popover body. Useful information goes here.</template>
    </i-popover>&nbsp;
    <i-popover trigger="hover">
        <i-button>Hover Popover</i-button>
        <template slot="body">This is the popover body. Useful information goes here.</template>
    </i-popover>&nbsp;
    <i-popover trigger="focus">
        <i-button>Focus Popover</i-button>
        <template slot="body">This is the popover body. Useful information goes here.</template>
    </i-popover>&nbsp;
    <i-popover :trigger="['focus', 'hover']">
        <i-button>Multiple Events Popover</i-button>
        <template slot="body">This is the popover body. Useful information goes here.</template>
    </i-popover>&nbsp;
    <i-popover trigger="manual" v-model="manualPopover">
        <i-button @click="manualPopover = !manualPopover">Manual Popover</i-button>
        <template slot="body">This is the popover body. Useful information goes here.</template>
    </i-popover>&nbsp;
</i-tab>
<i-tab type="html">

~~~html
<i-popover trigger="click">
    <i-button>Click Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover trigger="hover">
    <i-button>Hover Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover trigger="focus">
    <i-button>Focus Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover :trigger="['focus', 'hover']">
    <i-button>Multiple Events Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;
~~~
~~~html
<i-popover trigger="manual" v-model="visible">
    <i-button @click="visible = !visible">Manual Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your popovers, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Popover Sizes">
<i-tab type="preview">
    <div>
        <i-popover size="sm">
            <i-button>Small Popover</i-button>
            <template slot="body">This is the popover body. Useful information goes here.</template>
        </i-popover>&nbsp;
        <i-popover size="md">
            <i-button>Medium Popover</i-button>
            <template slot="body">This is the popover body. Useful information goes here.</template>
        </i-popover>&nbsp;
        <i-popover size="lg">
            <i-button>Large Popover</i-button>
            <template slot="body">This is the popover body. Useful information goes here.</template>
        </i-popover>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-popover size="sm">
    <i-button>Small Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover size="md">
    <i-button>Medium Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover size="lg">
    <i-button>Large Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~

</i-tab>
</i-code>


### Variants
Inkline includes two predefined popover styles, each serving its own semantic purpose. You can set the style of a `<i-popover>` using the `variant` property, which can have a value of `light` or `dark`. By default, popovers use the `light` variant.

<i-code title="Popover Variants">
<i-tab type="preview">
    <div>
        <i-popover variant="light">
            <i-button variant="light">Light Popover</i-button>
            <template slot="header">Popover Header</template>
            <template slot="body">This is the popover body. Useful information goes here.</template>
            <template slot="footer">Popover Footer</template>
        </i-popover>&nbsp;
        <i-popover variant="dark">
            <i-button variant="dark">Dark Popover</i-button>
            <template slot="header">Popover Header</template>
            <template slot="body">This is the popover body. Useful information goes here.</template>
            <template slot="footer">Popover Footer</template>
        </i-popover>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-popover variant="light">
    <i-button variant="light">Light Popover</i-button>
    <template slot="header">Popover Header</template>
    <template slot="body">This is the popover body. Useful information goes here.</template>
    <template slot="footer">Popover Footer</template>
</i-popover>
~~~
~~~html
<i-popover variant="dark">
    <i-button variant="dark">Dark Popover</i-button>
    <template slot="header">Popover Header</template>
    <template slot="body">This is the popover body. Useful information goes here.</template>
    <template slot="footer">Popover Footer</template>
</i-popover>
~~~

</i-tab>
</i-code>

### Component API
Here you can find a list of the various customization options you can use for the popover component as props, as well as available slots and events.

<i-code title="Popover API" markup="i-popover" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IPopover">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">arrow</template>
                <template slot="description">Sets whether to attach an arrow to the popover.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the popover state as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">id</template>
                <template slot="description">Sets the identifier of the popover.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"><code>popover-&lt;uid&gt;</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">placement</template>
                <template slot="description">Sets the placement of the popover.</template>
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
                <template slot="property">popper-options</template>
                <template slot="description">Sets custom options for the Popper.js plugin.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">trigger</template>
                <template slot="description">Sets the trigger event of the popover.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>click</code>, <code>hover</code></template>
                <template slot="default"><code>click</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">transformOrigin</template>
                <template slot="description">Sets the transform origin of the popover.</template>
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
                <template slot="description">Slot for popover component trigger.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">header</template>
                <template slot="description">Slot for popover component header.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">body</template>
                <template slot="description">Slot for popover component body.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">footer</template>
                <template slot="description">Slot for popover component footer.</template>
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
Here you can find a list of the Sass variables you can use for the popover components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Popover" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$popover-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-font-weight</template>
                <template slot="default"><code>$font-weight-normal</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-line-height</template>
                <template slot="default"><code>$line-height</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-margin</template>
                <template slot="default"><code>spacers('1/2')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-width</template>
                <template slot="default"><code>280px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-padding-base</template>
                <template slot="default"><code>spacers('2/3') $spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-padding</template>
                <template slot="default"><code>size-map($popover-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-variant-{variant}</template>
                <template slot="default"><code>popover-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$popover-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $popover-variant-light,
    dark: $popover-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">popover-variant</template>
<template slot="default-row">
                
~~~scss
@function popover-variant($variant) {
    $popover-variant-color: variant-color-by-luminance($variant, $popover-color-for-light-variant, $popover-color-for-dark-variant);
    $popover-variant-background: $variant;
    $popover-variant-header-background: darken-lightness($popover-variant-background, 10%);
    $popover-variant-footer-background: $popover-variant-background;
    $popover-variant-border-color: variant-color-by-luminance($variant, $border-color-dark, $border-color-light);

    $variant-map: (
        color: $popover-variant-color,
        background: $popover-variant-background,
        header-background: $popover-variant-header-background,
        footer-background: $popover-variant-footer-background,
        border-color: $popover-variant-border-color,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
