# Position Utilities
Use position utilities for quickly setting the position of an element.{.lead}

The most common positioning classes are available:

~~~html
<div class="_position-static">...</div>
~~~
~~~html
<div class="_position-relative">...</div>
~~~
~~~html
<div class="_position-absolute">...</div>
~~~
~~~html
<div class="_position-fixed">...</div>
~~~
~~~html
<div class="_position-sticky">...</div>
~~~

### Fixed Top
You can position an element at the top of the viewport. This is usually used for positioning Navbars at the top of the page. Make sure you understand the implication of adding fixed position in your project and add additional CSS as needed.

~~~html
<div class="_fixed-top">...</div>
~~~

### Fixed Bottom
You can position an element at the bottom of the viewport. This is usually used for positioning Navbars at the bottom of the page. 

~~~html
<div class="_fixed-bottom">...</div>
~~~

### Sticky Top
Position an element at the top of the viewport, but only after you scroll past it. The `._sticky-top` utility uses `position: sticky`, which isn’t fully supported in all browsers.

IE11 and IE10 will render `position: sticky` as `position: relative`. We wrap the styles in a `@supports` query, limiting the stickiness to only browsers that can render it properly.

~~~html
<div class="_sticky-top">...</div>
~~~
