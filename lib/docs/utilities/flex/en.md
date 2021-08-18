---
title: Flex Utilities
description: Use flexbox utilities to modify the layout, alignment, and sizing of components and more. 
---

<script setup>
import * as examples from './examples';
</script>

# Flex Utilities

## Use flexbox utilities to modify the layout, alignment, and sizing of components and more. 

### Flex Behavior
Apply `display: flex` using CSS or the `._display-flex` helper to create a flexbox container and transform direct children elements into flex items. 

<example type="flex" :component="examples.FlexExample" :html="examples.FlexExampleHTML"></example>

<example type="flex" :component="examples.FlexInlineFlexExample" :html="examples.FlexInlineFlexExampleHTML"></example>

Flexbox utilities can also be applied responsively. Here are the available helper classes::

- `._display:flex`
- `._display:inline-flex`
- `._{xs|sm|md|lg|xl|xxl}:display:flex`
- `._{xs|sm|md|lg|xl|xxl}:display:inline-flex`

### Flex Direction
Set the direction of flex items in a flex container with direction utilities. The browser default is `flex-direction: row`, therefore the row helper won't be always necessary. However, when targeting various screen sizes, you may encounter situations where you needed to explicitly set this value.

#### Row Direction
Setting a row direction will cause the flexbox items to flow horizontally.

<example type="flex" :component="examples.FlexDirectionRowExample" :html="examples.FlexDirectionRowExampleHTML"></example>

#### Column Direction
Setting a column direction will cause the flexbox items to flow vertically.

<example type="flex" :component="examples.FlexDirectionColumnExample" :html="examples.FlexDirectionColumnExampleHTML"></example>

Flexbox direction utilities can also be applied responsively. Here are the available helper classes::

- `._flex-direction:row`
- `._flex-direction:row-reverse`
- `._flex-direction:column`
- `._flex-direction:column-reverse`
- `._{xs|sm|md|lg|xl|xxl}:flex-direction:row`
- `._{xs|sm|md|lg|xl|xxl}:flex-direction:row-reverse`
- `._{xs|sm|md|lg|xl|xxl}:flex-direction:column`
- `._{xs|sm|md|lg|xl|xxl}:flex-direction:column-reverse`

### Justify Content
Use `justify-content` utilities on flexbox containers to change the alignment of flex items on the main axis (the x-axis if `flex-direction: row`, y-axis if `flex-direction: column`).

<example type="flex" :component="examples.FlexJustifyContentExample" :html="examples.FlexJustifyContentExampleHTML"></example>

Flexbox justify content utilities can also be applied responsively. Here are the available helper classes::

- `._justify-content:start` or `._justify-content:flex-start`
- `._justify-content:end` or `._justify-content:flex-end`
- `._justify-content:center`
- `._justify-content:space-between`
- `._justify-content:space-around`
- `._{xs|sm|md|lg|xl|xxl}:justify-content:start`
- `._{xs|sm|md|lg|xl|xxl}:justify-content:end`
- `._{xs|sm|md|lg|xl|xxl}:justify-content:center`
- `._{xs|sm|md|lg|xl|xxl}:justify-content:space-between`
- `._{xs|sm|md|lg|xl|xxl}:justify-content:space-around`

### Align Items
Use `_align-items` utilities on flexbox containers to change the alignment of flex items on the secondary axis (the y-axis if `flex-direction: row`, x-axis if `flex-direction: column`). 

<example type="flex" :component="examples.FlexAlignItemsExample" :html="examples.FlexAlignItemsExampleHTML"></example>

**Note:** The wrappers of the items above have a fixed height.

Flexbox align items utilities can also be applied responsively. Here are the available helper classes::

- `._align-items:start` or `._align-items:flex-start`
- `._align-items:end` or `._align-items:flex-end`
- `._align-items:center`
- `._align-items:baseline`
- `._align-items:stretch`
- `._align-items-{xs|sm|md|lg|xl|xxl}-start`
- `._align-items-{xs|sm|md|lg|xl|xxl}-end`
- `._align-items-{xs|sm|md|lg|xl|xxl}-center`
- `._align-items-{xs|sm|md|lg|xl|xxl}-baseline`
- `._align-items-{xs|sm|md|lg|xl|xxl}-stretch`

### Align Self
Use `align-self` utilities on a flexbox item to change the alignment of the item on the secondary axis (the y-axis if `flex-direction: row`, x-axis if `flex-direction: column`).

<example type="flex -tall" :component="examples.FlexAlignSelfExample" :html="examples.FlexAlignSelfExampleHTML"></example>

Flexbox align self utilities can also be applied responsively. Here are the available helper classes::

- `._align-self:start` or `._align-self:flex-start`
- `._align-self:end` or `._align-self:flex-end`
- `._align-self:center`
- `._align-self:baseline`
- `._align-self:stretch`
- `._{xs|sm|md|lg|xl|xxl}:align-self:start`
- `._{xs|sm|md|lg|xl|xxl}:align-self:end`
- `._{xs|sm|md|lg|xl|xxl}:align-self:center`
- `._{xs|sm|md|lg|xl|xxl}:align-self:baseline`
- `._{xs|sm|md|lg|xl|xxl}:align-self:stretch`


### Align Content
Use `align-content` utilities on flexbox containers to align flex content on the secondary axis. You can use one of `start`, `end`, `center`, `between`, `around`, or `stretch`.

For demonstration purposes, the examples below use `._flex-wrap:wrap`, an increased `height`, and large number of items.

<example type="flex -tall" :component="examples.FlexAlignContentExample" :html="examples.FlexAlignContentExampleHTML"></example>

Flexbox shrink and grow utilities can also be applied responsively. Here are the available helper classes::

- `._align-content:start` or `._align-content:flex-start`
- `._align-content:center` or `._align-content:flex-center`
- `._align-content:end`
- `._align-content:space-between`
- `._align-content:space-around`
- `._align-content:space-stretch`
- `._{xs|sm|md|lg|xl|xxl}:align-content:start`
- `._{xs|sm|md|lg|xl|xxl}:align-content:center`
- `._{xs|sm|md|lg|xl|xxl}:align-content:end`
- `._{xs|sm|md|lg|xl|xxl}:align-content:space-between`
- `._{xs|sm|md|lg|xl|xxl}:align-content:space-around`
- `._{xs|sm|md|lg|xl|xxl}:align-content:space-stretch`

### Fill
Use `._flex:fill` utilities on a on a series of flexbox items to force them into widths equal to their content.

<example type="flex" :component="examples.FlexFillExample" :html="examples.FlexFillExampleHTML"></example>

Flexbox fill utilities can also be applied responsively. Here are the available helper classes::

- `._flex:fill`
- `._{xs|sm|md|lg|xl|xxl}:flex:fill`

### Grow and shrink
Use `._flex-grow:1` and `_flex-grow:0` utilities to toggle a flex item’s ability to grow to fill available space. In the example below. A value of `1` uses all available space it can, while allowing the remaining two flex items their necessary space.

<example type="flex" :component="examples.FlexGrowExample" :html="examples.FlexGrowExampleHTML"></example>

Use the `._flex-shrink:1` and `._flex-shrink:0` utilities to toggle a flex item’s ability to shrink if necessary. This can be used together with a `width: 100%` div to make some flex items cover as little space as possible.

<example type="flex" :component="examples.FlexShrinkExample" :html="examples.FlexShrinkExampleHTML"></example>

Flexbox shrink and grow utilities can also be applied responsively. Here are the available helper classes::

- `._flex-grow:0`
- `._flex-grow:1`
- `._flex-shrink:0`
- `._flex-shrink:1`
- `._{xs|sm|md|lg|xl|xxl}:flex-grow:0`
- `._{xs|sm|md|lg|xl|xxl}:flex-grow:1`
- `._{xs|sm|md|lg|xl|xxl}:flex-shrink:0`
- `._{xs|sm|md|lg|xl|xxl}:flex-shrink:1`

### Auto Margins
When you mix flex alignments with auto margins you can obtain some pretty unique and useful layouts.

<example type="flex" :component="examples.FlexMarginAutoExample" :html="examples.FlexMarginAutoExampleHTML"></example>

### Wrapping
Change how flex items wrap in a flex container. To have wrapping disabled (browser default) use `._flex-wrap:nowrap`. To enable wrapping, use `._flex-wrap:wrap`, or reverse wrapping with `._flex-wrap:wrap-reverse`.

<example type="flex" :component="examples.FlexWrapExample" :html="examples.FlexWrapExampleHTML"></example>

Flexbox shrink and grow utilities can also be applied responsively. Here are the available helper classes::

- `._flex-wrap:wrap` or `_flex:wrap`
- `._flex-wrap:wrap-reverse` or `_flex:wrap-reverse`
- `._flex-wrap:nowrap` or `_flex:nowrap`
- `._{xs|sm|md|lg|xl|xxl}:flex-wrap:wrap`
- `._{xs|sm|md|lg|xl|xxl}:flex-wrap:wrap-reverse`
- `._{xs|sm|md|lg|xl|xxl}:flex-wrap:nowrap`

### Order
You can change the order of flex items with a handful of order utilities. You can use `._order:first` to make an item first or `._order:last` to make an item last. You can use `_order:{value}` (where value can be a number from `0` to `12`) to change the order of elements to a specific position.

<example type="flex" :component="examples.FlexOrderExample" :html="examples.FlexOrderExampleHTML"></example>

Flexbox shrink and grow utilities can also be applied responsively. Here are the available helper classes::

- `._order:first`
- `._order:last`
- `._order:{0-12}`
- `._{xs|sm|md|lg|xl|xxl}:order:first`
- `._{xs|sm|md|lg|xl|xxl}:order:last`
- `._{xs|sm|md|lg|xl|xxl}:order:{0-12}`
