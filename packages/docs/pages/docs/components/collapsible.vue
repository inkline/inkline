<template lang="md" src="./collapsible.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { ICollapsible, ICollapsibleItem } from "@inkline/inkline/src/components";

export default {
    name: 'CollapsibleView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-collapsible'),
    components: {
        ICollapsible,
        ICollapsibleItem
    },
    data() {
        return {
            active: ['panel-1']
        };
    },
};
</script>
