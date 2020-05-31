<template lang="md" src="./progress.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IProgress, IProgressBar } from "@inkline/inkline/src/components";

export default {
    name: 'ProgressView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IProgress,
        IProgressBar
    }
};
</script>
