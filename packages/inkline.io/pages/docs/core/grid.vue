<template lang="md" src="./grid.md"></template>

<script>
import View from '@components/docs/View';
import GridBox from '@components/docs/GridBox';
import { head } from "@helpers/head";
import { IContainer, IRow, IColumn } from "@inkline/inkline/src/components";

export default {
    name: 'GridView',
    layout: 'documentation',
    extends: View,
    head: head('docs-core-grid'),
    components: {
        GridBox,
        IContainer,
        IRow,
        IColumn
    }
};
</script>
