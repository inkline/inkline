<template lang="md" src="./card.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'CardView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Card',
        description: 'Cards provide you with a flexible and extensible content container with multiple color variants and options.'
    }),
};
</script>
