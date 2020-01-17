<template lang="md" src="./pagination.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { generateDataRows } from "@helpers/generateDataRows";
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
            rows: generateDataRows(200),
            rowsShort: generateDataRows(10)
        };
    }
};
</script>
