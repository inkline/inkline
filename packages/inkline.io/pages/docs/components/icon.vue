<template lang="md" src="./icon.md" />

<style lang="stylus">
@require '~@inkline/inkline/css/config/index'
@require '~@inkline/inkline/css/mixins/index'

.icon-box
    width: 64px
    height: 64px
    line-height: 64px
    text-align: center
    display: inline-block
    border: 1px solid --colors['gray-40']
    margin-right: (--spacer / 2)
    margin-bottom: (--spacer / 2)
</style>

<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'IconView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Icon',
        description: 'Inkline provides you with a set of icons which are commonly used within web applications.'
    }),
};
</script>
