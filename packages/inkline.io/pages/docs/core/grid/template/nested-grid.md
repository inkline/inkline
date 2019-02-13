
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
