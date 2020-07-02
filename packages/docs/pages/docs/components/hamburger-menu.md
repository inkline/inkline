---
title: Hamburger Menu
description: Inkline's hamburger menu is used to control opening and closing elements using various animation options.
---

# Hamburger Menu
## Inkline's hamburger menu is used to control opening and closing elements using various animation options.

### Example
Here’s an example of a basic use case for the `<i-hamburger-menu>` component. This component is usually used together with the <nuxt-link :to="{ name: 'docs-components-navbar' }">Navbar Component</nuxt-link> and <nuxt-link :to="{ name: 'docs-components-sidebar' }">Sidebar Component</nuxt-link> to control their collapsed state.

<i-code title="Hamburger Menu Example">
<i-tab type="preview">
    <i-hamburger-menu :active="value" @click="value = !value" />
</i-tab>
<i-tab type="html">

~~~html
<i-hamburger-menu :active="active" @click="active = !active" />
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    data () {
        return {
            active: false
        };
    }
}
~~~

</i-tab>
</i-code>

### Variants
You can set the style of a `<i-hamburger-menu>` using the `variant` property, which can have a value of `light` or `dark`. By default, hamburger menus use the `light` variant.

<i-code title="Hamburger Menu Example">
<i-tab type="preview">
    <div class="_background-light _display-inline-flex _padding-1">
        <i-hamburger-menu variant="light" :active="valueLight" @click="valueLight = !valueLight" />
    </div>
    <div class="_background-dark _display-inline-flex _padding-1">
        <i-hamburger-menu variant="dark" :active="valueDark" @click="valueDark = !valueDark" />
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-hamburger-menu variant="light" :active="active" @click="active = !active" />
~~~

~~~html
<i-hamburger-menu variant="dark" :active="active" @click="active = !active" />
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    data () {
        return {
            active: false
        };
    }
}
~~~

</i-tab>
</i-code>

### Component API
Here you can find a list of the various customization options you can use for the hamburger menu component as props.

<i-code title="Hamburger Menu API" expanded markup="i-hamburger-menu" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IHamburgerMenu">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">active</template>
                <template slot="description">Sets active state of the hamburger menu component.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">animation</template>
                <template slot="description">Sets the activation animation of the component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values-row"><code>arrow-up</code>, <code>arrow-down</code>, <code>arrow-left</code>, <code>arrow-right</code>, <code>minus</code>, <code>plus</code></template>
                <template slot="default"><code>close</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the hamburger menu component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
                <template slot="description-row">Emitted when hamburger menu component is clicked.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the hamburger menu component. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Header" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$hamburger-menu-bar-width</template>
                <template slot="default"><code>30px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-bar-height</template>
                <template slot="default"><code>3px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-bar-border-radius</template>
                <template slot="default"><code>2px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-bar-spacing</template>
                <template slot="default"><code>5px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-bar-color</template>
                <template slot="default"><code>#000000</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-padding</template>
                <template slot="default"><code>$spacer / 2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-opacity</template>
                <template slot="default"><code>0.7</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-hover-opacity</template>
                <template slot="default"><code>1</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-variant-{variant}</template>
                <template slot="default"><code>hamburger-menu-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$hamburger-menu-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $hamburger-menu-variant-light,
    dark: $hamburger-menu-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">hamburger-menu-variant</template>
<template slot="default-row">
                
~~~scss
@function hamburger-menu-variant($variant) {
    $hamburger-menu-variant-background: $variant;

    $variant-map: (
        background: $hamburger-menu-variant-background
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
