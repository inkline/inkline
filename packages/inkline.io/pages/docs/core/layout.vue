<template lang="md" src="./layout.md"></template>

<style lang="scss" src="./layout.scss"></style>

<script>
import View from '@components/View'
import { head } from '@helpers/head'

export default {
    name: 'LayoutView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Layout',
        description: 'Build basic web application layouts using Inkline\'s built-in Layout components.'
    }),
};
</script>
