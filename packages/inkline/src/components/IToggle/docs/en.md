---
title: Toggle
description: Toggles are boolean form components used for easily enabling or disabling features. 
---

<script setup>
import * as examples from '../examples';
</script>

# Toggle
## Toggles are boolean form components used for easily enabling or disabling features. 

### Basic Example

<example :component="examples.IToggleBasicExample" :html="examples.IToggleBasicExampleHTML" :js="examples.IToggleBasicExampleJS"></example>

### Readonly State
You can set the toggle input to be readonly by using the `readonly` property.

<example :component="examples.IToggleReadonlyExample" :html="examples.IToggleReadonlyExampleHTML" :js="examples.IToggleReadonlyExampleJS"></example>

### Disabled State
You can set the toggle input to be disabled by using the `disabled` property.

<example :component="examples.IToggleDisabledExample" :html="examples.IToggleDisabledExampleHTML" :js="examples.IToggleDisabledExampleJS"></example>

### Size Variants
You're able to use the `size` property to control the size of your inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

<example :component="examples.IToggleSizeVariantsExample" :html="examples.IToggleSizeVariantsExampleHTML" :js="examples.IToggleSizeVariantsExampleJS"></example>

Applying the size `size` property to an `i-form-group` will also set the chosen size to all of its `i-toggle` inputs.

### Color Variants
You can use the `color` property to set a `light` or `dark` color for your toggle components.

<example :component="examples.IToggleColorVariantsExample" :html="examples.IToggleColorVariantsExampleHTML" :js="examples.IToggleColorVariantsExampleJS"></example>



