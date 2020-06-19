---
title: Data Table Filtering
description: Inkline's Data Table rows are easily and efficiently filtered using a fuzzy search algorithm. 
---

# Data Table Filtering
## Inkline's Data Table rows are easily and efficiently filtered using a fuzzy search algorithm. 

### Default Filtering
Filtering is enabled by default and can be changed using the `filterable` attribute if needed.

<i-code title="Data Table Default Filtering">
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

</i-tab>
</i-code>

### Disable Filtering
Filtering can be disabled by setting the `filtering` attribute to `false`.

<i-code title="Data Table Default Filtering">
<i-tab type="preview">
    <i-datatable :columns="columns" :rows="rows" :filtering="false" />
</i-tab>
<i-tab type="html">

~~~html
<i-datatable :columns="columns" :rows="rows" :filtering="false" />
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

</i-tab>
</i-code>


### Selective Filtering
By setting the `filterable` column property to `true`, you can easily add filtering support to specific table columns. 

~~~js
export default {
    data() {
        return {
            filteringConfig: {
                fuse: {
                    keys: ['name']
                }
            },
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age' }
            ],
            rows: [ ... ]
        }
    }
}
~~~

<i-code title="Data Table Selective Filtering">
<i-tab type="preview">
    <i-datatable :columns="selectiveFilteringColumns" :rows="rows" :filtering="filteringConfig" />
</i-tab>
<i-tab type="html">

~~~html
<i-datatable :columns="columns" :rows="rows" :filtering="filtering" />
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
                { title: 'Age', path: 'age' }
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', email: 'richard.hendricks@email.com', age: 26 },
                { id: '2', name: 'Bertram Gilfoyle', email: 'bertram.gilfoyle@email.com', age: 30 },
                { id: '3', name: 'Dinesh Chugtai', email: 'dinesh.chugtai@email.com', age: 30 },
                { id: '4', name: 'Jared Dunn', email: 'jared.dunn@email.com', age: 35 },
                { id: '5', name: 'Erlich Bachman', email: 'erlich.bachman@email.com', age: 32 }
            ],
            filtering: {
                fuse: {
                    keys: ['name']
                }
            },
        }
    }
}
~~~

</i-tab>
</i-code>

### Filtering Configuration
Filtering can be configured by providing an object for the `filtering` attribute. Inkline uses <a href="https://fusejs.io" rel="nofollow">Fuse.js</a> for providing a fuzzy search implementation. 

<i-alert variant="info" class="-code">
<template slot="icon"><i-icon icon="info"></i-icon></template>

The <a href="https://fusejs.io" rel="nofollow">Fuse.js Configuration</a> can be fine-tuned using the `fuse` field in the filtering configuration.

</i-alert>

The default configuration is as follows:

~~~js
export default {
    ...
    data() {
        return {
            filtering: {
                size: 'md',
                variant: 'light',
                fuse: {
                    keys: [],
                    shouldSort: false,
                    includeMatches: true,
                    includeScore: true,
                    threshold: 0.25,
                    location: 0,
                    distance: 75,
                    tokenize: true,
                    maxPatternLength: 32,
                    minMatchCharLength: 1
                }
            }
        };
    }
}       
~~~

~~~html
<i-datatable :columns="columns" :rows="rows" :filtering="filtering" />
~~~

### Async Filtering
Filtering can be handled asynchronously by setting the `async` attribute to `true` and providing an appropriate `rowsCount`. 

This will tell the DataTable component to only display the rows and let the pagination and filtering handling be done externally using the `update` event. 

<i-alert variant="info" class="-code _margin-bottom-1">
<template slot="icon"><i-icon icon="info"></i-icon></template>

The `update` event occurs whenever the search input is updated.

</i-alert>

<i-code title="Data Table Async Filtering">
<i-tab type="preview">
    <i-datatable :columns="columns" :rows="rowsAsync" :rows-count="rowsCount" @update="onUpdate"></i-datatable>
</i-tab>
<i-tab type="html">

~~~html
<i-datatable :columns="columns" :rows="rowsAsync" :rows-count="rowsCount" @update="onUpdate" />
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
                { title: 'Age', path: 'age' }
            ],
            rows: [],
            rowsCount: 0
        }
    },
    methods: {
        onUpdate(event) {
            getFilteredRowsAsync(event.page, event.rowsPerPage, event.filter).then((response) => {
                this.rows = response.data.rows;
                this.rowsCount = response.data.rowsCount;
            });
        }       
    }
}
~~~

</i-tab>
</i-code>
