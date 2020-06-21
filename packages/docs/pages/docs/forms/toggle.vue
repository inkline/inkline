<template lang="md" src="./toggle.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'ToggleView',
    extends: View,
    data () {
        return {
            toggled: false,
            toggledSizeSm: false,
            toggledSizeMd: false,
            toggledSizeLg: false,
            toggledSizeGroupSm: false,
            toggledSizeGroupMd: false,
            toggledSizeGroupLg: false,
            toggledReadonlyFalse: false,
            toggledReadonlyTrue: true,
            toggledDisabledFalse: false,
            toggledDisabledTrue: true
        };
    }
};
</script>
