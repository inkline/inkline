<template lang="md" src="./customization.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert } from "@inkline/inkline/src/components";

export default {
    name: 'CustomizationView',
    layout: 'documentation',
    extends: View,
    head: head('docs-introduction-customization'),
    components: {
        IAlert
    }
};
</script>
