<template lang="md" src="./list-group.md" />
<script>
import View from '@components/View';
import { IListGroup, IListGroupItem } from '@inkline/inkline';

export default {
    name: 'ListGroupView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'List Group'
    },
    components: {
        IListGroup,
        IListGroupItem
    }
};
</script>
