<template lang="md" src="./sidebar.md" />
<style lang="scss">
@import '~@inkline/inkline/src/css/config';

.sidebar-layout-example {
    height: 20rem;
    border: 1px solid $color-gray-20;

    &.-lg {
        height: 24rem;
    }

    &.-sm {
        height: 16rem;
    }
}
</style>
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
            collapsed: false,
            collapsedSizesSm: false,
            collapsedSizesMd: false,
            collapsedSizesLg: false,
            collapsedVariantsLight: false,
            collapsedVariantsDark: false,
            collapsedPlacementLeft: false,
            collapsedPlacementRight: false,
        };
    }
};
</script>
