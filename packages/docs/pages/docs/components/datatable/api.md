---
title: Data Table API
description: The Data Table has a very intuitive and comprehensive component API for all your customization needs. 
---

# Data Table API
## The Data Table has a very intuitive and comprehensive component API for all your customization needs. 

### Configuring i18n
You can provide an object with already translated internationalization strings using the `i18n` property. 

The strings contain interpolated values under the form of `{value}`.

~~~js
export default {
    ...
    data() {
        return {
            i18n: {
                pagination: {
                    rowsPerPage: 'Show {rowsPerPage} entries',
                    rowsRange: 'Showing {rowsFrom} to {rowsTo} of {rowsCount} entries'
                },
                filtering: {
                    inputPlaceholder: 'Search',
                    noResultsFound: 'No matching records found',
                }
            }
        };
    }
}       
~~~

~~~html
<i-datatable :columns="columns" :rows="rows" :i18n="i18n" />
~~~

### Component API
Here you can find a list of the various customization options you can use for the datatable component as props, as well as available slots and events.

<i-code title="Data Table API" markup="i-datatable" expanded>
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">async</template>
                <template slot="description">Sets the pagination and filtering to be handled asynchronously.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">columns</template>
                <template slot="description">An array of column definition objects. See the <nuxt-link :to="{ name: 'docs-components-datatable-introduction' }">DataTable Introduction</nuxt-link> page.</template>
                <template slot="type"><code>Array&lt;Object&gt;</code></template>
                <template slot="values"></template>
                <template slot="default"><code>[]</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">count-column</template>
                <template slot="description">Column definition override for the count column. You can set the value to <code>false</code> to disable the count column.</template>
                <template slot="type"><code>Object</code>, <code>Boolean</code></template>
                <template slot="values"></template>
<template slot="default-row">

~~~js
{
    title: '#',
    path: '#',
    class: '-count',
    align: 'right',
    sortable: true,
    render(row, column, index) {
        return (this.page - 1) * this.rowsPerPage + index + 1;
    }
}
~~~

</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">expand-column</template>
                <template slot="description">Column definition override for the expand column. You can set the value to <code>false</code> to disable the expand column.</template>
                <template slot="type"><code>Object</code>, <code>Boolean</code></template>
                <template slot="values"></template>
<template slot="default-row">

~~~js
{
    title: '',
    path: '^',
    classes: '-expand',
    custom: true
}
~~~

</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">rows</template>
                <template slot="description">An array of row definition objects. See the <nuxt-link :to="{ name: 'docs-components-datatable-introduction' }">DataTable Introduction</nuxt-link> page.</template>
                <template slot="type"><code>Array&lt;Object&gt;</code></template>
                <template slot="values"></template>
                <template slot="default"><code>[]</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">rows-count</template>
                <template slot="description">Sets the number of rows to be displayed when <code>async</code> is enabled.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default"><code>null</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">default-sort-key</template>
                <template slot="description">Sets the key to use for sorting by default. The <code>#</code> refers to the count column.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"><code>#</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">filtering</template>
                <template slot="description">Used to enable, disable and configure filtering. See the <nuxt-link :to="{ name: 'docs-components-datatable-filtering' }">DataTable Filtering</nuxt-link> page.</template>
                <template slot="type"><code>Boolean</code>, <code>Object</code></template>
                <template slot="values"><code>true</code>, <code>false</code>, <code>Object</code></template>
<template slot="default-row">

~~~js
{
    size: 'md',
    variant: null,
    fuse: {
        isCaseSensitive: false,
        shouldSort: false,
        includeMatches: true,
        includeScore: true,
        threshold: 0.25,
        location: 0,
        distance: 75,
        tokenize: true,
        maxPatternLength: 32,
        minMatchCharLength: 1
    }
}
~~~

</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">pagination</template>
                <template slot="description">Used to enable, disable and configure pagination. See the <nuxt-link :to="{ name: 'docs-components-datatable-pagination' }">DataTable Pagination</nuxt-link> page.</template>
                <template slot="type"><code>Boolean</code>, <code>Object</code></template>
                <template slot="values"><code>true</code>, <code>false</code>, <code>Object</code></template>
<template slot="default-row">

~~~js
{
    limit: { xs: 3, sm: 5 },
    size: 'md',
    variant: null,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100]
}
~~~

</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">footer</template>
                <template slot="description">Used to enable or disable the table footer.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">single-expand</template>
                <template slot="description">Used to determine whether to set row expansion in accordion mode (having only one item active at a time). To be used together with the <code>expand</code> slot.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">i18n</template>
                <template slot="description">Provide an object with already translated strings.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
<template slot="default-row">

~~~js
{
    pagination: {
        rowsPerPage: 'Show {rowsPerPage} entries',
        rowsRange: 'Showing {rowsFrom} to {rowsTo} of {rowsCount} entries'
    },
    filtering: {
        inputPlaceholder: 'Search',
        noResultsFound: 'No matching records found'
    }
}
~~~

</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">bordered</template>
                <template slot="description">Sets the table as bordered.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">hover</template>
                <template slot="description">Sets the table as hoverable.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">responsive</template>
                <template slot="description">Sets the table as responsive. When the table width reaches an overflow threshold, it will start scrolling horizontally.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">striped</template>
                <template slot="description">Sets the table as striped.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the table component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code>, <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="events">
        <api-table>
            <api-table-row>
                <template slot="event">update</template>
                <template slot="description">Emitted when pagination or filtering changes.</template>
                <template slot="type"><code>({ page: Number, rowsPerPage: Number, filter: String }) => {}</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">header</template>
                <template slot="description">Slot for table header. Used for replacing table <code>&lt;th&gt;</code> elements.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">row</template>
                <template slot="description">Slot for table row. Used for replacing table <code>&lt;td&gt;</code> elements for each row.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">footer</template>
                <template slot="description">Slot for table footer. Used for replacing table <code>&lt;th&gt;</code> elements.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">header-wrapper</template>
                <template slot="description">Slot for table header wrapper. Used for replacing table header wrapper elements.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">footer-wrapper</template>
                <template slot="description">Slot for table footer wrapper. Used for replacing table footer wrapper elements.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">expand</template>
                <template slot="description">Slot for row expansion.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">filtering-no-results</template>
                <template slot="description">Slot for replacing filtering message when there are no results.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for the datatable component. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Datatable" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$datatable-cell-padding</template>
                <template slot="default"><code>0.75rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-cell-padding-sm</template>
                <template slot="default"><code>0.3rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-header-margin-bottom</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-footer-margin-top</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-border-color</template>
                <template slot="default"><code>$border-color</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-sortable-icon-color</template>
                <template slot="default"><code>$color-gray-50</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-sortable-icon-color-active</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-pagination-selector-margin-bottom</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-pagination-selector-margin-left</template>
                <template slot="default"><code>$spacers-1-2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-pagination-selector-margin-right</template>
                <template slot="default"><code>$spacer-1-2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-pagination-margin-bottom</template>
                <template slot="default"><code>$spacer-1-2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$transition-datatable</template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-variant-{variant}</template>
                <template slot="default"><code>datatable-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$datatable-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $datatable-variant-light,
    dark: $datatable-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">datatable-variant</template>
<template slot="default-row">
                
~~~scss
@function datatable-variant($variant) {
    $datatable-variant-color: variant-color-by-luminance($variant, $datatable-color-for-light-variant, $datatable-color-for-dark-variant);
    $datatable-variant-background: $variant;
    $datatable-variant-background-hover: variant-color-by-luminance($variant, darken-lightness($variant, 10%), lighten-lightness($variant, 10%));
    $datatable-variant-background-striped: variant-color-by-luminance($variant, darken-lightness($variant, 5%), lighten-lightness($variant, 5%));
    $datatable-variant-border-color: darken($variant, 10%);

    $variant-map: (
        color: $datatable-variant-color,
        background: $datatable-variant-background,
        background-hover: $datatable-variant-background-hover,
        background-striped: $datatable-variant-background-striped,
        border-color: $datatable-variant-border-color,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 

