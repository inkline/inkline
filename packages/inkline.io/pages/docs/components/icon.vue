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
import {title} from '@helpers/title';

export default {
    name: 'IconView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Icon')
    }
};
</script>
