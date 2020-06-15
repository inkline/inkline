<template lang="md" src="./plugin-options.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert, IIcon, ICard } from "@inkline/inkline/src/components";

export default {
    name: 'PluginOptionsView',
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
