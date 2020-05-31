<template lang="md" src="./nav.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { INav, INavItem } from "@inkline/inkline/src/components";

export default {
    name: 'NavView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        INav,
        INavItem
    }
};
</script>
