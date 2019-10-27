<template lang="md" src="./code.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";

export default {
    name: 'CodeView',
    layout: 'documentation',
    extends: View,
    head: head('docs-core-code'),
};
</script>
