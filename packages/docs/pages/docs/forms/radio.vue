<template lang="md" src="./radio.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    extends: View,
    name: 'RadioView',
    data () {
        return {
            selected: 'Apple',
            selectedGroup: 'Football',
            selectedSize: 'Basketball',
            selectedSizeGroupSm: 'Basketball',
            selectedSizeGroupMd: 'Basketball',
            selectedSizeGroupLg: 'Basketball',
            selectedCustomTrue: 'Basketball',
            selectedCustomFalse: 'Basketball',
            selectedButton: 'Earth'
        };
    }
};
</script>
