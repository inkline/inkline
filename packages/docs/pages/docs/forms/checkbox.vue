<template lang="md" src="./checkbox.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'CheckboxView',
    layout: 'documentation',
    extends: View,
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
