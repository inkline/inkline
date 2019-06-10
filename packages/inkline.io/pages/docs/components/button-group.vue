<template lang="md" src="./button-group.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'ButtonGroupView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Button Group',
        description: 'Group multiple buttons together on a single line using Inkline\'s Button Group component.'
    }),
};
</script>
