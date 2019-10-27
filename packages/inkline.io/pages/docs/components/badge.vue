<template lang="md" src="./badge.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IBadge } from "@inkline/inkline/src/index";

export default {
    name: 'BadgeView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-badge'),
    components: { IBadge },
};
</script>
