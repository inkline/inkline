# Collapsible
## Collapsible elements are used to show and hide content using a smooth reveal transition. {.lead}

### Example
Collapsing an element will animate the height from zero to its default value. This component is useful for creating clearly separated content sections such as FAQ pages.

<i-code-preview title="Collapsible Example">

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

<i-code-preview title="Collapsible Title">

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
Panels can be opened by default, on page load, using the `v-model` directive of the `<i-collapsible>` component. First, you'll need to assign an `id` to the `<i-collapsible-item>` components which will identify the open panels.
 
 <i-code-preview title="Default Open Collapsible Panel">

<i-collapsible v-model="active">
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
<i-collapsible v-model="active">
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

<i-code-preview title="Collapsible Accordion">

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

<i-code-preview title="Collapsible Variants">

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

~~~html
<i-collapsible variant="unstyled">
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

<i-api-preview title="Collapsible API" markup="i-collapsible" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Collapsible">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">accordion</template>
                <template slot="description">Sets the collapsible in accordion mode.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the default active collapsible item and stores opened collapsible panels. To be used together with the <code>v-model</code> directive.</template>
                <template slot="type">Array</template>
                <template slot="values"></template>
                <template slot="default"><code>[]</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the collapsible component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code>, <code>unstyled</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for collapsible default content.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when collapsible items are opened or closed.</template>
                <template slot="type"><code>(activeItems: String[]) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Collapsible Item API" markup="i-collapsible-item" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Collapsible">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">title</template>
                <template slot="description">Sets the title of the collapsible panel. Replaceable using the <code>title</code> slot.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">id</template>
                <template slot="description">Sets the identifier of the collapsible item.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"><code>collapsible-item-&lt;uid&gt;</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for collapsible item default content.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">title</template>
                <template slot="description">Slot for collapsible item title.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
