# Grid
## Inkline's grid system is modelled as a 12 columns layout built using flexbox, with equally divided columns, separated by a small gutter. { .lead }
 
 The grid system uses percentage widths, so that it is usable at any nesting level.

The grid system is defined using `<i-container>`, `<i-row>` and `<i-column>` components, with each one having specific responsive modifiers. Here's how it works:

- First, we define a row with a set of columns inside of it.
- Your content elements should be placed directly in a `<i-column>`, and only `<i-column>` should be placed directly inside an `<i-row>` component
- The column width takes a value of 1-12 at each responsive breakpoint (`xs`, `sm`, `md`, `lg`, `xlg`).
- If the sum of `column` widths in a row is more than 12, then the overflowing column will start on a new line.

### Basic Layout
Create basic grid layout using columns.

<i-code-preview title="Basic Layout" class="grid-code-preview">

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

<template slot="html">

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

</template>
</i-code-preview>

### Grid Offset
Grid offsets are used to move a column to the right without creating an empty column next to it.

<i-code-preview title="Grid Offset" class="grid-code-preview">

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

<template slot="html">

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

</template>
</i-code-preview>


### Grid Push / Pull
Code-wise, the columns have a different order.

<i-code-preview title="Grid Push / Pull" class="grid-code-preview">

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

<template slot="html">

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

</template>
</i-code-preview>


### Auto Width
The grid will automatically fit any number of auto sizing columns to a row.

<i-code-preview title="Auto Width" class="grid-code-preview">

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

<template slot="html">

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

</template>
</i-code-preview>


### Nested Grid
Inkline allows you to nest up to 12 columns inside a row. Row can also be nested inside any column, 
giving you virtually endless layout possibilities. You can place rows only inside a container or a column, 
while you can place columns only inside a row.

<i-code-preview title="Nested Grid">

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

<template slot="html">

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

</template>
</i-code-preview>


### Horizontal Alignment
You can align columns horizontally to the start, center, or end of a row.

#### start-*

<i-code-preview title="Horizontal Alignment - Start">

<i-row start-xs>
    <i-column xs="4">
        <grid-box></grid-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-container>
    <i-row start-xs>
        <i-column xs="4"></i-column>
    </i-row>
</i-container>
~~~

</template>
</i-code-preview>

#### center-*

<i-code-preview title="Horizontal Alignment - Center">

<i-row center-xs>
    <i-column xs="4">
        <grid-box></grid-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-container>
    <i-row center-xs>
        <i-column xs="4"></i-column>
    </i-row>
</i-container>
~~~

</template>
</i-code-preview>

#### end-*

<i-code-preview title="Horizontal Alignment - End">

<i-row end-xs>
    <i-column xs="4">
        <grid-box></grid-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-container>
    <i-row end-xs>
        <i-column xs="4"></i-column>
    </i-row>
</i-container>
~~~

</template>
</i-code-preview>


### Vertical Alignment
You can align columns vertically to the top, middle or bottom of the row.

#### top-*

<i-code-preview title="Vertical Alignment - Top">

<i-row top-xs>
    <i-column xs="6">
        <grid-box tall></grid-box>
    </i-column>
    <i-column xs="6">
        <grid-box></grid-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-container>
    <i-row top-xs>
        <i-column xs="6"></i-column>
        <i-column xs="6"></i-column>
    </i-row>
</i-container>
~~~

</template>
</i-code-preview>

#### middle-*

<i-code-preview title="Vertical Alignment - Middle">

<i-row middle-xs>
    <i-column xs="6">
        <grid-box tall></grid-box>
    </i-column>
    <i-column xs="6">
        <grid-box></grid-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-container>
    <i-row middle-xs>
        <i-column xs="6"></i-column>
        <i-column xs="6"></i-column>
    </i-row>
</i-container>
~~~

</template>
</i-code-preview>

#### bottom-*

<i-code-preview title="Vertical Alignment - Bottom">

<i-row bottom-xs>
    <i-column xs="6">
        <grid-box tall></grid-box>
    </i-column>
    <i-column xs="6">
        <grid-box></grid-box>
    </i-column>
</i-row>

<template slot="html">

~~~html
<i-container>
    <i-row bottom-xs>
        <i-column xs="6"></i-column>
        <i-column xs="6"></i-column>
    </i-row>
</i-container>
~~~

</template>
</i-code-preview>


### Distribution
Distribute the spacing between the columns of a row.

#### around-*

<i-code-preview title="Distribution - Around">

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

<template slot="html">

~~~html
<i-container>
    <i-row around-xs>
        <i-column xs="3"></i-column>
        <i-column xs="3"></i-column>
        <i-column xs="3"></i-column>
    </i-row>
</i-container>
~~~

</template>
</i-code-preview>

#### between-*

<i-code-preview title="Distribution - Between">

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

<template slot="html">

~~~html
<i-container>
    <i-row between-xs>
        <i-column xs="3"></i-column>
        <i-column xs="3"></i-column>
        <i-column xs="3"></i-column>
    </i-row>
</i-container>
~~~

</template>
</i-code-preview>

### Reordering
Reorder columns using helper classes.

#### reverse-*

<i-code-preview title="Reordering - Reverse">

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

<template slot="html">

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

</template>
</i-code-preview>

#### first-*

<i-code-preview title="Reordering - First">

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

<template slot="html">

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

</template>
</i-code-preview>

#### last-*

<i-code-preview title="Reordering - Last">

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

<template slot="html">

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

</template>
</i-code-preview>


### Responsive Width
You can specify column counts for each breakpoint. Try to resize your browser window!

<i-code-preview title="Responsive Grid Width">

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
<i-row/>

<template slot="html">

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

</template>
</i-code-preview>

### Fluid Container
You can make the `<i-container>` component fill the whole width of the parent element using the `fluid` property. 

<i-code-preview title="Fluid Container">

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

<template slot="html">

~~~html
<i-container fluid>
    <i-row>
        <i-column xs></i-column>
        <i-column xs></i-column>
        <i-column xs></i-column>
    </i-row>
</i-container>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Container API" expanded>
    <template slot="props">
        <table class="table -bordered">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>fluid</td>
                    <td>Sets the container to cover 100% of the parent's width.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for container default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Row API" expanded>
    <template slot="props">
        <table class="table -bordered">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>noGutter</td>
                    <td>Sets whether the row and child columns have a gutter width.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>noCollapse</td>
                    <td>Sets the flex flow to be <code>row nowrap</code>.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>start</td>
                    <td>Aligns the content to the start of the row. The alignment can be applied responsively by adding one of the responsive properties <code>startXs</code>, <code>startSm</code>, <code>startMd</code>, <code>startLg</code>, <code>startXl</code> (e.g. will be used as <code>&lt;i-row start-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>center</td>
                    <td>Aligns the content to the center of the row. The alignment can be applied responsively by adding one of the responsive properties <code>centerXs</code>, <code>centerSm</code>, <code>centerMd</code>, <code>centerLg</code>, <code>centerXl</code> (e.g. will be used as <code>&lt;i-row center-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>end</td>
                    <td>Aligns the content to the end of the row. The alignment can be applied responsively by adding one of the responsive properties <code>endXs</code>, <code>endSm</code>, <code>endMd</code>, <code>endLg</code>, <code>endXl</code> (e.g. will be used as <code>&lt;i-row end-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>top</td>
                    <td>Aligns the content to the top of the row. The alignment can be applied responsively by adding one of the responsive properties <code>topXs</code>, <code>topSm</code>, <code>topMd</code>, <code>topLg</code>, <code>topXl</code> (e.g. will be used as <code>&lt;i-row top-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>middle</td>
                    <td>Aligns the content to the middle of the row. The alignment can be applied responsively by adding one of the responsive properties <code>middleXs</code>, <code>middleSm</code>, <code>middleMd</code>, <code>middleLg</code>, <code>middleXl</code> (e.g. will be used as <code>&lt;i-row middle-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>bottom</td>
                    <td>Aligns the content to the bottom of the row. The alignment can be applied responsively by adding one of the responsive properties <code>bottomXs</code>, <code>bottomSm</code>, <code>bottomMd</code>, <code>bottomLg</code>, <code>bottomXl</code> (e.g. will be used as <code>&lt;i-row bottom-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>around</td>
                    <td>Justifies the content position to have space around. The content justifying can be applied responsively by adding one of the responsive properties <code>aroundXs</code>, <code>aroundSm</code>, <code>aroundMd</code>, <code>aroundLg</code>, <code>aroundXl</code> (e.g. will be used as <code>&lt;i-row around-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>between</td>
                    <td>Justifies the content position to have space between. The content justifying can be applied responsively by adding one of the responsive properties <code>betweenXs</code>, <code>betweenSm</code>, <code>betweenMd</code>, <code>betweenLg</code>, <code>betweenXl</code> (e.g. will be used as <code>&lt;i-row between-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>reverse</td>
                    <td>Reverses the order of the row content. The content justifying can be applied responsively by adding one of the responsive properties <code>reverseXs</code>, <code>reverseSm</code>, <code>reverseMd</code>, <code>reverseLg</code>, <code>reverseXl</code> (e.g. will be used as <code>&lt;i-row reverse-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for row default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>


<i-api-preview title="Column API" expanded>
    <template slot="props">
        <table class="table -bordered">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>xs</td>
                    <td>Sets the number of columns for extra small screens (screen width lower than <code>30rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on extra small screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>sm</td>
                    <td>Sets the number of columns for small screens (screen width lower than <code>48rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on small screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>md</td>
                    <td>Sets the number of columns for medium screens (screen width lower than <code>64rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on medium screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>lg</td>
                    <td>Sets the number of columns for large screens (screen width lower than <code>75rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on large screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>xlg</td>
                    <td>Sets the number of columns for extra large screens (screen width lower than <code>92.5rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on extra large screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>first</td>
                    <td>Orders the column to be first. The order can be applied responsively by adding one of the responsive properties <code>firstXs</code>, <code>firstSm</code>, <code>firstMd</code>, <code>firstLg</code>, <code>firstXl</code> (e.g. will be used as <code>&lt;i-column first-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>last</td>
                    <td>Orders the column to be last. The order can be applied responsively by adding one of the responsive properties <code>lastXs</code>, <code>lastSm</code>, <code>lastMd</code>, <code>lastLg</code>, <code>lastXl</code> (e.g. will be used as <code>&lt;i-column last-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>offset</td>
                    <td>Offsets the column by a number of columns. The offset can be applied responsively by adding one of the responsive properties <code>offsetXs</code>, <code>offsetSm</code>, <code>offsetMd</code>, <code>offsetLg</code>, <code>offsetXl</code> (e.g. will be used as <code>&lt;i-column offset-xs="4"&gt;</code> in template).</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>push</td>
                    <td>Pushes the column by a number of columns. This is useful for keeping the markup order while changing the display order of the columns. The push can be applied responsively by adding one of the responsive properties <code>pushXs</code>, <code>pushSm</code>, <code>pushMd</code>, <code>pushLg</code>, <code>pushXl</code> (e.g. will be used as <code>&lt;i-column push-xs="4"&gt;</code> in template).</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>pull</td>
                    <td>Pulls the column by a number of columns. This is useful for keeping the markup order while changing the display order of the columns. The pull can be applied responsively by adding one of the responsive properties <code>pullXs</code>, <code>pullSm</code>, <code>pullMd</code>, <code>pullLg</code>, <code>pullXl</code> (e.g. will be used as <code>&lt;i-column pull-xs="4"&gt;</code> in template).</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for column default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>











