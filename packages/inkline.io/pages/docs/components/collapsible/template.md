# Collapsible
Collapsible elements are used to show and hide content. {.lead}

### Example
Collapsing an element will animate the height from zero to its default value. This component is useful for creating clearly separated content sections such as FAQ pages.

<i-code-preview title="Collapsible Example" link="https://github.com/inkline/inkline/tree/master/src/components/Collapsible">

<i-collapsible>
    <i-collapsible-item title="Item 1">
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 2">
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 3">
        Item 3 content
    </i-collapsible-item>
</i-collapsible>

<template slot="html">

~~~html
<i-collapsible>
    <i-collapsible-item title="Item 1">
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 2">
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 3">
        Item 3 content
    </i-collapsible-item>
</i-collapsible>
~~~

</template>
</i-code-preview>

### Item Title
You can use the `title` slot to provide a custom title for the collapsible panel's heading. 

<i-code-preview title="Collapsible Title" link="https://github.com/inkline/inkline/tree/master/src/components/Collapsible">

<i-collapsible>
    <i-collapsible-item>
        <template slot="title">Item 1</template>
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item>
        <template slot="title">Item 2</template>
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item>
        <template slot="title">Item 3</template>
        Item 3 content
    </i-collapsible-item>
</i-collapsible>

<template slot="html">

~~~html
<i-collapsible>
    <i-collapsible-item>
        <template slot="title">Item 1</template>
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item>
        <template slot="title">Item 2</template>
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item>
        <template slot="title">Item 3</template>
        Item 3 content
    </i-collapsible-item>
</i-collapsible>
~~~

</template>
</i-code-preview>

### Default Open Panels
Panels can be opened by default, on page load, using the `active` field of the `<i-collapsible>` component. First, you'll need to assign an `id` to the `<i-collapsible-item>` components which will identify the open panels.
 
 <i-code-preview title="Default Open Collapsible Panel" link="https://github.com/inkline/inkline/tree/master/src/components/Collapsible">

<i-collapsible :active="active">
    <i-collapsible-item id="panel-1">
        <template slot="title">Item 1</template>
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item id="panel-2">
        <template slot="title">Item 2</template>
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item id="panel-3">
        <template slot="title">Item 3</template>
        Item 3 content
    </i-collapsible-item>
</i-collapsible>

<template slot="html">

~~~html
<i-collapsible :active="active">
    <i-collapsible-item id="panel-1">
        <template slot="title">Item 1</template>
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item id="panel-2">
        <template slot="title">Item 2</template>
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item id="panel-3">
        <template slot="title">Item 3</template>
        Item 3 content
    </i-collapsible-item>
</i-collapsible>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            active: ['panel-1']
        };
    }
}
~~~

</template>
</i-code-preview>

### Accordion
Accordion collapsible groups can have only one content panel open at a single time. This behaviour can be set using the `accordion` property.

<i-code-preview title="Collapsible Accordion" link="https://github.com/inkline/inkline/tree/master/src/components/Collapsible">

<i-collapsible accordion>
    <i-collapsible-item title="Item 1">
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 2">
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 3">
        Item 3 content
    </i-collapsible-item>
</i-collapsible>

<template slot="html">

~~~html
<i-collapsible accordion>
    <i-collapsible-item title="Item 1">
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 2">
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 3">
        Item 3 content
    </i-collapsible-item>
</i-collapsible>
~~~

</template>
</i-code-preview>


### Color Variants
Inkline includes basic predefined collapsible styles that you can use within your application. You can apply a style using the `variant` property.

<i-code-preview title="Collapsible Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Collapsible">

<i-collapsible variant="light">
    <i-collapsible-item title="Item 1">
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 2">
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 3">
        Item 3 content
    </i-collapsible-item>
</i-collapsible>

<div class="_margin-top-1">
    <i-collapsible variant="dark">
        <i-collapsible-item title="Item 1">
            Item 1 content
        </i-collapsible-item>
        <i-collapsible-item title="Item 2">
            Item 2 content
        </i-collapsible-item>
        <i-collapsible-item title="Item 3">
            Item 3 content
        </i-collapsible-item>
    </i-collapsible>
</div>

<template slot="html">

~~~html
<i-collapsible variant="light">
    <i-collapsible-item title="Item 1">
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 2">
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 3">
        Item 3 content
    </i-collapsible-item>
</i-collapsible>
~~~

~~~html
<i-collapsible variant="dark">
    <i-collapsible-item title="Item 1">
        Item 1 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 2">
        Item 2 content
    </i-collapsible-item>
    <i-collapsible-item title="Item 3">
        Item 3 content
    </i-collapsible-item>
</i-collapsible>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Collapsible API" markup="i-collapsible" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Collapsible">
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
                    <td>accordion</td>
                    <td>Sets the collapsible in accordion mode.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>active</td>
                    <td>Sets the default active collapsible item.</td>
                    <td>Array</td>
                    <td></td>
                    <td><code>[]</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the collapsible component.</td>
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
                    <td>Slot for collapsible default content.</td>
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
                    <td>Emitted when collapsible items are opened or closed.</td>
                    <td><code>(activeItems: String[]) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Collapsible Item API" markup="i-collapsible-item" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Collapsible">
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
                    <td>title</td>
                    <td>Sets the title of the collapsible panel. Replaceable using the <code>title</code> slot.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>Sets the identifier of the collapsible item.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>collapsible-item-&lt;uid&gt;</code></td>
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
                    <td>Slot for collapsible item default content.</td>
                </tr>
                <tr>
                    <td>title</td>
                    <td>Slot for collapsible item title.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>