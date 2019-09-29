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
                { title: 'Date', key: 'date', sortable: true },
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
                { title: 'Date', key: 'date', sortable: true },
                { title: 'Age', key: 'age', sortable: true }
            ],
            rows: [
                { id: '1', name: 'Alice Spring', email: 'alice.spring@email.com', date: '2016/04/25', age: 26 },
                { id: '2', name: 'Connie Tenamn', email: 'connie.tenman@email.com', date: '2019/07/07', age: 30 },
                { id: '3', name: 'John Reid', email: 'john.reid@email.com', date: '2018/05/12', age: 28 },
                { id: '4', name: 'Robert Smith', email: 'robert.smith@email.com', date: '2017/08/16', age: 34 },
                { id: '5', name: 'Lisa Hendricks', email: 'lisa.hendricks@email.com', date: '2014/12/01', age: 31 }
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
                { title: 'Date', key: 'date' },
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
                { title: 'Date', key: 'date' },
                { title: 'Age', key: 'age' }
            ],
            rows: [
                { id: '1', name: 'Alice Spring', email: 'alice.spring@email.com', date: '2016/04/25', age: 26 },
                { id: '2', name: 'Connie Tenamn', email: 'connie.tenman@email.com', date: '2019/07/07', age: 30 },
                { id: '3', name: 'John Reid', email: 'john.reid@email.com', date: '2018/05/12', age: 28 },
                { id: '4', name: 'Robert Smith', email: 'robert.smith@email.com', date: '2017/08/16', age: 34 },
                { id: '5', name: 'Lisa Hendricks', email: 'lisa.hendricks@email.com', date: '2014/12/01', age: 31 }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>
