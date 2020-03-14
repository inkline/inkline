<template lang="md" src="./tabs.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { ITabs, ITab, IAlert, IIcon, IButton } from "@inkline/inkline/src/components";

export default {
    name: 'TabsView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-tabs'),
    components: {
        ITabs,
        ITab,
        IAlert,
        IIcon,
        IButton
    },
    data() {
        return {
            active: 'tab-2'
        };
    },
};
</script>
