### Inline Text Elements
Inkline provides basic styling for all common HTML5 inline text elements.

<i-code-preview title="Typography - Inline Text Elements" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>

<template slot="html">

~~~html 
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
~~~
~~~html
<p><del>This line of text is meant to be treated as deleted text.</del></p>
~~~
~~~html
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
~~~
~~~html
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
~~~
~~~html
<p><u>This line of text will render as underlined</u></p>
~~~
~~~html
<p><small>This line of text is meant to be treated as fine print.</small></p>
~~~
~~~html
<p><strong>This line rendered as bold text.</strong></p>
~~~
~~~html
<p><em>This line rendered as italicized text.</em></p>
~~~

</template>
</i-code-preview>

To avoid any unwanted semantic implications that the tags would bring, `.mark` and `.small` classes are also 
available to apply the same styles as `<mark>` and `<small>`.

While not shown above, you can also use `<b>` and `<i>` in HTML5. `<b>` is meant to highlight words or phrases 
without adding additional semantics, while `<i>` is mostly for voice, technical terms, etc.
