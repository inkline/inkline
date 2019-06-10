<template lang="md" src="./sizing.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'SizingUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Sizing - Utilities',
        description: 'Make an element as wide or as tall as you need using Inkline\'s width and height utilities.'
    }),
};
</script>
