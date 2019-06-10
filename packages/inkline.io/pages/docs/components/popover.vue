<template lang="md" src="./popover.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'PopoverView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Popover',
        description: 'Popovers are useful for conveying information when an user clicks an element.'
    }),
    data() {
        return {
            manualPopover: false
        }
    }
};
</script>
