<template lang="md" src="./dropdown.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'DropdownView',
    extends: View,
    data() {
        return {
            manualDropdown: false
        };
    }
};
</script>
