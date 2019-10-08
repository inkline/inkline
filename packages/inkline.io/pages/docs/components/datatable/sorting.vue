<template lang="md" src="./sorting.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

const customSort = (a, b) => {
    if (a.name < b.name) {
        return 1;
    }
    if (a.name > b.name) {
        return -1;
    }
    return 0;
};

export default {
    extends: View,
    name: 'DataTableSortingView',
    layout: 'documentation',
    head: head({
        title: 'Sorting - Data Table',
        description: 'Provide contextual feedback messages for typical user actions using Inkline\'s Alert component.'
    }),
    data () {
        return {
            columns: [
                { title: 'Name', key: 'name', sortable: true },
                { title: 'Email', key: 'email', sortable: true },
                { title: 'Age', key: 'age', align: 'right', sortable: true }
            ],
            customSortColumns: [
                { title: 'Name', key: 'name', sortable: true, sortFn: customSort },
                { title: 'Email', key: 'email' },
                { title: 'Age', key: 'age', align: 'right' }
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
