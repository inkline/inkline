<template lang="md" src="./header.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IButton, IHeader } from '@inkline/inkline';

export default {
    name: 'HeaderView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Header')
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
