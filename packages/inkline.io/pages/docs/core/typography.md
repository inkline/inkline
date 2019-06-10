# Typography
Examples and documentation for typography, one of the most important design elements of an application. { .lead }

Inkline provides you with basic elements, typography, and link styles. It uses a native font stack that selects the best 
font family for each OS and device. The base font size is `1rem`, so visitors can customize their font size as needed 
when zooming. 

When more control is needed, you should check out the textual utility classes. Each font size, style and 
weight also has a corresponding helper class to style other elements the same.

### Configuration
When configuring the stylus files, change the `--font-family-primary-base`, `--font-size`, and `--line-height-base` variables 
as our typographic base applied to the `<body>`. Set the global link color via `--link-color` and apply link underlines 
only on `:hover`. The defaults for these global variables are defined in `config/_typography.styl`. 

To learn more about style configuration, please read the [Customization](/docs/introduction/customization) section.

### Headings
All HTML headings, `<h1>` through `<h6>`, are available.

<i-code-preview title="Typography - Headings" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<div class="headings-list">
    <h1>h1. Inkline heading</h1>
    <h2>h2. Inkline heading</h2>
    <h3>h3. Inkline heading</h3>
    <h4>h4. Inkline heading</h4>
    <h5>h5. Inkline heading</h5>
    <h6>h6. Inkline heading</h6>
</div>

<template slot="html">

~~~html
<h1>h1. Inkline heading</h1>
<h2>h2. Inkline heading</h2>
<h3>h3. Inkline heading</h3>
<h4>h4. Inkline heading</h4>
<h5>h5. Inkline heading</h5>
<h6>h6. Inkline heading</h6>
~~~

</template>
</i-code-preview>

You can use helper classes to achieve heading styles. Classes `.h1` through `.h6` are available, for when you 
want to match the font styling of a heading but cannot use the associated HTML element.

<i-code-preview title="Typography - Heading Helpers" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography" class="_padding-bottom-0">

<div class="headings-list">
    <div><span class="h1">h1. Inkline heading</span></div>
    <div><span class="h2">h2. Inkline heading</span></div>
    <div><span class="h3">h3. Inkline heading</span></div>
    <div><span class="h4">h4. Inkline heading</span></div>
    <div><span class="h5">h5. Inkline heading</span></div>
    <div><span class="h6">h6. Inkline heading</span></div>
</div>

<template slot="html">

~~~html
<span class="h1">h1. Inkline heading</span>
<span class="h2">h2. Inkline heading</span>
<span class="h3">h3. Inkline heading</span>
<span class="h4">h4. Inkline heading</span>
<span class="h5">h5. Inkline heading</span>
<span class="h6">h6. Inkline heading</span>
~~~

</template>
</i-code-preview>

### Displays
If you need something larger than headings, you can use displays, `.d1` through `.d6` are available.

<i-code-preview title="Typography - Display" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography" class="_padding-bottom-0">

<div class="headings-list">
    <div><span class="d1">d1. Inkline display</span></div>
    <div><span class="d2">d2. Inkline display</span></div>
    <div><span class="d3">d3. Inkline display</span></div>
    <div><span class="d4">d4. Inkline display</span></div>
    <div><span class="d5">d5. Inkline display</span></div>
    <div><span class="d6">d6. Inkline display</span></div>
</div>

<template slot="html">

~~~html
<span class="d1">d1. Inkline display</span>
<span class="d2">d2. Inkline display</span>
<span class="d3">d3. Inkline display</span>
<span class="d4">d4. Inkline display</span>
<span class="d5">d5. Inkline display</span>
<span class="d6">d6. Inkline display</span>
~~~

</template>
</i-code-preview>

### Lead
Make a paragraph stand out by adding `.lead`.

<i-code-preview title="Typography - Lead" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<p class="lead">
    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
</p>

<template slot="html">

~~~html
<p class="lead">
    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
</p>
~~~

</template>
</i-code-preview>

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

### Abbreviations
The HTML `<abbr>` element for abbreviations and acronyms is styled to show the expanded version on hover. 
Abbreviations have a default underline and gain a help cursor to provide additional context on hover and to users of 
assistive technologies.

<i-code-preview title="Typography - Abbreviations" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography">

<abbr title="attribute">attr</abbr>

<abbr title="HyperText Markup Language" class="initialism">HTML</abbr>

<template slot="html">

~~~html
<abbr title="attribute">attr</abbr>
~~~
~~~html
<abbr title="HyperText Markup Language" class="initialism">HTML</abbr>
~~~

</template>
</i-code-preview>

### Blockquotes
To quote blocks of content from another source within your document, wrap `<blockquote class="blockquote">` around any 
HTML as the quote.

<i-code-preview title="Blockquote Alignment" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography" class="_padding-bottom-0">

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

<template slot="html">

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

</template>
</i-code-preview>

### Lists
To enumerate a sequence of elements, you can use lists. Inkline provides you with multiple variations to achieve your 
target design.

#### Unordered Lists
When enumerating elements in no specific order, use an unordered list.

<i-code-preview title="Typography - Unordered Lists" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography" class="_padding-bottom-0">

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

<template slot="html">

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

</template>
</i-code-preview>


#### Ordered Lists
When enumerating elements in a specific order, use an ordered list.

<i-code-preview title="Typography - Ordered Lists" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography" class="_padding-bottom-0">

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

<template slot="html">

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

</template>
</i-code-preview>

#### Unstyled Lists
To remove the default `list-style` and `margin` on list items, use the `-unstyled` modifier. 
This applies to immediate children list items only, meaning you will need to add the class for any nested lists as well.

<i-code-preview title="Typography - Unstyled Lists" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography" class="_padding-bottom-0">

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

<template slot="html">

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

</template>
</i-code-preview>

#### Inline Lists
Remove a list’s bullets and apply some light margin using the `-inline` list modifier.

<i-code-preview title="Typography - Inline Lists" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography" class="_padding-bottom-0">

<ul class="list -inline">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>

<template slot="html">

~~~html
<ul class="list -inline">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
~~~

</template>
</i-code-preview>

#### Description Lists
Remove a list’s bullets and apply some light margin using the `-inline` list modifier.

<i-code-preview title="Typography - Description Lists" link="https://github.com/inkline/inkline/tree/master/src/css/core/typography" class="_padding-bottom-0">

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

<template slot="html">

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

</template>
</i-code-preview>

