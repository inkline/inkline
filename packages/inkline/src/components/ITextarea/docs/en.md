---
title: Textarea
description: Form components used for inputting data directly from the keyboard, on multiple lines.
---

<script setup>
import * as examples from '../examples';
</script>

# Textarea
## Form components used for inputting data directly from the keyboard, on multiple lines.

### Basic Example
Textareas are the form controls used for inputting multiple lines. Inkline provides you with simple solutions for all the scenarios you will encounter when creating textarea forms.

<example :component="examples.ITextareaBasicExample" :html="examples.ITextareaBasicExampleHTML" :js="examples.ITextareaBasicExampleJS"></example>

### Disabled State
Setting the `disabled` property will disable all interactions with the textarea component.

<example :component="examples.ITextareaDisabledExample" :html="examples.ITextareaDisabledExampleHTML" :js="examples.ITextareaDisabledExampleJS"></example>

### Readonly State
Setting the `readonly` property will disable all interactions with the textarea component, except being able to focus the textarea.

<example :component="examples.ITextareaReadonlyExample" :html="examples.ITextareaReadonlyExampleHTML" :js="examples.ITextareaReadonlyExampleJS"></example>

### Clearable Variant
If you need to be able to quickly clear the value of an textarea, you can add the `clearable` property to the textarea component.

<example :component="examples.ITextareaClearableExample" :html="examples.ITextareaClearableExampleHTML" :js="examples.ITextareaClearableExampleJS"></example>

### Prefix and Suffix
Inkline allows you to easily add a prefix or suffix to your textareas. Using prefixes and suffixes you can, for example, indicate the textarea type using an icon or text. 

<example :component="examples.ITextareaPrefixSuffixExample" :html="examples.ITextareaPrefixSuffixExampleHTML" :js="examples.ITextareaPrefixSuffixExampleJS"></example>

### Prepend and Append
You can add additional content such as select fields, buttons or plain text, to either side of the textarea by using the prepend and append slots.

<example :component="examples.ITextareaPrependAppendTextExample" :html="examples.ITextareaPrependAppendTextExampleHTML" :js="examples.ITextareaPrependAppendTextExampleJS"></example>

<example :component="examples.ITextareaPrependAppendButtonExample" :html="examples.ITextareaPrependAppendButtonExampleHTML" :js="examples.ITextareaPrependAppendButtonExampleJS"></example>

<example :component="examples.ITextareaPrependAppendDropdownExample" :html="examples.ITextareaPrependAppendDropdownExampleHTML" :js="examples.ITextareaPrependAppendDropdownExampleJS"></example>

### Colors
You can use the `color` property to set a `light` or `dark` color for your textareas.

<example :component="examples.ITextareaColorVariantsExample" :html="examples.ITextareaColorVariantsExampleHTML" :js="examples.ITextareaColorVariantsExampleJS"></example>

### Sizes
You're able to use the `size` modifier to control the size of your textareas, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<example :component="examples.ITextareaSizeVariantsExample" :html="examples.ITextareaSizeVariantsExampleHTML" :js="examples.ITextareaSizeVariantsExampleJS"></example>


