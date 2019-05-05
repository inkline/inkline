<template lang="md" src="./clearfix.md" />
<style lang="stylus" scoped>
@require '~@inkline/inkline/css/config/index'
@require '~@inkline/inkline/css/mixins/index'

.border-square
    display: inline-block
    width: 64px
    height: 64px
    background: --colors['gray-20']
    border-color: --colors['gray-40']
    margin-right: 0.5rem
</style>
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'ClearfixUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Clearfix - Utilities')
    }
};
</script>
