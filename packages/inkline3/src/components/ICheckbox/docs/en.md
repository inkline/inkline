---
title: Checkbox
description: Checkbox inputs allow the user to select multiple options from a set. 
---

<script setup>
import * as examples from '../examples';
</script>

# Checkbox
## Checkbox inputs allow the user to select multiple options from a set. 

### Basic Example

Using the `i-checkbox` component to determine a boolean value is very straightforward:

<example :component="examples.ICheckboxBasicExample" :html="examples.ICheckboxBasicExampleHTML" :js="examples.ICheckboxBasicExampleJS"></example>

### Disabled State

You can disable a checkbox using the `disabled` property.

<example :component="examples.ICheckboxDisabledExample" :html="examples.ICheckboxDisabledExampleHTML" :js="examples.ICheckboxDisabledExampleJS"></example>

### Readonly State

You can make a checkbox readonly using the `readonly` property.

<example :component="examples.ICheckboxReadonlyExample" :html="examples.ICheckboxReadonlyExampleHTML" :js="examples.ICheckboxReadonlyExampleJS"></example>

### Indeterminate State
You can set the state of a `<i-checkbox>` to be indeterminate by using the `indeterminate` property. 

<example :component="examples.ICheckboxIndeterminateExample" :html="examples.ICheckboxIndeterminateExampleHTML" :js="examples.ICheckboxIndeterminateExampleJS"></example>

### Size Variants
You're able to use the `size` property to control the size of your checkbox, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

<example :component="examples.ICheckboxSizeVariantsExample" :html="examples.ICheckboxSizeVariantsExampleHTML" :js="examples.ICheckboxSizeVariantsExampleJS"></example>


### Color Variants
You can use the `color` property to set a `light` or `dark` color for your checkboxes.

<example :component="examples.ICheckboxColorVariantsExample" :html="examples.ICheckboxColorVariantsExampleHTML" :js="examples.ICheckboxColorVariantsExampleJS"></example>

### Group Example

Using the `i-checkbox` component together with a `i-checkbox-group` allows you to control multiple selected values using a single binding.

<example :component="examples.ICheckboxGroupExample" :html="examples.ICheckboxGroupExampleHTML" :js="examples.ICheckboxGroupExampleJS"></example>

### Group Disabled State

You can disable an entire checkbox group using the `disabled` property.

<example :component="examples.ICheckboxGroupDisabledExample" :html="examples.ICheckboxGroupDisabledExampleHTML" :js="examples.ICheckboxGroupDisabledExampleJS"></example>

### Group Size Variants
You're able to use the `size` property to control the size of your checkbox group, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

The chosen size will be applied to all of its child inputs.

<example :component="examples.ICheckboxGroupSizeVariantsExample" :html="examples.ICheckboxGroupSizeVariantsExampleHTML" :js="examples.ICheckboxGroupSizeVariantsExampleJS"></example>

### Group Color Variants
You can use the `color` property to set a `light` or `dark` color for your checkboxes.

<example :component="examples.ICheckboxGroupColorVariantsExample" :html="examples.ICheckboxGroupColorVariantsExampleHTML" :js="examples.ICheckboxGroupColorVariantsExampleJS"></example>

### Custom vs. Native
Inkline uses a custom checkbox design by default. You can use the `native` property to use native browser checkbox indicators.

<example :component="examples.ICheckboxNativeExample" :html="examples.ICheckboxNativeExampleHTML" :js="examples.ICheckboxNativeExampleJS"></example>
