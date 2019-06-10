<template lang="md" src="./getting-started.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'GettingStartedView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Getting Started',
        description: 'Get started with Inkline and experience well written, designed and tested front end code.'
    }),
};
</script>
