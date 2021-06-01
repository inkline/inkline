---
title: Form Group
description: Form groups are the easiest way to add structure and spacing to form elements. 
---

<script setup>
import * as examples from '../examples';
</script>

# Form Group
## Form groups are the easiest way to add structure and spacing to form elements. 

### Example
The `<i-form-group>` component is a wrapper that provides proper grouping of labels, input, help text, and form validation messaging. By default, form groups add spacing between them.

<example :component="examples.IFormGroupBasicExample" :html="examples.IFormGroupBasicExampleHTML" :js="examples.IFormGroupBasicExampleJS"></example>

### Disabled State
Setting a form group as `disabled` will cause all of its child form components to be disabled.

<example :component="examples.IFormGroupDisabledExample" :html="examples.IFormGroupDisabledExampleHTML" :js="examples.IFormGroupDisabledExampleJS"></example>

### Sizes
You're able to use the `size` modifier to control the size of the form components inside your `<i-form-group>`, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

All of the components inside the `<i-form-group>` will inherit the parent form group's size.

<example :component="examples.IFormGroupSizeVariantsSmExample" :html="examples.IFormGroupSizeVariantsSmExampleHTML" :js="examples.IFormGroupSizeVariantsSmExampleJS"></example>

<example :component="examples.IFormGroupSizeVariantsMdExample" :html="examples.IFormGroupSizeVariantsMdExampleHTML" :js="examples.IFormGroupSizeVariantsMdExampleJS"></example>

<example :component="examples.IFormGroupSizeVariantsLgExample" :html="examples.IFormGroupSizeVariantsLgExampleHTML" :js="examples.IFormGroupSizeVariantsLgExampleJS"></example>

### Form Group Nesting
You can nest form groups in order to control the `disabled`, `readonly` and `size` properties of multiple form components at once. All the child inputs of the parent form group will inherit the property.

<example :component="examples.IFormGroupNestingExample" :html="examples.IFormGroupNestingExampleHTML" :js="examples.IFormGroupNestingExampleJS"></example>

<example :component="examples.IFormGroupNestingDisabledExample" :html="examples.IFormGroupNestingDisabledExampleHTML" :js="examples.IFormGroupNestingDisabledExampleJS"></example>

<example :component="examples.IFormGroupNestingReadonlyExample" :html="examples.IFormGroupNestingReadonlyExampleHTML" :js="examples.IFormGroupNestingReadonlyExampleJS"></example>

<example :component="examples.IFormGroupNestingSizeVariantsLgExample" :html="examples.IFormGroupNestingSizeVariantsLgExampleHTML" :js="examples.IFormGroupNestingSizeVariantsLgExampleJS"></example>
