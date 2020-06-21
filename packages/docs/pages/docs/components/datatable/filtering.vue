<template lang="md" src="./filtering.md" />
<script>
import View from '~/components/layout/NuxtContentView';
import { generateDataRows } from '~/helpers/generateDataRows';

export default {
    extends: View,
    name: 'DataTableFilteringView',
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
            rows: generateDataRows(25),
            rowsAsync: [],
            rowsCount: 0
        };
    },
    methods: {
        onUpdate(event) {
            const mapData = (row) => Object.keys(row)
                .map((key) => typeof row[key] === 'object'
                    ? mapData(row[key])
                    : row[key]);

            const filteredRows = this.rows
                .filter((row) => {
                    if (!event.filter) { return true; }

                    return JSON.stringify(mapData(row)).toLowerCase().includes(event.filter.toLowerCase());
                });

            this.rowsAsync = filteredRows.slice((event.page - 1) * event.rowsPerPage, event.page * event.rowsPerPage);
            this.rowsCount = filteredRows.length;
        }
    },
    mounted() {
        this.rowsCount = 25;
    }
};
</script>
