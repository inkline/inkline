---
title: Navbar
description: A responsive navigation header that includes support for branding, navigation, forms and more.
---

# Navbar
## A responsive navigation header that includes support for branding, navigation, forms and more.

### Example
Here’s an example of the basic components included in a  `<i-navbar>` that automatically collapses responsively.

<i-code title="Navbar Example">
<i-tab type="preview">
    <i-navbar>
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            </i-nav>
            <i-nav>
                <i-input class="item" placeholder="Type something..">
                    <i-button variant="primary" slot="append">
                        <font-awesome-icon icon="search" />
                    </i-button>
                </i-input>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</i-tab>
<i-tab type="html">

~~~html
<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
        </i-nav>
        <i-nav>
            <i-input class="item" placeholder="Type something..">
                <i-button variant="primary" slot="append">
                    <font-awesome-icon icon="search" />
                </i-button>
            </i-input>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your navbar, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Navbar Sizes">
<i-tab type="preview">
    <i-navbar size="sm" class="_margin-bottom-1">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
    <i-navbar size="md" class="_margin-bottom-1">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
    <i-navbar size="lg">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</i-tab>
<i-tab type="html">

~~~html
<i-navbar size="sm">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar size="md">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar size="lg">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</i-tab>
</i-code>

### Variants
Inkline includes two predefined navbar styles. You can set the style of a `<i-navbar>` using the `variant` property, which can have a value of `light` or `dark`. By default, modals use the `light` variant.

<i-code title="Navbar Variants">
<i-tab type="preview">
    <i-navbar variant="light" class="_margin-bottom-1">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
    <i-navbar variant="dark">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</i-tab>
<i-tab type="html">

~~~html
<i-navbar variant="light">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar variant="dark">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</i-tab>
</i-code>

### Dropdown
You can use an `<i-dropdown>` component inside the `<i-navbar-items>` or `<i-nav>` component to create a contextual navbar menu. 

<i-code title="Navbar Dropdown">
<i-tab type="preview">
    <i-navbar>
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
            </i-nav>
            <i-nav>
                <i-dropdown placement="bottom-end">
                    <i-nav-item>Dropdown</i-nav-item>
                    <i-dropdown-menu>
                        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
                        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
                        <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
                        <i-dropdown-divider />
                        <i-dropdown-item>Separated item</i-dropdown-item>
                    </i-dropdown-menu>
                </i-dropdown>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</i-tab>
<i-tab type="html">

~~~html
<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
        <i-nav>
            <i-dropdown placement="bottom-end">
                <i-button variant="primary">Dropdown</i-button>
                <i-dropdown-menu>
                    <i-dropdown-item href="">Action</i-dropdown-item>
                    <i-dropdown-item href="">Another action</i-dropdown-item>
                    <i-dropdown-item href="" disabled>Something disabled here</i-dropdown-item>
                    <i-dropdown-divider />
                    <i-dropdown-item>Separated item</i-dropdown-item>
                </i-dropdown-menu>
            </i-dropdown>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</i-tab>
</i-code>

### Nav Placement
You can position the `<i-nav>` component to the `start`, `end`, or `center` of the `<i-navbar-items>` component using flexbox utilities.

<i-code title="Navbar Nav Placement">
<i-tab type="preview">
    <i-navbar class="_margin-bottom-1">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items class="_justify-content-start">
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
    <i-navbar class="_margin-bottom-1">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items class="_justify-content-center">
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
    <i-navbar>
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items class="_justify-content-end">
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</i-tab>
<i-tab type="html">

~~~html

<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-start">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-center">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-end">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</i-tab>
</i-code>


### Collapse Breakpoint
You can control what breakpoint your navbar will collapse at using the `collapse` property. By default, the navbar will collapse on the `md` screen size.

<i-code title="Collapse Breakpoint Example">
<i-tab type="preview">
    <i-navbar collapse="lg">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</i-tab>
<i-tab type="html">

~~~html
<i-navbar collapse="lg">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</i-tab>
</i-code>

##### Always or Never Collapsible

Besides the breakpoint values, you can use a boolean value to set your navbar to be always collapsible, or never collapsible.

Setting a `collapse` value of `true` will set the navbar to be always collapsible.

<i-code title="Always Collapsible Example">
<i-tab type="preview">
    <i-navbar :collapse="true">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</i-tab>
<i-tab type="html">

~~~html
<i-navbar :collapse="true">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</i-tab>
</i-code>

Setting a `collapse` value of `false` will set the navbar to never be collapsible.

<i-code title="Never Collapsible Example">
<i-tab type="preview">
    <i-navbar :collapse="false">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</i-tab>
<i-tab type="html">

~~~html
<i-navbar :collapse="false">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</i-tab>
</i-code>

##### Manual Collapse

Sometimes, it's necessary to control whether the Navbar is collapsed or not programmatically. You can use the `v-model` directive to control whether the Navbar should be collapsed or not.

<i-code title="Manual Navbar Collapse Example">
<i-tab type="preview">
    <i-button v-on:click="collapsed = !collapsed">
        Toggle Collapsed
    </i-button>
    <i-navbar :collapse="true" v-model="collapsed" :collapse-on-click-outside="false">
        <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
        <i-navbar-items>
            <i-nav>
                <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
                <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</i-tab>
<i-tab type="html">

~~~html
<i-button @click="collapsed = !collapsed">Toggle Collapsed</i-button>

<i-navbar :collapse="true" v-model="collapsed" :collapse-on-click-outside="false">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the navbar components as props, as well as available slots and events.

<i-code title="Navbar API" markup="i-navbar" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/INavbar">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">collapse</template>
                <template slot="description">Specifies the breakpoint at which to collapse the navbar.</template>
                <template slot="type"><code>String</code>, <code>Boolean</code></template>
                <template slot="values"><code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">collapse-on-click</template>
                <template slot="description">Toggles collapsing the navbar when clicking a navbar item if collapsed.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">collapse-on-click-outside</template>
                <template slot="description">Toggles collapsing the navbar when clicking outside the navbar if collapsed.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">fluid</template>
                <template slot="description">Sets the <code>IContainer</code> wrapping the navbars's content as fluid.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the navbar component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Provides a way to collapse the navbar programmatically. Should be used as part of <code>v-model</code> directive.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the navbar component.</template>
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
                <template slot="description">Slot for navbar component default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

<i-code title="Navbar Brand API" markup="i-navbar-brand" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/INavbarBrand">
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for navbar brand component default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

<i-code title="Navbar Items API" markup="i-navbar-items" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/INavbarItems">
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for navbar items component default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the navbar components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Navbar" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$navbar-padding-base</template>
                <template slot="default"><code>$spacer-1-2 0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$navbar-padding</template>
                <template slot="default"><code>size-map($navbar-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$navbar-brand-margin</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$navbar-brand-font-size</template>
                <template slot="default"><code>$font-size-md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$navbar-brand-padding-base</template>
                <template slot="default"><code>$spacer-1-2 0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$navbar-brand-padding</template>
                <template slot="default"><code>size-map($navbar-brand-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$navbar-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$navbar-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$navbar-variant-{variant}</template>
                <template slot="default"><code>navbar-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$navbar-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $navbar-variant-light,
    dark: $navbar-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">navbar-variant</template>
<template slot="default-row">
                
~~~scss
@function navbar-variant($variant) {
    $navbar-variant-color: variant-color-by-luminance($variant, $navbar-color-for-light-variant, $navbar-color-for-dark-variant);
    $navbar-variant-item-color: variant-color-by-luminance($variant, darken-lightness($navbar-color-for-light-variant, 20%), lighten-lightness($navbar-color-for-dark-variant, 20%));
    $navbar-variant-item-color-active: $navbar-variant-color;
    $navbar-variant-background: $variant;
    $navbar-variant-background-hover: darken-lightness($navbar-variant-background, 10%);
    $navbar-variant-collapsed-item-background: darken-lightness($navbar-variant-background, 5%);
    $navbar-variant-collapsed-item-background-hover: $navbar-variant-background-hover;

    $variant-map: (
        color: $navbar-variant-color,
        item-color: $navbar-variant-item-color,
        item-color-active: $navbar-variant-item-color-active,
        background: $navbar-variant-background,
        background-hover: $navbar-variant-background-hover,
        collapsed-item-background: $navbar-variant-collapsed-item-background,
        collapsed-item-background-hover: $navbar-variant-collapsed-item-background-hover
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
