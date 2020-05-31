<template lang="md" src="./popover.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IButton, IPopover } from "@inkline/inkline/src/components";

export default {
    name: 'PopoverView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IButton,
        IPopover
    },
    data() {
        return {
            manualPopover: false
        }
    }
};
</script>
