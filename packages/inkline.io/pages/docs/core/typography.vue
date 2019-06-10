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
import { head } from "@helpers/head";

export default {
    name: 'TypographyView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Typography',
        description: 'Examples and documentation for typography, one of the most important design elements of an application.'
    }),
};
</script>
