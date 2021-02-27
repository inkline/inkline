---
title: Text Utilities
description: Use common text utilities to control alignment, wrapping, weight, and more. 
---

<script setup>
import * as examples from './examples';
</script>

# Text Utilities

## Use common text utilities to control alignment, wrapping, weight, and more. 


### Text Alignment
Use text alignment utilities to easily align text in components.

<example :component="examples.TextAlignJustifyExample" :html="examples.TextAlignJustifyExampleHTML"></example>

<example :component="examples.TextAlignExample" :html="examples.TextAlignExampleHTML"></example>

`For left, right, and center alignment, Inkline provides you with responsive classes that use the same breakpoints as the grid system.

<example :component="examples.TextAlignResponsiveExample" :html="examples.TextAlignResponsiveExampleHTML"></example>

### Text wrapping and overflow
You can wrap text using the `._text-wrap` utility class.

<example :component="examples.TextWrapExample" :html="examples.TextWrapExampleHTML"></example>

You can also prevent text from wrapping with a `._text-nowrap` utility class.

<example :component="examples.TextNowrapExample" :html="examples.TextNowrapExampleHTML"></example>

Text wrapping utilities also come with breakpoint-specific classes, same as text alignment classes.

For longer content, adding the `._text-truncate` utility class will truncate the text with an ellipsis. Truncation requires `display: inline-block` or `display: block`.

<example :component="examples.TextTruncateExample" :html="examples.TextTruncateExampleHTML"></example>

### Word break
Prevent long strings of text from breaking your layout by using `._text-break`. Behind the scenes, it uses `overflow-wrap: break-word` and `word-break: break-word` for IE & Edge compatibility.

<example :component="examples.TextBreakExample" :html="examples.TextBreakExampleHTML"></example>

### Text transform
You can transform text in components using text capitalization classes.

<example :component="examples.TextTransformExample" :html="examples.TextTransformExampleHTML"></example>

### Font weights and italics
You can change the weight (boldness) of your text italicize it using these utility classes.

<example :component="examples.TextFontWeightExample" :html="examples.TextFontWeightExampleHTML"></example>

<example :component="examples.TextFontWeightRelativeExample" :html="examples.TextFontWeightRelativeExampleHTML"></example>

<example :component="examples.TextFontStyleItalicExample" :html="examples.TextFontStyleItalicExampleHTML"></example>

### Monospace
Change your text to be monospaced using the `._text-monospace` utility.

<example :component="examples.TextFontMonospaceExample" :html="examples.TextFontMonospaceExampleHTML"></example>

### Text decoration
Remove text decoration using the `._text-decoration-none` utility.

<example :component="examples.TextDecorationExample" :html="examples.TextDecorationExampleHTML"></example>

### Muted text
Make your text stand out less using the `._text-muted` utility.

<example :component="examples.TextMutedExample" :html="examples.TextMutedExampleHTML"></example>

### Text reset
Make your text or link inherit the parent's color using the `._text-reset` utility.

<example :component="examples.TextResetExample" :html="examples.TextResetExampleHTML"></example>
