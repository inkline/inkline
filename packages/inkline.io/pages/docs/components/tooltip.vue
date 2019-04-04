<template lang="md" src="./tooltip.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IButton, ITooltip } from '@inkline/inkline';

export default {
    name: 'TooltipView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Tooltip')
    },
    components: {
        IButton,
        ITooltip,
    },
    data() {
        return {
            manualTooltip: false
        }
    }
};
</script>
