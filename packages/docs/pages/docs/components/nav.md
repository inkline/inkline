# Nav
## Navs are basic navigation components that provide alignment and spacing between items.{.lead}

### Example
Navigation components make use of the base `<i-nav>` component for building all types of navigation styles. 

<i-code-preview title="Nav Example">

<i-nav>
    <i-nav-item href="https://inkline.io" onclick="return false;">Link</i-nav-item>
    <i-nav-item href="https://inkline.io" onclick="return false;">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>

<template slot="html">

~~~html
<i-nav>
    <i-nav-item href="https://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~

</template>
</i-code-preview>

Behind the scenes, the `<i-nav-item>` is converted into a `<router-link>` if it has the `:to` property, or a plain `<a>` tag if it has a `href` property. Otherwise, it uses a simple `<div>` tag.

### Vertical
You can stack nav items into a vertical navigation component by setting the `vertical` property on your `<i-nav>`.

<i-code-preview title="Vertical Nav">

<i-nav vertical>
    <i-nav-item href="https://inkline.io" onclick="return false;">Link</i-nav-item>
    <i-nav-item href="https://inkline.io" onclick="return false;">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>

<template slot="html">

~~~html
<i-nav vertical>
    <i-nav-item href="https://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your navs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code-preview title="Nav Sizes">

<div>
<i-nav size="sm">
    <i-nav-item href="https://inkline.io" onclick="return false;">Link</i-nav-item>
    <i-nav-item href="https://inkline.io" onclick="return false;">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>&nbsp;

<i-nav size="md">
    <i-nav-item href="https://inkline.io" onclick="return false;">Link</i-nav-item>
    <i-nav-item href="https://inkline.io" onclick="return false;">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>&nbsp;

<i-nav size="lg">
    <i-nav-item href="https://inkline.io" onclick="return false;">Link</i-nav-item>
    <i-nav-item href="https://inkline.io" onclick="return false;">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
</div>

<template slot="html">

~~~html
<i-nav size="sm">
    <i-nav-item href="https://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~
~~~html
<i-nav size="md">
    <i-nav-item href="https://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~
~~~html
<i-nav size="lg">
    <i-nav-item href="https://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~

</template>
</i-code-preview>


### Active State
You can control the active state of your `<i-nav-item>` using the `active` property. If you're providing a `:to` property, converting it into a `router-link`, you can use the `active-class` and `exact-active-class` properties and set them to `-active`.

<i-code-preview title="Nav Active State">

<div>
<i-nav>
    <i-nav-item :to="{ name: 'docs-components-nav' }" exact-active-class="-active">Active Router Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }" active>Active Link</i-nav-item>
</i-nav>
</div>

<template slot="html">

~~~html
<i-nav>
    <i-nav-item :to="{ name: 'docs-components-nav' }" exact-active-class="-active">Active Router Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }" active>Active Link</i-nav-item>
</i-nav>
~~~

</template>
</i-code-preview>


### Component API
Here you can find a list of the various customization options you can use for the nav components as props, as well as available slots.

<i-api-preview title="Nav API" expanded markup="i-nav" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Nav">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the nav component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">vertical</template>
                <template slot="description">Sets the nav to be laid out vertically.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for nav default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Nav Item API" markup="i-nav-item" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/NavItem">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">active</template>
                <template slot="description">Sets the nav item state as active.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the nav item state as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">tag</template>
                <template slot="description">Sets the tag to be used for the component. If <code>to</code> or <code>href</code> attribute is provided, an <code>a</code> tag will be used.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"><code>div</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for nav item default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

### Sass Variables
Here you can find a list of the Sass variables you can use for the nav components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-introduction-sass-variables' }">Sass Variables</nuxt-link> page.

<i-scss-preview title="Nav" expanded>
    <template slot="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$nav-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$nav-item-disabled-color</template>
                <template slot="default"><code>$text-muted</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$nav-item-padding-base</template>
                <template slot="default"><code>$spacer-1-2 $spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$nav-item-padding</template>
                <template slot="default"><code>size-map($nav-item-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview> 
