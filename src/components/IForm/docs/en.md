---
title: Form
description: Forms are the main wrapper components for form elements, with powerful customization and validation options. 
---

<script setup>
import * as examples from '../examples';
</script>

# Form
## Forms are the main wrapper components for form elements, with powerful customization and validation options. 

### Basic Example

The `<i-form>` component is a wrapper that provides proper handling of form validation and form grouping. Here are some things that are good to know:

- All nested form components will inherit the form's `disabled` and `readonly` state
- All nested form components will inherit the form's `size` variant
- You can use the `@submit` binding to handle the submit event

<example :component="examples.IFormBasicExample" :html="examples.IFormBasicExampleHTML" :js="examples.IFormBasicExampleJS"></example>

### Disabled State
Setting a form as `disabled` will cause all of its child inputs to be disabled. When disabled, the form cannot be submitted.

<example :component="examples.IFormDisabledExample" :html="examples.IFormDisabledExampleHTML" :js="examples.IFormDisabledExampleJS"></example>

### Readonly State
Setting a form as `readonly` will cause all of its child inputs to be readonly. When readonly, the form can still be submitted.

<example :component="examples.IFormReadonlyExample" :html="examples.IFormReadonlyExampleHTML" :js="examples.IFormReadonlyExampleJS"></example>

### Sizes
You're able to use the `size` modifier to control the size of your `<i-form>`, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

All of the form components inside the `<i-form>` will inherit the parent form group's size.

<example :component="examples.IFormSizeVariantsSmExample" :html="examples.IFormSizeVariantsSmExampleHTML" :js="examples.IFormSizeVariantsSmExampleJS"></example>

<example :component="examples.IFormSizeVariantsMdExample" :html="examples.IFormSizeVariantsMdExampleHTML" :js="examples.IFormSizeVariantsMdExampleJS"></example>

<example :component="examples.IFormSizeVariantsLgExample" :html="examples.IFormSizeVariantsLgExampleHTML" :js="examples.IFormSizeVariantsLgExampleJS"></example>
