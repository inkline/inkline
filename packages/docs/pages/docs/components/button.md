# Button
## Inkline provides you with custom button styles with support for multiple sizes, states, and more. { .lead }

### Variants
Inkline includes several predefined button styles, each serving its own semantic purpose, with a few extra variants available for more control.

<i-code-preview title="Button Variants">

<div>
<i-button variant="primary">Primary</i-button>
<i-button variant="secondary">Secondary</i-button>
<i-button variant="success">Success</i-button>
<i-button variant="danger">Danger</i-button>
<i-button variant="warning">Warning</i-button>
<i-button variant="info">Info</i-button>
<i-button variant="light">Light</i-button>
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

<i-code-preview title="Button Type">

<div>
<i-button type="button">Button</i-button>
<i-button type="submit">Submit</i-button>
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

<i-code-preview title="Button Tag">

<div>
<i-button tag="a">Anchor</i-button>
</div>
<div>
<i-button tag="button" type="button">Button</i-button>
<i-button tag="button" type="submit">Submit Button</i-button>
<i-button tag="button" type="reset">Reset Button</i-button>
</div>
<div>
<i-button tag="input" type="button" value="Input"></i-button>
<i-button tag="input" type="submit" value="Submit Input"></i-button>
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

<i-code-preview title="Button Outline">

<div>
<i-button outline variant="primary">Primary</i-button>
<i-button outline variant="secondary">Secondary</i-button>
<i-button outline variant="success">Success</i-button>
<i-button outline variant="danger">Danger</i-button>
<i-button outline variant="warning">Warning</i-button>
<i-button outline variant="info">Info</i-button>
<i-button outline variant="light">Light</i-button>
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

<i-code-preview title="Link Button">

<div>
<i-button link variant="primary">Primary</i-button>
<i-button link variant="secondary">Secondary</i-button>
<i-button link variant="success">Success</i-button>
<i-button link variant="danger">Danger</i-button>
<i-button link variant="warning">Warning</i-button>
<i-button link variant="info">Info</i-button>
<i-button link variant="light">Light</i-button>
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

<i-code-preview title="Circle Button">

<div>
<i-button circle size="sm">S</i-button>
<i-button circle>M</i-button>
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

<i-code-preview title="Button Sizes">

<div>
<i-button size="sm">Small Button</i-button>
<i-button size="md">Medium Button</i-button>
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

<i-code-preview title="Block Button">
<i-button block>Block Button</i-button>

<template slot="html">

~~~html
<i-button block>Block Button</i-button>
~~~

</template>
</i-code-preview>

### Button Icon
You can easily use the `i-button` component together with any icon component (i.e. FontAwesome, IcoMoon), including any of the <nuxt-link :to="{ name: 'docs-components-icon' }">list of icons</nuxt-link> of the `i-icon` component.

<i-code-preview title="Button Icon">
<i-button><i-icon icon="home" class="_margin-right-1-2"></i-icon> Button Icon</i-button>
<i-button>Button Icon <i-icon icon="home" class="_margin-left-1-2"></i-icon></i-button>
<i-button><i-icon icon="home" class="_margin-right-1-2"></i-icon> Button Icon <i-icon icon="caret-down" class="_margin-left-1-2"></i-icon></i-button>

<template slot="html">

~~~html
<i-button>
    <i-icon icon="home" class="_margin-right-1-2"></i-icon> Button Icon
</i-button>
~~~
~~~html
<i-button>
    Button Icon <i-icon icon="home" class="_margin-left-1-2"></i-icon>
</i-button>
~~~
~~~html
<i-button>
    <i-icon icon="home" class="_margin-right-1-2"></i-icon>
    Button Icon
    <i-icon icon="caret-down" class="_margin-left-1-2"></i-icon>
</i-button>
~~~

</template>
</i-code-preview>

### Active State
Buttons will appear pressed when active. You can force a button to have an active appearance with the `active` property (this will also include the aria-pressed="true" attribute).

<i-code-preview title="Active Button State">

<div>
<i-button active>Active Default Button</i-button>
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

<i-code-preview title="Disabled Button State">

<div>
<i-button disabled>Disabled Default Button</i-button>
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

### Loading State
You can add a loading state to the button by setting the `loading` boolean property to an `<i-button>` element. 

By default, the button will display a standard Inkline loading spinner. You can provide custom loading state by providing a `loading` slot.

<i-code-preview title="Loading Button State">

<div>
<i-button :loading="true">Button</i-button>
<i-button :loading="true">
    Button
    <template v-slot:loading>
        <i-loader size="auto" variant="dark" class="_margin-right-1-2" />
        Loading
    </template>
</i-button>
</div>

<template slot="html">

~~~html
<i-button :loading="true">Disabled Default Button</i-button>
~~~

~~~html
<i-button :loading="true">
   Button
   <template v-slot:loading>
       <i-loader size="auto" variant="dark" class="_margin-right-1-2" /> 
       Loading
   </template>
</i-button>
~~~

</template>
</i-code-preview>

### Linking and Routing
Buttons will be automatically converted to link anchors `<a>` when providing a `href` property. You can also specify `target` and `rel` properties.

The `<i-button>` component is well integrated with the [Vue Router](https://router.vuejs.org) plugin and will be converted to a `<router-link>` when using the `to` property.

<i-code-preview title="Button Linking and Routing">

<div>
<i-button href="https://inkline.io">Button Link</i-button>
<i-button :to="{ name: 'docs-components-button' }">Button Route</i-button>
</div>

<template slot="html">

~~~html
<i-button href="https://inkline.io">Button Link</i-button>
~~~
~~~html
<i-button :to="{ name: 'docs-components-button' }">Button Route</i-button>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Button API" expanded markup="i-button" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Button">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">active</template>
                <template slot="description">Sets the button component state as active.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">block</template>
                <template slot="description">Sets the button component style to span the whole parent width.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">circle</template>
                <template slot="description">Sets the button component style to be a circle.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the button component state as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">href</template>
                <template slot="description">Treats the button component as an anchor.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">link</template>
                <template slot="description">Sets the button component style to be a plain link.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">loading</template>
                <template slot="description">Sets the button loading state. To be used together with the <code>loading</code> slot.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">outline</template>
                <template slot="description">Sets the button component style to be an outline.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the button component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">tag</template>
                <template slot="description">Sets the tag used to render the button component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>a</code>, <code>button</code>, <code>input</code></template>
                <template slot="default"><code>button</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">to</template>
                <template slot="description">Treats the button component as a <code>router-link</code>.</template>
                <template slot="type">Object</template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the button component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>primary</code>, <code>secondary</code>, <code>light</code>, <code>dark</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for button default content.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">loading</template>
                <template slot="description">Slot for button loading state.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when button component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
