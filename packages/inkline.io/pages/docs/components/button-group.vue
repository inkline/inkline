<template lang="md" src="./button-group.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IButton, IButtonGroup } from '@inkline/inkline';

export default {
    name: 'ButtonGroupView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Button Group')
    },
    components: {
        IButton,
        IButtonGroup
    }
};
</script>
