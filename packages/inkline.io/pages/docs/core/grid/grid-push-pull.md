
### Grid Push / Pull
Code-wise, the columns have a different order.

<i-code-preview title="Grid Push / Pull" class="grid-code-preview">

<i-row>
    <i-column xs="12"></i-column>
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
