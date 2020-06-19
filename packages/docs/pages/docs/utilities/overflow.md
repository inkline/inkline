---
title: Overflow Utilities
description: You can use the overflow utilities for deciding how content overflows an element.
---
Overflow functionality is provided for two values by default, and they are not responsive.

<i-code title="Overflow Utility Example">
<i-tab type="preview">
<div class="_overflow-auto _background-gray-20 _padding-x-1 _display-inline-block" style="max-width: 250px; height: 90px;">
    This is an example using the <code>._overflow-auto</code> utility on an element with fixed width and height dimensions. The content of this div will scroll vertically.
</div> 
<div class="_overflow-hidden _background-gray-20 _margin-top-1 _padding-x-1 _display-inline-block" style="max-width: 250px; height: 90px;">
    This is an example using the <code>._overflow-hidden</code> utility on an element with fixed width and height dimensions. The overflow content of this div will be hidden.
</div> 
</i-tab>
<i-tab type="html">

~~~html
<div class="_overflow-auto">...</div>
~~~
~~~html
<div class="_overflow-hidden">...</div>
~~~

</i-tab>
</i-code>
