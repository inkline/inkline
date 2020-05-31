<template lang="md" src="./introduction.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { generateDataRows } from "@helpers/generateDataRows";
import { IDatatable, IAlert, IIcon } from '@inkline/inkline/src';

export default {
    extends: View,
    name: 'DataTableIntroductionView',
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
                { title: 'Name', path: 'name' },
                { title: 'Email', path: 'email' },
                { title: 'Age', path: 'age', align: 'right' }
            ],
            rows: generateDataRows(25),
            columnsNested: [
                { title: 'Name', path: 'name' },
                { title: 'City', path: 'address.city' },
                { title: 'Country', path: 'address.country' },
            ]
        };
    }
};
</script>
