# Data Table Definition
Data tables (or data grids) are tables that have advanced interaction controls such as custom data types, pagination and sorting. {.lead}

### Columns definition
First, you need to define the column titles, keys, types and how they're ordered.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Email', key: 'email' },
                { title: 'Date', key: 'date' },
                { title: 'Age', key: 'age', align: 'right' }
            ]
        }
    }
}
~~~

### Rows definition
The `rows` array represents your data. The `key` field in `columns` corresponds to a value field name in `rows`. 

~~~js
export default {
    data() {
        return {
            columns: [...],
            rows: [
                { id: '1', name: 'Alice Spring', email: 'alice.spring@email.com', date: '2016/04/25', age: 26 },
                { id: '2', name: 'Connie Tenamn', email: 'connie.tenman@email.com', date: '2019/07/07', age: 30 },
                { id: '3', name: 'John Reid', email: 'john.reid@email.com', date: '2018/05/12', age: 28 },
                { id: '4', name: 'Robert Smith', email: 'robert.smith@email.com', date: '2017/08/16', age: 34 },
                { id: '5', name: 'Lisa Hendricks', email: 'lisa.hendricks@email.com', date: '2014/12/01', age: 31 }
            ]
        }
    }
}
~~~

<i-alert variant="info" class="-code"><template v-slot:icon><i class="icon -info h3"></i></template>Each data row should also have a unique `id` field, which will be used internally for identifying the row during rendering.</i-alert>


### Usage
Let's put it all together. The `columns` defined above, together with the `rows` data will render the following data table:

<i-code-preview title="Data Table Example" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

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
                { title: 'Email', key: 'email' },
                { title: 'Date', key: 'date' },
                { title: 'Age', key: 'age', align: 'right' }
            ],
            rows: [
                { id: '1', name: 'Alice Spring', email: 'alice.spring@email.com', date: '2016/04/25', age: 26 },
                { id: '2', name: 'Connie Tenamn', email: 'connie.tenman@email.com', date: '2019/07/07', age: 30 },
                { id: '3', name: 'John Reid', email: 'john.reid@email.com', date: '2018/05/12', age: 28 },
                { id: '4', name: 'Robert Smith', email: 'robert.smith@email.com', date: '2017/08/16', age: 34 },
                { id: '5', name: 'Lisa Hendricks', email: 'lisa.hendricks@email.com', date: '2014/12/01', age: 31 }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>


### Nested Properties
Great news! You don't need to change your data structure to have it working. You can specify keys under the form `prop.nestedProp` to target nested properties.

~~~js
export default {
    data() {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'City', key: 'address.city' },
                { title: 'Country', key: 'address.country' },
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


<i-code-preview title="Data Table Property Nesting" link="https://github.com/inkline/inkline/tree/master/src/components/Datatable/index.vue">

<i-datatable :columns="columnsNested" :rows="rowsNested" />

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
                { title: 'City', key: 'address.city' },
                { title: 'Country', key: 'address.country' },
            ],
            rows: [
                { id: '1', name: 'Alice Spring', address: { city: 'Los Angeles', country: 'United States' } },
                { id: '2', name: 'Connie Tenamn', address: { city: 'Munich', country: 'Germany' } },
                { id: '3', name: 'John Reid', address: { city: 'Timisoara', country: 'Romania' } },
                { id: '4', name: 'Robert Smith', address: { city: 'London', country: 'England' } }
            ]
        }
    }
}
~~~

</template>
</i-code-preview>
