# Overflow Utilities
You can use the overflow utilities for deciding how content overflows an element.{.lead}

Overflow functionality is provided for two values by default, and they are not responsive.

<i-code-preview title="Overflow Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="_overflow-auto _background-gray-10 _padding-x-1 _display-inline-block" style="width: 250px; height: 100px;">

This is an example using the `._overflow-auto` utility on an element with fixed width and height dimensions. The content of this div will scroll vertically.

</div> 

<div class="_overflow-hidden _background-gray-10 _padding-x-1 _display-inline-block" style="width: 250px; height: 100px;">

This is an example using the `._overflow-hidden` utility on an element with fixed width and height dimensions. The overflow content of this div will be hidden.

</div> 

<template slot="html">

~~~html
<div class="_overflow-auto">...</div>
~~~
~~~html
<div class="_overflow-hidden">...</div>
~~~

</template>
</i-code-preview>
