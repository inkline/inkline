# Button Group
## Group multiple buttons together on a single line using a button group. {.lead}

### Example
You can group a series of `<i-button>` components inside a `<i-button-group>` to display them inline, conveying additional meaning.

<i-code-preview title="Button Group Example">

<i-button-group>
    <i-button>Left</i-button>
    <i-button>Middle</i-button>
    <i-button>Right</i-button>
</i-button-group>

<template slot="html">

~~~html
<i-button-group>
    <i-button">Left</i-button>
    <i-button">Middle</i-button>
    <i-button">Right</i-button>
</i-button-group>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your buttons, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Button Group Sizes">

<div class="_margin-bottom-1">
    <i-button-group size="sm">
        <i-button>Left</i-button>
        <i-button>Middle</i-button>
        <i-button>Right</i-button>
    </i-button-group>
</div>

<div class="_margin-bottom-1">
    <i-button-group size="md">
        <i-button>Left</i-button>
        <i-button>Middle</i-button>
        <i-button>Right</i-button>
    </i-button-group>
</div>

<div>
    <i-button-group size="lg">
        <i-button>Left</i-button>
        <i-button>Middle</i-button>
        <i-button>Right</i-button>
    </i-button-group>
</div>

<template slot="html">

~~~html
<i-button-group size="sm">
    <i-button>Left</i-button>
    <i-button>Middle</i-button>
    <i-button>Right</i-button>
</i-button-group>
~~~
~~~html
<i-button-group size="md">
    <i-button>Left</i-button>
    <i-button>Middle</i-button>
    <i-button>Right</i-button>
</i-button-group>
~~~
~~~html
<i-button-group size="lg">
    <i-button>Left</i-button>
    <i-button>Middle</i-button>
    <i-button>Right</i-button>
</i-button-group>
~~~

</template>
</i-code-preview>

### Nesting
When placing a `<i-button-group>` inside another `<i-button-group>`, you'll get a mixed series of buttons.

<i-code-preview title="Button Group Nesting">

<i-button-group>
    <i-button>Button 1</i-button>
    <i-button-group>
        <i-button>Button 2</i-button>
        <i-button>Button 3</i-button>
    </i-button-group>
</i-button-group>

<template slot="html">

~~~html
<i-button-group>
    <i-button>Button 1</i-button>
    <i-button-group>
        <i-button>Button 2</i-button>
        <i-button>Button 3</i-button>
    </i-button-group>
</i-button-group>
~~~

</template>
</i-code-preview>

### Vertical
Using the `vertical` property, you can stack a set of buttons vertically rather than horizontally.

<i-code-preview title="Vertical Button Group">

<i-button-group vertical>
    <i-button>Button 1</i-button>
    <i-button>Button 2</i-button>
    <i-button>Button 3</i-button>
</i-button-group>

<template slot="html">

~~~html
<i-button-group vertical>
    <i-button>Button 1</i-button>
    <i-button>Button 2</i-button>
    <i-button>Button 3</i-button>
</i-button-group>
~~~

</template>
</i-code-preview>

### Vertical Sizes
Just like horizontal button groups, the size of vertical button groups can also be controlled using the `size` modifier. 
The default size is set to `md`.

<i-code-preview title="Vertical Button Group Sizes">

<div class="_clearfix">
    <div class="_float-left _margin-right-1">
        <i-button-group vertical size="sm">
            <i-button>Left</i-button>
            <i-button>Middle</i-button>
            <i-button>Right</i-button>
        </i-button-group>
    </div>
    <div class="_float-left _margin-right-1">
        <i-button-group vertical size="md">
            <i-button>Left</i-button>
            <i-button>Middle</i-button>
            <i-button>Right</i-button>
        </i-button-group>
    </div>
    <div class="_float-left _margin-right-1">
        <i-button-group vertical size="lg">
            <i-button>Left</i-button>
            <i-button>Middle</i-button>
            <i-button>Right</i-button>
        </i-button-group>
    </div>
</div>

<template slot="html">

~~~html
<i-button-group vertical size="sm">
    <i-button>Left</i-button>
    <i-button>Middle</i-button>
    <i-button>Right</i-button>
</i-button-group>
~~~
~~~html
<i-button-group vertical size="md">
    <i-button>Left</i-button>
    <i-button>Middle</i-button>
    <i-button>Right</i-button>
</i-button-group>
~~~
~~~html
<i-button-group vertical size="lg">
    <i-button>Left</i-button>
    <i-button>Middle</i-button>
    <i-button>Right</i-button>
</i-button-group>
~~~

</template>
</i-code-preview>


### Component API
Here you can find a list of the various customization options you can use for the button group component as props, as well as available slots.

<i-api-preview title="Button Group API" expanded markup="i-button-group" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/ButtonGroup">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the button group component and its child button components to disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the button group component and its child button components.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">vertical</template>
                <template slot="description">Sets the direction of the button group component.</template>
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
                <template slot="description">Slot for button group default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
