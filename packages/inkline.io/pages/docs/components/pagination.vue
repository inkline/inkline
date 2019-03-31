<template lang="md" src="./pagination.md" />
<script>
import View from '@components/View';
import { IButton, INav, INavItem } from '@inkline/inkline';

export default {
    name: 'NavView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Pagination'
    },
    components: {
        IButton,
        INav,
        INavItem
    },
    data() {
        return {
            currentPage: 1,
            currentPageSm: 1,
            currentPageMd: 1,
            currentPageLg: 1,
            currentPageLight: 1,
            currentPageDark: 1
        };
    }
};
</script>
