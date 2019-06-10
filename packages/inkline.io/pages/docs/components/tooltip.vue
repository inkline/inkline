<template lang="md" src="./tooltip.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'TooltipView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Tooltip',
        description: 'Tooltips are useful for conveying information when an user hovers over an element.'
    }),
    data() {
        return {
            manualTooltip: false
        }
    }
};
</script>
