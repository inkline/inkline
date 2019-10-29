<template lang="md" src="./definition.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IDatatable, IAlert } from '@inkline/inkline/src/index';

export default {
    extends: View,
    name: 'DataTableDefinitionView',
    layout: 'documentation',
    head: head('docs-components-datatable-definition'),
    components: {
        IDatatable,
        IAlert
    },
    data () {
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
            ],
            columnsNested: [
                { title: 'Name', path: 'name' },
                { title: 'City', path: 'address.city' },
                { title: 'Country', path: 'address.country' },
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
