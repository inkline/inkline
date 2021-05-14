---
title: List Group
description: List groups are flexible components used for displaying a list of related content.
---

<script setup>
import * as examples from '../examples';
</script>

# List Group

## List groups are flexible components used for displaying a list of related content.

### Basic Example
List groups support any content inside of them. Take advantage of their flexibility to display list of items, as well as vertical navigation.

<example type="icon" :component="examples.IListGroupBasicExample" :html="examples.IListGroupBasicExampleHTML"></example>

Behind the scenes, the `<i-list-group-item>` is converted into a `<router-link>` if it has the `:to` property, or a plain `<a>` tag if it has a `href` property. Otherwise, it uses a simple `<div>` tag.

### Color Variants
The list group component comes with a predefined set of basic color variants. You can set the color of a list group using the `color` property.

<example type="icon" :component="examples.IListGroupColorVariantsExample" :html="examples.IListGroupColorVariantsExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the padding of your list groups, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<example type="icon" :component="examples.IListGroupSizeVariantsExample" :html="examples.IListGroupSizeVariantsExampleHTML"></example>

### Active State
You can control the active state of your `<i-list-group-item>` using the `active` property. 

If you're providing a `to` property, the list group item will be converted into a `router-link` or `nuxt-link`. You can use the `active-class` and `exact-active-class` properties and set them to `-active` when using it as a routing component.

<example type="icon" :component="examples.IListGroupStateActiveExample" :html="examples.IListGroupStateActiveExampleHTML"></example>

### Disabled State
You can control the disabled state of your `<i-list-group-item>` using the `disabled` property. 

<example type="icon" :component="examples.IListGroupStateDisabledExample" :html="examples.IListGroupStateDisabledExampleHTML"></example>

### Borderless Variant
You can disable the border of your list group by setting the `border` property to false. 

<example type="icon" :component="examples.IListGroupBorderlessExample" :html="examples.IListGroupBorderlessExampleHTML"></example>

### Item Content
The `<i-list-group-item>` accepts any type of content, allowing you to create large sized list group items.

<example type="icon" :component="examples.IListGroupContentExample" :html="examples.IListGroupContentExampleHTML"></example>
