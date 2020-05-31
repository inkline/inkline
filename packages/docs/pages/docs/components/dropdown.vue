<template lang="md" src="./dropdown.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IButton, IDropdown, IDropdownMenu, IDropdownItem, IDropdownDivider, IIcon } from "@inkline/inkline/src/components";

export default {
    name: 'DropdownView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IButton,
        IDropdown,
        IDropdownMenu,
        IDropdownItem,
        IDropdownDivider,
        IIcon
    },
    data() {
        return {
            manualDropdown: false
        };
    }
};
</script>
