<template lang="md" src="./tabs.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'TabsView',
    extends: View,
    data() {
        return {
            active: 'tab-2'
        };
    }
};
</script>
