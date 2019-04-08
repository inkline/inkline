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
