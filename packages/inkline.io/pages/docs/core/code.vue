<template lang="md" src="./code.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'CodeView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Code',
        description: 'Examples for displaying inline and multi-line blocks of code with Inkline.'
    }),
};
</script>
