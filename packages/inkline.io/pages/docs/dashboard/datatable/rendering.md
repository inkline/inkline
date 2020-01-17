# Data Table Rendering
Inkline's Data Table columns and rows can be rendered using custom render helpers. {.lead}

Inkline provides four ways to render data table fields:
- Data Path <span class="_text-muted">(default)</span>
- Render function
- Custom component
- Scoped slot

### Data Path
By default, table data is rendered using the `path` property of each column. The `path` property is a string (i.e. `address.country`) that points to the data that will be rendered for each row.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country' },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ]
        }
    }
}
~~~

<i-code-preview title="Data Table Path" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">
<i-datatable :columns="dataPathColumns" :rows="rows" />
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
                { title: 'Address', path: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>

### Render Function
By adding a function in the `render` property of the column definition, you can easily provide a way to manipulate data or display it differently. This is the simplest option, the perfect choice when working with simple strings.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Address', path: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ]
        }
    }
}
~~~

Keep in mind that, by providing a custom `render` function, you will need to provide a custom `sort` function as well.

<i-code-preview title="Data Table Render Function" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">
<i-datatable :columns="renderColumns" :rows="rows" />
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
                { title: 'Address', path: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>


### Custom Component
You can render a table field using a component by specifying a `component` field in the table columns definition. 

The rendered component will have table data passed to it using the `row`, `column` and `index` props.

<div v-pre>

~~~js
export default {
    name: 'MyCustomComponent',
    props: ['row', 'column', 'index'],
    template: '<div>{{row.data}}</div>'
};
~~~

~~~js
import MyCustomComponent from '@components/MyCustomComponent';

export default {
    data() {
        return {
            columns: [
                { title: 'Data', path: 'data', component: MyCustomComponent },
            ],
            rows: [
                { id: '1', data: 100 },
                { id: '2', data: 55 },
                { id: '3', data: 70 }
            ]
        }
    }
}
~~~

</div>

Here's an example for how to display a progress bar component on each row:

<i-code-preview title="Data Table Custom Component" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">
<i-datatable :columns="componentColumns" :rows="componentRows"></i-datatable>
<template v-slot:html>
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows"></i-datatable>
~~~

</div>
</template>
<template v-slot:js>

~~~js
export default {
    name: 'TableProgress',
    props: ['row', 'column', 'index'],
    template: `<i-progress>
        <i-progress-bar :value="row.progress" />
    </i-progress>`
};
~~~

~~~js
import TableProgress from '@components/TableProgress';

export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Address', path: 'address', component: 'Address' },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', progress: 82 },
                { id: '2', name: 'Bertram Gilfoyle', progress: 55 },
                { id: '3', name: 'Dinesh Chugtai', progress: 70 },
                { id: '4', name: 'Jared Dunn', progress: 36 },
                { id: '5', name: 'Erlich Bachman', progress: 95 }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>

<i-alert variant="info" class="-code _margin-top-1">
<i-icon icon="info" size="lg" slot="icon"></i-icon>

The `component` field can either contain the **component object** (most common) or the **component tag** as a string (i.e. `my-custom-component`), if it has been globally registered.

</i-alert>

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
<i-datatable :columns="renderColumns" :rows="rows">
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
                { title: 'Name', path: 'name' },
                { title: 'Address', path: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
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
                { title: 'Name', path: 'name' },
                { title: 'Address', path: 'address', renderHeader: (column) => column.title.toUpperCase() },
            ],
            rows: [ ... ]
        }
    }
}
~~~

<i-code-preview title="Data Table Render Header Function" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">
<i-datatable :columns="renderHeaderColumns" :rows="rows" />
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
                { title: 'Address', path: 'address', renderHeader: (column) => column.title.toUpperCase() },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>


### Custom Header Component
You can render a table field using a component by specifying a `component` field in the table columns definition. This field will contain the component tag. 

The rendered component will have table data passed to it using the `row`, `column` and `index` props.

<div v-pre>

~~~js
export default {
    name: 'MyCustomComponent',
    props: ['column', 'index'],
    template: '<div>{{column.title}}</div>'
};
~~~

~~~js
import MyCustomComponent from '@components/MyCustomComponent';

export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Progress', path: 'progress', headerComponent: MyCustomComponent },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', progress: 82 },
                { id: '2', name: 'Bertram Gilfoyle', progress: 55 },
                { id: '3', name: 'Dinesh Chugtai', progress: 70 },
                { id: '4', name: 'Jared Dunn', progress: 36 },
                { id: '5', name: 'Erlich Bachman', progress: 95 }
            ]
        }
    }
}
~~~

</div>

Here's a practical example where the header component contains a dropdown:

<i-code-preview title="Data Table Custom Component" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">
<i-datatable :columns="headerComponentColumns" :rows="rows"></i-datatable>
<template v-slot:html>
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows"></i-datatable>
~~~

</div>
</template>
<template v-slot:js>

~~~js
export default {
    name: 'TableHeaderButton',
    props: ['column', 'index'],
    template: `<i-dropdown>
       <span class="_cursor-pointer">
           Country <i-icon icon="caret-down" class="_margin-left-1-2"></i-icon>
       </span>
       <i-dropdown-menu>
           <i-dropdown-item href="">Reset</i-dropdown-item>
           <i-dropdown-item href="">Show all</i-dropdown-item>
       </i-dropdown-menu>
   </i-dropdown>`
};
~~~

~~~js
import TableHeaderButton from '@components/TableHeaderButton';

export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country', headerComponent: TableHeaderButton },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>

<i-alert variant="info" class="-code _margin-top-1">
<i-icon icon="info" size="lg" slot="icon"></i-icon>

The `headerComponent` field can either contain the **component object** (most common) or the **component tag** as a string (i.e. `my-custom-component`), if it has been globally registered.

</i-alert>

### Scoped Header Slot
By providing a scoped `header` slot, you can render the datatable header as you see fit.

<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:header="{ sortBy }">
        <td class="_text-right">No.</td>
        <td>Name</td>
        <td>Country</td>
    </template>
</i-datatable>
~~~

</div>

Keep in mind that, by providing a custom `render` function, you will need to provide a custom `sort` function as well.

<i-code-preview title="Data Table Scoped Slot" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">
<i-datatable :columns="dataPathColumns" :rows="rows">
    <template v-slot:header="{ sortBy }">
        <th class="_text-right">No.</th>
        <th>Name</th>
        <th>Country</th>
    </template>
</i-datatable>
<template v-slot:html>
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:row="{ row, index }">
        <td class="_text-right">{{index + 1}}</td>
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
                { title: 'Name', path: 'name' },
                { title: 'Address', path: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>
