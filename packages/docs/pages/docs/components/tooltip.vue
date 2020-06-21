<template lang="md" src="./tooltip.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'TooltipView',
    extends: View,
    data() {
        return {
            manualTooltip: false
        };
    }
};
</script>
