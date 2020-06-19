---
title: Float Utilities
description: You can use the float utility on any element, for any breakpoint. 
---
### Example
You can use the float utility classes to float an element to the left or right, or to disable floating, responsively. The utilities use the same viewport breakpoints as the grid system. 

<i-code title="Float Utility Example">
<i-tab type="preview">
    <div class="_position-relative">
        <div class="_float-left">I'm floating left.</div>
    </div> 
    <br/>
    <div class="_position-relative">
        <div class="_float-right">I'm floating right.</div>
    </div>
    <br/>
    <div class="_position-relative">
        <div class="_float-none">I'm not floating.</div>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_float-left">I'm floating left.</div>
~~~
~~~html
<div class="_float-right">I'm floating right.</div>
~~~
~~~html
<div class="_float-none">I'm not floating.</div>
~~~

</i-tab>
</i-code>

<i-alert variant="info" class="_margin-top-1">
    <div class="_display-flex _align-items-center">
        <i class="inkline-icon -info _margin-right-1"></i> Float utilities do not affect flex items.
    </div>
</i-alert>


### Responsive
Float utilities can be applied responsively using the following helper classes:

- `._float-{xs|sm|md|lg|xl}-left`
- `._float-{xs|sm|md|lg|xl}-right`
- `._float-{xs|sm|md|lg|xl}-none`


<i-code title="Responsive Float Utility Example">
<i-tab type="preview">
    <div class="_position-relative">
        <div class="_float-xs-right">I'm floating right on extra small screens.</div>
    </div> 
    <br>
    <div class="_position-relative">
        <div class="_float-sm-right">I'm floating right on small screens.</div>
    </div> 
    <br>
    <div class="_position-relative">
        <div class="_float-md-right">I'm floating right on medium screens.</div>
    </div> 
    <br>
    <div class="_position-relative">
        <div class="_float-lg-right">I'm floating right on large screens.</div>
    </div> 
    <br>
    <div class="_position-relative">
        <div class="_float-xl-right">I'm floating right on extra large screens.</div>
    </div>
    <br>
</i-tab>
<i-tab type="html">

~~~html
<div class="_float-xs-right">I'm floating right on extra small screens.</div>
~~~
~~~html
<div class="_float-sm-right">I'm floating right on small screens.</div>
~~~
~~~html
<div class="_float-md-right">I'm floating right on medium screens.</div>
~~~
~~~html
<div class="_float-lg-right">I'm floating right on large screens.</div>
~~~
~~~html
<div class="_float-xl-right">I'm floating right on extra large screens.</div>
~~~

</i-tab>
</i-code>
