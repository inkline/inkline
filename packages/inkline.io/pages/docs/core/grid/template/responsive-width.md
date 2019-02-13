
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
