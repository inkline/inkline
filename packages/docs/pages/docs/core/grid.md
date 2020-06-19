---
title: Grid
description: Inkline's grid system is modelled as a 12 columns layout built using flexbox, with equally divided columns, separated by a small gutter. 
---

# Grid
## Inkline's grid system is modelled as a 12 columns layout built using flexbox, with equally divided columns, separated by a small gutter. 
 
The grid system uses percentage widths, so that it is usable at any nesting level.

The grid system is defined using `<i-container>`, `<i-row>` and `<i-column>` components, with each one having specific responsive modifiers. Here's how it works:

- First, we define a row with a set of columns inside of it.
- Your content elements should be placed directly in a `<i-column>`, and only `<i-column>` should be placed directly inside an `<i-row>` component
- The column width takes a value of 1-12 at each responsive breakpoint (`xs`, `sm`, `md`, `lg`, `xl`).
- If the sum of `column` widths in a row is more than 12, then the overflowing column will start on a new line.

### Basic Layout
Create basic grid layout using columns.

<i-code title="Basic Layout" class="grid-code-preview">

<i-tab type="preview">
    <i-row>
        <i-column xs="12">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="1">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="11">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="2">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="10">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="3">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="9">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="4">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="8">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="5">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="7">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="6">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="6">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="7">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="5">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="8">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="4">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="9">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="10">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="2">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="11">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="1">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="12">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>

<i-tab type="html">

~~~html
<i-container>
    <i-row>
        <i-column xs="12"></i-column>
    </i-row>    
    <i-row>
        <i-column xs="1"></i-column>
        <i-column xs="11"></i-column>
    </i-row>    
    <i-row>
        <i-column xs="2"></i-column>
        <i-column xs="10"></i-column>
    </i-row>
    <i-row>
        <i-column xs="3"></i-column>
        <i-column xs="9"></i-column>
    </i-row>
    <i-row>
        <i-column xs="4"></i-column>
        <i-column xs="8"></i-column>
    </i-row>
    <i-row>
        <i-column xs="5"></i-column>
        <i-column xs="7"></i-column>
    </i-row>
    <i-row>
        <i-column xs="6"></i-column>
        <i-column xs="6"></i-column>
    </i-row>
    <i-row>
        <i-column xs="7"></i-column>
        <i-column xs="5"></i-column>
    </i-row>
    <i-row>
        <i-column xs="8"></i-column>
        <i-column xs="4"></i-column>
    </i-row>
    <i-row>
        <i-column xs="9"></i-column>
        <i-column xs="3"></i-column>
    </i-row>
    <i-row>
        <i-column xs="10"></i-column>
        <i-column xs="2"></i-column>
    </i-row>
    <i-row>
        <i-column xs="11"></i-column>
        <i-column xs="1"></i-column>
    </i-row>
    <i-row>
        <i-column xs="12"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

### Grid Offset
Grid offsets are used to move a column to the right without creating an empty column next to it.

<i-code title="Grid Offset" class="grid-code-preview">
<i-tab type="preview">
    <i-row>
        <i-column xs="12">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="11" offset-xs="1">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="10" offset-xs="2">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="9" offset-xs="3">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="8" offset-xs="4">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="7" offset-xs="5">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="6" offset-xs="6">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="5" offset-xs="7">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="4" offset-xs="8">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="3" offset-xs="9">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="2" offset-xs="10">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="1" offset-xs="11">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row>
        <i-column xs="1" offset-xs="11"></i-column>
    </i-row>
    <i-row>
        <i-column xs="2" offset-xs="10"></i-column>
    </i-row>
    <i-row>
        <i-column xs="3" offset-xs="9"></i-column>
    </i-row>
    <i-row>
        <i-column xs="4" offset-xs="8"></i-column>
    </i-row>
    <i-row>
        <i-column xs="5" offset-xs="7"></i-column>
    </i-row>
    <i-row>
        <i-column xs="6" offset-xs="6"></i-column>
    </i-row>
    <i-row>
        <i-column xs="7" offset-xs="5"></i-column>
    </i-row>
    <i-row>
        <i-column xs="8" offset-xs="4"></i-column>
    </i-row>
    <i-row>
        <i-column xs="9" offset-xs="3"></i-column>
    </i-row>
    <i-row>
        <i-column xs="10" offset-xs="2"></i-column>
    </i-row>
    <i-row>
        <i-column xs="11" offset-xs="1"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

You may need to use `offset-{breakpoint}="0"` to clear an offset. See this in action in the grid example below.

<i-code title="Grid Offset Reset" class="grid-code-preview">
<i-tab type="preview">
    <i-row>
        <i-column md="5" lg="6">
            <grid-box></grid-box>
        </i-column>
        <i-column md="5" offset-md="2" lg="6" offset-lg="0">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row>
        <i-column sm="5" md="6">
            <grid-box></grid-box>
        </i-column>
        <i-column sm="5" offset-sm="2" md="6" offset-md="0">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

### Grid Push / Pull
Code-wise, the columns have a different order.

<i-code title="Grid Push / Pull" class="grid-code-preview">
<i-tab type="preview">
    <i-row>
        <i-column xs="12">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="1" push-xs="11">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="11" pull-xs="1">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="2" push-xs="10">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="10" pull-xs="2">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="3" push-xs="9">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="9" pull-xs="3">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="4" push-xs="8">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="8" pull-xs="4">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="5" push-xs="7">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="7" pull-xs="5">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="6" push-xs="6">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="6" pull-xs="6">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="7" push-xs="5">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="5" pull-xs="7">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="8" push-xs="4">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="4" pull-xs="8">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="9" push-xs="3">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="3" pull-xs="9">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="10" push-xs="2">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="2" pull-xs="10">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="11" push-xs="1">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="1" pull-xs="11">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column xs="12">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row>
        <i-column xs="1" push-xs="11"></div>
        <i-column xs="11" pull-xs="1"></div>
    </i-row>
    <i-row>
        <i-column xs="2" push-xs="10"></div>
        <i-column xs="10" pull-xs="2"></div>
    </i-row>
    <i-row>
        <i-column xs="3" push-xs="9"></div>
        <i-column xs="9" pull-xs="3"></div>
    </i-row>
    <i-row>
        <i-column xs="4" push-xs="8"></div>
        <i-column xs="8" pull-xs="4"></div>
    </i-row>
    <i-row>
        <i-column xs="5" push-xs="7"></div>
        <i-column xs="7" pull-xs="5"></div>
    </i-row>
    <i-row>
        <i-column xs="6" push-xs="6"></div>
        <i-column xs="6" pull-xs="6"></div>
    </i-row>
    <i-row>
        <i-column xs="7" push-xs="5"></div>
        <i-column xs="5" pull-xs="7"></div>
    </i-row>
    <i-row>
        <i-column xs="8" push-xs="8"></div>
        <i-column xs="4" pull-xs="4"></div>
    </i-row>
    <i-row>
        <i-column xs="9" push-xs="3"></div>
        <i-column xs="3" pull-xs="9"></div>
    </i-row>
    <i-row>
        <i-column xs="10" push-xs="2"></div>
        <i-column xs="2" pull-xs="10"></div>
    </i-row>
    <i-row>
        <i-column xs="11" push-xs="1"></div>
        <i-column xs="1" pull-xs="11"></div>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>


### Auto Width
The grid will automatically fit any number of auto sizing columns to a row.

<i-code title="Auto Width" class="grid-code-preview">
<i-tab type="preview">
    <i-row>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
        <i-column :xs="true">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row>
        <i-column :xs="true"></i-column>
    </i-row>
    <i-row>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
    </i-row>
    <i-row>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
    </i-row>
    <i-row>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
    </i-row>
    <i-row>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
    </i-row>
    <i-row>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
        <i-column :xs="true"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>


### Nested Grid
Inkline allows you to nest up to 12 columns inside a row. Row can also be nested inside any column, 
giving you virtually endless layout possibilities. You can place rows only inside a container or a column, 
while you can place columns only inside a row.

<i-code title="Nested Grid">
<i-tab type="preview">
    <i-row>
        <i-column xs="8">
            <grid-box>
                <i-row>
                    <i-column xs="3">
                        <grid-box></grid-box>
                    </i-column>
                    <i-column xs="3">
                        <grid-box></grid-box>
                    </i-column>
                    <i-column xs="3">
                        <grid-box></grid-box>
                    </i-column>
                    <i-column xs="3">
                        <grid-box></grid-box>
                    </i-column>
                </i-row>
            </grid-box>
        </i-column>
        <i-column xs="4">
            <grid-box>
                <i-row>
                    <i-column xs="6">
                        <grid-box></grid-box>
                    </i-column>
                    <i-column xs="6">
                        <grid-box></grid-box>
                    </i-column>
                </i-row>
            </grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row>
        <i-column xs="8">
            <i-row>
                <i-column xs="3"></i-column>
                <i-column xs="3"></i-column>
                <i-column xs="3"></i-column>
                <i-column xs="3"></i-column>
            </i-row>
        </i-column>
        <i-column xs="4">
            <i-row>
                <i-column xs="6"></i-column>
                <i-column xs="6"></i-column>
            </i-row>
        </i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>


### Horizontal Alignment
You can align columns horizontally to the start, center, or end of a row.

#### start-*

<i-code title="Horizontal Alignment - Start">
<i-tab type="preview">
    <i-row start-xs>
        <i-column xs="4">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row start-xs>
        <i-column xs="4"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

#### center-*

<i-code title="Horizontal Alignment - Center">
<i-tab type="preview">
    <i-row center-xs>
        <i-column xs="4">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row center-xs>
        <i-column xs="4"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

#### end-*

<i-code title="Horizontal Alignment - End">
<i-tab type="preview">
    <i-row end-xs>
        <i-column xs="4">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row end-xs>
        <i-column xs="4"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>


### Vertical Alignment
You can align columns vertically to the top, middle or bottom of the row.

#### top-*

<i-code title="Vertical Alignment - Top">
<i-tab type="preview">
    <i-row top-xs>
        <i-column xs="6">
            <grid-box tall></grid-box>
        </i-column>
        <i-column xs="6">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row top-xs>
        <i-column xs="6"></i-column>
        <i-column xs="6"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

#### middle-*

<i-code title="Vertical Alignment - Middle">
<i-tab type="preview">
    <i-row middle-xs>
        <i-column xs="6">
            <grid-box tall></grid-box>
        </i-column>
        <i-column xs="6">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row middle-xs>
        <i-column xs="6"></i-column>
        <i-column xs="6"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

#### bottom-*

<i-code title="Vertical Alignment - Bottom">
<i-tab type="preview">
    <i-row bottom-xs>
        <i-column xs="6">
            <grid-box tall></grid-box>
        </i-column>
        <i-column xs="6">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row bottom-xs>
        <i-column xs="6"></i-column>
        <i-column xs="6"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>


### Distribution
Distribute the spacing between the columns of a row.

#### around-*

<i-code title="Distribution - Around">
<i-tab type="preview">
    <i-row around-xs>
        <i-column xs="3">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row around-xs>
        <i-column xs="3"></i-column>
        <i-column xs="3"></i-column>
        <i-column xs="3"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

#### between-*

<i-code title="Distribution - Between">
<i-tab type="preview">
    <i-row between-xs>
        <i-column xs="3">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box></grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row between-xs>
        <i-column xs="3"></i-column>
        <i-column xs="3"></i-column>
        <i-column xs="3"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

### Reordering
Reorder columns using helper classes.

#### reverse-*

<i-code title="Reordering - Reverse">
<i-tab type="preview">
    <i-row reverse-xs>
        <i-column xs="3">
            <grid-box>1</grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box>2</grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box>3</grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box>4</grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row reverse-xs>
        <i-column xs="3">1</i-column>
        <i-column xs="3">2</i-column>
        <i-column xs="3">3</i-column>
        <i-column xs="3">4</i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

#### first-*

<i-code title="Reordering - First">
<i-tab type="preview">
    <i-row>
        <i-column xs="3">
            <grid-box>1</grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box>2</grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box>3</grid-box>
        </i-column>
        <i-column xs="3" first-xs>
            <grid-box>4</grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row>
        <i-column xs="3">1</i-column>
        <i-column xs="3">2</i-column>
        <i-column xs="3">3</i-column>
        <i-column xs="3" first-xs>4</i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

#### last-*

<i-code title="Reordering - Last">
<i-tab type="preview">
    <i-row>
        <i-column xs="3" last-xs>
            <grid-box>1</grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box>2</grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box>3</grid-box>
        </i-column>
        <i-column xs="3">
            <grid-box>4</grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row>
        <i-column xs="3" last-xs>1</div>
        <i-column xs="3">2</div>
        <i-column xs="3">3</div>
        <i-column xs="3">4</div>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>


### Responsive Width
You can specify column counts for each breakpoint. Try to resize your browser window!

<i-code title="Responsive Grid Width">
<i-tab type="preview">
    <i-row>
        <i-column xl="3" lg="6" md="6" sm="8" xs="12">
            <grid-box></grid-box>
        </i-column>
        <i-column xl="3" lg="6" md="6" sm="4" xs="6">
            <grid-box></grid-box>
        </i-column>
        <i-column xl="6" lg="4" md="6" sm="6" xs="3">
            <grid-box></grid-box>
        </i-column>
        <i-column xl="12" lg="8" md="6" sm="6" xs="3">
            <grid-box></grid-box>
        </i-column>
    </i-row>
    <i-row></i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container>
    <i-row>
        <i-column xl="3" lg="6" md="6" sm="8" xs="12"></i-column>
        <i-column xl="3" lg="6" md="6" sm="4" xs="6"></i-column>
        <i-column xl="6" lg="4" md="6" sm="6" xs="3"></i-column>
        <i-column xl="12" lg="8" md="6" sm="6" xs="3"></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>

### Fluid Container
You can make the `<i-container>` component fill the whole width of the parent element using the `fluid` property. 

<i-code title="Fluid Container">
<i-tab type="preview">
    <i-row>
        <i-column xs>
            <grid-box></grid-box>
        </i-column>
        <i-column xs>
            <grid-box></grid-box>
        </i-column>
        <i-column xs>
            <grid-box></grid-box>
        </i-column>
    </i-row>
</i-tab>
<i-tab type="html">

~~~html
<i-container fluid>
    <i-row>
        <i-column xs></i-column>
        <i-column xs></i-column>
        <i-column xs></i-column>
    </i-row>
</i-container>
~~~

</i-tab>
</i-code>


### Components API
Here you can find a list of the various customization options you can use for the grid components as props, as well as available slots and events.

<i-code api title="Container API" expanded>
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">fluid</template>
                <template slot="description">Sets the container to cover 100% of the parent's width.</template>
                <template slot="type">Boolean</template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for container default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

<i-code api title="Row API" expanded>
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">no-gutter</template>
                <template slot="description">Sets whether the row and child columns have a gutter width.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">no-collapse</template>
                <template slot="description">Sets the flex flow to be <code>row nowrap</code>.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">start</template>
                <template slot="description">Aligns the content to the start of the row. The alignment can be applied responsively by adding one of the responsive properties <code>start-xs</code>, <code>start-sm</code>, <code>start-md</code>, <code>start-lg</code>, <code>start-xl</code> (e.g. will be used as <code>&lt;i-row start-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">center</template>
                <template slot="description">Aligns the content to the center of the row. The alignment can be applied responsively by adding one of the responsive properties <code>center-xs</code>, <code>center-sm</code>, <code>center-md</code>, <code>center-lg</code>, <code>center-xl</code> (e.g. will be used as <code>&lt;i-row center-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">end</template>
                <template slot="description">Aligns the content to the end of the row. The alignment can be applied responsively by adding one of the responsive properties <code>end-xs</code>, <code>end-sm</code>, <code>end-md</code>, <code>end-lg</code>, <code>end-xl</code> (e.g. will be used as <code>&lt;i-row end-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">top</template>
                <template slot="description">Aligns the content to the top of the row. The alignment can be applied responsively by adding one of the responsive properties <code>top-xs</code>, <code>top-sm</code>, <code>top-md</code>, <code>top-lg</code>, <code>top-xl</code> (e.g. will be used as <code>&lt;i-row top-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">middle</template>
                <template slot="description">Aligns the content to the middle of the row. The alignment can be applied responsively by adding one of the responsive properties <code>middle-xs</code>, <code>middle-sm</code>, <code>middle-md</code>, <code>middle-lg</code>, <code>middle-xl</code> (e.g. will be used as <code>&lt;i-row middle-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">bottom</template>
                <template slot="description">Aligns the content to the bottom of the row. The alignment can be applied responsively by adding one of the responsive properties <code>bottom-xs</code>, <code>bottom-sm</code>, <code>bottom-md</code>, <code>bottom-lg</code>, <code>bottom-xl</code> (e.g. will be used as <code>&lt;i-row bottom-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">around</template>
                <template slot="description">Justifies the content position to have space around. The content justifying can be applied responsively by adding one of the responsive properties <code>around-xs</code>, <code>around-sm</code>, <code>around-md</code>, <code>around-lg</code>, <code>around-xl</code> (e.g. will be used as <code>&lt;i-row around-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">between</template>
                <template slot="description">Justifies the content position to have space between. The content justifying can be applied responsively by adding one of the responsive properties <code>between-xs</code>, <code>between-sm</code>, <code>between-md</code>, <code>between-lg</code>, <code>between-xl</code> (e.g. will be used as <code>&lt;i-row between-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">reverse</template>
                <template slot="description">Reverses the order of the row content. The content justifying can be applied responsively by adding one of the responsive properties <code>reverse-xs</code>, <code>reverse-sm</code>, <code>reverse-md</code>, <code>reverse-lg</code>, <code>reverse-xl</code> (e.g. will be used as <code>&lt;i-row reverse-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table class="_margin-bottom-0">
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for row default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


<i-code api title="Column API" expanded>
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">xs</template>
                <template slot="description">Sets the number of columns for extra small screens (screen width lower than <code>30rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on extra small screens.</template>
                <template slot="type"><code>Number</code>, <code>Boolean</code></template>
                <template slot="values"><code>1-12</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">sm</template>
                <template slot="description">Sets the number of columns for small screens (screen width lower than <code>48rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on small screens.</template>
                <template slot="type"><code>Number</code>, <code>Boolean</code></template>
                <template slot="values"><code>1-12</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">md</template>
                <template slot="description">Sets the number of columns for medium screens (screen width lower than <code>64rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on medium screens.</template>
                <template slot="type"><code>Number</code>, <code>Boolean</code></template>
                <template slot="values"><code>1-12</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">lg</template>
                <template slot="description">Sets the number of columns for large screens (screen width lower than <code>75rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on large screens.</template>
                <template slot="type"><code>Number</code>, <code>Boolean</code></template>
                <template slot="values"><code>1-12</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">xl</template>
                <template slot="description">Sets the number of columns for extra large screens (screen width lower than <code>92.5rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on extra large screens.</template>
                <template slot="type"><code>Number</code>, <code>Boolean</code></template>
                <template slot="values"><code>1-12</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">first</template>
                <template slot="description">Orders the column to be first. The order can be applied responsively by adding one of the responsive properties <code>first-xs</code>, <code>first-sm</code>, <code>first-md</code>, <code>first-lg</code>, <code>first-xl</code> (e.g. will be used as <code>&lt;i-column first-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">last</template>
                <template slot="description">Orders the column to be last. The order can be applied responsively by adding one of the responsive properties <code>last-xs</code>, <code>last-sm</code>, <code>last-md</code>, <code>last-lg</code>, <code>last-xl</code> (e.g. will be used as <code>&lt;i-column last-xs&gt;</code> in template).</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">offset</template>
                <template slot="description">Offsets the column by a number of columns. The offset can be applied responsively by adding one of the responsive properties <code>offset-xs</code>, <code>offset-sm</code>, <code>offset-md</code>, <code>offset-lg</code>, <code>offset-xl</code> (e.g. will be used as <code>&lt;i-column offset-xs="4"&gt;</code> in template).</template>
                <template slot="type"><code>Number</code>, <code>Boolean</code></template>
                <template slot="values"><code>1-12</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">push</template>
                <template slot="description">Pushes the column by a number of columns. This is useful for keeping the markup order while changing the display order of the columns. The push can be applied responsively by adding one of the responsive properties <code>push-xs</code>, <code>push-sm</code>, <code>push-md</code>, <code>push-lg</code>, <code>push-xl</code> (e.g. will be used as <code>&lt;i-column push-xs="4"&gt;</code> in template).</template>
                <template slot="type"><code>Number</code>, <code>Boolean</code></template>
                <template slot="values"><code>1-12</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">pull</template>
                <template slot="description">Pulls the column by a number of columns. This is useful for keeping the markup order while changing the display order of the columns. The pull can be applied responsively by adding one of the responsive properties <code>pull-xs</code>, <code>pull-sm</code>, <code>pull-md</code>, <code>pull-lg</code>, <code>pull-xl</code> (e.g. will be used as <code>&lt;i-column pull-xs="4"&gt;</code> in template).</template>
                <template slot="type"><code>Number</code>, <code>Boolean</code></template>
                <template slot="values"><code>1-12</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table class="_margin-bottom-0">
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for column default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for the grid components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code scss title="Container" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$container-width-xs</template>
                <template slot="default"><code>100%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$container-width-sm</template>
                <template slot="default"><code>$breakpoints-sm - $gutter-sm</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$container-width-md</template>
                <template slot="default"><code>$breakpoints-md - $gutter-md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$container-width-lg</template>
                <template slot="default"><code>$breakpoints-lg - $gutter-lg</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$container-width-xl</template>
                <template slot="default"><code>$breakpoints-xl - $gutter-xl</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


<i-code scss title="Column" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$columns</template>
                <template slot="default"><code>12</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

