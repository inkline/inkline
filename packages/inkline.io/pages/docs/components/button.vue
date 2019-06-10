<template lang="md" src="./button.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'ButtonView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Button',
        description: 'Inkline\'s Button component provides you with styles for multiple sizes, states, and more.'
    }),
};
</script>
