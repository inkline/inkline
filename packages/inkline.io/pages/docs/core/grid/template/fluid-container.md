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
