<template lang="md" src="./nav.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";

export default {
    name: 'NavView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Nav',
        description: 'Navs are basic navigation components that provide alignment and spacing between items.'
    }),
};
</script>
