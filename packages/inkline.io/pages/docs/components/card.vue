<template lang="md" src="./card.md" />
<script>
import View from '@components/View';
import { ICard } from '@inkline/inkline';

export default {
    name: 'CardView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Card'
    },
    components: {
        ICard
    }
};
</script>
