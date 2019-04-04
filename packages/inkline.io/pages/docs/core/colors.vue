<template lang="md" src="./colors.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import ColorBox from '@components/ColorBox';

export default {
    name: 'ColorsView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Colors')
    },
    components: {
        ColorBox
    }
};
</script>
