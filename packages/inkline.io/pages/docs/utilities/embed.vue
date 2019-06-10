<template lang="md" src="./embed.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'EmbedUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Embed - Utilities',
        description: 'Create responsive video embeds by keeping the aspect ratio based on the parent element width.'
    }),
};
</script>
