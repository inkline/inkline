---
title: Grid
description: Inkline's grid system is modelled as a 12 columns layout using flexbox, with equally divided columns, separated by a small gutter. 
---

<script setup>
import * as containerExamples from '../examples';
import * as rowExamples from '../../IRow/examples';
import * as columnExamples from '../../IColumn/examples';
</script>

# Grid

## Inkline's grid system is modelled as a 12 columns layout using flexbox, with equally divided columns, separated by a small gutter. 
 
The grid system uses percentage widths, so that it is usable at any nesting level.

The grid system is defined using `<i-container>`, `<i-row>` and `<i-column>` components, with each one having specific responsive modifiers. Here's how it works:

- First, we define a row with a set of columns inside of it.
- Your content elements should be placed directly in a `<i-column>`, and only `<i-column>` should be placed directly inside an `<i-row>` component
- The column width takes a value of 1-12 at each responsive breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`).
- If the sum of `column` widths in a row is more than 12, then the overflowing column will start on a new line.

### Basic Example
Create basic grid layout using columns.

<example type="grid" :component="columnExamples.IColumnBasicExample" :html="columnExamples.IColumnBasicExampleHTML"></example>

### Grid Offset
Grid offsets are used to move a column to the right without creating an empty column next to it.

<example type="grid" :component="columnExamples.IColumnOffsetExample" :html="columnExamples.IColumnOffsetExampleHTML"></example>

You may need to use `offset="0"` and `offset-{breakpoint}="0"` to clear an offset. See this in action in the grid example below.

<example type="grid" :component="columnExamples.IColumnOffsetResetExample" :html="columnExamples.IColumnOffsetResetExampleHTML"></example>

### Grid Push / Pull
Code-wise, the columns have a different order.

<example type="grid" :component="columnExamples.IColumnPushPullExample" :html="columnExamples.IColumnPushPullExampleHTML"></example>

You may need to use `push="0"`, `push-{breakpoint}="0"`, `pull="0"`, `pull-{breakpoint}="0"` to clear a push or pull.

### Auto Width
The grid will automatically fit any number of auto sizing columns to a row.

<example type="grid" :component="columnExamples.IColumnAutoWidthExample" :html="columnExamples.IColumnAutoWidthExampleHTML"></example>

### Nested Grid
Inkline allows you to nest up to 12 columns inside a row. Row can also be nested inside any column, 
giving you virtually endless layout possibilities. You can place rows only inside a container or a column, 
while you can place columns only inside a row.

<example type="grid -nested-example" :component="columnExamples.IColumnNestedExample" :html="columnExamples.IColumnNestedExampleHTML"></example>

### Horizontal Alignment
You can align columns horizontally to the start, center, or end of a row.

#### `start` and `start-{breakpoint}`

<example type="grid" :component="rowExamples.IRowHorizontalAlignmentStartExample" :html="rowExamples.IRowHorizontalAlignmentStartExampleHTML"></example>

#### `center` and `center-{breakpoint}`

<example type="grid" :component="rowExamples.IRowHorizontalAlignmentCenterExample" :html="rowExamples.IRowHorizontalAlignmentCenterExampleHTML"></example>

#### `end` and `end-{breakpoint}`

<example type="grid" :component="rowExamples.IRowHorizontalAlignmentEndExample" :html="rowExamples.IRowHorizontalAlignmentEndExampleHTML"></example>

### Vertical Alignment
You can align columns vertically to the top, middle or bottom of the row.

#### `top` and `top-{breakpoint}`

<example type="grid -vertical-alignment-example" :component="rowExamples.IRowVerticalAlignmentTopExample" :html="rowExamples.IRowVerticalAlignmentTopExampleHTML"></example>

#### `middle` and `middle-{breakpoint}`

<example type="grid -vertical-alignment-example" :component="rowExamples.IRowVerticalAlignmentMiddleExample" :html="rowExamples.IRowVerticalAlignmentMiddleExampleHTML"></example>

#### `bottom` and `bottom-{breakpoint}`

<example type="grid -vertical-alignment-example" :component="rowExamples.IRowVerticalAlignmentBottomExample" :html="rowExamples.IRowVerticalAlignmentBottomExampleHTML"></example>

### Distribution
Distribute the spacing between the columns of a row.

#### `around` and `around-{breakpoint}`

<example type="grid" :component="rowExamples.IRowDistributionAroundExample" :html="rowExamples.IRowDistributionAroundExampleHTML"></example>

#### `between` and `between-{breakpoint}`

<example type="grid" :component="rowExamples.IRowDistributionBetweenExample" :html="rowExamples.IRowDistributionBetweenExampleHTML"></example>

### Reordering
Reorder columns using helper classes.

#### `reverse` and `reverse-{breakpoint}`

<example type="grid" :component="rowExamples.IRowReorderingReverseExample" :html="rowExamples.IRowReorderingReverseExampleHTML"></example>

#### `first` and `first-{breakpont}`

<example type="grid" :component="columnExamples.IColumnReorderingFirstExample" :html="columnExamples.IColumnReorderingFirstExampleHTML"></example>

#### `last` and `last-{breakpoint}`

<example type="grid" :component="columnExamples.IColumnReorderingLastExample" :html="columnExamples.IColumnReorderingLastExampleHTML"></example>

### Responsive Width
You can specify column counts for each breakpoint. Try to resize your browser window!

<example type="grid" :component="columnExamples.IColumnResponsiveExample" :html="columnExamples.IColumnResponsiveExampleHTML"></example>

### Fluid Container
You can make the `<i-container>` component fill the whole width of the parent element using the `fluid` property. 

<example type="grid" :component="containerExamples.IContainerFluidExample" :html="containerExamples.IContainerFluidExampleHTML"></example>

