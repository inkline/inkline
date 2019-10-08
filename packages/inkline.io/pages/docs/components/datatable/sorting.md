# Data Table Sorting
Inkline's Data Table columns are easily sortable (orderable), in both ascending and descending order. {.lead}

### Default Sorting
By setting the `sortable` column property to `true`, you can easily add sorting support to a data table column.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name', sortable: true },
                { title: 'Email', key: 'email', sortable: true },
                { title: 'Age', key: 'age', sortable: true }
            ],
            rows: [ ... ]
        }
    }
}
~~~

By default, sorting for the `string`, `number` and `Date` value types is supported natively. 

<i-code-preview title="Data Table Default Sorting" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columns" :rows="rows" />

<template v-slot:html>

~~~html
<i-datatable :columns="columns" :rows="rows" />
~~~

</template>
<template v-slot:js>

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name', sortable: true },
                { title: 'Email', key: 'email', sortable: true },
                { title: 'Age', key: 'age', sortable: true }
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', email: 'richard.hendricks@email.com', age: 26 },
                { id: '2', name: 'Bertram Gilfoyle', email: 'bertram.gilfoyle@email.com', age: 30 },
                { id: '3', name: 'Dinesh Chugtai', email: 'dinesh.chugtai@email.com', age: 30 },
                { id: '4', name: 'Jared Dunn', email: 'jared.dunn@email.com', age: 35 },
                { id: '5', name: 'Erlich Bachman', email: 'erlich.bachman@email.com', age: 32 }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>


### Custom Sorting
You can provide a custom sorting function to be used inside the data array `sort()` method by providing a `sort` property on the column. This allows you to sort elements based on extra criteria. 

The two arguments for the custom sort function are the two rows being compared:

~~~js
const customSort = (a, b) => {
    if (a.field > b.field) {
        return 1;
    }
    
    if (a.field < b.field) {
        return -1;
    }
    
    return 0;
};
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name', sortable: true, sortFn: customSort },
                { title: 'Email', key: 'email' },
                { title: 'Age', key: 'age' }
            ],
            rows: [ ... ]
        }
    }
}
~~~

<i-code-preview title="Data Table Custom Sorting" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="customSortColumns" :rows="rows" />

<template v-slot:html>

~~~html
<i-datatable :columns="columns" :rows="rows" />
~~~

</template>
<template v-slot:js>

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name', sortable: true, sortFn: customSort },
                { title: 'Email', key: 'email' },
                { title: 'Age', key: 'age' }
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', email: 'richard.hendricks@email.com', age: 26 },
                { id: '2', name: 'Bertram Gilfoyle', email: 'bertram.gilfoyle@email.com', age: 30 },
                { id: '3', name: 'Dinesh Chugtai', email: 'dinesh.chugtai@email.com', age: 30 },
                { id: '4', name: 'Jared Dunn', email: 'jared.dunn@email.com', age: 35 },
                { id: '5', name: 'Erlich Bachman', email: 'erlich.bachman@email.com', age: 32 }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>
