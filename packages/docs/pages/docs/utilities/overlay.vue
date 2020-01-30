<template lang="md" src="./overlay.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IRow, IColumn, ICard } from "@inkline/inkline/src/components";

export default {
    name: 'OverlayUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head('docs-utilities-overlay'),
    components: {
        IRow,
        IColumn,
        ICard
    }
};
</script>
