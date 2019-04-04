<template lang="md" src="./collapsible.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { ICollapsible, ICollapsibleItem } from '@inkline/inkline';

export default {
    name: 'CollapsibleView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Collapsible')
    },
    data() {
        return {
            active: ['panel-1']
        };
    },
    components: {
        ICollapsible,
        ICollapsibleItem
    }
};
</script>
