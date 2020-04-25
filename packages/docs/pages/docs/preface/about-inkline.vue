<template lang="md" src="./about-inkline.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert, IIcon } from "@inkline/inkline/src/components";

export default {
    name: 'AboutInklineView',
    layout: 'documentation',
    extends: View,
    head: head('docs-preface-about-inkline'),
    components: {
        IAlert,
        IIcon
    }
};
</script>
