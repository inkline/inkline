# Data Table Pagination
Inkline's Data Table provides you with efficient automated pagination features. {.lead}

### Basic Pagination
Pagination is enabled by default and can be changed using the `pagination` attribute if needed.

<i-code-preview title="Data Table Default Pagination">
<i-datatable :columns="columns" :rows="rows" pagination></i-datatable>
<template slot="html">

~~~html
<i-datatable :columns="columns" :rows="rows" pagination />
~~~

</template>
<template slot="js">

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name', sortable: true },
                { title: 'Email', path: 'email', sortable: true },
                { title: 'Age', path: 'age', sortable: true }
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', email: 'richard.hendricks@email.com', age: 26 },
                { id: '2', name: 'Bertram Gilfoyle', email: 'bertram.gilfoyle@email.com', age: 30 },
                { id: '3', name: 'Dinesh Chugtai', email: 'dinesh.chugtai@email.com', age: 30 },
                { id: '4', name: 'Jared Dunn', email: 'jared.dunn@email.com', age: 35 },
                { id: '5', name: 'Erlich Bachman', email: 'erlich.bachman@email.com', age: 32 },
                { id: '6', name: 'Nelson Bighetti', email: 'nelson.bighetti@email.com', age: 26 },
                ...
            ]
        }
    }
}
~~~

</template>
</i-code-preview>

### Disable Pagination
Pagination can be disabled by setting the `pagination` attribute to `false`.

<i-code-preview title="Data Table Disabled Pagination">
<i-datatable :columns="columns" :rows="rowsShort" :pagination="false"></i-datatable>
<template slot="html">

~~~html
<i-datatable :columns="columns" :rows="rows" :pagination="false" >
~~~

</template>
<template slot="js">

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name', sortable: true },
                { title: 'Email', path: 'email', sortable: true },
                { title: 'Age', path: 'age', sortable: true }
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', email: 'richard.hendricks@email.com', age: 26 },
                { id: '2', name: 'Bertram Gilfoyle', email: 'bertram.gilfoyle@email.com', age: 30 },
                { id: '3', name: 'Dinesh Chugtai', email: 'dinesh.chugtai@email.com', age: 30 },
                { id: '4', name: 'Jared Dunn', email: 'jared.dunn@email.com', age: 35 },
                { id: '5', name: 'Erlich Bachman', email: 'erlich.bachman@email.com', age: 32 },
                { id: '6', name: 'Nelson Bighetti', email: 'nelson.bighetti@email.com', age: 26 },
                ...
            ]
        }
    }
}
~~~

</template>
</i-code-preview>

### Pagination Configuration
Pagination can be configured by providing an object for the `pagination` attribute. The default configuration is as follows:

~~~js
export default {
    ...
    data() {
        return {
            pagination: {
                limit: { xs: 3, sm: 5 },
                size: 'md',
                variant: 'light',
                rowsPerPage: 10,
                rowsPerPageOptions: [10, 25, 50, 100]
            }
        };
    }
}       
~~~

~~~html
<i-datatable :columns="columns" :rows="rows" :pagination="pagination" />
~~~

### Async Pagination
Pagination can be handled asynchronously by setting the `async` attribute to `true` and providing an appropriate `rows-count` attribute.

This will tell the DataTable component to only display the rows and let the pagination handling be done asynchronously and externally using the `update` event. 

<i-alert variant="info" class="-code">
<template slot="icon"><i-icon icon="info"></i-icon></template>

The first `update` event occurs when the DataTable is `created`.

</i-alert>

<i-code-preview title="Data Table Async Pagination">
<i-datatable async :columns="columns" :rows="asyncRows" :rows-count="rowsCount" @update="onUpdate"></i-datatable>
<template slot="html">

~~~html
<i-datatable async :columns="columns" :rows="rows" :rows-count="rowsCount" @update="onUpdate" />
~~~

</template>
<template slot="js">

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name', sortable: true },
                { title: 'Email', path: 'email', sortable: true },
                { title: 'Age', path: 'age', sortable: true }
            ],
            rows: [],
            rowsCount: 0
        }
    },
    methods: {
        onUpdate(event) {
            getRowsAsync(event.page, event.rowsPerPage).then((response) => {
                this.rows = response.data.rows;
                this.rowsCount = response.data.rowsCount;
            });
        }       
    }
}
~~~

</template>
</i-code-preview>
