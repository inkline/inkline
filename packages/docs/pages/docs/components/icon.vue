<template lang="md" src="./icon.md" />

<style lang="scss" src="./icon.scss"></style>

<script>
import View from '@components/docs/View'
import { head } from '@helpers/head'
import { IIcon, ITooltip } from "@inkline/inkline/src/components";

export default {
    name: 'IconView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IIcon,
        ITooltip
    }
};
</script>
