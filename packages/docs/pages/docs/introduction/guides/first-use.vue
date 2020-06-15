<template lang="md" src="./first-use.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert } from "@inkline/inkline/src/components";

export default {
    name: 'FirstUseView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IAlert
    }
};
</script>
