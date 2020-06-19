<template lang="md" src="./hamburger-menu.md" />

<script>
import View from '~/components/docs/View';

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
