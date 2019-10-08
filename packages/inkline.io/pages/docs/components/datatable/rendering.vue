<template lang="md" src="./rendering.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

import Vue from 'vue';
import TableProgress from '@components/TableProgress';

Vue.component(TableProgress.name, TableProgress);

export default {
    extends: View,
    name: 'DataTableRenderingView',
    layout: 'documentation',
    head: head({
        title: 'Rendering - Data Table',
        description: 'Provide contextual feedback messages for typical user actions using Inkline\'s Alert component.'
    }),
    data () {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Address', key: 'address', render: (row) => `${row.address.city}, ${row.address.country}` },
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ],
            columnsComponent: [
                { title: 'Name', key: 'name' },
                { title: 'Progress', key: 'progress', component: 'table-progress' },
            ],
            rowsComponent: [
                { id: '1', name: 'Richard Hendricks', progress: 82 },
                { id: '2', name: 'Bertram Gilfoyle', progress: 55 },
                { id: '3', name: 'Dinesh Chugtai', progress: 70 },
                { id: '4', name: 'Jared Dunn', progress: 36 },
                { id: '5', name: 'Erlich Bachman', progress: 95 }
            ],
        };
    }
};
</script>
