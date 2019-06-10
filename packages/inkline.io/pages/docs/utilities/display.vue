<template lang="md" src="./display.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'DisplayUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Display - Utilities',
        description: 'Change the display style of components responsively using Inkline\'s display utilities.'
    }),
};
</script>
