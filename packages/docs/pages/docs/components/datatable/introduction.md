---
title: Data Table
description: Data tables (or data grids) are tables that have advanced interaction controls such as custom data types, pagination and sorting. 
---

# Data Table
## Data tables (or data grids) are tables that have advanced interaction controls such as custom data types, pagination and sorting. 

### Columns definition
First, you need to define the column titles, paths, types and how they're ordered.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age', align: 'right' }
            ]
        }
    }
}
~~~

### Rows definition
The `rows` array represents your data. The `path` field in `columns` corresponds to a value field name in `rows`. 

~~~js
export default {
    data() {
        return {
            columns: [...],
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

<i-alert variant="info" class="_margin-top-1">
    <template slot="icon"><i-icon icon="info" class="h4"></i-icon></template>
    <p>Each data row should also have a unique <code>id</code> field, which will be used internally for identifying the row during rendering.</p>
</i-alert>

### Usage
Let's put it all together. The `columns` defined above, together with the `rows` data will render the following data table:

<i-code title="Data Table Example">
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
                { title: 'Name', path: 'name' },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age', align: 'right' }
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

### Nested Properties
Great news! You don't need to change your data structure to have it working. You can specify column paths under the form `prop.nestedProp` to target nested properties.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'City', path: 'address.city' },
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

<i-code title="Data Table Property Nesting">
<i-tab type="preview">
    <i-datatable :columns="columnsNested" :rows="rows" />
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
                { title: 'City', path: 'address.city' },
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

</i-tab>
</i-code>
