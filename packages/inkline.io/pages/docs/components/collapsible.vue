<template lang="md" src="./collapsible.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'CollapsibleView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Collapsible',
        description: 'Use Inkline\'s Collapsible components to show and hide content using a smooth reveal transition.'
    }),
    data() {
        return {
            active: ['panel-1']
        };
    },
};
</script>
