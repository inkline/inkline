---
title: Code
description: Examples for displaying inline and multi-line blocks of code. 
---

<script setup>
import * as examples from './examples';
</script>

# Code

## Examples for displaying inline and multi-line blocks of code.

### Inline
Wrap inline snippets of code with `<code>`. Be sure to escape HTML angle brackets.

<example :component="examples.CodeInlineExample" :html="examples.CodeInlineExampleHTML"></example>

### Block
We use `<pre>` for multiple lines of code. Once again, be sure to escape any angle brackets in the code for proper 
rendering. You may optionally add the `.-scrollable` modifier, which will set a max-height and provide a y-axis scrollbar.

<example :component="examples.CodeBlockExample" :html="examples.CodeBlockExampleHTML"></example>

### Variables
For indicating variables use the HTML5 `<var>` tag.

<example :component="examples.CodeVariablesExample" :html="examples.CodeVariablesExampleHTML"></example>

### User Input
You can use the `<kbd>` to indicate input that is typically entered via keyboard.

<example :component="examples.CodeUserInputExample" :html="examples.CodeUserInputExampleHTML"></example>

### Sample Output

You can use the `<samp>` for indicating sample output from a program.

<example :component="examples.CodeSampleOutputExample" :html="examples.CodeSampleOutputExampleHTML"></example>
