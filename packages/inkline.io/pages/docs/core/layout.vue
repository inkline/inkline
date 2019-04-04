<template lang="md" src="./layout.md"></template>
<style lang="stylus">
@import '~@inkline/inkline/css/config/index'
@import '~@inkline/inkline/css/mixins/index'

.layout.-preview
    text-align: center

    .layout-header
    .layout-footer
        background: --colors['gray-20']

    .layout-aside
        background: --colors['gray-30']

        .layout-aside-preview-text
            position: absolute
            top: 50%
            width: 100%
            transform: translateY(-50%)
            text-align: center

    .layout-content
        background: --colors['gray-10']
        padding: 5rem 0
</style>
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { ILayout, ILayoutHeader, ILayoutContent, ILayoutAside, ILayoutFooter } from '@inkline/inkline';

export default {
    name: 'LayoutView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Layout')
    },
    components: {
        ILayout,
        ILayoutHeader,
        ILayoutContent,
        ILayoutAside,
        ILayoutFooter
    }
};
</script>
