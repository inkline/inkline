<template lang="md" src="./layout.md"></template>

<style lang="scss">
    @import '../../../css/config/index';
    @import '~@inkline/inkline/css/config/index';
    @import '~@inkline/inkline/css/mixins/index';

    .layout.-preview {
        text-align: center;

        .layout-header,
        .layout-footer {
            background: colors('gray-20');
        }

        .layout-aside {
            background: colors('gray-30');
            // FIXME: import order forces to redefine width here.
            width: $layout-aside-width;

            .layout-aside-preview-text {
                position: absolute;
                top: 50%;
                width: 100%;
                transform: translateY(-50%);
                text-align: center;
            }
        }

        .layout-content {
            background: colors('gray-10');
            padding: 5rem 0;
        }
    }
</style>

<script>
import View from '@components/View'
import { head } from '@helpers/head'

export default {
    name: 'LayoutView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Layout',
        description: 'Build basic web application layouts using Inkline\'s built-in Layout components.'
    }),
};
</script>
