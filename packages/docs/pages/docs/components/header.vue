<template lang="md" src="./header.md" />

<style lang="scss" src="./header.scss"></style>

<script>
import View from '@components/docs/View'
import { head } from '@helpers/head'
import { IButton, IHeader } from "@inkline/inkline/src/components";

export default {
    name: 'HeaderView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: { IButton, IHeader }
};
</script>
