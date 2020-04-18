# Code
## Examples for displaying inline and multi-line blocks of code. { .lead }

### Inline
Wrap inline snippets of code with `<code>`. Be sure to escape HTML angle brackets.

<i-code-preview title="Inline Code">

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

<i-code-preview title="Code Block">

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

<i-code-preview title="Variables">

<var>y</var> = <var>m</var><var>x</var> + <var>b</var>

<template slot="html">

~~~html
<var>y</var> = <var>m</var><var>x</var> + <var>b</var>
~~~

</template>
</i-code-preview>

### User Input
You can use the `<kbd>` to indicate input that is typically entered via keyboard.

<i-code-preview title="User Input">

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

<i-code-preview title="Sample Output">

<samp>This text is meant to be treated as sample output from a computer program.</samp>

<template slot="html">

~~~html
<samp>This text is meant to be treated as sample output from a computer program.</samp>
~~~

</template>
</i-code-preview>


### Sass Variables
Here you can find a list of the Sass variables you can use for code elements. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-introduction-sass-variables' }">Sass Variables</nuxt-link> page.


<i-scss-preview title="Typography" expanded :header="false">
    <template slot="scss">
        <api-table-row>
            <template slot="property">$mark-padding</template>
            <template slot="default"><code>0.2rem 0.4rem</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$mark-color</template>
            <template slot="default"><code>$color-gray-80</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$mark-background-color</template>
            <template slot="default"><code>#fcf8e3</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$code-font-size</template>
            <template slot="default"><code>90%</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$code-padding</template>
            <template slot="default"><code>0.15rem 0.4rem</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$code-color</template>
            <template slot="default"><code>#bd4147</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$code-background</template>
            <template slot="default"><code>$color-gray-10</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$code-color-dark</template>
            <template slot="default"><code>#ff6d6b</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$code-background-dark</template>
            <template slot="default"><code>lighten($color-gray-80, 5%)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$kbd-font-size</template>
            <template slot="default"><code>$code-font-size</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$kbd-box-shadow</template>
            <template slot="default"><code>inset 0 -0.1rem 0 rgba(0, 0, 0, 0.25)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$kbd-nested-font-weight</template>
            <template slot="default"><code>$font-weight-bold</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$kbd-color</template>
            <template slot="default"><code>$color-white</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$kbd-background</template>
            <template slot="default"><code>$color-gray-90</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$kbd-padding</template>
            <template slot="default"><code>$code-padding</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$pre-font-size</template>
            <template slot="default"><code>$code-font-size</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$pre-color</template>
            <template slot="default"><code>$color-gray-90</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$pre-color-dark</template>
            <template slot="default"><code>$color-white</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$pre-scrollable-max-height</template>
            <template slot="default"><code>340px</code></template>
        </api-table-row>
    </template>
</i-scss-preview>
