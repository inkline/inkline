<template lang="md" src="./checkbox.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { ICheckbox, ICheckboxButton, ICheckboxGroup, ICheckboxButtonGroup } from '@inkline/inkline';

export default {
    name: 'CheckboxView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Checkbox')
    },
    components: {
        ICheckbox,
        ICheckboxButton,
        ICheckboxGroup,
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
