---
title: Form
description: Forms are the main wrapper components for form elements, with powerful customization and validation options. 
---

<script setup>
import * as examples from '../../examples';
</script>



# Form
## Forms are the main wrapper components for form elements, with powerful customization and validation options. 

### Basic Example

The `<i-form>` component is a wrapper that provides proper handling of form validation and form grouping. You can use the `@submit` handler for the submit event.

<example :component="examples.IFormBasicExample" :html="examples.IFormBasicExampleHTML" :js="examples.IFormBasicExampleJS"></example>

### Disabled State
Setting a form as `disabled` will cause all of its child inputs to be disabled.

<example :component="examples.IFormDisabledExample" :html="examples.IFormDisabledExampleHTML" :js="examples.IFormDisabledExampleJS"></example>

### Sizes
You're able to use the `size` modifier to control the size of the components inside your `<i-form>`, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

All of the components inside the `<i-form>` will inherit the parent form group's size.

<example :component="examples.IFormSizeVariantsSmExample" :html="examples.IFormSizeVariantsSmExampleHTML" :js="examples.IFormSizeVariantsSmExampleJS"></example>

<example :component="examples.IFormSizeVariantsMdExample" :html="examples.IFormSizeVariantsMdExampleHTML" :js="examples.IFormSizeVariantsMdExampleJS"></example>

<example :component="examples.IFormSizeVariantsLgExample" :html="examples.IFormSizeVariantsLgExampleHTML" :js="examples.IFormSizeVariantsLgExampleJS"></example>
