<template lang="md" src="./checkbox.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'CheckboxView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Checkbox',
        description: 'Checkbox inputs allow the user to select multiple options from a set.'
    }),
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
