<template lang="md" src="./expanding.md" />
<script>
import View from '~/components/layout/NuxtContentView';
import { generateDataRows } from '~/helpers/generateDataRows';

export default {
    extends: View,
    name: 'DataTableExpandingView',
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
