# Data Table Scrolling
Inkline's Data Table supports a large number of columns easily using horizontal scrolling and sticky columns. {.lead}

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Position', path: 'position' },
                { title: 'Age', path: 'age' },
                { title: 'City', path: 'address.city' },
                { title: 'Country', path: 'address.country' },
                { title: 'Email', path: 'email' }
            ],
            rows: [ ... ]
        }
    }
}
~~~

By default, sorting for the `string`, `number` and `Date` value types is supported natively. 

<i-code-preview title="Data Table Default Scrolling" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columns" :rows="rows" nowrap />

<template v-slot:html>

~~~html
<i-datatable :columns="columns" :rows="rows" nowrap />
~~~

</template>
<template v-slot:js>

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Position', path: 'position' },
                { title: 'Age', path: 'age' },
                { title: 'City', path: 'address.city' },
                { title: 'Country', path: 'address.country' },
                { title: 'Email', path: 'email' }
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', email: 'richard.hendricks@email.com', age: 26, address: { city: 'Cupertino', country: 'United States' }, position: 'Chief Executive Officer' },
                { id: '2', name: 'Bertram Gilfoyle', email: 'bertram.gilfoyle@email.com', age: 30, address: { city: 'Toronto', country: 'Canada' }, position: 'System Administrator' },
                { id: '3', name: 'Dinesh Chugtai', email: 'dinesh.chugtai@email.com', age: 30, address: { city: 'Lahore', country: 'Pakistan' }, position: 'Software Developer' },
                ...
            ]
        }
    }
}
~~~

</template>
</i-code-preview>


### Sticky Columns
By setting the `sticky` column property to `true`, you can easily make columns stick while scrolling horizontally.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name', sticky: true },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age' },
                ...
            ],
            rows: [ ... ]
        }
    }
}
~~~


<i-code-preview title="Data Table Default Scrolling" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columnsSticky" :rows="rows" :count-column="countColumn" nowrap />

<template v-slot:html>

~~~html
<i-datatable :columns="columns" :rows="rows" :count-column="countColumn" nowrap />
~~~

</template>
<template v-slot:js>

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name', sticky: true },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age' },
                ...
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



