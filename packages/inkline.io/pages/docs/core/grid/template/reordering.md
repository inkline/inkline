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
