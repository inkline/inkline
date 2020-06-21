<template lang="md" src="./dark-mode.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'DarkModeView',
    extends: View,
    methods: {
        toggleVariant() {
            this.$inkline.config.variant = this.$inkline.config.variant === 'light' ? 'dark' : 'light';
        }
    }
};
</script>
