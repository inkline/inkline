<template lang="md" src="./badge.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IBadge } from '@inkline/inkline';

export default {
    name: 'BadgeView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Badge')
    },
    components: {
        IBadge
    }
};
</script>
