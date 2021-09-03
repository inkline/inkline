---
title: Screen Reader
description: Use screen reader utilities to hide elements on all devices except screen readers.
---

# Screen Reader
## Use screen reader utilities to hide elements on all devices except screen readers.

Hide an element to all devices except screen readers using the `._visually-hidden` utility class. Use the `._visually-hidden:focusable` utility variant to show the element again when it’s focused (e.g. when focusing using a keyboard). 

~~~html
<span class="_visually-hidden">
    Opens in new tab
</span>
~~~

~~~html
<a class="_visually-hidden:focusable" href="#content">
    Skip to main content
</a>
~~~

You can extend the provided Sass placeholder as well.

~~~scss
@import '@inkline/inkline/css/mixins';

.skip-navigation {
    @extend %visually-hidden;
}
~~~
