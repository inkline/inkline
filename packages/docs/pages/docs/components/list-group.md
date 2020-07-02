---
title: List Group
description: List groups are flexible components used for displaying a list of related content.
---

# List Group
## List groups are flexible components used for displaying a list of related content.

### Example
List groups support any content inside of them. Take advantage of their flexibility to display list of items properly, as well as vertical navigation.

<i-code title="List Group Example">
<i-tab type="preview">
    <i-list-group>
        <i-list-group-item active>Active</i-list-group-item>
        <i-list-group-item href="https://inkline.io" onclick="return false;">Link</i-list-group-item>
        <i-list-group-item href="https://inkline.io" onclick="return false;">Router Link</i-list-group-item>
        <i-list-group-item>Item</i-list-group-item>
        <i-list-group-item disabled>Disabled</i-list-group-item>
    </i-list-group>
</i-tab>
<i-tab type="html">

~~~html
<i-list-group>
    <i-list-group-item active>Active</i-list-group-item>
    <i-list-group-item href="https://inkline.io">Link</i-list-group-item>
    <i-list-group-item :to="{ name: 'index' }">Router Link</i-list-group-item>
    <i-list-group-item>Item</i-list-group-item>
    <i-list-group-item disabled>Disabled</i-list-group-item>
</i-list-group>
~~~

</i-tab>
</i-code>

Behind the scenes, the `<i-list-group-item>` is converted into a `<router-link>` if it has the `:to` property, or a plain `<a>` tag if it has a `href` property. Otherwise, it uses a simple `<div>` tag.

### Sizes
You're able to use the `size` modifier to control the padding of your list groups, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code title="List Group Sizes">
<i-tab type="preview">
    <div>
        <i-list-group size="sm">
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
        </i-list-group>&nbsp;
        <i-list-group size="md">
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
        </i-list-group>&nbsp;
        <i-list-group size="lg">
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
        </i-list-group>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-list-group size="sm">
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
</i-list-group>
~~~
~~~html
<i-list-group size="md">
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
</i-list-group>
~~~
~~~html
<i-list-group size="lg">
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
</i-list-group>
~~~

</i-tab>
</i-code>

### Active State
You can control the active state of your `<i-list-group-item>` using the `active` property. If you're providing a `:to` property, converting it into a `router-link`, you can use the `active-class` and `exact-active-class` properties and set them to `-active`.

<i-code title="List Group Active State">
<i-tab type="preview">
    <div>
        <i-list-group>
            <i-list-group-item :to="{ name: 'docs-components-list-group' }" exact-active-class="-active">Active Router Link</i-list-group-item>
            <i-list-group-item :to="{ name: 'index' }" active>Active Link</i-list-group-item>
        </i-list-group>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-list-group>
    <i-list-group-item :to="{ name: 'docs-components-list-group' }" exact-active-class="-active">Active Router Link</i-list-group-item>
    <i-list-group-item :to="{ name: 'index' }" active>Active Link</i-list-group-item>
</i-list-group>
~~~

</i-tab>
</i-code>


### Disabled State
You can control the disabled state of your `<i-list-group-item>` using the `disabled` property. 

<i-code title="List Group Disabled State">
<i-tab type="preview">
    <div>
        <i-list-group>
            <i-list-group-item disabled>Disabled List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
        </i-list-group>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-list-group>
    <i-list-group-item disabled>Disabled List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
</i-list-group>
~~~

</i-tab>
</i-code>

### List Group Border
You can disable the border of your list group by setting the `bordered` property to false. 

<i-code title="List Group Border">
<i-tab type="preview">
    <div>
        <i-list-group :bordered="false">
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
            <i-list-group-item>List Group Item</i-list-group-item>
        </i-list-group>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-list-group :bordered="false">
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
</i-list-group>
~~~

</i-tab>
</i-code>

### Item Content
The `<i-list-group-item>` accepts any type of content, allowing you to create large sized list group items.

<i-code title="List Group Item Content">
<i-tab type="preview">
    <div>
        <i-list-group>
            <i-list-group-item>
                <h4>List Group Heading</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </i-list-group-item>
            <i-list-group-item>
                <h4>List Group Heading</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </i-list-group-item>
            <i-list-group-item>
                <h4>List Group Heading</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </i-list-group-item>
        </i-list-group>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-list-group>
    <i-list-group-item>
        <h4>List Group Heading</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </i-list-group-item>
    <i-list-group-item>
        <h4>List Group Heading</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </i-list-group-item>
    <i-list-group-item>
        <h4>List Group Heading</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </i-list-group-item>
</i-list-group>
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the list group components as props, as well as available slots.

<i-code title="List Group API" expanded markup="i-list-group" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IListGroup">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">bordered</template>
                <template slot="description">Sets the list group component style to be bordered.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the list group component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for list group default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

<i-code title="List Group Item API" markup="i-list-group-item" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IListGroupItem">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">active</template>
                <template slot="description">Sets the list group item state as active.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the list group item state as disabled.</template>
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
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for list group item default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the list group components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="List Group" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$list-group-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-item-disabled-color</template>
                <template slot="default"><code>$text-muted</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-item-padding-base</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-item-padding</template>
                <template slot="default"><code>size-map($list-group-item-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-border-style</template>
                <template slot="default"><code>solid</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-background-color-light</template>
                <template slot="default"><code>$body-background-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-border-color-light</template>
                <template slot="default"><code>$border-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-background-color-dark</template>
                <template slot="default"><code>$body-background-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-border-color-dark</template>
                <template slot="default"><code>$border-color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-item-active-background</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-item-active-color</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-item-active-border-color</template>
                <template slot="default"><code>darken-lightness($color-primary, 6%)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-variant-{variant}</template>
                <template slot="default"><code>list-group-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$list-group-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $list-group-variant-light,
    dark: $list-group-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">list-group-variant</template>
<template slot="default-row">
                
~~~scss
@function list-group-variant($variant) {
    $list-group-variant-color: variant-color-by-luminance($variant, $list-group-color-for-light-variant, $list-group-color-for-dark-variant);
    $list-group-variant-background: $variant;
    $list-group-variant-border-color: variant-color-by-luminance($variant, $border-color-dark, $border-color-light);

    $variant-map: (
        color: $list-group-variant-color,
        background: $list-group-variant-background,
        border-color: $list-group-variant-border-color,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
