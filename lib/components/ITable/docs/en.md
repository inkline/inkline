---
title: Tables
description: Documentation and examples for opt-in styling of tables with Inkline. 
---

<script setup>
import * as examples from '../examples';
</script>

# Tables

## Documentation and examples for opt-in styling of tables with Inkline. 

### Basic Example
Using the most basic table markup, here’s how tables look in Inkline. All table styles are inherited in Inkline, meaning any nested tables will be styled in the same manner as the parent.

<example :component="examples.ITableBasicExample" :html="examples.ITableBasicExampleHTML"></example>

<i-alert color="info" class="_margin-top:1">
    <template #icon><i-icon name="ink-info" class="h4"></i-icon></template>
    <p>If your tables require more features such as sorting, filtering and rendering, you might want to take a look at the <router-link :to="{ name: 'docs-components-datatable' }">Datatable</router-link> component.</p>
</i-alert>


### Border Variant
Add the `border` property for borders on all sides of the table and table cells.

<example :component="examples.ITableBorderedExample" :html="examples.ITableBorderedExampleHTML"></example>

### Striped Variant
Add the `striped` property to add zebra-striping to any table row within the table body.

<example :component="examples.ITableStripedExample" :html="examples.ITableStripedExampleHTML"></example>

### Hoverable Variant
Add the `hover` property to enable a hover state on table rows within a `<tbody>`.

<example :component="examples.ITableHoverExample" :html="examples.ITableHoverExampleHTML"></example>

### Responsive Table
Enable responsiveness by adding the `responsive` property. Responsive tables scroll horizontally on small devices. When viewing on anything larger, you will not see any difference in these tables.

You can target specific responsive breakpoints by setting a value to the `responsive` property: `responsive="<breakpoint>"`, where breakpoint is one of `xs`, `sm`, `md`, `lg` or `xl`.

<example :component="examples.ITableResponsiveExample" :html="examples.ITableResponsiveExampleHTML"></example>

### Color Variants
Tables can be themed using the `color` property. You can use colors such as `light`, `dark`, `primary`, `secondary`, `info`, `success`, `warning`, and `danger`. You can set a variant for the table as a whole or individual table elements. By default, tables have the `light` variant. You can use a variation of any of the above classes to create the table design you need.

<example :component="examples.ITableColorVariantsExample" :html="examples.ITableColorVariantsExampleHTML"></example>
