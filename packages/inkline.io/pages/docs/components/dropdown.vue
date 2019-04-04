<template lang="md" src="./dropdown.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IButton, IDropdown, IDropdownDivider, IDropdownItem, IDropdownMenu } from '@inkline/inkline';

export default {
    name: 'DropdownView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Dropdown')
    },
    components: {
        IButton,
        IDropdown,
        IDropdownDivider,
        IDropdownItem,
        IDropdownMenu
    }
};
</script>
