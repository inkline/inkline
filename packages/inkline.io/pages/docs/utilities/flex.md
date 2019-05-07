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
- `._display-xs-flex`
- `._display-xs-inline-flex`
- `._display-sm-flex`
- `._display-sm-inline-flex`
- `._display-md-flex`
- `._display-md-inline-flex`
- `._display-lg-flex`
- `._display-lg-inline-flex`
- `._display-xl-flex`
- `._display-xl-inline-flex`

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
- `._flex-direction-xs-row`
- `._flex-direction-xs-row-reverse`
- `._flex-direction-xs-column`
- `._flex-direction-xs-column-reverse`
- `._flex-direction-sm-row`
- `._flex-direction-sm-row-reverse`
- `._flex-direction-sm-column`
- `._flex-direction-sm-column-reverse`
- `._flex-direction-md-row`
- `._flex-direction-md-row-reverse`
- `._flex-direction-md-column`
- `._flex-direction-md-column-reverse`
- `._flex-direction-lg-row`
- `._flex-direction-lg-row-reverse`
- `._flex-direction-lg-column`
- `._flex-direction-lg-column-reverse`
- `._flex-direction-xl-row`
- `._flex-direction-xl-row-reverse`
- `._flex-direction-xl-column`
- `._flex-direction-xl-column-reverse`


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
- `._justify-content-xs-start`
- `._justify-content-xs-end`
- `._justify-content-xs-center`
- `._justify-content-xs-space-between`
- `._justify-content-xs-space-around`
- `._justify-content-sm-start`
- `._justify-content-sm-end`
- `._justify-content-sm-center`
- `._justify-content-sm-space-between`
- `._justify-content-sm-space-around`
- `._justify-content-md-start`
- `._justify-content-md-end`
- `._justify-content-md-center`
- `._justify-content-md-space-between`
- `._justify-content-md-space-around`
- `._justify-content-lg-start`
- `._justify-content-lg-end`
- `._justify-content-lg-center`
- `._justify-content-lg-space-between`
- `._justify-content-lg-space-around`
- `._justify-content-xl-start`
- `._justify-content-xl-end`
- `._justify-content-xl-center`
- `._justify-content-xl-space-between`
- `._justify-content-xl-space-around`

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
- `._align-items-xs-start`
- `._align-items-xs-end`
- `._align-items-xs-center`
- `._align-items-xs-baseline`
- `._align-items-xs-stretch`
- `._align-items-sm-start`
- `._align-items-sm-end`
- `._align-items-sm-center`
- `._align-items-sm-baseline`
- `._align-items-sm-stretch`
- `._align-items-md-start`
- `._align-items-md-end`
- `._align-items-md-center`
- `._align-items-md-baseline`
- `._align-items-md-stretch`
- `._align-items-lg-start`
- `._align-items-lg-end`
- `._align-items-lg-center`
- `._align-items-lg-baseline`
- `._align-items-lg-stretch`
- `._align-items-xl-start`
- `._align-items-xl-end`
- `._align-items-xl-center`
- `._align-items-xl-baseline`
- `._align-items-xl-stretch`

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

Flexbox align items utilities can be applied responsively using the following helper classes:

- `._align-self-start`
- `._align-self-end`
- `._align-self-center`
- `._align-self-baseline`
- `._align-self-stretch`
- `._align-self-xs-start`
- `._align-self-xs-end`
- `._align-self-xs-center`
- `._align-self-xs-baseline`
- `._align-self-xs-stretch`
- `._align-self-sm-start`
- `._align-self-sm-end`
- `._align-self-sm-center`
- `._align-self-sm-baseline`
- `._align-self-sm-stretch`
- `._align-self-md-start`
- `._align-self-md-end`
- `._align-self-md-center`
- `._align-self-md-baseline`
- `._align-self-md-stretch`
- `._align-self-lg-start`
- `._align-self-lg-end`
- `._align-self-lg-center`
- `._align-self-lg-baseline`
- `._align-self-lg-stretch`
- `._align-self-xl-start`
- `._align-self-xl-end`
- `._align-self-xl-center`
- `._align-self-xl-baseline`
- `._align-self-xl-stretch`
