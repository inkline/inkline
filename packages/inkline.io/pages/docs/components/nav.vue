<template lang="md" src="./nav.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IButton, INav, INavItem } from '@inkline/inkline';

export default {
    name: 'NavView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Nav')
    },
    components: {
        IButton,
        INav,
        INavItem
    }
};
</script>
