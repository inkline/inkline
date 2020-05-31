<template lang="md" src="./button-group.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IButton, IButtonGroup } from "@inkline/inkline/src/components";

export default {
    name: 'ButtonGroupView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IButtonGroup,
        IButton
    }
};
</script>
