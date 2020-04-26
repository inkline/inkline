<template lang="md" src="./sass-variables.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert, IIcon } from "@inkline/inkline/src/components";

export default {
    name: 'SassVariablesView',
    layout: 'documentation',
    extends: View,
    head: head('docs-core-sass-variables'),
    components: {
        IAlert,
        IIcon
    }
};
</script>
