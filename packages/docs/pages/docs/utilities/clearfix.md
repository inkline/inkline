---
title: Clearfix Utility
description: Use the clearfix utility to clear floated content within a container. 
---
### Helper Class
You can easily clear floats by adding the `._clearfix` helper class to the parent element.

In the following example, without adding the clearfix helper, the wrapping div would display the two buttons on separate lines, which would cause a broken layout.

<i-code title="Clearfix Utility">

<i-tab type="preview">
<div class="clearfix-preview _clearfix _rounded">
    <i-button class="_float-left">Floating Left Button</i-button>
    <i-button class="_float-right">Floating Right Button</i-button>
</div>
</i-tab>
<i-tab type="html">

~~~html
<div class="_clearfix">
    <i-button class="_float-left">Floating Left Button</i-button>
    <i-button class="_float-right">Floating Right Button</i-button>
</div>
~~~

</i-tab>
</i-code>

### Sass Mixin
The clearfix utility is also available as a Sass Mixin.

~~~scss
@require '~@inkline/inkline/src/css/mixins/_clearfix'

.element {
    @include clearfix;
}
~~~
