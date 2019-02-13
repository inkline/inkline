# Button Groups
Group multiple buttons together on a single line using a button group. {.lead}

### Example
You can group a series of `<i-button>` components inside a `<i-button-group>` to display them inline, conveying additional meaning.

<i-code-preview title="Button Group Example" link="https://github.com/inkline/inkline/tree/master/src/components/ButtonGroup">

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

<i-code-preview title="Button Group Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/ButtonGroup">

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

<i-code-preview title="Button Group Nesting" link="https://github.com/inkline/inkline/tree/master/src/components/ButtonGroup">

<i-button-group>
    <i-button>Button 1</i-button>
    <i-button>Button 2</i-button>
    <i-button-group>
        <i-button>Button 3</i-button>
        <i-button>Button 4</i-button>
    </i-button-group>
</i-button-group>

<template slot="html">

~~~html
<i-button-group>
    <i-button>Button 1</i-button>
    <i-button>Button 2</i-button>
    <i-button-group>
        <i-button>Button 3</i-button>
        <i-button>Button 4</i-button>
    </i-button-group>
</i-button-group>
~~~

</template>
</i-code-preview>

### Vertical
Using the `vertical` property, you can stack a set of buttons vertically rather than horizontally.

<i-code-preview title="Vertical Button Group" link="https://github.com/inkline/inkline/tree/master/src/components/ButtonGroup">

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

<i-code-preview title="Vertical Button Group Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/ButtonGroup">

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


### API

<i-api-preview title="Button Group API" expanded markup="i-button-group" link="https://github.com/inkline/inkline/tree/master/src/components/ButtonGroup">
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
                    <td>disabled</td>
                    <td>Sets the state of the button group component and its child button components to disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the button group component and its child button components.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>vertical</td>
                    <td>Sets the direction of the button group component.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
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
                    <td>Slot for button group default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
