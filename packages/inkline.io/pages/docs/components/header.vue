<template lang="md" src="./header.md" />

<style lang="scss" src="./header.scss"></style>

<script>
import View from '@components/View'
import { head } from '@helpers/head'

export default {
    name: 'HeaderView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Header',
        description: 'Inkline\'s lightweight, responsive Header component used for showcasing hero unit style content.'
    })
};
</script>
