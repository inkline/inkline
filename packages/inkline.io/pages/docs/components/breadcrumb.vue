<template lang="md" src="./breadcrumb.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'BreadcrumbView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Breadcrumb',
        description: 'Indicate the current page’s location depth using a navigation list that automatically adds separators.'
    }),
    data() {
        return {
            items: [
                { id: 0, title: 'Home', href: '/' },
                { id: 1, title: 'Components', to: 'breadcrumb' },
                { id: 2, title: 'Breadcrumbs', active: true }
            ]
        };
    }
};
</script>
