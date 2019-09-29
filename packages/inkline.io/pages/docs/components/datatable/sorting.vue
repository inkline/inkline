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
                { title: 'Date', key: 'date', sortable: true },
                { title: 'Age', key: 'age', align: 'right', sortable: true }
            ],
            customSortColumns: [
                { title: 'Name', key: 'name', sortable: true, sortFn: customSort },
                { title: 'Email', key: 'email' },
                { title: 'Date', key: 'date'},
                { title: 'Age', key: 'age', align: 'right' }
            ],
            rows: [
                { id: '1', name: 'Alice Spring', email: 'alice.spring@email.com', date: '2016/04/25', age: 26 },
                { id: '2', name: 'Connie Tenamn', email: 'connie.tenman@email.com', date: '2019/07/07', age: 30 },
                { id: '3', name: 'John Reid', email: 'john.reid@email.com', date: '2018/05/12', age: 28 },
                { id: '4', name: 'Robert Smith', email: 'robert.smith@email.com', date: '2017/08/16', age: 34 },
                { id: '5', name: 'Lisa Hendricks', email: 'lisa.hendricks@email.com', date: '2014/12/01', age: 31 }
            ]
        };
    }
};
</script>
