<template lang="md" src="./rendering.md" />
<script>
import View from '~/components/layout/NuxtContentView';

import TableProgress from '~/components/docs/TableProgress';
import TableHeaderComponent from '~/components/docs/TableHeaderComponent';
import TableFooterComponent from '~/components/docs/TableFooterComponent';
import { generateDataRows } from '~/helpers/generateDataRows';

export default {
    extends: View,
    name: 'DataTableRenderingView',
    layout: 'documentation',
    components: {
        TableProgress,
        TableHeaderComponent,
        TableFooterComponent
    },
    data () {
        return {
            dataPathColumns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country' }
            ],
            renderColumns: [
                { title: 'Name', path: 'name' },
                { title: 'Address', path: 'address', render: (row) => `${row.address.city}, ${row.address.country}` }
            ],
            renderHeaderColumns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country', renderHeader: (column) => column.title.toUpperCase() }
            ],
            renderFooterColumns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country', renderFooter: (column) => column.title.toUpperCase() }
            ],
            componentColumns: [
                { title: 'Name', path: 'name' },
                { title: 'Progress', path: 'progress', component: TableProgress }
            ],
            headerComponentColumns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country', headerComponent: TableHeaderComponent }
            ],
            footerComponentColumns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country', footerComponent: TableFooterComponent }
            ],
            rows: [
                { id: '1', name: 'Richard Hendricks', address: { city: 'Cupertino', country: 'United States' } },
                { id: '2', name: 'Bertram Gilfoyle', address: { city: 'Toronto', country: 'Canada' } },
                { id: '3', name: 'Dinesh Chugtai', address: { city: 'Lahore', country: 'Pakistan' } },
                { id: '4', name: 'Jared Dunn', address: { city: 'Berlin', country: 'Germany' } },
                { id: '5', name: 'Erlich Bachman', address: { city: 'Palo Alto', country: 'United States' } }
            ],
            componentRows: [
                { id: '1', name: 'Richard Hendricks', progress: 82 },
                { id: '2', name: 'Bertram Gilfoyle', progress: 55 },
                { id: '3', name: 'Dinesh Chugtai', progress: 70 },
                { id: '4', name: 'Jared Dunn', progress: 36 },
                { id: '5', name: 'Erlich Bachman', progress: 95 }
            ],
            wrapperRows: generateDataRows(50)
        };
    }
};
</script>
