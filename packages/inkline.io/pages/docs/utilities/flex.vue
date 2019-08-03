<template lang="md" src="./flex.md" />
<style lang="scss" scoped>@import "flex";
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
