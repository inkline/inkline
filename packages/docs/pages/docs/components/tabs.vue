<template lang="md" src="./tabs.md" />
<script>
import View from '~/components/docs/View';

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
