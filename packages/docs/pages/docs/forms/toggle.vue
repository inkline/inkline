<template lang="md" src="./toggle.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IToggle, IFormGroup } from "@inkline/inkline/src/components";

export default {
    name: 'ToggleView',
    layout: 'documentation',
    extends: View,
    head: head(),
    components: {
        IToggle,
        IFormGroup
    },
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
