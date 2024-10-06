<script lang="ts" setup>
const items = [
    { title: 'Home', href: '/' },
    { title: 'Components', to: 'components' },
    { title: 'Breadcrumbs', active: true }
];
</script>

<template>
    <IBreadcrumb>
        <IBreadcrumbItem v-for="item in items" v-bind="item" :key="item.title">
            {{ item.title }}
        </IBreadcrumbItem>
    </IBreadcrumb>
</template>
