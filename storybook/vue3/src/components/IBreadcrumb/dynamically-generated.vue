<script lang="ts">
import { IBreadcrumb, IBreadcrumbItem } from '@inkline/inkline/components';
import { ref } from 'vue';

export default {
    components: {
        IBreadcrumb,
        IBreadcrumbItem
    },
    setup () {
        const items = ref([
            { title: 'Home', href: '/' },
            { title: 'Components', to: 'components' },
            { title: 'Breadcrumbs', active: true }
        ]);

        return { items };
    }
};
</script>
<template>
    <i-breadcrumb>
        <i-breadcrumb-item v-for="item in items" v-bind="item" :key="item.title">
            {{ item.title }}
        </i-breadcrumb-item>
    </i-breadcrumb>
</template>
