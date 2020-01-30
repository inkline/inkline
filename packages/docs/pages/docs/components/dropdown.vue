<template lang="md" src="./dropdown.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IButton, IDropdown, IDropdownMenu, IDropdownItem, IDropdownDivider } from "@inkline/inkline/src/components";

export default {
    name: 'DropdownView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-dropdown'),
    components: {
        IButton,
        IDropdown,
        IDropdownMenu,
        IDropdownItem,
        IDropdownDivider
    },
    data() {
        return {
            manualDropdown: false
        };
    }
};
</script>
