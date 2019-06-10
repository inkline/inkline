# Code
## Examples for displaying inline and multi-line blocks of code with Inkline. { .lead }

### Inline
Wrap inline snippets of code with `<code>`. Be sure to escape HTML angle brackets.

<i-code-preview title="Inline Code" link="https://github.com/inkline/inkline/tree/master/src/css/core/code">

For example, <code>&lt;section&gt;</code> should be wrapped as inline.

<template slot="html">

~~~html
For example, <code>&lt;section&gt;</code> should be wrapped as inline.
~~~

</template>
</i-code-preview>

### Block
We use `<pre>` for multiple lines of code. Once again, be sure to escape any angle brackets in the code for proper 
rendering. You may optionally add the `.-scrollable` modifier, which will set a max-height and provide a y-axis scrollbar.

<i-code-preview title="Code Block" link="https://github.com/inkline/inkline/tree/master/src/css/core/code">

<pre>
<code>&lt;p&gt;Sample text here...&lt;/p&gt;
&lt;p&gt;And another line of sample text here...&lt;/p&gt;</code>
</pre>

<template slot="html">

~~~html
<pre>
    <code>
        &lt;p&gt;Sample text here...&lt;/p&gt;
        &lt;p&gt;And another line of sample text here...&lt;/p&gt;
    </code>
</pre>
~~~

</template>
</i-code-preview>

### Variables
For indicating variables use the HTML5 `<var>` tag.

<i-code-preview title="Variables" link="https://github.com/inkline/inkline/tree/master/src/css/core/code">

<var>y</var> = <var>m</var><var>x</var> + <var>b</var>

<template slot="html">

~~~html
<var>y</var> = <var>m</var><var>x</var> + <var>b</var>
~~~

</template>
</i-code-preview>

### User Input
You can use the `<kbd>` to indicate input that is typically entered via keyboard.

<i-code-preview title="User Input" link="https://github.com/inkline/inkline/tree/master/src/css/core/code">

To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>

<template slot="html">

~~~html
To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>
~~~

</template>
</i-code-preview>

### Sample Output

You can use the `<samp>` for indicating sample output from a program.

<i-code-preview title="Sample Output" link="https://github.com/inkline/inkline/tree/master/src/css/core/code">

<samp>This text is meant to be treated as sample output from a computer program.</samp>

<template slot="html">

~~~html
<samp>This text is meant to be treated as sample output from a computer program.</samp>
~~~

</template>
</i-code-preview>

