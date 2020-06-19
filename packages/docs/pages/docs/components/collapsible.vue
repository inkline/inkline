<template lang="md" src="./collapsible.md" />
<script>
import View from '~/components/docs/View';

export default {
    name: 'CollapsibleView',
    extends: View,
    data() {
        return {
            active: ['panel-1']
        };
    }
};
</script>
