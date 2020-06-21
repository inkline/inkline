<template lang="md" src="./sorting.md" />
<script>
import View from '~/components/layout/NuxtContentView';
import { generateDataRows } from '~/helpers/generateDataRows';

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
