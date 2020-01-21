<template lang="md" src="./filtering.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { generateDataRows } from "@helpers/generateDataRows";
import { IDatatable, IAlert } from '@inkline/inkline/src';

export default {
    extends: View,
    name: 'DataTableFilteringView',
    layout: 'documentation',
    head: head('docs-components-dashboard-datatable-filtering'),
    components: {
        IDatatable,
        IAlert
    },
    data () {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Country', path: 'address.country' },
                { title: 'Age', path: 'age', align: 'right' }
            ],
            selectiveFilteringColumns: [
                { title: 'Name', path: 'name' },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age', align: 'right' }
            ],
            filteringConfig: {
                fuse: {
                    keys: ['name']
                }
            },
            rows: generateDataRows(25)
        };
    }
};
</script>
