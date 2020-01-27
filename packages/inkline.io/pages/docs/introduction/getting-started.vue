<template lang="md" src="./getting-started.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert, IIcon } from "@inkline/inkline/src/components";

export default {
    name: 'GettingStartedView',
    layout: 'documentation',
    extends: View,
    head: head('docs-introduction-getting-started'),
    components: {
        IAlert,
        IIcon
    }
};
</script>
