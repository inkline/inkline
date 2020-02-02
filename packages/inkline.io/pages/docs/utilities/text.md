# Text Utilities
## Use common text utilities to control alignment, wrapping, weight, and more. { .lead }

### Text Alignment
Use text alignment utilities to easily align text in components.

<i-code-preview title="Justify Alignment Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_text-justify">
    Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.
</p>
<template slot="html">

~~~html
<p class="_text-justify">Ambitioni dedisse scripsisse iudicaretur...</p>
~~~

</template>
</i-code-preview>

<i-code-preview title="Text Alignment Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_text-left">This text is left aligned.</p>
<p class="_text-center">This text is center aligned.</p>
<p class="_text-right">This text is right aligned.</p>
<template slot="html">

~~~html
<p class="_text-justify">Ambitioni dedisse scripsisse iudicaretur...</p>
~~~

</template>
</i-code-preview>

`For left, right, and center alignment, Inkline provides you with responsive classes that use the same breakpoints as the grid system.

<i-code-preview title="Responsive Text Alignment Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_text-center-xs">Center aligned text on xs viewport size.</p>
<p class="_text-center-sm">Center aligned text on sm viewport size.</p>
<p class="_text-center-md">Center aligned text on md viewport size.</p>
<p class="_text-center-lg">Center aligned text on lg viewport size.</p>
<p class="_text-center-xl">Center aligned text on xl viewport size.</p>
<template slot="html">

~~~html
<p class="_text-center-xs">Center aligned text on xs viewport size.</p>
<p class="_text-center-sm">Center aligned text on sm viewport size.</p>
<p class="_text-center-md">Center aligned text on md viewport size.</p>
<p class="_text-center-lg">Center aligned text on lg viewport size.</p>
<p class="_text-center-xl">Center aligned text on xl viewport size.</p>
~~~

</template>
</i-code-preview>

### Text wrapping and overflow
You can wrap text using the `._text-wrap` utility class.

<i-code-preview title="Text Wrap Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_background-gray-30 _text-wrap" style="width: 100px;">This text should wrap.</p>
<template slot="html">

~~~html
<p class="_text-wrap" style="width: 100px;">This text should wrap.</p>
~~~

</template>
</i-code-preview>

You can also prevent text from wrapping with a `._text-nowrap` utility class.

<i-code-preview title="Text No Wrap Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_background-gray-30 _text-nowrap" style="width: 100px;">This text should overflow the parent.</p>
<template slot="html">

~~~html
<p class="_text-nowrap" style="width: 100px;">This text should overflow the parent.</p>
~~~

</template>
</i-code-preview>

Text wrapping utilities also come with breakpoint-specific classes, same as text alignment classes.

For longer content, adding the `._text-truncate` utility class will truncate the text with an ellipsis. Truncation requires `display: inline-block` or `display: block`.

<i-code-preview title="Text Truncation Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<div class="_display-block _text-truncate" style="max-width: 180px;">
This block text is truncated.
</div>
<span class="_display-inline-block _text-truncate" style="max-width: 150px;">
This inline text is truncated.
</span>
<template slot="html">

~~~html
<div class="_display-block _text-truncate" style="max-width: 180px;">
    This block text is truncated.
</div>
~~~
~~~html
<span class="_display-inline-block _text-truncate" style="max-width: 150px;">
    This inline text is truncated.
</span>
~~~

</template>
</i-code-preview>

### Word break
Prevent long strings of text from breaking your layout by using `._text-break`. Behind the scenes, it uses `overflow-wrap: break-word` and `word-break: break-word` for IE & Edge compatibility.

<i-code-preview title="Word Break Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_text-break">Thisisaverylongwordwhichwillbreakourlayoutifwedonotusethetextbreakutilityclass</p>
<template slot="html">

~~~html
<p class="_text-break">Thisisaverylongwordwhichwillbreakourlayoutifwedonotusethetextbreakutilityclass</p>
~~~

</template>
</i-code-preview>

### Text transform
You can transform text in components using text capitalization classes.

<i-code-preview title="Text Transform Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_text-lowercase">This text is lowercase.</p>
<p class="_text-uppercase">This text is uppercase.</p>
<p class="_text-capitalize">This text is capitalized.</p>
<template slot="html">

~~~html
<p class="_text-lowercase">This text is lowercase.</p>
~~~
~~~html
<p class="_text-uppercase">This text is uppercase.</p>
~~~
~~~html
<p class="_text-capitalize">This text is capitalized.</p>
~~~

</template>
</i-code-preview>

### Font weights and italics
You can change the weight (boldness) of your text italicize it using these utility classes.

<i-code-preview title="Font Weight Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_font-weight-extralight">Extralight text.</p>
<p class="_font-weight-light">Light text.</p>
<p class="_font-weight-normal">Normal text.</p>
<p class="_font-weight-semibold">Semibold text.</p>
<p class="_font-weight-bold">Bold text.</p>
<p class="_font-weight-black">Black text.</p>
<template slot="html">

~~~html
<p class="_font-weight-extralight">Extralight text.</p>
~~~
~~~html
<p class="_font-weight-light">Light text.</p>
~~~
~~~html
<p class="_font-weight-normal">Normal text.</p>
~~~
~~~html
<p class="_font-weight-semibold">Semibold text.</p>
~~~
~~~html
<p class="_font-weight-bold">Bold text.</p>
~~~
~~~html
<p class="_font-weight-black">Black text.</p>
~~~

</template>
</i-code-preview>

<i-code-preview title="Relative Font Weight Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_font-weight-lighter">Lighter weight text (relative to the parent element).</p>
<p class="_font-weight-bolder">Bolder weight text (relative to the parent element).</p>
<template slot="html">

~~~html
<p class="_font-weight-lighter">Lighter weight text (relative to the parent element).</p>
~~~
~~~html
<p class="_font-weight-bolder">Bolder weight text (relative to the parent element).</p>
~~~

</template>
</i-code-preview>

<i-code-preview title="Italic Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_font-italic">Italic text.</p>
<template slot="html">

~~~html
<p class="_font-italic">Italic text.</p>
~~~

</template>
</i-code-preview>

### Monospace
Change your text to be monospaced using the `._text-monospace` utility.

<i-code-preview title="Monospace Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_text-monospace">This text is monospace.</p>
<template slot="html">

~~~html
<p class="_text-monospace">This text is monospace.</p>
~~~

</template>
</i-code-preview>

### Text decoration
Remove text decoration using the `._text-decoration-none` utility.

<i-code-preview title="Text Decoration Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<a class="_text-decoration-none" href="https://inkline.io">This link is not underlined.</a>
<template slot="html">

~~~html
<a class="_text-decoration-none" href="..">This link is not underlined.</a>
~~~

</template>
</i-code-preview>

### Muted text
Make your text stand out less using the `._text-muted` utility.

<i-code-preview title="Text Muted Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_text-muted">This text is muted.</p>
<template slot="html">

~~~html
<p class="_text-muted">This text is muted.</p>
~~~

</template>
</i-code-preview>

### Text reset
Make your text or link inherit the parent's color using the `._text-reset` utility.

<i-code-preview title="Text Reset Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">
<p class="_text-muted">This text is muted and has a <a class="_text-reset" href="https://inkline.io">reset link</a>.</p>
<template slot="html">

~~~html
<p class="_text-muted">This text is muted and has a <a class="_text-reset" href="..">text reset link</a>.</p>
~~~

</template>
</i-code-preview>

