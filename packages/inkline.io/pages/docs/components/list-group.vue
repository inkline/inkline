<template lang="md" src="./list-group.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IListGroup, IListGroupItem } from "@inkline/inkline/src/components";

export default {
    name: 'ListGroupView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-list-group'),
    components: {
        IListGroup,
        IListGroupItem
    }
};
</script>
