<template lang="md" src="./cdn.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert, IIcon, ICard } from "@inkline/inkline/src/components";

export default {
    name: 'CDNView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IAlert,
        IIcon,
        ICard
    }
};
</script>
