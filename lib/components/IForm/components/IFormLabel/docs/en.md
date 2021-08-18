---
title: Form Label
description: Form component used to add text labels to form groups. 
---

<script setup>
import * as examples from '../examples';
</script>

# Form Label
## Form component used to add text labels to form groups. 

### Basic Example
You can add a label to your input by grouping an `<i-form-label>` and any input component inside an `<i-form-group>`. 

<example :component="examples.IFormLabelBasicExample" :html="examples.IFormLabelBasicExampleHTML" :js="examples.IFormLabelBasicExampleJS"></example>

### Required Example
You can add the `required` property to a parent form group to add a red asterisk `*` to the form label. 

<example :component="examples.IFormLabelRequiredExample" :html="examples.IFormLabelRequiredExampleHTML" :js="examples.IFormLabelRequiredExampleJS"></example>

### Placement
You can add labels to either side of your input, and position it using the optional `inline` form group and `placement` form label properties.

<example :component="examples.IFormLabelPlacementExample" :html="examples.IFormLabelPlacementExampleHTML" :js="examples.IFormLabelPlacementExampleJS"></example>

### Size
You're able to use the `size` property to control the size of your form labels, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. Setting the size on a `<i-form-group>` will also affect form labels.

<example :component="examples.IFormLabelSizeVariantsExample" :html="examples.IFormLabelSizeVariantsExampleHTML" :js="examples.IFormLabelSizeVariantsExampleJS"></example>
