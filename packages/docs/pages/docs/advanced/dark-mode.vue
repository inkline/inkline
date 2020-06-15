<template lang="md" src="./dark-mode.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IAlert, IIcon, IButton } from "@inkline/inkline/src/components";

export default {
    name: 'DarkModeView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IAlert,
        IIcon,
        IButton
    },
    methods: {
        toggleVariant() {
            this.$inkline.config.variant = this.$inkline.config.variant === 'light' ? 'dark' : 'light';
        }
    }
};
</script>
