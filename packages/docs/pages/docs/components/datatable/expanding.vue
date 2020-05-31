<template lang="md" src="./expanding.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { generateDataRows } from "@helpers/generateDataRows";
import { IDatatable, IAlert } from '@inkline/inkline/src';

export default {
    extends: View,
    name: 'DataTableExpandingView',
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
                { title: 'Age', path: 'age' }
            ],
            rows: generateDataRows(25)
        };
    }
};
</script>
