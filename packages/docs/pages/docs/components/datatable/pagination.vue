<template lang="md" src="./pagination.md" />
<script>
import View from '~/components/layout/NuxtContentView';
import { generateDataRows } from '~/helpers/generateDataRows';

export default {
    extends: View,
    name: 'DataTablePaginationView',
    data () {
        return {
            columns: [
                { title: 'Name', path: 'name', sortable: true },
                { title: 'Email', path: 'email', sortable: true },
                { title: 'Age', path: 'age', align: 'right', sortable: true }
            ],
            rows: generateDataRows(200),
            rowsShort: generateDataRows(10),
            asyncRows: [],
            rowsCount: 0
        };
    },
    methods: {
        onUpdate(event) {
            this.asyncRows = this.rows.slice((event.page - 1) * event.rowsPerPage, event.page * event.rowsPerPage);
        }
    },
    mounted() {
        this.rowsCount = 200;
    }
};
</script>
