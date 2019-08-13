<template lang="md" src="./typography.md" />
<style lang="scss" scoped src="./typography.scss"></style>
<script>
import View from '@components/View'
import { head } from '@helpers/head'

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
