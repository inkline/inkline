<template lang="md" src="./progress.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IProgress, IProgressBar } from '@inkline/inkline';

export default {
    name: 'ProgressView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Progress')
    },
    components: {
        IProgress,
        IProgressBar,
    }
};
</script>
