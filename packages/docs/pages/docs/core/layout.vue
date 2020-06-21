<template lang="md" src="./layout.md"></template>
<style lang="scss" src="./layout.scss"></style>
<script>
import View from '~/components/layout/NuxtContentView';
import { ILayout, ILayoutAside, ILayoutContent, ILayoutHeader, ILayoutFooter } from '@inkline/inkline/src/components';

export default {
    name: 'LayoutView',
    layout: 'documentation',
    extends: View,
    components: {
        ILayout,
        ILayoutAside,
        ILayoutContent,
        ILayoutHeader,
        ILayoutFooter
    }
};
</script>
