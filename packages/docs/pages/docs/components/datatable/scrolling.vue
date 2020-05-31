<template lang="md" src="./scrolling.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { generateDataRows } from "@helpers/generateDataRows";
import { IDatatable, IAlert } from '@inkline/inkline/src';

export default {
    extends: View,
    name: 'DataTableScrollingView',
    layout: 'documentation',
    head: head(),
    components: {
        IDatatable,
        IAlert
    },
    data () {
        return {
            columns: [
                { title: 'Name', path: 'name' },
                { title: 'Position', path: 'position' },
                { title: 'Age', path: 'age' },
                { title: 'City', path: 'address.city' },
                { title: 'Country', path: 'address.country' },
                { title: 'Email', path: 'email' }
            ],
            countColumn: {
                sticky: true
            },
            columnsSticky: [
                { title: 'Name', path: 'name', sticky: true },
                { title: 'Position', path: 'position' },
                { title: 'Age', path: 'age' },
                { title: 'City', path: 'address.city' },
                { title: 'Country', path: 'address.country' },
                { title: 'Email', path: 'email' }
            ],
            rows: generateDataRows(25)
        };
    }
};
</script>
