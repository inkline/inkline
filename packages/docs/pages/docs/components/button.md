---
title: Button
description: Inkline provides you with custom button styles with support for multiple sizes, states, and more. 
---

# Button
## Inkline provides you with custom button styles with support for multiple sizes, states, and more. 

### Variants
Inkline includes several predefined button styles, each serving its own semantic purpose, with a few extra variants available for more control.

<i-code title="Button Variants">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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
<i-button variant="dark">~~~~Dark</i-button>
~~~

</i-tab>
</i-code>

### Button Type
The `<i-button>` component makes use of a `<button>` element markup behind the scenes. Therefore, you can assign a type to it,
just like with the `<button>` element.

<i-code title="Button Type">
<i-tab type="preview">
    <div>
        <i-button type="button">Button</i-button>
        <i-button type="submit">Submit</i-button>
        <i-button type="reset">Reset</i-button>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-button type="button">Button</i-button>
~~~
~~~html
<i-button type="submit">Submit</i-button>
~~~
~~~html
<i-button type="reset">Reset</i-button>
~~~

</i-tab>
</i-code>

If you need to change the `<button>` node used to render the component, you can use the `tag` property to change it.

<i-code title="Button Tag">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>


### Outline Style
Sometimes, buttons should not stand out so much. Replace the default modifier classes with the `outline` property
to remove background images and colors on any button when not interacted with.

<i-code title="Button Outline">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

### Link Style
You can create link buttons that look the same as normal links. Link buttons will use the `variant` property to set the color of the link.

<i-code title="Link Button">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

### Circle Style
Circle buttons are very common when working with icon actions. You can transform buttons into circles using the `circle`
modifier. You're also able to use the `size` modifier to control the size of your circle buttons. 

<i-code title="Circle Button">
<i-tab type="preview">
    <div>
        <i-button circle size="sm">S</i-button>
        <i-button circle>M</i-button>
        <i-button circle size="lg">L</i-button>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-button circle size="sm">S</i-button>
~~~
~~~html
<i-button circle>M</i-button>
~~~
~~~html
<i-button circle size="lg">L</i-button>
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your buttons, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Button Sizes">
<i-tab type="preview">
    <div>
        <i-button size="sm">Small Button</i-button>
        <i-button size="md">Medium Button</i-button>
        <i-button size="lg">Large Button</i-button>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-button size="sm">Small Button</i-button>
~~~
~~~html
<i-button size="md">Medium Button</i-button>
~~~
~~~html
<i-button size="lg">Large Button</i-button>
~~~

</i-tab>
</i-code>

### Block
You can create block level buttons that span the full width of a parent by adding the `block` property.

<i-code title="Block Button">
<i-tab type="preview">
    <i-button block>Block Button</i-button>
</i-tab>
<i-tab type="html">

~~~html
<i-button block>Block Button</i-button>
~~~

</i-tab>
</i-code>

### Social Variants
You can use variants for the most common social login buttons out of the box. The examples below make use of the `block` modifier to have them full-width.

<i-code title="Social Variants">
<i-tab type="preview">
    <i-button variant="facebook" block>
        Signin with Facebook
    </i-button>
    <i-button variant="google" block>
        Signin with Google
    </i-button>
    <i-button variant="twitter" block>
        Signin with Twitter
    </i-button>
    <i-button variant="github" block>
        Signin with GitHub
    </i-button>
</i-tab>
<i-tab type="html">

~~~html
<i-button variant="facebook" block>Singin with Facebook</i-button>
~~~
~~~html
<i-button variant="google" block>Singin with Google</i-button>
~~~
~~~html
<i-button variant="twitter" block>Singin with Twitter</i-button>
~~~
~~~html
<i-button variant="github" block>Singin with GitHub</i-button>
~~~

</i-tab>
</i-code>

### Button Icon
You can easily use the `i-button` component together with any icon component (i.e. FontAwesome, IcoMoon), including any of the <nuxt-link :to="{ name: 'docs-components-icon' }">list of icons</nuxt-link> of the `i-icon` component.

<i-code title="Button Icon">
<i-tab type="preview">
    <i-button>
        <i-icon icon="star-full" class="_margin-right-1-2"></i-icon> Button Icon
    </i-button>
    <i-button>
        Button Icon <i-icon icon="star-full" class="_margin-left-1-2"></i-icon></i-button>
    <i-button>
        <i-icon icon="star-full" class="_margin-right-1-2"></i-icon> 
        Button Icon 
        <i-icon icon="star-full" class="_margin-left-1-2"></i-icon>
    </i-button>
</i-tab>
<i-tab type="html">

~~~html
<i-button>
    <i-icon icon="star-full" class="_margin-right-1-2"></i-icon> Button Icon
</i-button>
~~~
~~~html
<i-button>
    Button Icon <i-icon icon="star-full" class="_margin-left-1-2"></i-icon>
</i-button>
~~~
~~~html
<i-button>
    <i-icon icon="star-full" class="_margin-right-1-2"></i-icon>
    Button Icon
    <i-icon icon="star-full" class="_margin-left-1-2"></i-icon>
</i-button>
~~~

</i-tab>
</i-code>

### Active State
Buttons will appear pressed when active. You can force a button to have an active appearance with the `active` property (this will also include the aria-pressed="true" attribute).

<i-code title="Active Button State">
<i-tab type="preview">
    <div>
        <i-button active>Active Default Button</i-button>
        <i-button active variant="primary">Active Primary Button</i-button>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-button active>Active Default Button</i-button>
~~~
~~~html
<i-button active variant="primary">Active Primary Button</i-button>
~~~

</i-tab>
</i-code>

### Disabled State
You can make buttons look inactive or disabled by adding the `disabled` boolean property to an `<i-button>` element.

<i-code title="Disabled Button State">
<i-tab type="preview">
    <div>
        <i-button disabled>Disabled Default Button</i-button>
        <i-button disabled variant="primary">Disabled Primary Button</i-button>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-button active>Active Default Button</i-button>
~~~
~~~html
<i-button active variant="primary">Active Primary Button</i-button>
~~~

</i-tab>
</i-code>

### Loading State
You can add a loading state to the button by setting the `loading` boolean property to an `<i-button>` element. 

By default, the button will display a standard Inkline loading spinner. You can provide custom loading state by providing a `loading` slot.

<i-code title="Loading Button State">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

### Linking and Routing
Buttons will be automatically converted to link anchors `<a>` when providing a `href` property. You can also specify `target` and `rel` properties.

The `<i-button>` component is well integrated with the [Vue Router](https://router.vuejs.org) plugin and will be converted to a `<router-link>` when using the `to` property.

<i-code title="Button Linking and Routing">
<i-tab type="preview">
    <div>
        <i-button href="https://inkline.io">Button Link</i-button>
        <i-button :to="{ name: 'docs-components-button' }">Button Route</i-button>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-button href="https://inkline.io">Button Link</i-button>
~~~
~~~html
<i-button :to="{ name: 'docs-components-button' }">Button Route</i-button>
~~~

</i-tab>
</i-code>

### Component API
Here you can find a list of the various customization options you can use for the button component as props, as well as available slots and events.

<i-code title="Button API" expanded markup="i-button" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IButton">
    <i-tab type="props">
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
    </i-tab>
    <i-tab type="slots">
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
    </i-tab>
    <i-tab type="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when button component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>



### Sass Variables
Here you can find a list of the Sass variables you can use for the button components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Button" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$button-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-font-weight</template>
                <template slot="default"><code>$font-weight-normal</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-line-height</template>
                <template slot="default"><code>$line-height</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-padding-base</template>
                <template slot="default"><code>$spacer-1-2 $spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-padding</template>
                <template slot="default"><code>size-map($button-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-circle-size-base</template>
                <template slot="default"><code>$spacer * 1.6 + map_get($button-font-size, 'md')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-circle-size</template>
                <template slot="default"><code>size-map($button-circle-size-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-margin</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-darken-percentage-hover</template>
                <template slot="default"><code>5%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-darken-percentage-active</template>
                <template slot="default"><code>12.5%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-opacity-disabled-light</template>
                <template slot="default"><code>0.75</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-opacity-disabled-dark</template>
                <template slot="default"><code>0.66</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-link-color</template>
                <template slot="default"><code>$link-color</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-link-disabled-color</template>
                <template slot="default"><code>$text-muted</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-variant-{variant}</template>
                <template slot="default"><code>button-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$button-variants</template>
<template slot="default-row">
                
~~~scss
(
    primary: $button-variant-primary,
    secondary: $button-variant-secondary,
    light: $button-variant-light,
    dark: $button-variant-dark,
    info: $button-variant-info,
    success: $button-variant-success,
    warning: $button-variant-warning,
    danger: $button-variant-danger,
    facebook: $button-variant-facebook,
    google: $button-variant-google,
    twitter: $button-variant-twitter,
    github: $button-variant-github
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">@function button-variant</template>
<template slot="default-row">
                
~~~scss
@function button-variant($variant) {
    $button-variant-background: $variant;
    $button-variant-background-hover: darken-lightness($button-variant-background, $button-darken-percentage-hover);
    $button-variant-background-active: darken-lightness($button-variant-background, $button-darken-percentage-active);
    $button-variant-border-color: $button-variant-background;
    $button-variant-border-color-hover: darken-lightness($button-variant-border-color, $button-darken-percentage-hover);
    $button-variant-color: variant-color-by-luminance($button-variant-background, $button-color-for-light-variant, $button-color-for-dark-variant);
    $button-variant-color-link: $button-variant-background;
    $button-variant-color-link-active: $button-variant-background-hover;
    $button-variant-color-outline: $button-variant-background;
    $button-variant-color-outline-hover: $button-variant-color;
    $button-variant-outline-background: transparent;
    $button-variant-outline-background-hover: $button-variant-background-hover;
    $button-variant-outline-background-active: $button-variant-background-active;
    $button-variant-outline-border-color: $button-variant-border-color;
    $button-variant-outline-border-color-hover: $button-variant-border-color-hover;

    $variant-map: (
        background: $button-variant-background,
        background-hover: $button-variant-background-hover,
        background-active: $button-variant-background-active,
        border-color: $button-variant-border-color,
        border-color-hover: $button-variant-border-color-hover,
        color: $button-variant-color,
        color-link: $button-variant-color-link,
        color-link-active: $button-variant-color-link-active,
        color-outline: $button-variant-outline-color,
        color-outline-hover: $button-variant-outline-color-hover,
        background-outline: $button-variant-outline-background,
        background-outline-hover: $button-variant-outline-background-hover,
        background-outline-active: $button-variant-outline-background-active,
        border-color-outline: $button-variant-outline-border-color,
        border-color-outline-hover: $button-variant-outline-border-color-hover,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
