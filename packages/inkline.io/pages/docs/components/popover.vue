<template lang="md" src="./popover.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IButton, IPopover } from '@inkline/inkline';

export default {
    name: 'PopoverView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Popover')
    },
    components: {
        IButton,
        IPopover,
    },
    data() {
        return {
            manualPopover: false
        }
    }
};
</script>
