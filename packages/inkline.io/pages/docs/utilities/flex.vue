<template lang="md" src="./flex.md" />
<style lang="stylus" scoped>
@require '~@inkline/inkline/css/config/index'
@require '~@inkline/inkline/css/mixins/index'

.flexbox-preview
    padding: (--spacer / 2)
    background: --colors['gray-20']
    border: 1px solid --colors['gray-30']

    &.-tall
        height: 100px

    > .flexbox-preview
        background: --colors['gray-40']
        border: 1px solid --colors['gray-50']
</style>
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'FlexUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Flex - Utilities')
    }
};
</script>
