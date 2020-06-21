<template lang="md" src="./introduction.md" />
<script>
import View from '~/components/layout/NuxtContentView';
import { generateDataRows } from '~/helpers/generateDataRows';

export default {
    extends: View,
    name: 'DataTableIntroductionView',
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
                { title: 'Country', path: 'address.country' }
            ]
        };
    }
};
</script>
