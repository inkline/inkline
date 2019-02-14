# List Group
List groups are flexible components used for displaying a list of related content.{.lead}

### Example
List groups support any content inside of them. Take advantage of their flexibility to display list of items properly, as well as vertical navigation.

<i-code-preview title="List Group Example" link="https://github.com/inkline/inkline/tree/master/src/components/ListGroup">

<i-list-group>
    <i-list-group-item active>Active</i-list-group-item>
    <i-list-group-item href="http://inkline.io">Link</i-list-group-item>
    <i-list-group-item :to="{ name: 'home.index' }">Router Link</i-list-group-item>
    <i-list-group-item>Item</i-list-group-item>
    <i-list-group-item disabled>Disabled</i-list-group-item>
</i-list-group>

<template slot="html">

~~~html
<i-list-group>
    <i-list-group-item active>Active</i-list-group-item>
    <i-list-group-item href="http://inkline.io">Link</i-list-group-item>
    <i-list-group-item :to="{ name: 'home.index' }">Router Link</i-list-group-item>
    <i-list-group-item>Item</i-list-group-item>
    <i-list-group-item disabled>Disabled</i-list-group-item>
</i-list-group>
~~~

</template>
</i-code-preview>

Behind the scenes, the `<i-list-group-item>` is converted into a `<router-link>` if it has the `:to` property, or a plain `<a>` tag if it has a `href` property. Otherwise, it uses a simple `<div>` tag.

### Sizes
You're able to use the `size` modifier to control the padding of your list groups, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code-preview title="List Group Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/ListGroup">

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

<i-code-preview title="List Group Active State" link="https://github.com/inkline/inkline/tree/master/src/components/ListGroup">

<div>
<i-list-group>
    <i-list-group-item :to="{ name: 'docs.components.list-group' }" exact-active-class="-active">Active Router Link</i-list-group-item>
    <i-list-group-item :to="{ name: 'home.index' }" active>Active Link</i-list-group-item>
</i-list-group>
</div>

<template slot="html">

~~~html
<i-list-group>
    <i-list-group-item :to="{ name: 'docs.components.list-group' }" exact-active-class="-active">Active Router Link</i-list-group-item>
    <i-list-group-item :to="{ name: 'home.index' }" active>Active Link</i-list-group-item>
</i-list-group>
~~~

</template>
</i-code-preview>


### Disabled State
You can control the disabled state of your `<i-list-group-item>` using the `disabled` property. 

<i-code-preview title="List Group Disabled State" link="https://github.com/inkline/inkline/tree/master/src/components/ListGroup">

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

<i-code-preview title="List Group Border" link="https://github.com/inkline/inkline/tree/master/src/components/ListGroup">

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

<i-code-preview title="List Group Item Content" link="https://github.com/inkline/inkline/tree/master/src/components/ListGroup">

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

<i-api-preview title="List Group API" expanded markup="i-list-group" link="https://github.com/inkline/inkline/tree/master/src/components/ListGroup">
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
                    <td>bordered</td>
                    <td>Sets the list group component style to be bordered.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the list group component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
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
                    <td>Slot for list group default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="List Group Item API" markup="i-list-group-item" expanded link="https://github.com/inkline/inkline/tree/master/src/components/ListGroupItem">
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
                    <td>active</td>
                    <td>Sets the list group item state as active.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Sets the list group item state as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>tag</td>
                    <td>Sets the tag to be used for the component. If <code>to</code> or <code>href</code> attribute is provided, an <code>a</code> tag will be used.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>div</code></td>
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
                    <td>Slot for list group item default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
