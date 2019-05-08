<template lang="md" src="./text.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'TextUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Text - Utilities')
    }
};
</script>
