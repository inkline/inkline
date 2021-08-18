---
title: Alert
description: Provide contextual feedback messages for typical user actions using the alert component.
---

<script setup>
import * as examples from '../examples';
</script>

# Alert

## Provide contextual feedback messages for typical user actions using the alert component.

### Color Variants

Alerts are contextual feedback messages usable for any length of text, and can have an optional dismiss button. By default, alerts are set to have `width: 100%`, fully spanning the width of the parent container. For choosing the context of the alert, use the `color` property.

<example type="alert" :component="examples.IAlertColorVariantsExample" :html="examples.IAlertColorVariantsExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the text and spacing size of your alerts, using one of the available sizes: `sm`, `md`, and `lg`. 

<example type="alert" :component="examples.IAlertSizeVariantsExample" :html="examples.IAlertSizeVariantsExampleHTML"></example>

### Content
Your alerts accept any kind of content, giving you the flexibility to create great looking contextual messages.

You can also add an icon to the `<i-alert>` component by providing an `icon` slot. The following example makes use of the bundled Inkline icons, but you can use any icon font that you like:

<example type="alert" :component="examples.IAlertContentExample" :html="examples.IAlertContentExampleHTML"></example>

### Dismissible
You can dismiss alerts using a combination of the provided `dismissible` property and `v-model` directive. The `dismissible` property will be used to show the dismiss icon. The `v-model` directive will show or hide the alert, resetting dismissed alerts when needed.

<example type="alert" :component="examples.IAlertDismissibleExample" :html="examples.IAlertDismissibleExampleHTML" :js="examples.IAlertDismissibleExampleJS"></example>
