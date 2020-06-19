---
title: Code
description: Examples for displaying inline and multi-line blocks of code. 
---

# Code
## Examples for displaying inline and multi-line blocks of code.

### Inline
Wrap inline snippets of code with `<code>`. Be sure to escape HTML angle brackets.

<i-code title="Inline Code">
<i-tab type="preview">

For example, <code>&lt;section&gt;</code> should be wrapped as inline.

</i-tab>
<i-tab type="html">

~~~html
For example, <code>&lt;section&gt;</code> should be wrapped as inline.
~~~

</i-tab>
</i-code>

### Block
We use `<pre>` for multiple lines of code. Once again, be sure to escape any angle brackets in the code for proper 
rendering. You may optionally add the `.-scrollable` modifier, which will set a max-height and provide a y-axis scrollbar.

<i-code title="Code Block">
<i-tab type="preview">

<pre>
<code>&lt;p&gt;Sample text here...&lt;/p&gt;
&lt;p&gt;And another line of sample text here...&lt;/p&gt;</code>
</pre>

</i-tab>
<i-tab type="html">

~~~html
<pre>
    <code>
        &lt;p&gt;Sample text here...&lt;/p&gt;
        &lt;p&gt;And another line of sample text here...&lt;/p&gt;
    </code>
</pre>
~~~

</i-tab>
</i-code>

### Variables
For indicating variables use the HTML5 `<var>` tag.

<i-code title="Variables">
<i-tab type="preview">

<var>y</var> = <var>m</var><var>x</var> + <var>b</var>

</i-tab>
<i-tab type="html">

~~~html
<var>y</var> = <var>m</var><var>x</var> + <var>b</var>
~~~

</i-tab>
</i-code>

### User Input
You can use the `<kbd>` to indicate input that is typically entered via keyboard.

<i-code title="User Input">
<i-tab type="preview">

To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>

</i-tab>
<i-tab type="html">

~~~html
To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>
~~~

</i-tab>
</i-code>

### Sample Output

You can use the `<samp>` for indicating sample output from a program.

<i-code title="Sample Output">
<i-tab type="preview">

<samp>This text is meant to be treated as sample output from a computer program.</samp>

</i-tab>
<i-tab type="html">

~~~html
<samp>This text is meant to be treated as sample output from a computer program.</samp>
~~~

</i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for code elements. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.


<i-code scss title="Code" expanded :header="false">
    <i-tab type="scss">
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
    </i-tab>
</i-code>
