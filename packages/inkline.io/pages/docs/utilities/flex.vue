<template lang="md" src="./flex.md" />
<style lang="scss" scoped>
    @import '~@inkline/inkline/css/config/index';
    @import '~@inkline/inkline/css/mixins/index';

    .flexbox-preview {
        padding: ($spacer / 2);
        background: colors('neutral', 'gray-20');
        border: 1px solid colors('neutral', 'gray-30');

        &.-tall {
            height: 100px;
        }

        &.-tall-2 {
            height: 200px;
        }

        > .flexbox-preview {
            background: colors('neutral', 'gray-40');
            border: 1px solid colors('neutral', 'gray-50');
        }
    }
</style>
<script>
import View from '@components/View'
import { head } from '@helpers/head'

export default {
    name: 'FlexUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Flex - Utilities',
        description: 'Use Inkline\'s flexbox utilities to modify the layout, alignment, and sizing of components and more.'
    }),
};
</script>
