<template lang="md" src="./nav.md" />
<script>
import View from '@components/View';
import { IButton, INav, INavItem } from '@inkline/inkline';

export default {
    name: 'NavView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Nav'
    },
    components: {
        IButton,
        INav,
        INavItem
    }
};
</script>
