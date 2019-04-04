<template lang="md" src="./list-group.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IListGroup, IListGroupItem } from '@inkline/inkline';

export default {
    name: 'ListGroupView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('List Group')
    },
    components: {
        IListGroup,
        IListGroupItem
    }
};
</script>
