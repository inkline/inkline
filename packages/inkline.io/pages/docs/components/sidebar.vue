<template lang="md" src="./sidebar.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { ISidebar, INav, INavItem, ILayout, ILayoutAside, ILayoutContent } from "@inkline/inkline/src/components";

export default {
    name: 'SidebarView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-sidebar'),
    components: {
        ISidebar,
        // ISidebarItems,
        INav,
        INavItem,
        ILayout,
        ILayoutAside,
        ILayoutContent
    },
    data() {
        return {
            collapsed: false
        };
    }
};
</script>
