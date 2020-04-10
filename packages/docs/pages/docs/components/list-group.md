# List Group
## List groups are flexible components used for displaying a list of related content.{.lead}

### Example
List groups support any content inside of them. Take advantage of their flexibility to display list of items properly, as well as vertical navigation.

<i-code-preview title="List Group Example">

<i-list-group>
    <i-list-group-item active>Active</i-list-group-item>
    <i-list-group-item href="https://inkline.io" onclick="return false;">Link</i-list-group-item>
    <i-list-group-item href="https://inkline.io" onclick="return false;">Router Link</i-list-group-item>
    <i-list-group-item>Item</i-list-group-item>
    <i-list-group-item disabled>Disabled</i-list-group-item>
</i-list-group>

<template slot="html">

~~~html
<i-list-group>
    <i-list-group-item active>Active</i-list-group-item>
    <i-list-group-item href="https://inkline.io">Link</i-list-group-item>
    <i-list-group-item :to="{ name: 'index' }">Router Link</i-list-group-item>
    <i-list-group-item>Item</i-list-group-item>
    <i-list-group-item disabled>Disabled</i-list-group-item>
</i-list-group>
~~~

</template>
</i-code-preview>

Behind the scenes, the `<i-list-group-item>` is converted into a `<router-link>` if it has the `:to` property, or a plain `<a>` tag if it has a `href` property. Otherwise, it uses a simple `<div>` tag.

### Sizes
You're able to use the `size` modifier to control the padding of your list groups, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code-preview title="List Group Sizes">

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

<template slot="html">

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

</template>
</i-code-preview>

### Active State
You can control the active state of your `<i-list-group-item>` using the `active` property. If you're providing a `:to` property, converting it into a `router-link`, you can use the `active-class` and `exact-active-class` properties and set them to `-active`.

<i-code-preview title="List Group Active State">

<div>
<i-list-group>
    <i-list-group-item :to="{ name: 'docs-components-list-group' }" exact-active-class="-active">Active Router Link</i-list-group-item>
    <i-list-group-item :to="{ name: 'index' }" active>Active Link</i-list-group-item>
</i-list-group>
</div>

<template slot="html">

~~~html
<i-list-group>
    <i-list-group-item :to="{ name: 'docs-components-list-group' }" exact-active-class="-active">Active Router Link</i-list-group-item>
    <i-list-group-item :to="{ name: 'index' }" active>Active Link</i-list-group-item>
</i-list-group>
~~~

</template>
</i-code-preview>


### Disabled State
You can control the disabled state of your `<i-list-group-item>` using the `disabled` property. 

<i-code-preview title="List Group Disabled State">

<div>
<i-list-group>
    <i-list-group-item disabled>Disabled List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
</i-list-group>
</div>

<template slot="html">

~~~html
<i-list-group>
    <i-list-group-item disabled>Disabled List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
</i-list-group>
~~~

</template>
</i-code-preview>

### List Group Border
You can disable the border of your list group by setting the `bordered` property to false. 

<i-code-preview title="List Group Border">

<div>
<i-list-group :bordered="false">
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
</i-list-group>
</div>

<template slot="html">

~~~html
<i-list-group :bordered="false">
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
    <i-list-group-item>List Group Item</i-list-group-item>
</i-list-group>
~~~

</template>
</i-code-preview>

### Item Content
The `<i-list-group-item>` accepts any type of content, allowing you to create large sized list group items.

<i-code-preview title="List Group Item Content">

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

<template slot="html">

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

</template>
</i-code-preview>


### API

<i-api-preview title="List Group API" expanded markup="i-list-group" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/ListGroup">
    <template slot="props">
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
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for list group default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="List Group Item API" markup="i-list-group-item" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/ListGroupItem">
    <template slot="props">
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
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for list group item default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
