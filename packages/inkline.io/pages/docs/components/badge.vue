<template lang="md" src="./badge.md" />
<script>
import View from '@components/View';
import { IBadge } from '@inkline/inkline';

export default {
    name: 'BadgeView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Badge'
    },
    components: {
        IBadge
    }
};
</script>
