<template lang="md" src="./media.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IMedia } from "@inkline/inkline/src/components";

export default {
    name: 'MediaView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-media'),
    components: {
        IMedia
    }
};
</script>
