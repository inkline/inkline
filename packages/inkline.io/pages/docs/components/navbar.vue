<template lang="md" src="./navbar.md" />
<script>
import View from '@components/View';
import { IButton, INav, INavItem, INavbar, INavbarBrand, INavbarItems } from '@inkline/inkline';

export default {
    name: 'NavbarView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Navbar'
    },
    components: {
        IButton,
        INav,
        INavItem,
        INavbar,
        INavbarBrand,
        INavbarItems
    }
};
</script>
