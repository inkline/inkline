<template lang="md" src="./color.md" />
<script>
import { head } from "@helpers/head";
import View from '@components/docs/View';
import ColorBox from '@components/docs/ColorBox';
import { IRow, IColumn } from "@inkline/inkline/src/components";

export default {
    name: 'ColorUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head('docs-utilities-color'),
    components: {
        ColorBox,
        IRow,
        IColumn
    }
};
</script>
