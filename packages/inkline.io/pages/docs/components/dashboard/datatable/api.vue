<template lang="md" src="./api.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { generateDataRows } from "@helpers/generateDataRows";
import { IDatatable, IAlert, IIcon } from '@inkline/inkline/src';

export default {
    extends: View,
    name: 'DataTableApiView',
    layout: 'documentation',
    head: head('docs-components-dashboard-datatable-api'),
    components: {
        IDatatable,
        IAlert,
        IIcon
    },
    data () {
        return {};
    }
};
</script>
