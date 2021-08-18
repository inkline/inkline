---
title: Number Input
description: Number Inputs are form components used to for easily inputting and manipulating numbers.
---

<script setup>
import * as examples from '../examples';
</script>

# Number Input
## Number Inputs are form components used to for easily inputting and manipulating numbers.

### Basic Example
Inkline provides you with simple solutions for all the scenarios you will encounter when you need your user to input a number.

<example :component="examples.INumberInputBasicExample" :html="examples.INumberInputBasicExampleHTML" :js="examples.INumberInputBasicExampleJS"></example>

### Minimum and Maximum Value
Setting the `min` and `max` properties will restrict the value within the given range.

<example :component="examples.INumberInputMinMaxExample" :html="examples.INumberInputMinMaxExampleHTML" :js="examples.INumberInputMinMaxExampleJS"></example>

### Precision
You can set the number `precision` using the precision property, allowing you to enter floating point number values.

<example :component="examples.INumberInputPrecisionExample" :html="examples.INumberInputPrecisionExampleHTML" :js="examples.INumberInputPrecisionExampleJS"></example>

### Step Size
You can set the value to increment / decrement by using the `step` property. The step size is `1` by default.

<example :component="examples.INumberInputStepSizeExample" :html="examples.INumberInputStepSizeExampleHTML" :js="examples.INumberInputStepSizeExampleJS"></example>

### Disabled State
Setting the `disabled` property will disable all interactions with the number input component.

<example :component="examples.INumberInputDisabledExample" :html="examples.INumberInputDisabledExampleHTML" :js="examples.INumberInputDisabledExampleJS"></example>

### Readonly State
Setting the `readonly` property will disable all interactions with the number input component, except being able to focus the number input.

<example :component="examples.INumberInputReadonlyExample" :html="examples.INumberInputReadonlyExampleHTML" :js="examples.INumberInputReadonlyExampleJS"></example>

### Clearable Variant
If you need to be able to quickly clear the value of a number input, you can add the `clearable` property to the number input component.

<example :component="examples.INumberInputClearableExample" :html="examples.INumberInputClearableExampleHTML" :js="examples.INumberInputClearableExampleJS"></example>

### Prefix and Suffix
Inkline allows you to easily add a prefix or suffix to your number inputs. Using prefixes and suffixes you can, for example, indicate your number input type using an icon or text. 

<example :component="examples.INumberInputPrefixSuffixExample" :html="examples.INumberInputPrefixSuffixExampleHTML" :js="examples.INumberInputPrefixSuffixExampleJS"></example>

### Prepend and Append
You can add additional content such as select fields, buttons or plain text, to either side of the number input by using the prepend and append slots.

<example :component="examples.INumberInputPrependAppendTextExample" :html="examples.INumberInputPrependAppendTextExampleHTML" :js="examples.INumberInputPrependAppendTextExampleJS"></example>

<example :component="examples.INumberInputPrependAppendButtonExample" :html="examples.INumberInputPrependAppendButtonExampleHTML" :js="examples.INumberInputPrependAppendButtonExampleJS"></example>

<example :component="examples.INumberInputPrependAppendDropdownExample" :html="examples.INumberInputPrependAppendDropdownExampleHTML" :js="examples.INumberInputPrependAppendDropdownExampleJS"></example>

### Colors
You can use the `color` property to set a `light` or `dark` color for your number inputs.

<example :component="examples.INumberInputColorVariantsExample" :html="examples.INumberInputColorVariantsExampleHTML" :js="examples.INumberInputColorVariantsExampleJS"></example>

### Sizes
You're able to use the `size` modifier to control the size of your number inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<example :component="examples.INumberInputSizeVariantsExample" :html="examples.INumberInputSizeVariantsExampleHTML" :js="examples.INumberInputSizeVariantsExampleJS"></example>


