---
title: Spacing Utilities
description: You can use a wide range of responsive margin and padding utility classes to modify an element’s appearance. 
---

<script setup>
import * as examples from './examples';
</script>

# Spacing Utilities

## You can use a wide range of responsive margin and padding utility classes to modify an element’s appearance. 

The spacing utility classes are named using the following format:

- `._{property}:{size}`
- `._{property}-{sides}:{size}`
- `._{breakpoint}:{property}-{sides}:{size}`

Where *property* is one of:
- `margin`
- `padding`

Where *sides* is one of:
- `top` for top side
- `right` for right side
- `bottom` for bottom side
- `left` for left side
- `x` for horizontal (left and right) sides
- `y` from vertical (top and bottom) sides
- none for classes that set a `margin` or `padding` on all 4 sides

Where *size* is one of:
- `0` for eliminating `margin` or `padding`
- `1` for classes setting `margin` or `padding` to `$spacing * 1`
- `2` for classes setting `margin` or `padding` to `$spacing * 2`
- `3` for classes setting `margin` or `padding` to `$spacing * 3`
- `4` for classes setting `margin` or `padding` to `$spacing * 4`
- `5` for classes setting `margin` or `padding` to `$spacing * 5`
- `6` for classes setting `margin` or `padding` to `$spacing * 6`
- `7` for classes setting `margin` or `padding` to `$spacing * 7`
- `8` for classes setting `margin` or `padding` to `$spacing * 8`
- `1/2` for classes setting `margin` or `padding` to `$spacing * 1/2`
- `1/3` for classes setting `margin` or `padding` to `$spacing * 1/3`
- `2/3` for classes setting `margin` or `padding` to `$spacing * 2/3`
- `1/4` for classes setting `margin` or `padding` to `$spacing * 1/4`
- `3/4` for classes setting `margin` or `padding` to `$spacing * 3/4`
- `auto` for classes setting `margin` or `padding` to `auto`

And `breakpoint` is one of:
- `xs`
- `sm`
- `md`
- `lg`
- `xl`
- `xxl`

You can add more sizes by adding entries to the `$spacings` Sass variable.


### Basic Example
Here are some examples of these utility classes:

<example type="spacing -vertical" :component="examples.SpacingTopExample" :html="examples.SpacingTopExampleHTML"></example>

<example type="spacing -vertical" :component="examples.SpacingBottomExample" :html="examples.SpacingBottomExampleHTML"></example>

<example type="spacing" :component="examples.SpacingLeftExample" :html="examples.SpacingLeftExampleHTML"></example>

<example type="spacing" :component="examples.SpacingRightExample" :html="examples.SpacingRightExampleHTML"></example>

### Horizontal Centering
You can set a `left` and `right` margin using the `x` side parameter, such as `._margin-x:auto`. The `._margin-x:auto` class is useful for horizontally centering fixed-width block level content.

<example type="spacing" :component="examples.SpacingHorizontalCenterExample" :html="examples.SpacingHorizontalCenterExampleHTML"></example>
