---
title: Button Group
description: Group multiple buttons together on a single line using a button group. 
---

<script setup>
import * as examples from '../examples';
</script>

# Button Group

## Group multiple buttons together on a single line using a button group. 

### Basic Example
You can group a series of `<i-button>` components inside a `<i-button-group>` to display them inline, conveying additional meaning.

<example :component="examples.IButtonGroupBasicExample" :html="examples.IButtonGroupBasicExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the size of your button group, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<example :component="examples.IButtonGroupSizeVariantsExample" :html="examples.IButtonGroupSizeVariantsExampleHTML"></example>

### Block Variant
You can create block button groups that span the full width of a parent by adding the `block` property.

<example :component="examples.IButtonGroupBlockExample" :html="examples.IButtonGroupBlockExampleHTML"></example>

### Vertical Basic Example
Using the `vertical` property, you can stack a set of buttons vertically rather than horizontally.

<example :component="examples.IButtonGroupVerticalExample" :html="examples.IButtonGroupVerticalExampleHTML"></example>

### Vertical Size Variants
Just like horizontal button groups, the size of vertical button groups can also be controlled using the `size` modifier. The default size is set to `md`.

<example :component="examples.IButtonGroupVerticalSizeVariantsExample" :html="examples.IButtonGroupVerticalSizeVariantsExampleHTML"></example>

### Vertical Block 
Just like horizontal block button groups, you can also set vertical button groups to span full width of its parent by adding the `block` property.

<example :component="examples.IButtonGroupVerticalBlockExample" :html="examples.IButtonGroupVerticalBlockExampleHTML"></example>

### Nested
When placing a `<i-button-group>` inside another `<i-button-group>`, you'll get a mixed series of buttons that will render seamlessly.

<example :component="examples.IButtonGroupNestedExample" :html="examples.IButtonGroupNestedExampleHTML"></example>

### Nested Block
You can also nest `block` button groups.

<example :component="examples.IButtonGroupNestedBlockExample" :html="examples.IButtonGroupNestedBlockExampleHTML"></example>
