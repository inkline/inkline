<template lang="md" src="./card.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { ICard } from '@inkline/inkline';

export default {
    name: 'CardView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Card')
    },
    components: {
        ICard
    }
};
</script>
