<template lang="md" src="./colors.md" />
<script>
import View from '@components/View';
import ColorBox from '@components/ColorBox';

export default {
    name: 'ColorsView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Colors'
    },
    components: {
        ColorBox
    }
};
</script>
