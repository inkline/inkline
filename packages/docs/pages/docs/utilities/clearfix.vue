<template lang="md" src="./clearfix.md" />
<style lang="scss" scoped src="./clearfix.scss"></style>
<script>
import View from '@components/docs/View';
import { head } from '@helpers/head';
import { IButton } from "@inkline/inkline/src/components";

export default {
    name: 'ClearfixUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IButton
    }
};
</script>
