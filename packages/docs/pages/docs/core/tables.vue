<template lang="md" src="./tables.md" />
<script>
import View from '@components/docs/View';
import { IAlert, IIcon } from "@inkline/inkline/src/components";
import { head } from "@helpers/head";

export default {
    name: 'TablesView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: { IAlert, IIcon }
};
</script>
