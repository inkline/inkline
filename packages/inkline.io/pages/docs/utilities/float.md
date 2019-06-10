# Float Utilities
## You can use the float utility on any element, for any breakpoint. {.lead}

### Example
You can use the float utility classes to float an element to the left or right, or to disable floating, responsively. The utilities use the same viewport breakpoints as the grid system. 

<i-code-preview title="Float Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

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

<template slot="html">

~~~html
<div class="_float-left">I'm floating left.</div>
~~~
~~~html
<div class="_float-right">I'm floating right.</div>
~~~
~~~html
<div class="_float-none">I'm not floating.</div>
~~~

</template>
</i-code-preview>

<i-alert variant="info" class="_margin-top-1">
    <template slot="icon"><i class="inkline-icon -info"></i></template>
    <p>Float utilities do not affect flex items.</p>
</i-alert>



### Responsive
Float utilities can be applied responsively using the following helper classes:

- `._float-{xs|sm|md|lg|xl}-left`
- `._float-{xs|sm|md|lg|xl}-right`
- `._float-{xs|sm|md|lg|xl}-none`


<i-code-preview title="Responsive Float Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="_position-relative">
    <div class="_float-xs-right">I'm floating right on extra small screens.</div>
</div> 
<br/>
<div class="_position-relative">
    <div class="_float-sm-right">I'm floating right on small screens.</div>
</div> 
<br/>
<div class="_position-relative">
    <div class="_float-md-right">I'm floating right on medium screens.</div>
</div> 
<br/>
<div class="_position-relative">
    <div class="_float-lg-right">I'm floating right on large screens.</div>
</div> 
<br/>
<div class="_position-relative">
    <div class="_float-xl-right">I'm floating right on extra large screens.</div>
</div>
<br/> 

<template slot="html">

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

</template>
</i-code-preview>
