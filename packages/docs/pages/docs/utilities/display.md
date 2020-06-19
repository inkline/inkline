---
title: Display Utilities
description: Change the display style of components responsively with display utilities. 
---

### How it works
Display utility classes that apply to all breakpoints, from `xs` to `xl`, have no breakpoint abbreviation in them. 

The classes are named using the following format:

<div v-pre>

- `._display-{value}`<span/>
- `._display-{breakpoint}-{value}`<span/> 

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

The media queries affect screen widths with the given breakpoint. For example, `._display-lg-none` sets `display: none;` on large screens.


### Examples

<i-code title="Display Inline Utility Example">
<i-tab type="preview">
    <div class="_background-primary _padding-1-2 _display-inline">Inline</div>
    <div class="_background-dark _padding-1-2 _display-inline">Inline</div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_display-inline">Inline</div>
<div class="_display-inline">Inline</div>
~~~

</i-tab>
</i-code>



<i-code title="Display Block Utility Example">
<i-tab type="preview">
    <div class="_background-primary _padding-1-2 _display-block">Block</div>
    <div class="_background-dark _padding-1-2 _display-block">Block</div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_display-block">Inline Block</div>
<div class="_display-block">Inline Block</div>
~~~

</i-tab>
</i-code>

### Print
Change the display value of elements when printing with the print display utility classes.

- `._display-print-none`
- `._display-print-inline`
- `._display-print-inline-block`
- `._display-print-block`
