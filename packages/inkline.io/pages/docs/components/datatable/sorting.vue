<template lang="md" src="./sorting.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { generateDataRows } from "@helpers/generateDataRows";
import { IDatatable, IAlert } from '@inkline/inkline/src/index';

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
    head: head('docs-components-datatable-sorting'),
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
                { title: 'Name', path: 'name', sortable: true, sortFn: customSort },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age', align: 'right' }
            ],
            rows: generateDataRows(25)
        };
    }
};
</script>
