<template lang="md" src="./sidebar.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { ISidebar, INavbar, INavbarBrand, INav, INavItem, ILayout, ILayoutHeader, ILayoutAside, ILayoutContent, IButton, IHamburgerMenu } from "@inkline/inkline/src/components";

export default {
    name: 'SidebarView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-sidebar'),
    components: {
        ISidebar,
        INav,
        INavItem,
        ILayout,
        ILayoutHeader,
        ILayoutAside,
        ILayoutContent,
        IButton,
        IHamburgerMenu,
        INavbar,
        INavbarBrand
    },
    data() {
        return {
            collapsed: false
        };
    }
};
</script>
