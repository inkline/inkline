<template lang="md" src="./clearfix.md" />
<style lang="scss" scoped src="./clearfix.scss"></style>
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
