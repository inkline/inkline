---
title: Data Table Expanding
description: Inkline's Data Table allows you to expand a row to easily show more details about the entry. 
---

# Data Table Expanding
## Inkline's Data Table allows you to expand a row to easily show more details about the entry. 

### Basic Expandable Rows
To be able to expand a Data Table entry, you will need to provide an `expand` scoped slot to be rendered for each row.

<i-code title="Data Table Expanding">
<i-tab type="preview">
    <i-datatable :columns="columns" :rows="rows">
        <template v-slot:expand="{ row, columns, expanded }">
            <td :colspan="columns.length">
                {{row.name}} occupies the {{row.position}} position at Pied Piper, a fictional company based in Silicon Valley, California.
            </td>
        </template>
    </i-datatable>
</i-tab>
<i-tab type="html">
<div v-pre>

~~~html
<i-datatable :columns="columns" :rows="rows">
    <template v-slot:expand="{ row, columns, expanded }">
        <td :colspan="columns.length">
            {{row.name}} occupies the {{row.position}} position at Pied Piper, a fictional company based in Silicon Valley, California.
        </td>
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

</i-tab>
</i-code>

