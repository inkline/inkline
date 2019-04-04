<template lang="md" src="./customization.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'CustomizationView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Customization')
    }
};
</script>
