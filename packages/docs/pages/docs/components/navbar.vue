<template lang="md" src="./navbar.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { INavbar, INavbarBrand, INavbarItems, INav, INavItem, IDropdown, IDropdownMenu, IDropdownItem, IDropdownDivider, IButton, IInput } from "@inkline/inkline/src/components";

export default {
    name: 'NavbarView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        INavbar,
        INavbarBrand,
        INavbarItems,
        INav,
        INavItem,
        IDropdown,
        IDropdownMenu,
        IDropdownItem,
        IDropdownDivider,
        IButton,
        IInput
    },
    data() {
        return {
            collapsed: false
        };
    }
};
</script>
