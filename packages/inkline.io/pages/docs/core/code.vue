<template lang="md" src="./code.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'CodeView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Code')
    }
};
</script>
