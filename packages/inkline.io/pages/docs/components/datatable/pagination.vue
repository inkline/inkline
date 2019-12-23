<template lang="md" src="./pagination.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IDatatable, IAlert } from '@inkline/inkline/src/index';

export default {
    extends: View,
    name: 'DataTablePaginationView',
    layout: 'documentation',
    head: head('docs-components-datatable-pagination'),
    components: {
        IDatatable,
        IAlert
    },
    data () {
        return {
            columns: [
                { title: 'Name', path: 'name', sortable: true },
                { title: 'Email', path: 'email', sortable: true },
                { title: 'Age', path: 'age', align: 'right', sortable: true }
            ],
            customSortColumns: [
                { title: 'Name', path: 'name', sortable: true },
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
        };
    }
};
</script>
