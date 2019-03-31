<template lang="md" src="./popover.md" />
<script>
import View from '@components/View';
import { IButton, IPopover } from '@inkline/inkline';

export default {
    name: 'PopoverView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Popover'
    },
    components: {
        IButton,
        IPopover,
    }
};
</script>
