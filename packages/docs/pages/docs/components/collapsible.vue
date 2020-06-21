<template lang="md" src="./collapsible.md" />
<script>
import View from '~/components/layout/NuxtContentView';

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
