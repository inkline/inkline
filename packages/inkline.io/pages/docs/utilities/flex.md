# Flex Utilities
Use flexbox utilities to modify the layout, alignment, and sizing of components and more. { .lead }

### Flex Behavior
Apply `display: flex` using CSS or the `._display-flex` helper to create a flexbox container and transform direct children elements into flex items. 

<i-code-preview title="Flexbox Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex">I'm a flexbox container</div>

<template slot="html">

~~~html
<div class="_display-flex">I'm a flexbox container</div>
~~~

</template>
</i-code-preview>

<i-code-preview title="Inline Flexbox Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-inline-flex">I'm an inline flexbox container</div>

<template slot="html">

~~~html
<div class="_display-inline-flex">I'm an inline flexbox container</div>
~~~

</template>
</i-code-preview>

Flexbox utilities can be applied responsively using the following helper classes:

- `._display-flex`
- `._display-inline-flex`
- `._display-{xs|sm|md|lg|xl}-flex`
- `._display-{xs|sm|md|lg|xl}-inline-flex`

### Flex Direction
Set the direction of flex items in a flex container with direction utilities. The browser default is `flex-direction: row`, therefore the row helper won't be always necessary. However, when targeting various screen sizes, you may encounter situations where you needed to explicitly set this value.

#### Row Direction
Setting a row direction will cause the flexbox items to flow horizontally.

<i-code-preview title="Flexbox Row Direction Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex _flex-direction-row _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
</div>

<div class="flexbox-preview _display-flex _flex-direction-row-reverse">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex _flex-direction-row">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
</div>
~~~

~~~html
<div class="_display-flex _flex-direction-row-reverse">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
</div>
~~~

</template>
</i-code-preview>

#### Column Direction
Setting a column direction will cause the flexbox items to flow vertically.

<i-code-preview title="Flexbox Column Direction Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex _flex-direction-column _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
</div>

<div class="flexbox-preview _display-flex _flex-direction-column-reverse">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex _flex-direction-column">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
</div>
~~~

~~~html
<div class="_display-flex _flex-direction-column-reverse">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
</div>
~~~

</template>
</i-code-preview>


Flexbox direction utilities can be applied responsively using the following helper classes:

- `._flex-direction-row`
- `._flex-direction-row-reverse`
- `._flex-direction-column`
- `._flex-direction-column-reverse`
- `._flex-direction-{xs|sm|md|lg|xl}-row`
- `._flex-direction-{xs|sm|md|lg|xl}-row-reverse`
- `._flex-direction-{xs|sm|md|lg|xl}-column`
- `._flex-direction-{xs|sm|md|lg|xl}-column-reverse`


### Justify Content
Use `justify-content` utilities on flexbox containers to change the alignment of flex items on the main axis (the x-axis if `flex-direction: row`, y-axis if `flex-direction: column`).

<i-code-preview title="Flexbox Justify Content Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex _justify-content-start _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>

<div class="flexbox-preview _display-flex _justify-content-center _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>

<div class="flexbox-preview _display-flex _justify-content-end _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>

<div class="flexbox-preview _display-flex _justify-content-space-between _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>

<div class="flexbox-preview _display-flex _justify-content-space-around">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>


<template slot="html">

~~~html
<div class="_display-flex _justify-content-start">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex _justify-content-center">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex _justify-content-end">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex _justify-content-space-between">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex _justify-content-space-around">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~

</template>
</i-code-preview>

Flexbox justify content utilities can be applied responsively using the following helper classes:

- `._justify-content-start`
- `._justify-content-end`
- `._justify-content-center`
- `._justify-content-space-between`
- `._justify-content-space-around`
- `._justify-content-{xs|sm|md|lg|xl}-start`
- `._justify-content-{xs|sm|md|lg|xl}-end`
- `._justify-content-{xs|sm|md|lg|xl}-center`
- `._justify-content-{xs|sm|md|lg|xl}-space-between`
- `._justify-content-{xs|sm|md|lg|xl}-space-around`

### Align Items
Use `align-items` utilities on flexbox containers to change the alignment of flex items on the secondary axis (the y-axis if `flex-direction: row`, x-axis if `flex-direction: column`).

<i-code-preview title="Flexbox Align Items Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview -tall _display-flex _align-items-start _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>

<div class="flexbox-preview -tall _display-flex _align-items-center _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>

<div class="flexbox-preview -tall _display-flex _align-items-end _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>

<div class="flexbox-preview -tall _display-flex _align-items-baseline _margin-bottom-1">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>

<div class="flexbox-preview -tall _display-flex _align-items-stretch">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>


<template slot="html">

~~~html
<div class="_display-flex _align-items-start">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex _align-items-center">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex _align-items-end">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex _align-items-baseline">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex _align-items-stretch">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~

</template>
</i-code-preview>

Flexbox align items utilities can be applied responsively using the following helper classes:

- `._align-items-start`
- `._align-items-end`
- `._align-items-center`
- `._align-items-baseline`
- `._align-items-stretch`
- `._align-items-{xs|sm|md|lg|xl}-start`
- `._align-items-{xs|sm|md|lg|xl}-end`
- `._align-items-{xs|sm|md|lg|xl}-center`
- `._align-items-{xs|sm|md|lg|xl}-baseline`
- `._align-items-{xs|sm|md|lg|xl}-stretch`

### Align Self
Use `align-self` utilities on a flexbox item to change the alignment of the item on the secondary axis (the y-axis if `flex-direction: row`, x-axis if `flex-direction: column`).

<i-code-preview title="Flexbox Align Self Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview -tall _display-flex _align-items-stretch _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview _align-self-start">Aligned Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview -tall _display-flex _align-items-stretch _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview _align-self-center">Aligned Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview -tall _display-flex _align-items-stretch _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview _align-self-end">Aligned Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview -tall _display-flex _align-items-stretch _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview _align-self-baseline">Aligned Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview -tall _display-flex _align-items-stretch">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview _align-self-stretch">Aligned Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>


<template slot="html">

~~~html
<div class="_display-flex">
    <div>Flex Item</div>
    <div class="_align-self-start">Aligned Flex Item</div>
    <div>Flex Item</div>
</div>
~~~
~~~html
<div class="_display-flex">
    <div>Flex Item</div>
    <div class="_align-self-center">Aligned Flex Item</div>
    <div>Flex Item</div>
</div>
~~~
~~~html
<div class="_display-flex">
    <div>Flex Item</div>
    <div class="_align-self-end">Aligned Flex Item</div>
    <div>Flex Item</div>
</div>
~~~
~~~html
<div class="_display-flex">
    <div>Flex Item</div>
    <div class="_align-self-baseline">Aligned Flex Item</div>
    <div>Flex Item</div>
</div>
~~~
~~~html
<div class="_display-flex">
    <div>Flex Item</div>
    <div class="_align-self-stretch">Aligned Flex Item</div>
    <div>Flex Item</div>
</div>
~~~

</template>
</i-code-preview>

Flexbox align self utilities can be applied responsively using the following helper classes:

- `._align-self-start`
- `._align-self-end`
- `._align-self-center`
- `._align-self-baseline`
- `._align-self-stretch`
- `._align-self-{xs|sm|md|lg|xl}-start`
- `._align-self-{xs|sm|md|lg|xl}-end`
- `._align-self-{xs|sm|md|lg|xl}-center`
- `._align-self-{xs|sm|md|lg|xl}-baseline`
- `._align-self-{xs|sm|md|lg|xl}-stretch`

### Fill
Use `._flex-fill` utilities on a on a series of flexbox items to force them into widths equal to their content.

<i-code-preview title="Flexbox Fill Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex">
    <div class="flexbox-preview _flex-fill">Flex Item with a lot of content</div>
    <div class="flexbox-preview _flex-fill">Flex Item</div>
    <div class="flexbox-preview _flex-fill">Flex Item</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex">
    <div class="_flex-fill">Flex Item with a lot of content</div>
    <div class="_flex-fill">Flex Item</div>
    <div class="_flex-fill">Flex Item</div>
</div>
~~~

</template>
</i-code-preview>

Flexbox fill utilities can be applied responsively using the following helper classes:

- `._flex-fill`
- `._flex-{xs|sm|md|lg|xl}-fill`

### Grow and shrink
Use `._flex-grow-1` and `_flex-grow-0` utilities to toggle a flex item’s ability to grow to fill available space. In the example below. A value of `1` uses all available space it can, while allowing the remaining two flex items their necessary space.

<i-code-preview title="Flexbox Grow Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex">
    <div class="flexbox-preview _flex-grow-1">Flex Grow 1 Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex">
    <div class="_flex-grow-1">Flex Grow 1 Item</div>
    <div>Flex Item</div>
    <div>Flex Item</div>
</div>
~~~

</template>
</i-code-preview>

Use the `._flex-shrink-1` and `._flex-shrink-0` utilities to toggle a flex item’s ability to shrink if necessary. This can be used together with a `width: 100%` div to make some flex items cover as little space as possible.

<i-code-preview title="Flexbox Shrink Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex">
    <div class="flexbox-preview _width-100">Flex Item</div>
    <div class="flexbox-preview _flex-shrink-1">Flex Shrink</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex">
    <div class="_width-100">Flex Item</div>
    <div class="_flex-shrink-1">Flex Shrink</div>
</div>
~~~

</template>
</i-code-preview>

Flexbox shrink and grow utilities can be applied responsively using the following helper classes:

- `._flex-grow-0`
- `._flex-grow-1`
- `._flex-shrink-0`
- `._flex-shrink-1`
- `._flex-{xs|sm|md|lg|xl}-grow-0`
- `._flex-{xs|sm|md|lg|xl}-grow-1`
- `._flex-{xs|sm|md|lg|xl}-shrink-0`
- `._flex-{xs|sm|md|lg|xl}-shrink-1`


### Auto Margins
When you mix flex alignments with auto margins you can obtain some pretty unique and useful layouts.

<i-code-preview title="Flexbox Auto Margins Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex _margin-bottom-1">
    <div class="flexbox-preview _margin-right-auto">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview _display-flex _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview _margin-left-auto">Flex Item</div>
</div>

<div class="flexbox-preview -tall-2 _display-flex _flex-direction-column _margin-bottom-1">
    <div class="flexbox-preview _margin-bottom-auto">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>


<div class="flexbox-preview -tall-2 _display-flex _flex-direction-column">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview _margin-top-auto">Flex Item</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex">
    <div class="_margin-right-auto">Flex Item</div>
    <div>Flex Item</div>
    <div>Flex Item</div>
</div>
~~~
~~~html
<div class="_display-flex">
    <div>Flex Item</div>
    <div>Flex Item</div>
    <div class="_margin-left-auto">Flex Item</div>
</div>
~~~
~~~html
<div class="_display-flex _flex-direction-column">
    <div class="_margin-bottom-auto">Flex Item</div>
    <div>Flex Item</div>
    <div>Flex Item</div>
</div>
~~~
~~~html
<div class="_display-flex _flex-direction-column">
    <div>Flex Item</div>
    <div>Flex Item</div>
    <div class="_margin-top-auto">Flex Item</div>
</div>
~~~

</template>
</i-code-preview>

### Wrapping
Change how flex items wrap in a flex container. To have wrapping disabled (browser default) use `._flex-nowrap`. To enable wrapping, use `._flex-wrap`, or reverse wrapping with `._flex-wrap-reverse`.

<i-code-preview title="Flexbox No Wrap Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex _flex-nowrap" style="width: 180px;">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex _flex-nowrap" style="width: 180px;">
    ...
</div>
~~~

</template>
</i-code-preview>

<i-code-preview title="Flexbox Wrap Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex _flex-wrap _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview _display-flex _flex-wrap-reverse">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex _flex-wrap">
    ...
</div>
~~~

~~~html
<div class="_display-flex _flex-wrap-reverse">
    ...
</div>
~~~

</template>
</i-code-preview>

Flexbox shrink and grow utilities can be applied responsively using the following helper classes:

- `._flex-wrap`
- `._flex-wrap-reverse`
- `._flex-nowrap`
- `._flex-{xs|sm|md|lg|xl}-wrap`
- `._flex-{xs|sm|md|lg|xl}-wrap-reverse`
- `._flex-{xs|sm|md|lg|xl}-nowrap`

### Order
You can change the order of flex items with a handful of order utilities. You can use `._order-first` to make an item first or `._order-last` to make an item last. You can use `_order-{value}` (where value can be a number from `1` to `12`) to change the order of elements to a specific position.

<i-code-preview title="Flexbox Order Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview _display-flex">
    <div class="flexbox-preview">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview _order-first">Flex Item 3</div>
</div>

<div class="flexbox-preview _display-flex">
    <div class="flexbox-preview _order-last">Flex Item 1</div>
    <div class="flexbox-preview">Flex Item 2</div>
    <div class="flexbox-preview">Flex Item 3</div>
</div>

<div class="flexbox-preview _display-flex">
    <div class="flexbox-preview _order-3">Flex Item 1</div>
    <div class="flexbox-preview _order-2">Flex Item 2</div>
    <div class="flexbox-preview _order-1">Flex Item 3</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex">
    <div>Flex Item 1</div>
    <div>Flex Item 2</div>
    <div class="_order-first">Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex">
    <div class="_order-last">Flex Item 1</div>
    <div>Flex Item 2</div>
    <div>Flex Item 3</div>
</div>
~~~
~~~html
<div class="_display-flex">
    <div class="_order-3">Flex Item 1</div>
    <div class="_order-2">Flex Item 2</div>
    <div class="_order-1">Flex Item 3</div>
</div>
~~~

</template>
</i-code-preview>


Flexbox shrink and grow utilities can be applied responsively using the following helper classes:

- `._order-first`
- `._order-last`
- `._order-{1-12}`<span/>
- `._order-{xs|sm|md|lg|xl}-first`
- `._order-{xs|sm|md|lg|xl}-last`
- `._order-{xs|sm|md|lg|xl}-{1-12}`<span/>


### Align Content
Use `align-content` utilities on flexbox containers to align flex content on the secondary axis. You can use one of `start`, `end`, `center`, `between`, `around`, or `stretch`.

For demo purposes, the examples are enforced to have `flex-wrap: wrap` using `._flex-wrap` and have an increased `height` and number of items.

<i-code-preview title="Flexbox Align Content Utility" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="flexbox-preview -tall-2 _display-flex _align-content-start _flex-wrap _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview -tall-2 _display-flex _align-content-center _flex-wrap _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview -tall-2 _display-flex _align-content-end _flex-wrap _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview -tall-2 _display-flex _align-content-space-between _flex-wrap _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview -tall-2 _display-flex _align-content-space-around _flex-wrap _margin-bottom-1">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<div class="flexbox-preview -tall-2 _display-flex _align-content-stretch _flex-wrap">
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
    <div class="flexbox-preview">Flex Item</div>
</div>

<template slot="html">

~~~html
<div class="_display-flex _align-content-start">
    ...
</div>
~~~
~~~html
<div class="_display-flex _align-content-center">
    ...
</div>
~~~
~~~html
<div class="_display-flex _align-content-end">
    ...
</div>
~~~
~~~html
<div class="_display-flex _align-content-space-between">
    ...
</div>
~~~
~~~html
<div class="_display-flex _align-content-space-around">
    ...
</div>
~~~
~~~html
<div class="_display-flex _align-content-stretch">
    ...
</div>
~~~

</template>
</i-code-preview>


Flexbox shrink and grow utilities can be applied responsively using the following helper classes:

- `._align-content-start`
- `._align-content-center`
- `._align-content-end`
- `._align-content-space-between`
- `._align-content-space-around`
- `._align-content-space-stretch`
- `._align-content-{xs|sm|md|lg|xl}-start`
- `._align-content-{xs|sm|md|lg|xl}-center`
- `._align-content-{xs|sm|md|lg|xl}-end`
- `._align-content-{xs|sm|md|lg|xl}-space-between`
- `._align-content-{xs|sm|md|lg|xl}-space-around`
- `._align-content-{xs|sm|md|lg|xl}-space-stretch`
