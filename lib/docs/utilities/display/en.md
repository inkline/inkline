---
title: Display Utilities
description: Change the display style of components responsively with display utilities. 
---

<script setup>
import * as examples from './examples';
</script>

# Display Utilities

## Change the display style of components responsively with display utilities. 

### How it works
Display utility classes that apply to all breakpoints, from `xs` to `xl`, have no breakpoint abbreviation in them. 

The classes are named using the following format:

<div v-pre>

- `._display:{value}`<span/>
- `._{breakpoint}:display:{value}`<span/> 

</div>

Where `value` can be one of:
- `none`
- `inline`
- `inline-block`
- `block`
- `table`
- `table-cell`
- `table-row`
- `flex`
- `inline-flex`

And `breakpoint` is one of:
- `xs`
- `sm`
- `md`
- `lg`
- `xl`
- `xxl`

The media queries affect screen widths with the given breakpoint. For example, `._lg:display:none` sets `display: none;` on large screens.

<example :component="examples.DisplayInlineExample" :html="examples.DisplayInlineExampleHTML"></example>

<example :component="examples.DisplayBlockExample" :html="examples.DisplayBlockExampleHTML"></example>

### Print
Change the display value of elements when printing with the print display utility classes.

- `._print:display:none`
- `._print:display:inline`
- `._print:display:inline-block`
- `._print:display:block`
