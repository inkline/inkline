# Clearfix Utility
Use the clearfix utility to clear floated content within a container. { .lead }

### Helper Class
You can easily clear floats by adding the `._clearfix` helper class to the parent element.

In the following example, without adding the clearfix helper, the wrapping div would display the two buttons on separate lines, which would cause a broken layout.

<i-code-preview title="Clearfix Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="_clearfix _background-gray-40 _rounded">
    <i-button class="_float-left _margin-bottom-0">Floating Left Button</i-button>
    <i-button class="_float-right _margin-bottom-0">Floating Right Button</i-button>
</div>

<template slot="html">

~~~html
<div class="_clearfix">
    <i-button class="_float-left">Floating Left Button</i-button>
    <i-button class="_float-right">Floating Right Button</i-button>
</div>
~~~

</template>
</i-code-preview>

### Stylus Mixin
The clearfix utility is also available as a Stylus Mixin.

~~~stylus
@require '~@inkline/inkline/src/css/mixins/_clearfix'

.element
    -clearfix()
~~~
