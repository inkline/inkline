<template lang="md" src="./border.md" />
<style lang="scss" scoped src="./border.scss"></style>
<script>
import View from '@components/View'
import { head } from '@helpers/head'

export default {
    name: 'BorderUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Border - Utilities',
        description: 'Use Inkline\'s border utilities to quickly apply border styles to an element.'
    }),
};
</script>
