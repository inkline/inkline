<template lang="md" src="./customization.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'CustomizationView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Customization',
        description: 'Make Inkline your own using hundreds of configurable Sass variables.'
    }),
};
</script>
