<template lang="md" src="./events.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { generateDataRows } from "@helpers/generateDataRows";
import { IDatatable, IAlert, IIcon } from '@inkline/inkline/src';

export default {
    extends: View,
    name: 'DataTableEventsView',
    layout: 'documentation',
    head: head('docs-components-dashboard-datatable-events'),
    components: {
        IDatatable,
        IAlert,
        IIcon
    },
    data () {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age', align: 'right' }
            ],
            columnsTh: [
                { title: 'Name', path: 'name' },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age', align: 'right' }
            ],
            rowsTr: generateDataRows(25),
            rowsTd: generateDataRows(25),
            rowsTh: generateDataRows(25),
        };
    },
    methods: {
        onTableRowClick(event, row, rowIndex) {
            this.$set(this.rowsTr[rowIndex], 'config', {
                columns: {
                    '*': { class: '_background-primary' }
                }
            });
        },
        onTableDataClick(event, column, columnIndex, row, rowIndex) {
            if (columnIndex >= 0) {
                this.$set(this.rowsTd[rowIndex], 'config', {
                    columns: {
                        [column.path]: { class: '_background-primary' }
                    }
                });
            }
        },
        onTableHeadingClick(event, column, columnIndex) {
            if (columnIndex >= 0) {
                this.$set(this.columnsTh[columnIndex], 'class', '_background-primary');
            }
        }
    }
};
</script>
