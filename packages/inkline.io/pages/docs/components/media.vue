<template lang="md" src="./media.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'CardView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Media',
        description: 'Media objects provide you with a flexible component that can be easily nested and repeated.'
    })
};
</script>
