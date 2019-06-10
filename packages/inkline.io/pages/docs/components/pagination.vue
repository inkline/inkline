<template lang="md" src="./pagination.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'PaginationView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Pagination',
        description: 'Use Inkline\'s Pagination component to provide navigation for large series of related content.'
    }),
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
