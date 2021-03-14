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

You can use the following text alignment utility classes:

- `_text-align:left` or `_text:left`
- `_text-align:center` or `_text:center`
- `_text-align:right` or `_text:right`
- `_text-align:justify` or `_text:justify`
- `_{xs|sm|md|lg|xl|xxl}:text-align:left` or `_{xs|sm|md|lg|xl|xxl}:text:left`
- `_{xs|sm|md|lg|xl|xxl}:text-align:center` or `_{xs|sm|md|lg|xl|xxl}:text:center`
- `_{xs|sm|md|lg|xl|xxl}:text-align:right` or `_{xs|sm|md|lg|xl|xxl}:text:right`

### Text Wrapping and Overflow
You can wrap text using the `._white-space:normal` utility class.

<example :component="examples.TextWrapExample" :html="examples.TextWrapExampleHTML"></example>

You can also prevent text from wrapping with a `._white-space:nowrap` utility class.

<example :component="examples.TextNowrapExample" :html="examples.TextNowrapExampleHTML"></example>

Text wrapping utilities also come with breakpoint-specific classes, same as text alignment classes.

For longer content, adding the `._text:truncate` utility class will truncate the text with an ellipsis. Truncation requires `display: inline-block` or `display: block`.

<example :component="examples.TextTruncateExample" :html="examples.TextTruncateExampleHTML"></example>

You can use the following white space utility classes:

- `_white-space:normal` or `_text:wrap`
- `_white-space:nowrap` or `_text:nowrap`
- `_text:truncate`
- `_{xs|sm|md|lg|xl|xxl}:white-space:normal` or `_{xs|sm|md|lg|xl|xxl}:text:wrap`
- `_{xs|sm|md|lg|xl|xxl}:white-space:nowrap` or `_{xs|sm|md|lg|xl|xxl}:text:nowrap`
- `_{xs|sm|md|lg|xl|xxl}:text:truncate`

### Word Break
Prevent long strings of text from breaking your layout by using `._text:break-word`. Behind the scenes, it uses `overflow-wrap: break-word` and `word-break: break-word` for IE & Edge compatibility.

<example :component="examples.TextBreakExample" :html="examples.TextBreakExampleHTML"></example>

You can use the following word break utility classes:

- `_text:break-word`

### Text Transform
You can transform text in components using text capitalization classes.

<example :component="examples.TextTransformExample" :html="examples.TextTransformExampleHTML"></example>

You can use the following text transform utility classes:

- `_text-transform:lowercase` or `_text:lowercase`
- `_text-transform:uppercase` or `_text:uppercase`
- `_text-transform:capitalize` or `_text:capitalize`

### Font Weights and Italics
You can change the weight (boldness) of your text italicize it using these utility classes.

<example :component="examples.TextFontWeightExample" :html="examples.TextFontWeightExampleHTML"></example>

<example :component="examples.TextFontWeightRelativeExample" :html="examples.TextFontWeightRelativeExampleHTML"></example>

<example :component="examples.TextFontStyleItalicExample" :html="examples.TextFontStyleItalicExampleHTML"></example>


You can use the following font weight and style utility classes:

- `_font-weight:extralight` or `_text:extralight`
- `_font-weight:light` or `_text:light`
- `_font-weight:normal` or `_text:normal`
- `_font-weight:semibold` or `_text:semibold`
- `_font-weight:bold` or `_text:bold`
- `_font-weight:black` or `_text:black`
- `_font-weight:lighter` or `_text:lighter`
- `_font-weight:bolder` or `_text:bolder`
- `_font-style:italic` or `_text:italic`

### Font Size
Change your font size using one of the font-size utilities.

<example :component="examples.TextFontSizeExample" :html="examples.TextFontSizeExampleHTML"></example>

You can use the following font weight utility classes:

- `_font-size:xs` or `_text:xs`
- `_font-size:sm` or `_text:sm`
- `_font-size:md` or `_text:md`
- `_font-size:lg` or `_text:lg`
- `_font-size:xl` or `_text:xl`

### Monospace
Change your text to be monospaced using the `._font-family:monospace` utility.

<example :component="examples.TextFontMonospaceExample" :html="examples.TextFontMonospaceExampleHTML"></example>

You can use the following font weight utility classes:

- `_font-family:monospace` or `_text:monospace`

### Text Decoration
Remove text decoration using the `._text-decoration:none` utility.

<example :component="examples.TextDecorationExample" :html="examples.TextDecorationExampleHTML"></example>

You can use the following text decoration utility classes:

- `_text-decoration:none` 

### Muted Text
Make your text stand out less using the `._text:muted` utility.

<example :component="examples.TextMutedExample" :html="examples.TextMutedExampleHTML"></example>

You can use the following text muted utility classes:

- `_text:muted` or `_color:muted` 

### Text Reset
Make your text or link inherit the parent's color using the `._text:reset` utility.

<example :component="examples.TextResetExample" :html="examples.TextResetExampleHTML"></example>

You can use the following text reset utility classes:

- `_text:reset`

### Text Hide
You can make your text disappear without hiding the element by using the `text-indent: -10000px` trick. This is available through the following utility class:

- `_text:hide`
