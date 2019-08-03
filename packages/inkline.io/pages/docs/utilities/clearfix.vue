<template lang="md" src="./clearfix.md" />
<style lang="scss" scoped>
    @import '~@inkline/inkline/css/config/index';
    @import '~@inkline/inkline/css/mixins/index';

    .border-square {
        display: inline-block;
        width: 64px;
        height: 64px;
        background: colors('gray-20');
        border-color: colors('gray-40');
        margin-right: 0.5rem;
    }
</style>
<script>
import View from '@components/View'
import { head } from '@helpers/head'

export default {
    name: 'ClearfixUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Clearfix - Utilities',
        description: 'Use Inkline\'s clearfix utility to clear floated content within a container.'
    }),
};
</script>
