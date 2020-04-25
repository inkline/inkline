<template lang="md" src="./contribution-guide.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert, IIcon } from "@inkline/inkline/src/components";

export default {
    name: 'ContributionGuideView',
    layout: 'documentation',
    extends: View,
    head: head('docs-preface-contribution-guide'),
    components: {
        IAlert,
        IIcon
    }
};
</script>
