<template lang="md" src="./popover.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'PopoverView',
    extends: View,
    data() {
        return {
            manualPopover: false
        };
    }
};
</script>
