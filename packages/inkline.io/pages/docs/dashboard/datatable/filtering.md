# Data Table Filtering
Inkline's Data Table rows are easily and efficiently filtered using a fuzzy search algorithm. {.lead}

### Default Filtering
Filtering is enabled by default and can be changed using the `filterable` attribute if needed.

<i-code-preview title="Data Table Default Filtering" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

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
                { title: 'Name', path: 'name' },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age' }
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


### Selective Filtering
By setting the `filterable` column property to `true`, you can easily add filtering support to specific table columns. 

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name', filterable: true },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age' }
            ],
            rows: [ ... ]
        }
    }
}
~~~

<i-code-preview title="Data Table Selective Filtering" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="selectiveFilteringColumns" :rows="rows" />

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
                { title: 'Name', path: 'name', filterable: true },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age' }
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
