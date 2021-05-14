---
title: Radio
description: Radio inputs allow the user to select multiple options from a set. 
---

<script setup>
import * as examples from '../examples';
</script>

# Radio
## Radio inputs allow the user to select multiple options from a set. 

### Basic Example

Using the `i-radio` component together with a `i-radio-group` allows you to choose a value from multiple choices using a single model binding:

<example :component="examples.IRadioBasicExample" :html="examples.IRadioBasicExampleHTML" :js="examples.IRadioBasicExampleJS"></example>

### Disabled State

You can disable a radio using the `disabled` property.

<example :component="examples.IRadioDisabledExample" :html="examples.IRadioDisabledExampleHTML" :js="examples.IRadioDisabledExampleJS"></example>

### Readonly State

You can make a radio readonly using the `readonly` property.

<example :component="examples.IRadioReadonlyExample" :html="examples.IRadioReadonlyExampleHTML" :js="examples.IRadioReadonlyExampleJS"></example>

### Size Variants
You're able to use the `size` property to control the size of your radio, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

<example :component="examples.IRadioSizeVariantsExample" :html="examples.IRadioSizeVariantsExampleHTML" :js="examples.IRadioSizeVariantsExampleJS"></example>

### Group Disabled State

You can disable an entire radio group using the `disabled` property.

<example :component="examples.IRadioGroupDisabledExample" :html="examples.IRadioGroupDisabledExampleHTML" :js="examples.IRadioGroupDisabledExampleJS"></example>

### Group Size Variants
You're able to use the `size` property to control the size of your radio group, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

The chosen size will be applied to all of its child inputs.

<example :component="examples.IRadioGroupSizeVariantsExample" :html="examples.IRadioGroupSizeVariantsExampleHTML" :js="examples.IRadioGroupSizeVariantsExampleJS"></example>

### Group Color Variants
You can use the `color` property to set a `light` or `dark` color for your radios.

<example :component="examples.IRadioColorVariantsExample" :html="examples.IRadioColorVariantsExampleHTML" :js="examples.IRadioColorVariantsExampleJS"></example>

### Custom vs. Native
Inkline uses a custom radio design by default. You can use the `native` property to use native browser radio indicators.

<example :component="examples.IRadioNativeExample" :html="examples.IRadioNativeExampleHTML" :js="examples.IRadioNativeExampleJS"></example>
