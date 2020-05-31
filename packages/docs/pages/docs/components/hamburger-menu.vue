<template lang="md" src="./hamburger-menu.md" />

<script>
import View from '@components/docs/View'
import { head } from '@helpers/head'
import { IHamburgerMenu } from "@inkline/inkline/src/components";

export default {
    name: 'HamburgerMenuView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: { IHamburgerMenu },
    data() {
        return {
            value: false,
            valueLight: false,
            valueDark: false
        }
    }
};
</script>
