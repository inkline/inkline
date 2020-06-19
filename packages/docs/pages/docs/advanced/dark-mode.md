---
title: Dark Mode
description: Easily change the theme of your application to light or dark programmatically.
---

# Dark Mode
## Easily change the theme of your application to light or dark programmatically.

Dark mode is natively supported in Inkline by changing the default component `variant` property value. The variant can be configured through the `$inkline` global prototype available in every component:

~~~js
this.$inkline.config.variant = 'dark';
~~~

<i-alert variant="info" class="_margin-top-1">
    <template slot="icon"><i-icon icon="info" class="h4"></i-icon></template>
    <p>The global <code>$inkline</code> prototype is reactive, therefore any changes you make to it will propagate to all Inkline components.</p>
</i-alert>

### How to Toggle Dark Mode
Dark mode can be toggled easily by changing the default component configuration `variant` value as follows:

<i-code title="Toggle Dark Mode">
<i-tab type="preview">
    <i-button @click="toggleVariant"><i-icon icon="light" /></i-button>
</i-tab>
<i-tab type="html">

~~~html
<i-button @click="toggleDarkMode">
    <i-icon icon="light" />
</i-button>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    methods: {
        toggleDarkMode() {
            this.$inkline.config.variant = this.$inkline.config.variant === 'light' ? 'dark' : 'light';
        }
    }
}
~~~

</i-tab>
</i-code>


### The `inkline` Class
When the page loads, Inkline adds an `.inkline` class to the page's `<body>`, along with a dynamically switched `.-light` or `.-dark` class based on the configured variant. 

~~~html
<body class="inkline -light"> ... </body>
~~~

The `.inkline` class gives you theme awareness and control over general page design elements, such as background and color.

~~~scss
.inkline { 
    &.-light { /* ... */ }
    &.-dark { /* ... */ }
}
~~~

### The `variant` Property
Changing the default variant of Inkline components will cause every component to transition to the new color theme. 

<i-code title="Variant Property">
<i-tab type="preview">
    <i-button class="_margin-right-1" @click="toggleVariant"><i-icon icon="light" /></i-button>
    <i-button>Default Variant</i-button> 
    <i-button variant="light">Light Variant</i-button> 
</i-tab>
<i-tab type="html">

~~~html
<i-button>Default Variant</i-button> 
~~~

~~~html
<i-button variant="light">Light Variant</i-button> 
~~~

</i-tab>
</i-code>

Notice how the `<i-button variant="light">` doesn't change? If the `variant` property is set explicitly, components will not be affected.


### The `VariantPropertyMixin` Mixin
You can write your own components with a `variant` property using a mixin called `VariantPropertyMixin`. The variant mixin relies on the `ClassesProviderMixin`, which provides a reactive `classes` array. 

During the `created()` lifecycle, the variant property mixin adds a rule to the classes provider that dynamically computes the `-light` or `-dark` variant class for the element based on `this.$inkline.config.variant`.

~~~html
<template>
    <div class="my-component" :class="classes">
        <slot>I support dark mode.</slot>
    </div>
</i-tab>

<style lang="scss">
.my-component {
    &.-light {
        background: #fafafa;
    }

    &.-dark {
        background: #3a3a3a;
    }
}
</style>

<script>
import { 
    ClassesProviderMixin, 
    VariantPropertyMixin 
} from '@inkline/inkline/src/mixins';

export default {
    name: 'MyComponent',
    mixins: [
        ClassesProviderMixin,
        VariantPropertyMixin
    ]
}
</script>
~~~

Use the component as follows:

~~~html
<my-component></my-component>

<my-component variant="light"></my-component>

<my-component variant="dark"></my-component>
~~~
