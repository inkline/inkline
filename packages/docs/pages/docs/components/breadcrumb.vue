<template lang="md" src="./breadcrumb.md" />
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'BreadcrumbView',
    extends: View,
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
