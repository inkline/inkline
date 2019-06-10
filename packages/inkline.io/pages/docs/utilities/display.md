# Display Utilities
## Change the display style of components responsively with display utilities. { .lead }

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

<i-code-preview title="Display Inline Utility Example" link="https://github.com/inkline/inkline/blob/master/src/css/helpers">

<div class="_background-primary _padding-1-2 _display-inline">Inline</div>
<div class="_background-dark _padding-1-2 _display-inline">Inline</div>

<template slot="html">

~~~html
<div class="_display-inline">Inline</div>
<div class="_display-inline">Inline</div>
~~~

</template>
</i-code-preview>



<i-code-preview title="Display Block Utility Example" link="https://github.com/inkline/inkline/blob/master/src/css/helpers">

<div class="_background-primary _padding-1-2 _display-block">Block</div>
<div class="_background-dark _padding-1-2 _display-block">Block</div>

<template slot="html">

~~~html
<div class="_display-block">Inline Block</div>
<div class="_display-block">Inline Block</div>
~~~

</template>
</i-code-preview>

### Print
Change the display value of elements when printing with the print display utility classes.

- `._display-print-none`
- `._display-print-inline`
- `._display-print-inline-block`
- `._display-print-block`
