<template lang="md" src="./sidebar.md" />
<style lang="scss">
@import '~@inkline/inkline/src/css/config';

.sidebar-layout-example {
    height: 20rem;
    border: 1px solid $border-color-light;

    &.-lg {
        height: 24rem;
    }

    &.-sm {
        height: 16rem;
    }
}

.inkline.-dark .sidebar-layout-example {
    border: 1px solid $border-color-dark;
}
</style>
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'SidebarView',
    extends: View,
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
            collapsedPositionRelative: false,
            collapsedPositionAbsolute: false,
            collapsedPositionFixed: false,
            collapsedBreakpointLg: false,
            collapsedBreakpointAlways: false,
            collapsedBreakpointNever: false
        };
    }
};
</script>
