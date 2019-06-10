# Popover
## Popovers are useful for conveying information when an user clicks or hovers an element.{.lead}

### Example
Wrap both the popover's trigger element (such as an `<i-button>`) and the `<template slot="body">` inside a `<i-popover>` component. Optionally, you can provide a popover header and footer using `slot="header"` and `slot="footer"`.

<i-code-preview title="Popover Example" link="https://github.com/inkline/inkline/tree/master/src/components/Popover" class="_padding-bottom-0">

<i-popover>
    <i-button>Popover</i-button>
    <template slot="header">Popover Header</template>
    <template slot="body">This is the popover body. Useful information goes here.</template>
    <template slot="footer">Popover Footer</template>
</i-popover>

<template slot="html">

~~~html
<i-popover>
    <i-button>Popover</i-button>
    <template slot="header">Popover Header</template>
    <template slot="body">This is the popover body. Useful information goes here.</template>
    <template slot="footer">Popover Footer</template>
</i-popover>

~~~

</template>
</i-code-preview>

### Placement
Trigger popovers at the `top`, `bottom`, `left` or `right` of elements by adding the `placement` property to the `<i-popover>` element. 

Each of the positions also has a `-start` or `-end` variant (`top-start`, `top-end`, `bottom-start`, `bottom-end`, etc.) that sets the popover to the start or end of the placement instead of centering it. 

<i-code-preview title="Popover Placement" link="https://github.com/inkline/inkline/tree/master/src/components/Popover" class="_padding-bottom-0">

<div>
<i-popover placement="top">
    <i-button>Top Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<i-popover placement="bottom">
    <i-button>Bottom Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<i-popover placement="left">
    <i-button>Left Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<i-popover placement="right">
    <i-button>Right Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
</div>

<template slot="html">

~~~html
<i-popover placement="top">
    <i-button>Top Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>

<i-popover placement="bottom">
    <i-button>Bottom Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover placement="left">
    <i-button>Left Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover placement="right">
    <i-button>Right Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~

</template>
</i-code-preview>

## Trigger type
You can use the `trigger` property to trigger the popover on `hover` or `click`. By default, popovers are triggered on `click`, a design decision made to improve user experience.

<i-code-preview title="Popover Trigger Type" link="https://github.com/inkline/inkline/tree/master/src/components/Popover" class="_padding-bottom-0">

<i-popover trigger="click">
    <i-button>Click Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<i-popover trigger="hover">
    <i-button>Hover Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<i-popover trigger="focus">
    <i-button>Focus Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<i-popover :trigger="['focus', 'hover']">
    <i-button>Multiple Events Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<i-popover trigger="manual" v-model="manualPopover">
    <i-button @click="manualPopover = !manualPopover">Manual Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<template slot="html">

~~~html
<i-popover trigger="click">
    <i-button>Click Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover trigger="hover">
    <i-button>Hover Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover trigger="focus">
    <i-button>Focus Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover :trigger="['focus', 'hover']">
    <i-button>Multiple Events Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;
~~~
~~~html
<i-popover trigger="manual" v-model="visible">
    <i-button @click="visible = !visible">Manual Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your popovers, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Popover Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Popover" class="_padding-bottom-0">

<div>
<i-popover size="sm">
    <i-button>Small Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<i-popover size="md">
    <i-button>Medium Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>&nbsp;

<i-popover size="lg">
    <i-button>Large Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
</div>

<template slot="html">

~~~html
<i-popover size="sm">
    <i-button>Small Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover size="md">
    <i-button>Medium Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~
~~~html
<i-popover size="lg">
    <i-button>Large Popover</i-button>
    <template slot="body">This is the popover body. Useful information goes here.</template>
</i-popover>
~~~

</template>
</i-code-preview>


### Variants
Inkline includes two predefined popover styles, each serving its own semantic purpose. You can set the style of a `<i-popover>` using the `variant` property, which can have a value of `light` or `dark`. By default, popovers use the `light` variant.

<i-code-preview title="Popover Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Popover" class="_padding-bottom-0">

<div>
<i-popover variant="light">
    <i-button variant="light">Light Popover</i-button>
    <template slot="header">Popover Header</template>
    <template slot="body">This is the popover body. Useful information goes here.</template>
    <template slot="footer">Popover Footer</template>
</i-popover>&nbsp;

<i-popover variant="dark">
    <i-button variant="dark">Dark Popover</i-button>
    <template slot="header">Popover Header</template>
    <template slot="body">This is the popover body. Useful information goes here.</template>
    <template slot="footer">Popover Footer</template>
</i-popover>
</div>

<template slot="html">

~~~html
<i-popover variant="light">
    <i-button variant="light">Light Popover</i-button>
    <template slot="header">Popover Header</template>
    <template slot="body">This is the popover body. Useful information goes here.</template>
    <template slot="footer">Popover Footer</template>
</i-popover>
~~~
~~~html
<i-popover variant="dark">
    <i-button variant="dark">Dark Popover</i-button>
    <template slot="header">Popover Header</template>
    <template slot="body">This is the popover body. Useful information goes here.</template>
    <template slot="footer">Popover Footer</template>
</i-popover>
~~~

</template>
</i-code-preview>

### API

<i-api-preview title="Popover API" markup="i-popover" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Popover">
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
                    <td>arrow</td>
                    <td>Sets whether to attach an arrow to the popover.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Sets the popover state as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>Sets the identifier of the popover.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>popover-&lt;uid&gt;</code></td>
                </tr>
                <tr>
                    <td>placement</td>
                    <td>Sets the placement of the popover.</td>
                    <td><code>String</code></td>
                    <td>
                        <code>top</code>, 
                        <code>top-start</code>,
                        <code>top-end</code>,
                        <code>bottom</code>, 
                        <code>bottom-start</code>,
                        <code>bottom-end</code>,
                        <code>left</code>, 
                        <code>left-start</code>,
                        <code>left-end</code>,
                        <code>right</code>, 
                        <code>right-start</code>,
                        <code>right-end</code>
                    </td>
                    <td><code>top</code></td>
                </tr>
                <tr>
                    <td>popperOptions</td>
                    <td>Sets custom options for the Popper.js plugin.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>trigger</td>
                    <td>Sets the trigger event of the popover.</td>
                    <td><code>String</code></td>
                    <td><code>click</code>, <code>hover</code></td>
                    <td><code>click</code></td>
                </tr>
                <tr>
                    <td>transformOrigin</td>
                    <td>Sets the transform origin of the popover.</td>
                    <td>
                        <code>Boolean</code>, 
                        <code>String</code> 
                    </td>
                    <td></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the popover.</td>
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
                    <td>Slot for popover component trigger.</td>
                </tr>
                <tr>
                    <td>header</td>
                    <td>Slot for popover component header.</td>
                </tr>
                <tr>
                    <td>body</td>
                    <td>Slot for popover component body.</td>
                </tr>
                <tr>
                    <td>footer</td>
                    <td>Slot for popover component footer.</td>
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
                    <td>Emitted when visibility changes.</td>
                    <td><code>(visible: Boolean) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

