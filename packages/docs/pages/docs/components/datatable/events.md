---
title: Data Table Events
description: Data tables (or data grids) are tables that have advanced interaction controls such as custom data types, pagination and sorting. 
---

# Data Table Events
## Data tables (or data grids) are tables that have advanced interaction controls such as custom data types, pagination and sorting. 

### Table Row
You can add a table row click event using the `tr-click` event handler as follows:

<i-code title="Table Row Click Event">
<i-tab type="preview">
    <i-datatable :columns="columns" :rows="rowsTr" @tr-click="onTableRowClick" />
</i-tab>
<i-tab type="html">

~~~html
<i-datatable :columns="columns" :rows="rows" @tr-click="onTableRowClick" />
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
    },
    methods: {
        onTableRowClick (event, row, rowIndex) {
            this.$set(this.rows[rowIndex], 'config', {
                columns: {
                    '*': { class: '_background-primary' }
                }
            });
        }
    }
}
~~~

</i-tab>
</i-code>

### Table Data
You can add a table data click event using the `td-click` event handler as follows:

<i-code title="Table Data Click Event">
<i-tab type="preview">
    <i-datatable :columns="columns" :rows="rowsTd" @td-click="onTableDataClick" />
</i-tab>
<i-tab type="html">

~~~html
<i-datatable :columns="columns" :rows="rows" @tr-click="onTableRowClick" />
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
    },
    methods: {
        onTableDataClick (event, column, columnIndex, row, rowIndex) {
            if (columnIndex >= 0) {
                this.$set(this.rows[rowIndex], 'config', {
                    columns: {
                        [column.path]: { class: '_background-primary' }
                    }
                });
            }
        }
    }
}
~~~

</i-tab>
</i-code>

### Table Heading
You can add a table heading click event using the `th-click` event handler as follows:

<i-code title="Table Header Click Event">
<i-tab type="preview">
    <i-datatable :columns="columnsTh" :rows="rowsTh" @th-click="onTableHeadingClick" />
</i-tab>
<i-tab type="html">

~~~html
<i-datatable :columns="columns" :rows="rows" @th-click="onTableHeadingClick" />
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
    },
    methods: {
        onTableHeadingClick(event, column, columnIndex) {
            if (columnIndex >= 0) {
                this.$set(this.columns[columnIndex], 'class', '_background-primary');
            }
        }
    }
}
~~~

</i-tab>
</i-code>

