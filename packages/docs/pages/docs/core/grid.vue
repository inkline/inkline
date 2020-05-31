<template lang="md" src="./grid.md"></template>

<script>
import View from '@components/docs/View';
import GridBox from '@components/docs/GridBox';
import ApiTable from '@components/docs/ApiTable';
import ApiTableRow from '@components/docs/ApiTableRow';
import { head } from "@helpers/head";
import { IContainer, IRow, IColumn } from "@inkline/inkline/src/components";

export default {
    name: 'GridView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        ApiTable,
        ApiTableRow,
        GridBox,
        IContainer,
        IRow,
        IColumn
    }
};
</script>
