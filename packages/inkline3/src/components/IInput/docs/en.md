---
title: Input
description: Form component used for inputting data directly from the keyboard. 
---

<script setup>
import * as examples from '../examples';
</script>


# Input
## Form component used for inputting data directly from the keyboard. 

### Basic Example
Inputs are the simplest and most used type of form control. Inkline provides you with simple solutions for all the scenarios you will encounter when creating input forms.

<example :component="examples.IInputBasicExample" :html="examples.IInputBasicExampleHTML" :js="examples.IInputBasicExampleJS"></example>

### Input Type
Behind the scenes, Inkline uses a native HTML `<input>` element, meaning that you can use the `type` property to define the type of the input, such as `text`, `password`, `date`, `email`, `number`, and so on. By default, the input type is set to `text`.

Keep in mind that native input types look and are treated differently in each browser, which is why you should use a custom component to achieve consistency.

<example :component="examples.IInputTypeExample" :html="examples.IInputTypeExampleHTML" :js="examples.IInputTypeExampleJS"></example>

### Disabled State
Setting the `disabled` property will disable all interactions with the input component.

<example :component="examples.IInputDisabledExample" :html="examples.IInputDisabledExampleHTML" :js="examples.IInputDisabledExampleJS"></example>

### Readonly State
Setting the `readonly` property will disable all interactions with the input component, except being able to focus the input.

<example :component="examples.IInputReadonlyExample" :html="examples.IInputReadonlyExampleHTML" :js="examples.IInputReadonlyExampleJS"></example>

### Clearable Variant
If you need to be able to quickly clear the value of an input, you can add the `clearable` property to the input component.

<example :component="examples.IInputClearableExample" :html="examples.IInputClearableExampleHTML" :js="examples.IInputClearableExampleJS"></example>

### Prefix and Suffix
Inkline allows you to easily add a prefix or suffix to your inputs. Using prefixes and suffixes you can, for example, indicate the input type using an icon or text. 

<example :component="examples.IInputPrefixSuffixExample" :html="examples.IInputPrefixSuffixExampleHTML" :js="examples.IInputPrefixSuffixExampleJS"></example>

### Prepend and Append
You can add additional content such as select fields, buttons or plain text, to either side of the input by using the prepend and append slots.

<example :component="examples.IInputPrependAppendTextExample" :html="examples.IInputPrependAppendTextExampleHTML" :js="examples.IInputPrependAppendTextExampleJS"></example>

<example :component="examples.IInputPrependAppendButtonExample" :html="examples.IInputPrependAppendButtonExampleHTML" :js="examples.IInputPrependAppendButtonExampleJS"></example>

<example :component="examples.IInputPrependAppendDropdownExample" :html="examples.IInputPrependAppendDropdownExampleHTML" :js="examples.IInputPrependAppendDropdownExampleJS"></example>

### Colors
You can use the `color` property to set a `light` or `dark` color for your inputs.

<example :component="examples.IInputColorVariantsExample" :html="examples.IInputColorVariantsExampleHTML" :js="examples.IInputColorVariantsExampleJS"></example>

### Sizes
You're able to use the `size` modifier to control the size of your inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<example :component="examples.IInputSizeVariantsExample" :html="examples.IInputSizeVariantsExampleHTML" :js="examples.IInputSizeVariantsExampleJS"></example>


