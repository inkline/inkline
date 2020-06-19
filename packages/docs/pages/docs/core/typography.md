---
title: Typography
description: Examples and documentation for typography, one of the most important design elements of an application. 
---

# Typography
## Examples and documentation for typography, one of the most important design elements of an application. 

Inkline provides you with basic elements, typography, and link styles. It uses a native font stack that selects the best 
font family for each OS and device. The base font size is `1rem`, so visitors can customize their font size as needed 
when zooming. 

When more control is needed, you should check out the textual utility classes. Each font size, style and 
weight also has a corresponding helper class to style other elements the same.

### Configuration
When configuring the Sass files, change the `$font-family-primary-base`, `$font-size`, and `$line-height-base` variables 
as our typographic base applied to the `<body>`. Set the global link color via `$link-color` and apply link underlines 
only on `:hover`. The defaults for these global variables are defined in `config/_typography.scss`. 

To learn more about style configuration, please make sure you followed the Customization part of your <nuxt-link :to="{ name: 'docs-introduction-getting-started' }">installation</nuxt-link>.

### Headings
All HTML headings, `<h1>` through `<h6>`, have their size calculated based on the specified `$font-size-base`.

<i-code title="Typography - Headings">
<i-tab type="preview">

<div class="headings-list">
    <h1>h1. Inkline heading</h1>
    <h2>h2. Inkline heading</h2>
    <h3>h3. Inkline heading</h3>
    <h4>h4. Inkline heading</h4>
    <h5>h5. Inkline heading</h5>
    <h6>h6. Inkline heading</h6>
</div>

</i-tab>
<i-tab type="html">

~~~html
<h1>h1. Inkline heading</h1>
<h2>h2. Inkline heading</h2>
<h3>h3. Inkline heading</h3>
<h4>h4. Inkline heading</h4>
<h5>h5. Inkline heading</h5>
<h6>h6. Inkline heading</h6>
~~~

</i-tab>
</i-code>

You can use helper classes to achieve heading styles. Classes `.h1` through `.h6` are available, for when you 
want to match the font styling of a heading but cannot use the associated HTML element.

<i-code title="Typography - Heading Helpers">
<i-tab type="preview">

<div class="headings-list">
    <div><span class="h1">h1. Inkline heading</span></div>
    <div><span class="h2">h2. Inkline heading</span></div>
    <div><span class="h3">h3. Inkline heading</span></div>
    <div><span class="h4">h4. Inkline heading</span></div>
    <div><span class="h5">h5. Inkline heading</span></div>
    <div><span class="h6">h6. Inkline heading</span></div>
</div>

</i-tab>
<i-tab type="html">

~~~html
<span class="h1">h1. Inkline heading</span>
<span class="h2">h2. Inkline heading</span>
<span class="h3">h3. Inkline heading</span>
<span class="h4">h4. Inkline heading</span>
<span class="h5">h5. Inkline heading</span>
<span class="h6">h6. Inkline heading</span>
~~~

</i-tab>
</i-code>

### Displays
If you need something larger than headings, you can use displays, `.d1` through `.d6` are available.

<i-code title="Typography - Display">
<i-tab type="preview">

<div class="headings-list">
    <div><span class="d1">d1. Inkline display</span></div>
    <div><span class="d2">d2. Inkline display</span></div>
    <div><span class="d3">d3. Inkline display</span></div>
    <div><span class="d4">d4. Inkline display</span></div>
    <div><span class="d5">d5. Inkline display</span></div>
    <div><span class="d6">d6. Inkline display</span></div>
</div>

</i-tab>
<i-tab type="html">

~~~html
<span class="d1">d1. Inkline display</span>
<span class="d2">d2. Inkline display</span>
<span class="d3">d3. Inkline display</span>
<span class="d4">d4. Inkline display</span>
<span class="d5">d5. Inkline display</span>
<span class="d6">d6. Inkline display</span>
~~~

</i-tab>
</i-code>

### Lead
Make a paragraph stand out by adding `.lead`.

<i-code title="Typography - Lead">
<i-tab type="preview">

<p class="lead">
    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
</p>

</i-tab>
<i-tab type="html">

~~~html
<p class="lead">
    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
</p>
~~~

</i-tab>
</i-code>

### Inline Text Elements
Inkline provides basic styling for all common HTML5 inline text elements.

<i-code title="Typography - Inline Text Elements">
<i-tab type="preview">

<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>

</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

To avoid any unwanted semantic implications that the tags would bring, `.mark` and `.small` classes are also 
available to apply the same styles as `<mark>` and `<small>`.

While not shown above, you can also use `<b>` and `<i>` in HTML5. `<b>` is meant to highlight words or phrases 
without adding additional semantics, while `<i>` is mostly for voice, technical terms, etc.

### Text Utilities
You can change text alignment, transform, style, weight, and color with text utilities and [color utilities](/docs/utilities/color).

#### Text Alignment
You can easily realign text to components with text alignment classes.

<i-code title="Typography - Justified Text Alignment">
<i-tab type="preview">

<p class="_text-justify">
    Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.
</p>

</i-tab>
<i-tab type="html">

~~~html
<p class="_text-justify">
    Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.
</p>
~~~

</i-tab>
</i-code>

<i-code title="Typography - Left, Center and Right Text Alignment">
<i-tab type="preview">

<p class="_text-left">
    This text is left aligned.
</p>
<p class="_text-center">
    This text is centered.
</p>
<p class="_text-right">
    This text is right aligned.
</p>

</i-tab>
<i-tab type="html">

~~~html
<p class="_text-left">This text is left aligned.</p>
~~~
~~~html
<p class="_text-center">This text is centered.</p>
~~~
~~~html
<p class="_text-right">This text is right aligned.</p>
~~~

</i-tab>
</i-code>

#### Text Wrapping
You can easily realign text to components with text alignment classes.

<i-code title="Typography - Text Wrapping">
<i-tab type="preview">

<div class="_text-nowrap _background-light" style="width: 8rem;">
    This text should overflow the parent.
</div>

</i-tab>
<i-tab type="html">

~~~html
<div class="_text-nowrap" style="width: 8rem;">
    This text should overflow the parent.
</div>
~~~

</i-tab>
</i-code>

#### Responsive Utilities

You can align, wrap or truncate text responsively for any given `xs`, `sm`, `md`, `lg`, or `xl` breakpoint by adding the breakpoint suffix:

<i-code title="Typography - Responsive Text Alignment">
<i-tab type="preview">

<p class="_text-center-xs">This text is centered on extra-small screens.</p>
<p class="_text-center-sm">This text is centered on small screens.</p>
<p class="_text-center-md">This text is centered on medium screens.</p>
<p class="_text-center-lg">This text is centered on large screens.</p>
<p class="_text-center-xl">This text is centered on extra-large screens.</p>

</i-tab>
<i-tab type="html">

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

</i-tab>
</i-code>

### Abbreviations
The HTML `<abbr>` element for abbreviations and acronyms is styled to show the expanded version on hover. 
Abbreviations have a default underline and gain a help cursor to provide additional context on hover and to users of 
assistive technologies.

<i-code title="Typography - Abbreviations">
<i-tab type="preview">

<abbr title="attribute">attr</abbr>

<abbr title="HyperText Markup Language" class="initialism">HTML</abbr>

</i-tab>
<i-tab type="html">

~~~html
<abbr title="attribute">attr</abbr>
~~~
~~~html
<abbr title="HyperText Markup Language" class="initialism">HTML</abbr>
~~~

</i-tab>
</i-code>

### Blockquotes
To quote blocks of content from another source within your document, wrap `<blockquote class="blockquote">` around any 
HTML as the quote.

<i-code title="Blockquote Alignment">
<i-tab type="preview">

<blockquote class="blockquote">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>

<blockquote class="blockquote -center">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>

<blockquote class="blockquote -right">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>

</i-tab>
<i-tab type="html">

~~~html
<blockquote class="blockquote">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
~~~
~~~html
<blockquote class="blockquote -center">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
~~~
~~~html
<blockquote class="blockquote -right">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
~~~

</i-tab>
</i-code>

### Lists
To enumerate a sequence of elements, you can use lists. Inkline provides you with multiple variations to achieve your 
target design.

#### Unordered Lists
When enumerating elements in no specific order, use an unordered list.

<i-code title="Typography - Unordered Lists">
<i-tab type="preview">

<ul>
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Purus sodales ultricies</li>
      <li>Vestibulum laoreet porttitor sem</li>
      <li>Ac tristique libero volutpat at</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ul>

</i-tab>
<i-tab type="html">

~~~html
<ul>
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Purus sodales ultricies</li>
      <li>Vestibulum laoreet porttitor sem</li>
      <li>Ac tristique libero volutpat at</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ul>
~~~

</i-tab>
</i-code>


#### Ordered Lists
When enumerating elements in a specific order, use an ordered list.

<i-code title="Typography - Ordered Lists">
<i-tab type="preview">

<ol>
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Purus sodales ultricies</li>
      <li>Vestibulum laoreet porttitor sem</li>
      <li>Ac tristique libero volutpat at</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ol>

</i-tab>
<i-tab type="html">

~~~html
<ol>
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Purus sodales ultricies</li>
      <li>Vestibulum laoreet porttitor sem</li>
      <li>Ac tristique libero volutpat at</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ol>
~~~

</i-tab>
</i-code>

#### Unstyled Lists
To remove the default `list-style` and `margin` on list items, use the `-unstyled` modifier. 
This applies to immediate children list items only, meaning you will need to add the class for any nested lists as well.

<i-code title="Typography - Unstyled Lists">
<i-tab type="preview">

<ul class="list -unstyled">
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Purus sodales ultricies</li>
      <li>Vestibulum laoreet porttitor sem</li>
      <li>Ac tristique libero volutpat at</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ul>

</i-tab>
<i-tab type="html">

~~~html
<ul class="list -unstyled">
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Purus sodales ultricies</li>
      <li>Vestibulum laoreet porttitor sem</li>
      <li>Ac tristique libero volutpat at</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ul>
~~~

</i-tab>
</i-code>

#### Inline Lists
Remove a list’s bullets and apply some light margin using the `-inline` list modifier.

<i-code title="Typography - Inline Lists">
<i-tab type="preview">

<ul class="list -inline">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>

</i-tab>
<i-tab type="html">

~~~html
<ul class="list -inline">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
~~~

</i-tab>
</i-code>

#### Description Lists
Remove a list’s bullets and apply some light margin using the `-inline` list modifier.

<i-code title="Typography - Description Lists">
<i-tab type="preview">

<dl class="row">
  <dt class="column -sm-3">Description lists</dt>
  <dd class="column -sm-9">A description list is perfect for defining terms.</dd>

  <dt class="column -sm-3">Euismod</dt>
  <dd class="column -sm-9">
    <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
    <p>Donec id elit non mi porta gravida at eget metus.</p>
  </dd>

  <dt class="column -sm-3">Malesuada porta</dt>
  <dd class="column -sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

  <dt class="column -sm-3">Fusce dapibus</dt>
  <dd class="column -sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

  <dt class="column -sm-3">Nesting</dt>
  <dd class="column -sm-9">
    <dl class="row _margin-bottom-0">
      <dt class="column -sm-4">Nested definition list</dt>
      <dd class="column -sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
    </dl>
  </dd>
</dl>

</i-tab>
<i-tab type="html">

~~~html
<dl class="row">
  <dt class="column -sm-3">Description lists</dt>
  <dd class="column -sm-9">A description list is perfect for defining terms.</dd>

  <dt class="column -sm-3">Euismod</dt>
  <dd class="column -sm-9">
    <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
    <p>Donec id elit non mi porta gravida at eget metus.</p>
  </dd>

  <dt class="column -sm-3">Malesuada porta</dt>
  <dd class="column -sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

  <dt class="column -sm-3">Fusce dapibus</dt>
  <dd class="column -sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

  <dt class="column -sm-3">Nesting</dt>
  <dd class="column -sm-9">
    <dl class="row">
      <dt class="column -sm-4">Nested definition list</dt>
      <dd class="column -sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
    </dl>
  </dd>
</dl>
~~~

</i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for typography. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.


<i-code scss title="Typography" expanded :header="false">
    <i-tab type="scss">
        <api-table-row>
            <template slot="property">$font-family-primary-base</template>
            <template slot="default"><code>-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-family-primary-monospace</template>
            <template slot="default"><code>'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-family-primary-print</template>
            <template slot="default"><code>'Georgia', 'Times New Roman', 'Times', serif</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-family-primary</template>
            <template slot="default"><code>(...)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-family-secondary-base</template>
            <template slot="default"><code>$font-family-primary-base</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-family-secondary-print</template>
            <template slot="default"><code>$font-family-primary-print</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-family-secondary</template>
            <template slot="default"><code>(...)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$letter-spacing</template>
            <template slot="default"><code>0</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-size-base</template>
            <template slot="default"><code>1rem</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-size-xs</template>
            <template slot="default"><code>$font-size-base * $size-multiplier-xs</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-size-sm</template>
            <template slot="default"><code>$font-size-base * $size-multiplier-sm</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-size-md</template>
            <template slot="default"><code>$font-size-base * $size-multiplier-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-size-lg</template>
            <template slot="default"><code>$font-size-base * $size-multiplier-lg</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-size-xl</template>
            <template slot="default"><code>$font-size-base * $size-multiplier-xl</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-size</template>
            <template slot="default"><code>(...)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-weight-extralight</template>
            <template slot="default"><code>200</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-weight-light</template>
            <template slot="default"><code>300</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-weight-normal</template>
            <template slot="default"><code>normal</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-weight-semibold</template>
            <template slot="default"><code>600</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-weight-bold</template>
            <template slot="default"><code>bold</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-weight-black</template>
            <template slot="default"><code>900</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-weight-lighter</template>
            <template slot="default"><code>lighter</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-weight-bolder</template>
            <template slot="default"><code>bolder</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$font-weight</template>
            <template slot="default"><code>(...)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$line-height</template>
            <template slot="default"><code>1.5</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$text-muted</template>
            <template slot="default"><code>$color-gray-60</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$h1-font-size</template>
            <template slot="default"><code>2.5 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$h2-font-size</template>
            <template slot="default"><code>2 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$h3-font-size</template>
            <template slot="default"><code>1.75 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$h4-font-size</template>
            <template slot="default"><code>1.5 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$h5-font-size</template>
            <template slot="default"><code>1.25 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$h6-font-size</template>
            <template slot="default"><code>1 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$headings-font-size</template>
            <template slot="default"><code>(...)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$headings-margin-top</template>
            <template slot="default"><code>$spacer * 2.5</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$headings-margin-bottom</template>
            <template slot="default"><code>$spacer</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$headings-font-family</template>
            <template slot="default"><code>$font-family-secondary-base</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$headings-font-weight</template>
            <template slot="default"><code>normal</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$headings-line-height</template>
            <template slot="default"><code>1.1</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$headings-color</template>
            <template slot="default"><code>inherit</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$d1-font-size</template>
            <template slot="default"><code>5.5 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$d2-font-size</template>
            <template slot="default"><code>5 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$d3-font-size</template>
            <template slot="default"><code>4.5 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$d4-font-size</template>
            <template slot="default"><code>4 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$d5-font-size</template>
            <template slot="default"><code>3.5 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$d6-font-size</template>
            <template slot="default"><code>3 * $font-size-md</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$displays-font-size</template>
            <template slot="default"><code>(...)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$displays-font-weight</template>
            <template slot="default"><code>$headings-font-weight</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$displays-line-height</template>
            <template slot="default"><code>$headings-line-height</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$link-color</template>
            <template slot="default"><code>$color-primary</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$link-color-hover</template>
            <template slot="default"><code>darken-lightness($link-color, 20%)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$link-decoration</template>
            <template slot="default"><code>none</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$link-decoration-hover</template>
            <template slot="default"><code>underline</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$lead-font-size</template>
            <template slot="default"><code>$font-size-lg</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$lead-font-weight</template>
            <template slot="default"><code>300</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$list-inline-padding</template>
            <template slot="default"><code>$spacer</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$list-item-margin-bottom</template>
            <template slot="default"><code>$spacers-1-2</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$dt-font-weight</template>
            <template slot="default"><code>$font-weight-bold</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$small-font-size</template>
            <template slot="default"><code>$font-size-sm</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$blockquote-small-color</template>
            <template slot="default"><code>$color-gray-60</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$blockquote-font-size</template>
            <template slot="default"><code>$font-size-lg</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$blockquote-border</template>
            <template slot="default"><code>3px solid $color-gray-30</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$blockquote-margin</template>
            <template slot="default"><code>$spacer</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$blockquote-bordered-padding</template>
            <template slot="default"><code>$spacer</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$hr-border-color</template>
            <template slot="default"><code>rgba($colors-black, 0.1)</code></template>
        </api-table-row>
        <api-table-row>
            <template slot="property">$hr-border-width</template>
            <template slot="default"><code>$border-width</code></template>
        </api-table-row>
    </i-tab>
</i-code>
