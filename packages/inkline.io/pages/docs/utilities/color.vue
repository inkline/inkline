<template lang="md" src="./color.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";
import ColorBox from '@components/ColorBox';

export default {
    name: 'ColorUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Color - Utilities',
        description: 'Use Inkline\'s color utilities to provide a beautiful, consistent color scheme across your web application.'
    }),
    components: {
        ColorBox
    }
};
</script>
