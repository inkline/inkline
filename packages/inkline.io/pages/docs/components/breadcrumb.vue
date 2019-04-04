<template lang="md" src="./breadcrumb.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IBreadcrumb, IBreadcrumbItem } from '@inkline/inkline';

export default {
    name: 'BreadcrumbView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Breadcrumb')
    },
    components: {
        IBreadcrumb,
        IBreadcrumbItem
    },
    data() {
        return {
            items: [
                { id: 0, title: 'Home', href: '/' },
                { id: 1, title: 'Components', to: 'docs-components-breadcrumb' },
                { id: 2, title: 'Breadcrumbs', active: true }
            ]
        };
    }
};
</script>
