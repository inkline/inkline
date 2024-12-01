---
title: Form Group
description: Form groups are the easiest way to add structure and spacing to form elements. 
---

<script setup>
import * as examples from '../examples';
</script>

# Form Group

## Form groups are the easiest way to add structure and spacing to form elements

### Example

The `<i-form-group>` component is a wrapper that provides proper grouping of labels, input, help text, and form validation messaging. By default, form groups add spacing between them.

<example :component="examples.FormGroupBasicExample" :html="examples.FormGroupBasicExampleHTML" :js="examples.FormGroupBasicExampleJS"></example>

### Disabled State

Setting a form group as `disabled` will cause all of its child form components to be disabled.

<example :component="examples.FormGroupDisabledExample" :html="examples.FormGroupDisabledExampleHTML" :js="examples.FormGroupDisabledExampleJS"></example>

### Sizes

You're able to use the `size` modifier to control the size of the form components inside your `<i-form-group>`, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

All of the components inside the `<i-form-group>` will inherit the parent form group's size.

<example :component="examples.FormGroupSizeVariantsSmExample" :html="examples.FormGroupSizeVariantsSmExampleHTML" :js="examples.FormGroupSizeVariantsSmExampleJS"></example>

<example :component="examples.FormGroupSizeVariantsMdExample" :html="examples.FormGroupSizeVariantsMdExampleHTML" :js="examples.FormGroupSizeVariantsMdExampleJS"></example>

<example :component="examples.FormGroupSizeVariantsLgExample" :html="examples.FormGroupSizeVariantsLgExampleHTML" :js="examples.FormGroupSizeVariantsLgExampleJS"></example>

### Form Group Nesting

You can nest form groups in order to control the `disabled`, `readonly` and `size` properties of multiple form components at once. All the child inputs of the parent form group will inherit the property.

<example :component="examples.FormGroupNestingExample" :html="examples.FormGroupNestingExampleHTML" :js="examples.FormGroupNestingExampleJS"></example>

<example :component="examples.FormGroupNestingDisabledExample" :html="examples.FormGroupNestingDisabledExampleHTML" :js="examples.FormGroupNestingDisabledExampleJS"></example>

<example :component="examples.FormGroupNestingReadonlyExample" :html="examples.FormGroupNestingReadonlyExampleHTML" :js="examples.FormGroupNestingReadonlyExampleJS"></example>

<example :component="examples.FormGroupNestingSizeVariantsLgExample" :html="examples.FormGroupNestingSizeVariantsLgExampleHTML" :js="examples.FormGroupNestingSizeVariantsLgExampleJS"></example>
