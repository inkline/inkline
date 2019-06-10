<template lang="md" src="./list-group.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'ListGroupView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'List Group',
        description: 'List Groups are flexible components used for displaying a list of related content.'
    }),
};
</script>
