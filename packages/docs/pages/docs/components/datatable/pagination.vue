<template lang="md" src="./pagination.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { generateDataRows } from "@helpers/generateDataRows";
import { IDatatable, IAlert, IIcon } from '@inkline/inkline/src';

export default {
    extends: View,
    name: 'DataTablePaginationView',
    layout: 'documentation',
    head: head(),
    components: {
        IDatatable,
        IAlert,
        IIcon
    },
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
