---
title: Modal
description: Modals are dialogs that can be used for lightboxes, user notifications, or completely custom content.
---

# Modal
## Modals are dialogs that can be used for lightboxes, user notifications, or completely custom content.

### Example
To create a modal, create an element (such as an `<i-button>`) as a trigger and the `v-model` on an `<i-modal>` component to control its visibility. Everything inside the `<i-modal>` is rendered as the modal body. Optionally, you can provide a modal header and footer using `slot="header"` and `slot="footer"`.

<i-code title="Modal Example">
<i-tab type="preview">
    <div>
        <i-button @click="showModal=true">Modal</i-button>
        <i-modal v-model="showModal">
            <template slot="header">Modal Header</template>
            This is the modal body. Useful information goes here.
            <template slot="footer">Modal Footer</template>
        </i-modal>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-button @click="visible = true">Modal</i-button>
<i-modal v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      visible: false
    };
  }
}
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your modals, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Modal Sizes">
<i-tab type="preview">
    <div>
        <i-button @click="showModalSm = true">Small Modal</i-button>&nbsp;
        <i-button @click="showModalMd = true">Medium Modal</i-button>&nbsp;
        <i-button @click="showModalLg = true">Large Modal</i-button>
    </div>
    <i-modal v-model="showModalSm" size="sm">
        <template slot="header">Modal Header</template>
        This is the modal body. Useful information goes here.
        <template slot="footer">Modal Footer</template>
    </i-modal>
    <i-modal v-model="showModalMd" size="md">
        <template slot="header">Modal Header</template>
        This is the modal body. Useful information goes here.
        <template slot="footer">Modal Footer</template>
    </i-modal>
    <i-modal v-model="showModalLg" size="lg">
        <template slot="header">Modal Header</template>
        This is the modal body. Useful information goes here.
        <template slot="footer">Modal Footer</template>
    </i-modal>
</i-tab>
<i-tab type="html">

~~~html
<i-button @click="visible = true">Small Modal</i-button>
<i-modal v-model="visible" size="sm">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button @click="visible = true">Medium Modal</i-button>
<i-modal v-model="visible" size="md">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button @click="visible = true">Large Modal</i-button>
<i-modal v-model="visible" size="lg">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      visible: false
    };
  }
}
~~~

</i-tab>
</i-code>

### Variants
Inkline includes multiple predefined modal styles, each serving its own semantic purpose. You can set the style of a `<i-modal>` using the `variant` property. By default, modals use the `light` variant.

<i-code title="Modal Variants">
<i-tab type="preview">
<div>
    <i-button variant="primary" @click="showModalPrimary = true">Primary Modal</i-button>&nbsp;
    <i-button variant="secondary" @click="showModalSecondary = true">Secondary Modal</i-button>&nbsp;
    <i-button variant="light" @click="showModalLight = true">Light Modal</i-button>&nbsp;
    <i-button variant="dark" @click="showModalDark = true">Dark Modal</i-button>&nbsp;
    <i-button variant="info" @click="showModalInfo = true">Info Modal</i-button>&nbsp;
    <i-button variant="success" @click="showModalSuccess = true">Success Modal</i-button>&nbsp;
    <i-button variant="warning" @click="showModalWarning = true">Warning Modal</i-button>&nbsp;
    <i-button variant="danger" @click="showModalDanger = true">Danger Modal</i-button>
</div>

<i-modal variant="primary" v-model="showModalPrimary">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="secondary" v-model="showModalSecondary">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="light" v-model="showModalLight">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="dark" v-model="showModalDark">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="info" v-model="showModalInfo">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="success" v-model="showModalSuccess">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="warning" v-model="showModalWarning">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal variant="danger" v-model="showModalDanger">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
</i-tab>
<i-tab type="html">

~~~html
<i-button variant="primary" @click="visible = true">Primary Modal</i-button>
<i-modal variant="primary" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="secondary" @click="visible = true">Secondary Modal</i-button>
<i-modal variant="secondary" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="light" @click="visible = true">Light Modal</i-button>
<i-modal variant="light" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="dark" @click="visible = true">Dark Modal</i-button>
<i-modal variant="dark" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="info" @click="visible = true">Info Modal</i-button>
<i-modal variant="info" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="success" @click="visible = true">Success Modal</i-button>
<i-modal variant="success" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="warning" @click="visible = true">Warning Modal</i-button>
<i-modal variant="warning" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="danger" @click="visible = true">Danger Modal</i-button>
<i-modal variant="danger" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      visible: false
    };
  }
}
~~~

</i-tab>
</i-code>


### Fill Variants
You can apply the variant color to all modal parts (header, body, footer) using the `fill` property.

<i-code title="Modal Fill Variants">
<i-tab type="preview">
<div>
    <i-button variant="primary" @click="showFillModalPrimary = true">Primary Modal</i-button>&nbsp;
    <i-button variant="secondary" @click="showFillModalSecondary = true">Secondary Modal</i-button>&nbsp;
    <i-button variant="light" @click="showFillModalLight = true">Light Modal</i-button>&nbsp;
    <i-button variant="dark" @click="showFillModalDark = true">Dark Modal</i-button>&nbsp;
    <i-button variant="info" @click="showFillModalInfo = true">Info Modal</i-button>&nbsp;
    <i-button variant="success" @click="showFillModalSuccess = true">Success Modal</i-button>&nbsp;
    <i-button variant="warning" @click="showFillModalWarning = true">Warning Modal</i-button>&nbsp;
    <i-button variant="danger" @click="showFillModalDanger = true">Danger Modal</i-button>
</div>

<i-modal fill variant="primary" v-model="showFillModalPrimary">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal fill variant="secondary" v-model="showFillModalSecondary">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal fill variant="light" v-model="showFillModalLight">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal fill variant="dark" v-model="showFillModalDark">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal fill variant="info" v-model="showFillModalInfo">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal fill variant="success" v-model="showFillModalSuccess">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal fill variant="warning" v-model="showFillModalWarning">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>

<i-modal fill variant="danger" v-model="showFillModalDanger">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
</i-tab>
<i-tab type="html">

~~~html
<i-button variant="primary" @click="visible = true">Primary Modal</i-button>
<i-modal fill variant="primary" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="secondary" @click="visible = true">Secondary Modal</i-button>
<i-modal fill variant="secondary" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="light" @click="visible = true">Light Modal</i-button>
<i-modal fill variant="light" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="dark" @click="visible = true">Dark Modal</i-button>
<i-modal fill variant="dark" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="info" @click="visible = true">Info Modal</i-button>
<i-modal fill variant="info" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="success" @click="visible = true">Success Modal</i-button>
<i-modal fill variant="success" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="warning" @click="visible = true">Warning Modal</i-button>
<i-modal fill variant="warning" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~
~~~html
<i-button variant="danger" @click="visible = true">Danger Modal</i-button>
<i-modal fill variant="danger" v-model="visible">
    <template slot="header">Modal Header</template>
    This is the modal body. Useful information goes here.
    <template slot="footer">Modal Footer</template>
</i-modal>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      visible: false
    };
  }
}
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the modal component as props, as well as available slots and events.

<i-code title="Modal API" markup="i-modal" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IModal">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">close-on-press-escape</template>
                <template slot="description">Sets whether to hide the modal component when pressing escape.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">fill</template>
                <template slot="description">Sets the variant color for all modal elements (header, body, footer).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the visibility of the modal component.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">transition</template>
                <template slot="description">Sets the transition of the modal component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values">
                    <code>fade-in-transition</code>, 
                    <code>fade-in-linear-transition</code>, 
                    <code>zoom-in-top-transition</code>, 
                    <code>zoom-in-bottom-transition</code>, 
                    <code>zoom-in-center-transition</code>, 
                    <code>zoom-in-left-transition</code>,
                    <code>zoom-in-right-transition</code>
                </template>
                <template slot=""><code>zoom-in-center-transition</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for modal default content.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">header</template>
                <template slot="description">Slot for modal header content.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">footer</template>
                <template slot="description">Slot for modal footer content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="events">
        <api-table>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when visibility changes.</template>
                <template slot="type"><code>(visible: Boolean) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">show</template>
                <template slot="description">Emitted when modal is shown.</template>
                <template slot="type"><code>(instance: VueComponent) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">hide</template>
                <template slot="description">Emitted when modal is hidden.</template>
                <template slot="type"><code>(instance: VueComponent) => {}</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the modal components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Modal" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$modal-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-font-weight</template>
                <template slot="default"><code>$font-weight-normal</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-line-height</template>
                <template slot="default"><code>$line-height</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-margin</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-width-base</template>
                <template slot="default"><code>480px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-width</template>
                <template slot="default"><code>size-map($modal-width-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-border-color-light</template>
                <template slot="default"><code>$border-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-background-light</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-border-color-dark</template>
                <template slot="default"><code>$border-color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-background-dark</template>
                <template slot="default"><code>$color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-overlay-background</template>
                <template slot="default"><code>rgba(0, 0, 0, 0.75)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-padding-base</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-padding</template>
                <template slot="default"><code>size-map($modal-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-variant-{variant}</template>
                <template slot="default"><code>modal-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$modal-variants</template>
<template slot="default-row">
                
~~~scss
(
    primary: $modal-variant-primary,
    secondary: $modal-variant-secondary,
    light: $modal-variant-light,
    dark: $modal-variant-dark,
    info: $modal-variant-info,
    success: $modal-variant-success,
    warning: $modal-variant-warning,
    danger: $modal-variant-danger
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">modal-variant</template>
<template slot="default-row">
                
~~~scss
@function modal-variant($variant) {
    $modal-variant-fill-color: variant-color-by-luminance($variant, $modal-color-for-light-variant, $modal-color-for-dark-variant);
    $modal-variant-fill-background: $variant;
    $modal-variant-fill-header-background: darken-lightness($modal-variant-fill-color, 10%);
    $modal-variant-fill-footer-background: $modal-variant-fill-color;
    $modal-variant-fill-border-color: darken-lightness($variant, 10%);

    $modal-variant-color-light: $modal-color-for-light-variant;
    $modal-variant-background-light: $color-white;
    $modal-variant-border-color-light: $border-color-light;
    $modal-variant-header-color-light: variant-color-by-luminance($variant, $modal-color-for-light-variant, $modal-color-for-dark-variant);
    $modal-variant-header-background-light: $variant;
    $modal-variant-header-border-color-light: $modal-variant-fill-border-color;
    $modal-variant-footer-color-light: $modal-variant-color-light;
    $modal-variant-footer-background-light: $modal-variant-background-light;
    $modal-variant-footer-border-color-light: $modal-variant-border-color-light;

    $modal-variant-color-dark: $modal-color-for-dark-variant;
    $modal-variant-background-dark: $color-dark;
    $modal-variant-border-color-dark: $border-color-dark;
    $modal-variant-header-color-dark: variant-color-by-luminance($variant, $modal-color-for-light-variant, $modal-color-for-dark-variant);
    $modal-variant-header-background-dark: $variant;
    $modal-variant-header-border-color-dark: $modal-variant-fill-border-color;
    $modal-variant-footer-color-dark: $modal-variant-color-dark;
    $modal-variant-footer-background-dark: $modal-variant-background-dark;
    $modal-variant-footer-border-color-dark: $modal-variant-border-color-dark;

    $variant-map: (
        color-light: $modal-variant-color-light,
        background-light: $modal-variant-background-light,
        border-color-light: $modal-variant-border-color-light,
        header-color-light: $modal-variant-header-color-light,
        header-background-light: $modal-variant-header-background-light,
        header-border-color-light: $modal-variant-header-border-color-light,
        footer-color-light: $modal-variant-footer-color-light,
        footer-background-light: $modal-variant-footer-background-light,
        footer-border-color-light: $modal-variant-footer-border-color-light,
        color-dark: $modal-variant-color-dark,
        background-dark: $modal-variant-background-dark,
        border-color-dark: $modal-variant-border-color-dark,
        header-color-dark: $modal-variant-header-color-dark,
        header-background-dark: $modal-variant-header-background-dark,
        header-border-color-dark: $modal-variant-header-border-color-dark,
        footer-color-dark: $modal-variant-footer-color-dark,
        footer-background-dark: $modal-variant-footer-background-dark,
        footer-border-color-dark: $modal-variant-footer-border-color-dark,
        fill-color: $modal-variant-fill-color,
        fill-background: $modal-variant-fill-background,
        fill-header-background: $modal-variant-fill-header-background,
        fill-footer-background: $modal-variant-fill-footer-background,
        fill-border-color: $modal-variant-fill-border-color,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
