<template lang="md" src="./media.md" />
<script>
import View from '@components/View';
import { IMedia } from '@inkline/inkline';

export default {
    name: 'CardView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Media'
    },
    components: {
        IMedia
    }
};
</script>
