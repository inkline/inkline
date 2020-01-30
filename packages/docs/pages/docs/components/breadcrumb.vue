<template lang="md" src="./breadcrumb.md" />
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { IBreadcrumb, IBreadcrumbItem } from "@inkline/inkline/src/components";

export default {
    name: 'BreadcrumbView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-breadcrumb'),
    components: {
        IBreadcrumb,
        IBreadcrumbItem
    },
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
