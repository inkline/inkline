<template lang="md" src="./color.md" />
<script>
import { head } from "@helpers/head";
import View from '@components/docs/View';
import ColorBox from '@components/docs/ColorBox';

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
