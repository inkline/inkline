<template lang="md" src="./typography.md" />
<style lang="stylus" scoped>
@import '~@inkline/inkline/css/config/index'

.headings-list
    > *
        margin-top: --spacer
        margin-bottom: --spacer
</style>
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'TypographyView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Typography')
    }
};
</script>
