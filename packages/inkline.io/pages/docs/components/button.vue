<template lang="md" src="./button.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IButton } from '@inkline/inkline';

export default {
    name: 'ButtonView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Button')
    },
    components: {
        IButton
    }
};
</script>
