<template lang="md" src="./pagination.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'PaginationView',
    extends: View,
    data() {
        return {
            currentPage: 1,
            currentPageSm: 1,
            currentPageMd: 1,
            currentPageLg: 1,
            currentPageLight: 1,
            currentPageDark: 1,
            currentPagePageLimit: 1,
            currentPagePageLimitResponsive: 1,
            currentPageQuickLink: 1,
            pageLimit: {
                xs: 3,
                sm: 5,
                md: 7
            }
        };
    }
};
</script>
