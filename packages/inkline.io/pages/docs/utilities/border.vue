<template lang="md" src="./border.md" />
<style lang="scss" scoped>
    @import '~@inkline/inkline/css/config/index';
    @import '~@inkline/inkline/css/mixins/index';

    .border-square {
        display: inline-block;
        width: 64px;
        height: 64px;
        background: colors('gray-20');
        border-color: colors('gray-40');
        margin-right: ($spacer / 2);
        margin-bottom: ($spacer / 2);
    }
</style>
<script>
import View from '@components/View'
import { head } from '@helpers/head'

export default {
    name: 'BorderUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Border - Utilities',
        description: 'Use Inkline\'s border utilities to quickly apply border styles to an element.'
    }),
};
</script>
