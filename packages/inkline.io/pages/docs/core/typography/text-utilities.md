### Text Utilities
You can change text alignment, transform, style, weight, and color with text utilities and [color utilities](/docs/colors).

#### Text Alignment
You can easily realign text to components with text alignment classes.

<i-code-preview title="Typography - Justified Text Alignment" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<p class="_text-justify">
    Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.
</p>

<template slot="html">

~~~html
<p class="_text-justify">
    Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.
</p>
~~~

</template>
</i-code-preview>

<i-code-preview title="Typography - Left, Center and Right Text Alignment" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<p class="_text-left">
    This text is left aligned.
</p>
<p class="_text-center">
    This text is centered.
</p>
<p class="_text-right">
    This text is right aligned.
</p>

<template slot="html">

~~~html
<p class="_text-left">This text is left aligned.</p>
~~~
~~~html
<p class="_text-center">This text is centered.</p>
~~~
~~~html
<p class="_text-right">This text is right aligned.</p>
~~~

</template>
</i-code-preview>

#### Text Wrapping
You can easily realign text to components with text alignment classes.

<i-code-preview title="Typography - Text Wrapping" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<div class="_text-nowrap _background-light" style="width: 8rem;">
    This text should overflow the parent.
</div>

<template slot="html">

~~~html
<div class="_text-nowrap" style="width: 8rem;">
    This text should overflow the parent.
</div>
~~~

</template>
</i-code-preview>

#### Responsive Utilities

You can align, wrap or truncate text responsively for any given `xs`, `sm`, `md`, `lg`, or `xl` breakpoint by adding the breakpoint suffix:

<i-code-preview title="Typography - Responsive Text Alignment" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<p class="_text-center-xs">This text is centered on extra-small screens.</p>
<p class="_text-center-sm">This text is centered on small screens.</p>
<p class="_text-center-md">This text is centered on medium screens.</p>
<p class="_text-center-lg">This text is centered on large screens.</p>
<p class="_text-center-xl">This text is centered on extra-large screens.</p>

<template slot="html">

~~~html
<p class="_text-center-xs">This text is centered on extra-small screens.</p>
~~~
~~~html
<p class="_text-center-sm">This text is centered on small screens.</p>
~~~
~~~html
<p class="_text-center-md">This text is centered on medium screens.</p>
~~~
~~~html
<p class="_text-center-lg">This text is centered on large screens.</p>
~~~
~~~html
<p class="_text-center-xl">This text is centered on extra-large screens.</p>
~~~

</template>
</i-code-preview>
