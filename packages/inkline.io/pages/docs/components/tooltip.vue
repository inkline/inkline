<template lang="md" src="./tooltip.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IButton, ITooltip } from "@inkline/inkline/src/components";

export default {
    name: 'TooltipView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-tooltip'),
    components: {
        IButton,
        ITooltip
    },
    data() {
        return {
            manualTooltip: false
        }
    }
};
</script>
