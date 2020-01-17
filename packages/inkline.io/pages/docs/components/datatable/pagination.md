# Data Table Pagination
Inkline's Data Table provides you with efficient automated pagination features. {.lead}

### Basic Pagination
Pagination is enabled by default and can be changed using the `pagination` attribute if needed.

<i-code-preview title="Data Table Default Pagination" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columns" :rows="rows" pagination />

<template v-slot:html>

~~~html
<i-datatable :columns="columns" :rows="rows" pagination />
~~~

</template>
<template v-slot:js>

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

<i-code-preview title="Data Table Disabled Pagination" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columns" :rows="rowsShort" :pagination="false" />

<template v-slot:html>

~~~html
<i-datatable :columns="columns" :rows="rows" :pagination="false" />
~~~

</template>
<template v-slot:js>

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
