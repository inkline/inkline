# Data Table Rendering
Inkline's Data Table columns and rows can be rendered using custom render helpers. {.lead}

Inkline provides three ways to render data table fields:
- Render function
- Custom component
- Scoped slot

### Render Function
By adding a function in the `render` property of the column definition, you can easily provide a way to manipulate data or display it differently. This is the simplest option, the perfect choice when working with simple strings.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', address: { city: 'Los Angeles', country: 'United States' } },
                { id: '2', name: 'Connie Tenamn', address: { city: 'Munich', country: 'Germany' } },
                { id: '3', name: 'John Reid', address: { city: 'Timisoara', country: 'Romania' } },
                { id: '4', name: 'Robert Smith', address: { city: 'London', country: 'England' } },
                { id: '5', name: 'Lisa Hendricks', address: { city: 'Melbourne', country: 'Australia' } }
            ]
        }
    }
}
~~~

Keep in mind that, by providing a custom `render` function, you will need to provide a custom `sort` function as well.

<i-code-preview title="Data Table Render Function" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

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
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', address: { city: 'Los Angeles', country: 'United States' } },
                { id: '2', name: 'Connie Tenamn', address: { city: 'Munich', country: 'Germany' } },
                { id: '3', name: 'John Reid', address: { city: 'Timisoara', country: 'Romania' } },
                { id: '4', name: 'Robert Smith', address: { city: 'London', country: 'England' } },
                { id: '5', name: 'Lisa Hendricks', address: { city: 'Melbourne', country: 'Australia' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>


### Custom Component
You can render a table field using a component by specifying a `component` field in the table columns definition. This field will contain the component tag. 

The rendered component will have table data passed to it using the `row`, `column` and `index` props.

<div v-pre>

~~~js
Vue.component('TableProgress', {
    name: 'TableProgress',
    props: ['row', 'column', 'index'],
    template: `<i-progress>
        <i-progress-bar :value="row.progress" />
    </i-progress>`
});
~~~

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', component: 'table-progress' },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', progress: 82 },
                { id: '2', name: 'Connie Tenamn', progress: 55 },
                { id: '3', name: 'John Reid', progress: 70 },
                { id: '4', name: 'Robert Smith', progress: 36 },
                { id: '5', name: 'Lisa Hendricks', progress: 95 }
            ]
        }
    }
}
~~~

</div>

<i-code-preview title="Data Table Custom Component" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columnsComponent" :rows="rowsComponent"></i-datatable>

<template v-slot:html>
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows"></i-datatable>
~~~

</div>
</template>
<template v-slot:js>

~~~js
Vue.component('TableProgress', {
    name: 'TableProgress',
    props: ['row', 'column', 'index'],
    template: `<i-progress>
        <i-progress-bar :value="row.progress" />
    </i-progress>`
});
~~~

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', component: 'Address' },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', progress: 82 },
                { id: '2', name: 'Connie Tenamn', progress: 55 },
                { id: '3', name: 'John Reid', progress: 70 },
                { id: '4', name: 'Robert Smith', progress: 36 },
                { id: '5', name: 'Lisa Hendricks', progress: 95 }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>

<i-alert variant="info" class="-code"><template v-slot:icon><i class="icon -info h3"></i></template>Keep in mind that the component needs to be registered globally using `Vue.component` to be able to use it with data table definition.</i-alert>

### Scoped Slot
By providing a scoped `row` slot, you can render rows as you see fit.

<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:row="{ row, index }">
        <td align="right">{{index + 1}}</td>
        <td>{{row.name}}</td>
        <td>{{row.address.city}}, {{row.address.country}}</td>
    </template>
</i-datatable>
~~~

</div>

Keep in mind that, by providing a custom `render` function, you will need to provide a custom `sort` function as well.

<i-code-preview title="Data Table Scoped Slot" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columns" :rows="rows">
    <template v-slot:row="{ row, index }">
        <td align="right">{{index + 1}}</td>
        <td>{{row.name}}</td>
        <td>{{row.address.city}}, {{row.address.country}}</td>
    </template>
</i-datatable>

<template v-slot:html>
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:row="{ row, index }">
        <td align="right">{{index + 1}}</td>
        <td>{{row.name}}</td>
        <td>{{row.address.city}}, {{row.address.country}}</td>
    </template>
</i-datatable>
~~~

</div>
</template>
<template v-slot:js>

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', address: { city: 'Los Angeles', country: 'United States' } },
                { id: '2', name: 'Connie Tenamn', address: { city: 'Munich', country: 'Germany' } },
                { id: '3', name: 'John Reid', address: { city: 'Timisoara', country: 'Romania' } },
                { id: '4', name: 'Robert Smith', address: { city: 'London', country: 'England' } },
                { id: '5', name: 'Lisa Hendricks', address: { city: 'Melbourne', country: 'Australia' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>


### Render Header Function
By adding a function in the `renderHeader` property of the column definition, you can easily provide a way to manipulate table headers. This is the simplest option, the perfect choice when working with simple strings.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', renderHeader: (column) => column.title.toUpperCase() },
            ],
            rows: [ ... ]
        }
    }
}
~~~

<i-code-preview title="Data Table Render Header Function" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columnsHeader" :rows="rows" />

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
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', renderHeader: (column) => column.title.toUpperCase() },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', address: { city: 'Los Angeles', country: 'United States' } },
                { id: '2', name: 'Connie Tenamn', address: { city: 'Munich', country: 'Germany' } },
                { id: '3', name: 'John Reid', address: { city: 'Timisoara', country: 'Romania' } },
                { id: '4', name: 'Robert Smith', address: { city: 'London', country: 'England' } },
                { id: '5', name: 'Lisa Hendricks', address: { city: 'Melbourne', country: 'Australia' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>


### Custom Component
You can render a table field using a component by specifying a `component` field in the table columns definition. This field will contain the component tag. 

The rendered component will have table data passed to it using the `row`, `column` and `index` props.

<div v-pre>

~~~js
Vue.component('TableProgress', {
    name: 'TableProgress',
    props: ['row', 'column', 'index'],
    template: `<i-progress>
        <i-progress-bar :value="row.progress" />
    </i-progress>`
});
~~~

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', component: 'table-progress' },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', progress: 82 },
                { id: '2', name: 'Connie Tenamn', progress: 55 },
                { id: '3', name: 'John Reid', progress: 70 },
                { id: '4', name: 'Robert Smith', progress: 36 },
                { id: '5', name: 'Lisa Hendricks', progress: 95 }
            ]
        }
    }
}
~~~

</div>

<i-code-preview title="Data Table Custom Component" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columnsComponent" :rows="rowsComponent"></i-datatable>

<template v-slot:html>
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows"></i-datatable>
~~~

</div>
</template>
<template v-slot:js>

~~~js
Vue.component('TableProgress', {
    name: 'TableProgress',
    props: ['row', 'column', 'index'],
    template: `<i-progress>
        <i-progress-bar :value="row.progress" />
    </i-progress>`
});
~~~

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', component: 'Address' },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', progress: 82 },
                { id: '2', name: 'Connie Tenamn', progress: 55 },
                { id: '3', name: 'John Reid', progress: 70 },
                { id: '4', name: 'Robert Smith', progress: 36 },
                { id: '5', name: 'Lisa Hendricks', progress: 95 }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>

<i-alert variant="info" class="-code"><template v-slot:icon><i class="icon -info h3"></i></template>Keep in mind that the component needs to be registered globally using `Vue.component` to be able to use it with data table definition.</i-alert>

### Scoped Slot
By providing a scoped `row` slot, you can render rows as you see fit.

<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:row="{ row, index }">
        <td align="right">{{index + 1}}</td>
        <td>{{row.name}}</td>
        <td>{{row.address.city}}, {{row.address.country}}</td>
    </template>
</i-datatable>
~~~

</div>

Keep in mind that, by providing a custom `render` function, you will need to provide a custom `sort` function as well.

<i-code-preview title="Data Table Scoped Slot" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columns" :rows="rows">
    <template v-slot:row="{ row, index }">
        <td align="right">{{index + 1}}</td>
        <td>{{row.name}}</td>
        <td>{{row.address.city}}, {{row.address.country}}</td>
    </template>
</i-datatable>

<template v-slot:html>
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:row="{ row, index }">
        <td align="right">{{index + 1}}</td>
        <td>{{row.name}}</td>
        <td>{{row.address.city}}, {{row.address.country}}</td>
    </template>
</i-datatable>
~~~

</div>
</template>
<template v-slot:js>

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', address: { city: 'Los Angeles', country: 'United States' } },
                { id: '2', name: 'Connie Tenamn', address: { city: 'Munich', country: 'Germany' } },
                { id: '3', name: 'John Reid', address: { city: 'Timisoara', country: 'Romania' } },
                { id: '4', name: 'Robert Smith', address: { city: 'London', country: 'England' } },
                { id: '5', name: 'Lisa Hendricks', address: { city: 'Melbourne', country: 'Australia' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>
