<template lang="md" src="./color.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import ColorBox from '@components/ColorBox';

export default {
    name: 'ColorUtilitiesView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Color - Utilities')
    },
    components: {
        ColorBox
    }
};
</script>
