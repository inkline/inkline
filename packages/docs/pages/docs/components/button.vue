<template lang="md" src="./button.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IButton, IIcon, ILoader } from "@inkline/inkline/src/components";

export default {
    name: 'ButtonView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IButton,
        IIcon,
        ILoader
    }
};
</script>
