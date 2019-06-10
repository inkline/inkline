<template lang="md" src="./progress.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'ProgressView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Progress',
        description: 'Inkline\'s custom component for displaying progress with support for stacked progress bars.'
    }),
};
</script>
