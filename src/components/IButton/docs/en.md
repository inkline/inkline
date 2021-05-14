---
title: Button
description: Inkline provides you with custom button styles with support for multiple colors, sizes, states, and more.
---

<script setup>
import * as examples from '../examples';
</script>

# Button

## Inkline provides you with custom button styles with support for multiple colors, sizes, states, and more.

### Color Variants
Inkline includes several predefined button colors, each serving its own semantic purpose, with a few extra color variants available for more control.

<example :component="examples.IButtonColorVariantsExample" :html="examples.IButtonColorVariantsExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the size of your buttons, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<example :component="examples.IButtonSizeVariantsExample" :html="examples.IButtonSizeVariantsExampleHTML"></example>

### Button Type
The `<i-button>` component creates a `<button>` element behind the scenes. Therefore, you can assign a type to it, just like with the `<button>` element.

<example :component="examples.IButtonTypeExample" :html="examples.IButtonTypeExampleHTML"></example>

If you need to change the `<button>` node used to render the component, you can use the `tag` property to change it.

<example :component="examples.IButtonTagExample" :html="examples.IButtonTagExampleHTML"></example>

### Outline Variant
Sometimes, buttons should not stand out so much. Replace the default look and feel using the `outline` property to remove the background on any button unless you interact with it.

<example :component="examples.IButtonOutlineExample" :html="examples.IButtonOutlineExampleHTML"></example>

### Link Variant
You can create link buttons that look like normal links. Use the `color` property to set the color of the link.

<example :component="examples.IButtonLinkExample" :html="examples.IButtonLinkExampleHTML"></example>

### Circle Variant
Circle buttons are very common when working with icons. You can transform your button into a circle using the `circle` property. You're also able to use the `size` modifier to control the size of your circle buttons. 

<example :component="examples.IButtonCircleExample" :html="examples.IButtonCircleExampleHTML"></example>

### Block Variant
You can create block level buttons that span the full width of a parent by adding the `block` property.

<example :component="examples.IButtonBlockExample" :html="examples.IButtonBlockExampleHTML"></example>

### Social Color Variants
You can use variants for the most common social login buttons out of the box. The examples below make use of the `block` modifier to have them full-width.

<example :component="examples.IButtonSocialColorVariantsExample" :html="examples.IButtonSocialColorVariantsExampleHTML"></example>

### Button Icon
You can easily use the `i-button` component together with any icon component (i.e. FontAwesome, IcoMoon), including the <router-link :to="{ name: 'docs-components-icon' }">Icon Component</router-link>.

<example :component="examples.IButtonIconExample" :html="examples.IButtonIconExampleHTML"></example>

### Active State
Buttons will appear pressed when active. You can force a button to have an active appearance with the `active` property (this will also add the `aria-pressed="true"` accessibility attribute).

<example :component="examples.IButtonStateActiveExample" :html="examples.IButtonStateActiveExampleHTML"></example>

### Disabled State
You can make buttons look inactive or disabled by adding the `disabled` boolean property.

<example :component="examples.IButtonStateDisabledExample" :html="examples.IButtonStateDisabledExampleHTML"></example>

### Loading State
You can add a loading state to the button by setting the `loading` boolean property. 

By default, the button will display a standard Inkline Loader Component. You can provide custom loading state by providing a `loading` slot.

<example :component="examples.IButtonStateLoadingExample" :html="examples.IButtonStateLoadingExampleHTML"></example>

### Linking and Routing
Buttons will be automatically converted to link anchors `<a>` when providing a `href` property. You can also specify `target` and `rel` properties.

The `<i-button>` component is also integrated with the [Vue Router](https://router.vuejs.org) plugin and will be converted to a `<router-link>` or `<nuxt-link>` when using the `to` property.

<example :component="examples.IButtonRoutingExample" :html="examples.IButtonRoutingExampleHTML"></example>
