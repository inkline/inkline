<template lang="md" src="./card.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { ICard, IRow, IColumn } from "@inkline/inkline/src/components";

export default {
    name: 'CardView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        ICard,
        IRow,
        IColumn
    }
};
</script>
