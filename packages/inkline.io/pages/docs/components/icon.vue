<template lang="md" src="./icon.md" />

<style lang="scss">@import "icon";
</style>

<script>
import View from '@components/View'
import { head } from '@helpers/head'

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
