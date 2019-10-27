<template lang="md" src="./checkbox.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { ICheckbox, ICheckboxGroup, ICheckboxButton, ICheckboxButtonGroup } from "@inkline/inkline/src/components";

export default {
    name: 'CheckboxView',
    layout: 'documentation',
    extends: View,
    head: head('docs-forms-checkbox'),
    components: {
        ICheckbox,
        ICheckboxGroup,
        ICheckboxButton,
        ICheckboxButtonGroup
    },
    data () {
        return {
            checked: true,
            checkedGroup: ['Football', 'Basketball', 'Tennis'],
            checkedSize: ['Basketball'],
            checkedSizeGroupSm: ['Basketball', 'Tennis'],
            checkedSizeGroupMd: ['Basketball', 'Tennis'],
            checkedSizeGroupLg: ['Basketball', 'Tennis'],
            checkedCustomTrue: ['Basketball'],
            checkedCustomFalse: ['Basketball'],
            checkedButton: ['Earth']
        };
    }
};
</script>
