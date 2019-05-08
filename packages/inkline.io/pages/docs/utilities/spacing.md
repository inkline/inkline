# Spacing Utilities
You can use a wide range of responsive margin and padding utility classes to modify an element’s appearance. {.lead}

### Notation

Spacing utilities that apply to all breakpoints, from `xs` to `xl`, have no breakpoint abbreviation in them and are not bound by a media query.

The classes are named using the format `._{property}-{sides}-{size}` for targeting all breakpoints and `._{property}-{sides}-{breakpoint}-{size}` for responsive spacing utilities.

Where *property* is one of:
- `margin`
- `padding`

Where *sides* is one of:
- `top` for top `margin` or `padding`
- `right` for right `margin` or `padding`
- `bottom` for bottom `margin` or `padding`
- `left` for left `margin` or `padding`
- `x` for horizontal (left and right) `margin` or `padding`
- `y` from vertical (top and bottom) `margin` or `padding`
- blank for classes that set a `margin` or `padding` on all 4 sides

Where *size* is one of:
- `0` for eliminating `margin` or `padding`
- `1` for classes setting `margin` or `padding` to `--spacer * 1`
- `2` for classes setting `margin` or `padding` to `--spacer * 2`
- `3` for classes setting `margin` or `padding` to `--spacer * 3`
- `4` for classes setting `margin` or `padding` to `--spacer * 4`
- `5` for classes setting `margin` or `padding` to `--spacer * 5`
- `6` for classes setting `margin` or `padding` to `--spacer * 6`
- `7` for classes setting `margin` or `padding` to `--spacer * 7`
- `8` for classes setting `margin` or `padding` to `--spacer * 8`
- `1-2` for classes setting `margin` or `padding` to `--spacer * 1/2`
- `1-3` for classes setting `margin` or `padding` to `--spacer * 1/3`
- `2-3` for classes setting `margin` or `padding` to `--spacer * 2/3`
- `1-4` for classes setting `margin` or `padding` to `--spacer * 1/4`
- `3-4` for classes setting `margin` or `padding` to `--spacer * 3/4`
- `auto` for classes setting `margin` or `padding` to `auto`

You can add more sizes by adding entries to the `--spacers` stylus variable.


### Examples
Here are some examples of these utility classes:

~~~html
<div class="_margin-top-1"></div>
<div class="_margin-right-1-2"></div>
<div class="_margin-bottom-lg-3-4"></div>
<div class="_margin-left-xs-2"></div>
~~~

~~~html
<div class="_padding-top-2"></div>
<div class="_padding-right-3-4"></div>
<div class="_padding-bottom-xs-1-4"></div>
<div class="_padding-left-sm-2"></div>
~~~


### Horizontal Centering
You can set a `left` and `right` margin using the `x` side parameter, such as `._margin-x-auto`. The `._margin-x-auto` class is useful for horizontally centering fixed-width block level content.

<i-code-preview title="Horizontal Centering Utility Example" link="https://github.com/inkline/inkline/tree/master/src/css/helpers">

<div class="_width-50 _margin-x-auto _padding-1 _background-gray-20 _text-center">Horizontally Centered</div>

<template slot="html">

~~~html
<div class="_margin-x-auto">Horizontally Centered</div>
~~~

</template>
</i-code-preview>
