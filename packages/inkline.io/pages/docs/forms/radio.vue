<template lang="md" src="./radio.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IRadio, IRadioGroup, IRadioButton, IRadioButtonGroup } from "@inkline/inkline/src/components";

export default {
    extends: View,
    name: 'RadioView',
    layout: 'documentation',
    head: head('docs-forms-radio'),
    components: {
        IRadio,
        IRadioGroup,
        IRadioButton,
        IRadioButtonGroup
    },
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
