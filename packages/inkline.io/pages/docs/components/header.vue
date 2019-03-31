<template lang="md" src="./header.md" />
<script>
import View from '@components/View';
import { IButton, IHeader } from '@inkline/inkline';

export default {
    name: 'HeaderView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Header'
    },
    components: {
        IButton,
        IHeader
    }
};
</script>
<style lang="stylus">
#cover-inkline-header
    background-image: url('~static/images/background.jpg')
</style>
