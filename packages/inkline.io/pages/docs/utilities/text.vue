<template lang="md" src="./text.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'TextUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Text - Utilities',
        description: 'Inkline provides common text utilities to control alignment, wrapping, weight, and more.'
    }),
};
</script>
