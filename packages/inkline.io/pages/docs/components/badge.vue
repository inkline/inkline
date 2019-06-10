<template lang="md" src="./badge.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'BadgeView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Badge',
        description: 'Documentation and examples for badges, a small Inkline component used for counting and labeling.'
    })
};
</script>
