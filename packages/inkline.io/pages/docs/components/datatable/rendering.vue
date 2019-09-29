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
                { id: '1', name: 'Alice Spring', address: { city: 'Los Angeles', country: 'United States' } },
                { id: '2', name: 'Connie Tenamn', address: { city: 'Munich', country: 'Germany' } },
                { id: '3', name: 'John Reid', address: { city: 'Timisoara', country: 'Romania' } },
                { id: '4', name: 'Robert Smith', address: { city: 'London', country: 'England' } },
                { id: '5', name: 'Lisa Hendricks', address: { city: 'Melbourne', country: 'Australia' } },
            ],
            columnsComponent: [
                { title: 'Name', key: 'name' },
                { title: 'Progress', key: 'progress', component: 'table-progress' },
            ],
            rowsComponent: [
                { id: '1', name: 'Alice Spring', progress: 82 },
                { id: '2', name: 'Connie Tenamn', progress: 55 },
                { id: '3', name: 'John Reid', progress: 70 },
                { id: '4', name: 'Robert Smith', progress: 36 },
                { id: '5', name: 'Lisa Hendricks', progress: 95 },
            ],
        };
    }
};
</script>
