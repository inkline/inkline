<template lang="md" src="./tables.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'TablesView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Table')
    }
};
</script>
