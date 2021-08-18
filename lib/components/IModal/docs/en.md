---
title: Modal
description: Modals are dialogs that can be used for user notifications, lightboxes, or completely custom content.
---

<script setup>
import * as examples from '../examples';
</script>



# Modal
## Modals are dialogs that can be used for lightboxes, user notifications, or completely custom content.

### Example
To create a modal, create an element (such as an `<i-button>`) as a trigger and the `v-model` on an `<i-modal>` component to control its visibility. Everything inside the `<i-modal>` is rendered as the modal body. Optionally, you can provide a modal header and footer using `#header` and `#footer` slots.

<example type="modal" :component="examples.IModalBasicExample" :html="examples.IModalBasicExampleHTML" :js="examples.IModalBasicExampleJS"></example>

### Size Variants
You're able to use the `size` property to control the size of your modals, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<example type="modal" :component="examples.IModalSizeVariantsExample" :html="examples.IModalSizeVariantsExampleHTML" :js="examples.IModalBasicExampleJS"></example>

### Color Variants
Inkline includes multiple predefined modal styles, each serving its own semantic purpose. You can set the style of a `<i-modal>` using the `color` property. By default, modals use the `light` variant.

<example type="modal" :component="examples.IModalColorVariantsExample" :html="examples.IModalColorVariantsExampleHTML" :js="examples.IModalBasicExampleJS"></example>
