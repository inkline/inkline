---
title: Data Table Sorting
description: Inkline's Data Table columns are easily sortable (orderable), in both ascending and descending order. 
---

# Data Table Sorting
## Inkline's Data Table columns are easily sortable (orderable), in both ascending and descending order. 

### Default Sorting
By setting the `sortable` column property to `true`, you can easily add sorting support to a data table column.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name', sortable: true },
                { title: 'Email', path: 'email', sortable: true },
                { title: 'Age', path: 'age', sortable: true }
            ],
            rows: [ ... ]
        }
    }
}
~~~

By default, sorting for the `string`, `number` and `Date` value types is supported natively. 

<i-code title="Data Table Default Sorting">
<i-tab type="preview">
    <i-datatable :columns="columns" :rows="rows" />
</i-tab>
<i-tab type="html">

~~~html
<i-datatable :columns="columns" :rows="rows" />
~~~

</i-tab>
<i-tab type="js">

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
                { id: '5', name: 'Erlich Bachman', email: 'erlich.bachman@email.com', age: 32 }
            ]
        }
    }
}
~~~

</i-tab>
</i-code>
