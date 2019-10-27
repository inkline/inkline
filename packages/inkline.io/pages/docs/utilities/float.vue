<template lang="md" src="./float.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert } from "@inkline/inkline/src/components";

export default {
    name: 'FloatUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: head('docs-utilities-float'),
    components: {
        IAlert
    }
};
</script>
