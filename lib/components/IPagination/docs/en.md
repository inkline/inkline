---
title: Pagination
description: Pagination provides navigation for large series of related content.
---

<script setup>
import * as examples from '../examples';
</script>


# Pagination
## Pagination provides navigation for large series of related content.

### Basic Example
Pagination items are automatically generated based on the `items-total` and the `items-per-page` properties. The currently selected page is accessible using `v-model`.

<example :component="examples.IPaginationBasicExample" :html="examples.IPaginationBasicExampleHTML" :js="examples.IPaginationBasicExampleJS"></example>

### Color Variants
Inkline comes with two predefined pagination styles. You can set the color style of the `<i-pagination>` component using the `color` property, which can be `light` or `dark`. By default, pagination uses the `light` color.

<example :component="examples.IPaginationColorVariantsExample" :html="examples.IPaginationColorVariantsExampleHTML" :js="examples.IPaginationColorVariantsExampleJS"></example>

### Size Variants
You're able to use the `size` property to control the size of your pagination items, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<example :component="examples.IPaginationSizeVariantsExample" :html="examples.IPaginationSizeVariantsExampleHTML" :js="examples.IPaginationSizeVariantsExampleJS"></example>

### Limit
You're able to use the `limit` modifier to control how many items to show besides the first and last items, including the two ellipsis pagination items. 

Make sure this value is an `odd number` to have the active item centered.

<example :component="examples.IPaginationLimitExample" :html="examples.IPaginationLimitExampleHTML" :js="examples.IPaginationLimitExampleJS"></example>

To make things even better, you can responsively control the number of items at each breakpoint, to make sure your design always looks great.

<example :component="examples.IPaginationLimitResponsiveExample" :html="examples.IPaginationLimitResponsiveExampleHTML" :js="examples.IPaginationLimitResponsiveExampleJS"></example>


### Quick Links
You're able to use the `quickLink` property to allow the user to click the `…` item to quickly jump through pages, a number of items equal to `limit` at a time. 

<example :component="examples.IPaginationQuickLinksExample" :html="examples.IPaginationQuickLinksExampleHTML" :js="examples.IPaginationQuickLinksExampleJS"></example>
