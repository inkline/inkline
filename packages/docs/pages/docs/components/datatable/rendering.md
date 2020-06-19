---
title: Data Table Rendering
description: Inkline's Data Table columns and rows can be rendered using custom render helpers. 
---

# Data Table Rendering
## Inkline's Data Table columns and rows can be rendered using custom render helpers. 

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

<i-code title="Data Table Path">
<i-tab type="preview">
    <i-datatable :columns="dataPathColumns" :rows="rows" />
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

</i-tab>
</i-code>


### Styling
You can provide classes and inline styles for both columns and rows. Column specific styles and classes will be applied to all `<td>` table data cells that are under a specific column:

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name', class: 'column-class' },
                { title: 'Country', path: 'address.country', style: { background: 'red' } },
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

Row styles and classes will be applied to the `<tr>` wrapper if specified using the `row.config` property. 

You can also apply column specific classes and styles to a `<td>` table data cell of a row using `row.config.columns[column.path]`. A column path of `*` will apply to all child table data cells of the row.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country' },
            ],
            rows: [
                { 
                    id: '1', 
                    name: 'Richard Hendricks', 
                    address: { city: 'Cupertino', country: 'United States' },
                    config: {
                        class: 'row-class'
                    }
                },
                { 
                    id: '2', 
                    name: 'Bertram Gilfoyle', 
                    address: { city: 'Toronto', country: 'Canada' },
                    config: {
                        style: { 'font-weight': 'bold' }
                    }
                },
                { 
                    id: '3', 
                    name: 'Dinesh Chugtai', 
                    address: { city: 'Lahore', country: 'Pakistan' },
                    config: {
                        columns: {
                            '*': { class: [ 'column-class-a', 'column-class-b' ] }
                        }   
                    }
                },
                { 
                    id: '4', 
                    name: 'Jared Dunn', 
                    address: { city: 'Berlin', country: 'Germany' },
                    config: {
                        columns: {
                            name: { class: [ 'name-column-class' ] }
                        }   
                    }
                },
                { 
                    id: '5', 
                    name: 'Erlich Bachman', 
                    address: { city: 'Palo Alto', country: 'United States' },
                    config: {
                        columns: {
                            name: { style: { background: 'red' } }
                        }   
                    } 
                }
            ]
        }
    }
}
~~~

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

<i-code title="Data Table Render Function">
<i-tab type="preview">
    <i-datatable :columns="renderColumns" :rows="rows" />
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

</i-tab>
</i-code>


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

<i-code title="Data Table Custom Component">
<i-tab type="preview">
    <i-datatable :columns="componentColumns" :rows="componentRows"></i-datatable>
</i-tab>
<i-tab type="html">
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows"></i-datatable>
~~~

</div>
</i-tab>
<i-tab type="js">

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

</i-tab>
</i-code>

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

<i-code title="Data Table Scoped Slot">
<i-tab type="preview">
    <i-datatable :columns="renderColumns" :rows="rows">
        <template v-slot:row="{ row, index }">
            <td align="right">{{index + 1}}</td>
            <td>{{row.name}}</td>
            <td>{{row.address.city}}, {{row.address.country}}</td>
        </template>
    </i-datatable>
</i-tab>
<i-tab type="html">
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
</i-tab>
<i-tab type="js">

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

</i-tab>
</i-code>


### Render Header Function
By adding a function in the `renderHeader` property of the column definition, you can easily manipulate table headers. This is the simplest option, the perfect choice when working with simple strings.

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

<i-code title="Data Table Render Header Function">
<i-tab type="preview">
    <i-datatable :columns="renderHeaderColumns" :rows="rows" />
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

</i-tab>
</i-code>


### Custom Header Component
You can render a table field using a component by specifying a `headerComponent` field in the table columns definition. This field will contain the component tag. 

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

<i-code title="Data Table Custom Header Component">
<i-tab type="preview">
    <i-datatable :columns="headerComponentColumns" :rows="rows"></i-datatable>
</i-tab>
<i-tab type="html">
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows"></i-datatable>
~~~

</div>
</i-tab>
<i-tab type="js">

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

</i-tab>
</i-code>

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

<i-code title="Data Table Scoped Header Slot">
<i-tab type="preview">
    <i-datatable :columns="dataPathColumns" :rows="rows">
        <template v-slot:header="{ sortBy }">
            <th class="_text-right">No.</th>
            <th>Name</th>
            <th>Country</th>
        </template>
    </i-datatable>
</i-tab>
<i-tab type="html">
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
</i-tab>
<i-tab type="js">

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

</i-tab>
</i-code>

### Header Wrapper Slot
By providing a scoped `header-wrapper` slot, you can render the datatable search, entries selector and pagination as you see fit.

<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:header-wrapper="{ rowsFrom, rowsTo, rowsCount, page, rowsPerPage, filter, onPageChange, onRowsPerPageChange, onFilterChange }">
        <i-input @input="onFilterChange" placeholder="Search.." />
        <div>
            <i-button :active="rowsPerPage === 10" @click="onRowsPerPageChange(10)">10</i-button>
            <i-button :active="rowsPerPage === 25" @click="onRowsPerPageChange(25)">25</i-button>
            <i-button :active="rowsPerPage === 50" @click="onRowsPerPageChange(50)">50</i-button>
        </div>
    </template>
</i-datatable>
~~~

</div>

<i-code title="Data Table Header Wrapper Slot">
<i-tab type="preview">
    <i-datatable :columns="dataPathColumns" :rows="wrapperRows">
        <template v-slot:header-wrapper="{ rowsFrom, rowsTo, rowsCount, page, rowsPerPage, filter, onPageChange, onRowsPerPageChange, onFilterChange }">
            <i-input :value="filter" @input="onFilterChange" placeholder="Search.." />
            <div>
                <i-button class="_margin-0" :active="rowsPerPage === 10" @click="onRowsPerPageChange(10)">10</i-button>
                <i-button class="_margin-0" :active="rowsPerPage === 25" @click="onRowsPerPageChange(25)">25</i-button>
                <i-button class="_margin-0" :active="rowsPerPage === 50" @click="onRowsPerPageChange(50)">50</i-button>
            </div>
        </template>
    </i-datatable>
</i-tab>
<i-tab type="html">
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:header-wrapper="{ rowsFrom, rowsTo, rowsCount, page, rowsPerPage, filter, onPageChange, onRowsPerPageChange, onFilterChange }">
        <i-input @input="onFilterChange" placeholder="Search.." />
        <div>
            <i-button :active="rowsPerPage === 10" @click="onRowsPerPageChange(10)">10</i-button>
            <i-button :active="rowsPerPage === 25" @click="onRowsPerPageChange(25)">25</i-button>
            <i-button :active="rowsPerPage === 50" @click="onRowsPerPageChange(50)">50</i-button>
        </div>
    </template>
</i-datatable>
~~~

</div>
</i-tab>
<i-tab type="js">

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

</i-tab>
</i-code>


### Render Footer Function
By adding a function in the `renderFooter` property of the column definition, you can easily manipulate table footers. This is the simplest option, the perfect choice when working with simple strings.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Address', path: 'address', renderFooter: (column) => column.title.toUpperCase() },
            ],
            rows: [ ... ]
        }
    }
}
~~~

<i-code title="Data Table Render Header Function">
<i-tab type="preview">
    <i-datatable :columns="renderFooterColumns" :rows="rows" />
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

</i-tab>
</i-code>


### Custom Footer Component
You can render a table field using a component by specifying a `footerComponent` field in the table columns definition. This field will contain the component tag. 

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
                { title: 'Progress', path: 'progress', footerComponent: MyCustomComponent },
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

<i-code title="Data Table Custom Footer Component">
<i-tab type="preview">
    <i-datatable :columns="footerComponentColumns" :rows="rows"></i-datatable>
</i-tab>
<i-tab type="html">
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows"></i-datatable>
~~~

</div>
</i-tab>
<i-tab type="js">

~~~js
export default {
    name: 'TableFooterButton',
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
import TableHeaderButton from '@components/TableFooterButton';

export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country', headerComponent: TableFooterButton },
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

</i-tab>
</i-code>

<i-alert variant="info" class="-code _margin-top-1">
<i-icon icon="info" size="lg" slot="icon"></i-icon>

The `footerComponent` field can either contain the **component object** (most common) or the **component tag** as a string (i.e. `my-custom-component`), if it has been globally registered.

</i-alert>

### Scoped Footer Slot
By providing a scoped `footer` slot, you can render the datatable footer as you see fit.

<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template slot="footer">
        <td class="_text-right">No.</td>
        <td>Name</td>
        <td>Country</td>
    </template>
</i-datatable>
~~~

</div>

Keep in mind that, by providing a custom `render` function, you will need to provide a custom `sort` function as well.

<i-code title="Data Table Scoped Footer Slot">
<i-tab type="preview">
    <i-datatable :columns="dataPathColumns" :rows="rows">
        <template slot="footer">
            <th class="_text-right">No.</th>
            <th>Name</th>
            <th>Country</th>
        </template>
    </i-datatable>
</i-tab>
<i-tab type="html">
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
</i-tab>
<i-tab type="js">

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

</i-tab>
</i-code>

### Footer Wrapper Slot
By providing a scoped `footer-wrapper` slot, you can render the datatable search, entries selector and pagination as you see fit.

<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:footer-wrapper="{ rowsFrom, rowsTo, rowsCount, page, rowsPerPage, filter, onPageChange, onRowsPerPageChange, onFilterChange }">
        <i-input @input="onFilterChange" placeholder="Search.." />
        <div>
            <i-button :active="rowsPerPage === 10" @click="onRowsPerPageChange(10)">10</i-button>
            <i-button :active="rowsPerPage === 25" @click="onRowsPerPageChange(25)">25</i-button>
            <i-button :active="rowsPerPage === 50" @click="onRowsPerPageChange(50)">50</i-button>
        </div>
    </template>
</i-datatable>
~~~

</div>

<i-code title="Data Table Footer Wrapper Slot">
<i-tab type="preview">
    <i-datatable :columns="dataPathColumns" :rows="wrapperRows">
        <template v-slot:footer-wrapper="{ rowsFrom, rowsTo, rowsCount, page, rowsPerPage, filter, onPageChange, onRowsPerPageChange, onFilterChange }">
            <div>{{ rowsFrom }} to {{ rowsTo }} out of {{ rowsCount }}</div>
            <i-pagination
                :items="rowsCount"
                :items-per-page="rowsPerPage"
                :limit="3"
                :value="page"
                @input="onPageChange" />
        </template>
    </i-datatable>
</i-tab>
<i-tab type="html">
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:footer-wrapper="{ rowsFrom, rowsTo, rowsCount, page, rowsPerPage, filter, onPageChange, onRowsPerPageChange, onFilterChange }">
        <div>{{ rowsFrom }} to {{ rowsTo }} out of {{ rowsCount }}</div>
        <i-pagination
            :items="rowsCount"
            :items-per-page="rowsPerPage"
            :limit="3"
            :value="page"
            @input="onPageChange" />
    </template>
</i-datatable>
~~~

</div>
</i-tab>
<i-tab type="js">

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

</i-tab>
</i-code>
