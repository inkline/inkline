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
