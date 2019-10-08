<template lang="md" src="./definition.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    extends: View,
    name: 'DataTableDefinitionView',
    layout: 'documentation',
    head: head({
        title: 'Definition - Data Table',
        description: 'Provide contextual feedback messages for typical user actions using Inkline\'s Alert component.'
    }),
    data () {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Email', key: 'email' },
                { title: 'Age', key: 'age', align: 'right' }
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', email: 'richard.hendricks@email.com', age: 26 },
                { id: '2', name: 'Bertram Gilfoyle', email: 'bertram.gilfoyle@email.com', age: 30 },
                { id: '3', name: 'Dinesh Chugtai', email: 'dinesh.chugtai@email.com', age: 30 },
                { id: '4', name: 'Jared Dunn', email: 'jared.dunn@email.com', age: 35 },
                { id: '5', name: 'Erlich Bachman', email: 'erlich.bachman@email.com', age: 32 }
            ],
            columnsNested: [
                { title: 'Name', key: 'name' },
                { title: 'City', key: 'address.city' },
                { title: 'Country', key: 'address.country' },
            ],
            rowsNested: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ]
        };
    }
};
</script>
