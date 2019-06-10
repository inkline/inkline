# Button
## Inkline provides you with custom button styles with support for multiple sizes, states, and more. { .lead }

### Variants
Inkline includes several predefined button styles, each serving its own semantic purpose, with a few extra variants available for more control.

<i-code-preview title="Button Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button variant="primary">Primary</i-button>&nbsp;
<i-button variant="secondary">Secondary</i-button>&nbsp;
<i-button variant="success">Success</i-button>&nbsp;
<i-button variant="danger">Danger</i-button>&nbsp;
<i-button variant="warning">Warning</i-button>&nbsp;
<i-button variant="info">Info</i-button>&nbsp;
<i-button variant="light">Light</i-button>&nbsp;
<i-button variant="dark">Dark</i-button>
</div>

<template slot="html">

~~~html
<i-button variant="primary">Primary</i-button>
~~~
~~~html
<i-button variant="secondary">Secondary</i-button>
~~~
~~~html
<i-button variant="success">Success</i-button>
~~~
~~~html
<i-button variant="danger">Danger</i-button>
~~~
~~~html
<i-button variant="warning">Warning</i-button>
~~~
~~~html
<i-button variant="info">Info</i-button>
~~~
~~~html
<i-button variant="light">Light</i-button>
~~~
~~~html
<i-button variant="dark">Dark</i-button>
~~~

</template>
</i-code-preview>


### Button Type
The `<i-button>` component makes use of a `<button>` element markup behind the scenes. Therefore, you can assign a type to it,
just like with the `<button>` element.

<i-code-preview title="Button Type" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button type="button">Button</i-button>&nbsp;
<i-button type="submit">Submit</i-button>&nbsp;
<i-button type="reset">Reset</i-button>
</div>

<template slot="html">

~~~html
<i-button type="button">Button</i-button>
~~~
~~~html
<i-button type="submit">Submit</i-button>
~~~
~~~html
<i-button type="reset">Reset</i-button>
~~~

</template>
</i-code-preview>

If you need to change the `<button>` node used to render the component, you can use the `tag` property to change it.

<i-code-preview title="Button Tag" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button tag="a">Anchor</i-button>&nbsp;
</div>
<div>
<i-button tag="button" type="button">Button</i-button>&nbsp;
<i-button tag="button" type="submit">Submit Button</i-button>&nbsp;
<i-button tag="button" type="reset">Reset Button</i-button>&nbsp;
</div>
<div>
<i-button tag="input" type="button" value="Input"></i-button>&nbsp;
<i-button tag="input" type="submit" value="Submit Input"></i-button>&nbsp;
<i-button tag="input" type="reset" value="Reset Input"></i-button>
</div>

<template slot="html">

~~~html
<i-button tag="a">Link Button</i-button>
~~~
~~~html
<i-button tag="button" type="button">Button</i-button>
<i-button tag="button" type="submit">Submit Button</i-button>
<i-button tag="button" type="reset">Reset Button</i-button>
~~~
~~~html
<i-button tag="input" type="button" value="Input"></i-button>
<i-button tag="input" type="submit" value="Submit Input"></i-button>
<i-button tag="input" type="reset" value="Reset Input"></i-button>
~~~

</template>
</i-code-preview>


### Outline Style
Sometimes, buttons should not stand out so much. Replace the default modifier classes with the `outline` property
to remove background images and colors on any button when not interacted with.

<i-code-preview title="Button Outline" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button outline variant="primary">Primary</i-button>&nbsp;
<i-button outline variant="secondary">Secondary</i-button>&nbsp;
<i-button outline variant="success">Success</i-button>&nbsp;
<i-button outline variant="danger">Danger</i-button>&nbsp;
<i-button outline variant="warning">Warning</i-button>&nbsp;
<i-button outline variant="info">Info</i-button>&nbsp;
<i-button outline variant="light">Light</i-button>&nbsp;
<i-button outline variant="dark">Dark</i-button>
</div>

<template slot="html">

~~~html
<i-button outline variant="primary">Primary</i-button>
~~~
~~~html
<i-button outline variant="secondary">Secondary</i-button>
~~~
~~~html
<i-button outline variant="success">Success</i-button>
~~~
~~~html
<i-button outline variant="danger">Danger</i-button>
~~~
~~~html
<i-button outline variant="warning">Warning</i-button>
~~~
~~~html
<i-button outline variant="info">Info</i-button>
~~~
~~~html
<i-button outline variant="light">Light</i-button>
~~~
~~~html
<i-button outline variant="dark">Dark</i-button>
~~~

</template>
</i-code-preview>

### Link Style
You can create link buttons that look the same as normal links. Link buttons will use the `variant` property to set the color of the link.

<i-code-preview title="Link Button" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button link variant="primary">Primary</i-button>&nbsp;
<i-button link variant="secondary">Secondary</i-button>&nbsp;
<i-button link variant="success">Success</i-button>&nbsp;
<i-button link variant="danger">Danger</i-button>&nbsp;
<i-button link variant="warning">Warning</i-button>&nbsp;
<i-button link variant="info">Info</i-button>&nbsp;
<i-button link variant="light">Light</i-button>&nbsp;
<i-button link variant="dark">Dark</i-button>
</div>

<template slot="html">

~~~html
<i-button link variant="primary">Primary</i-button>
~~~
~~~html
<i-button link variant="secondary">Secondary</i-button>
~~~
~~~html
<i-button link variant="success">Success</i-button>
~~~
~~~html
<i-button link variant="danger">Danger</i-button>
~~~
~~~html
<i-button link variant="warning">Warning</i-button>
~~~
~~~html
<i-button link variant="info">Info</i-button>
~~~
~~~html
<i-button link variant="light">Light</i-button>
~~~
~~~html
<i-button link variant="dark">Dark</i-button>
~~~

</template>
</i-code-preview>

### Circle Style
Circle buttons are very common when working with icon actions. You can transform buttons into circles using the `circle`
modifier. You're also able to use the `size` modifier to control the size of your circle buttons. 

<i-code-preview title="Circle Button" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button circle size="sm">S</i-button>&nbsp;
<i-button circle>M</i-button>&nbsp;
<i-button circle size="lg">L</i-button>
</div>

<template slot="html">

~~~html
<i-button circle size="sm">S</i-button>
~~~
~~~html
<i-button circle>M</i-button>
~~~
~~~html
<i-button circle size="lg">L</i-button>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your buttons, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Button Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button size="sm">Small Button</i-button>&nbsp;
<i-button size="md">Medium Button</i-button>&nbsp;
<i-button size="lg">Large Button</i-button>
</div>

<template slot="html">

~~~html
<i-button size="sm">Small Button</i-button>
~~~
~~~html
<i-button size="md">Medium Button</i-button>
~~~
~~~html
<i-button size="lg">Large Button</i-button>
~~~

</template>
</i-code-preview>

### Block
You can create block level buttons that span the full width of a parent by adding the `block` property.

<i-code-preview title="Block Button" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">
<i-button block>Block Button</i-button>

<template slot="html">

~~~html
<i-button block>Block Button</i-button>
~~~

</template>
</i-code-preview>

### Active State
Buttons will appear pressed when active. You can force a button to have an active appearance with the `active` property (this will also include the aria-pressed="true" attribute).

<i-code-preview title="Active Button State" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button active>Active Default Button</i-button>&nbsp;
<i-button active variant="primary">Active Primary Button</i-button>
</div>

<template slot="html">

~~~html
<i-button active>Active Default Button</i-button>
~~~
~~~html
<i-button active variant="primary">Active Primary Button</i-button>
~~~

</template>
</i-code-preview>

### Disabled State
You can make buttons look inactive or disabled by adding the `disabled` boolean property to an `<i-button>` element.

<i-code-preview title="Disabled Button State" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button disabled>Disabled Default Button</i-button>&nbsp;
<i-button disabled variant="primary">Disabled Primary Button</i-button>
</div>

<template slot="html">

~~~html
<i-button active>Active Default Button</i-button>
~~~
~~~html
<i-button active variant="primary">Active Primary Button</i-button>
~~~

</template>
</i-code-preview>

### Linking and Routing
Buttons will be automatically converted to link anchors `<a>` when providing a `href` property. You can also specify `target` and `rel` properties.

The `<i-button>` component is well integrated with the [Vue Router](https://router.vuejs.org) plugin and will be converted to a `<router-link>` when using the `to` property.

<i-code-preview title="Button Linking and Routing" link="https://github.com/inkline/inkline/tree/master/src/components/Button" class="_padding-bottom-0">

<div>
<i-button href="http://inkline.io">Button Link</i-button>&nbsp;
<i-button :to="{ name: 'docs-components-button' }">Button Route</i-button>
</div>

<template slot="html">

~~~html
<i-button href="http://inkline.io">Button Link</i-button>
~~~
~~~html
<i-button :to="{ name: 'docs-components-button' }">Button Route</i-button>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Button API" expanded markup="i-button" link="https://github.com/inkline/inkline/tree/master/src/components/Button">
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
                    <td>Sets the button component state as active.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>block</td>
                    <td>Sets the button component style to span the whole parent width.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>circle</td>
                    <td>Sets the button component style to be a circle.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Sets the button component state as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>href</td>
                    <td>Treats the button component as an anchor.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>link</td>
                    <td>Sets the button component style to be a plain link.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>loading</td>
                    <td>Sets the button loading state. To be used together with the <code>loading</code> slot.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>outline</td>
                    <td>Sets the button component style to be an outline.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the button component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>tag</td>
                    <td>Sets the tag used to render the button component.</td>
                    <td><code>String</code></td>
                    <td><code>a</code>, <code>button</code>, <code>input</code></td>
                    <td><code>button</code></td>
                </tr>
                <tr>
                    <td>to</td>
                    <td>Treats the button component as a <code>router-link</code>.</td>
                    <td>Object</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the button component.</td>
                    <td><code>String</code></td>
                    <td><code>primary</code>, <code>secondary</code>, <code>light</code>, <code>dark</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></td>
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
                    <td>Slot for button default content.</td>
                </tr>
                <tr>
                    <td>loading</td>
                    <td>Slot for button loading state.</td>
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
                        <td>click</td>
                        <td>Emitted when button component is clicked.</td>
                        <td><code>(event: Event) => {}</code></td>
                    </tr>
                </tbody>
            </table>
        </template>
</i-api-preview>
