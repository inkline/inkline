<template lang="md" src="./hamburger-menu.md" />

<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'HamburgerMenuView',
    extends: View,
    data() {
        return {
            value: false,
            valueLight: false,
            valueDark: false
        };
    }
};
</script>
