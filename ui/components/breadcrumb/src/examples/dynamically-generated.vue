<script lang="ts" setup>
const items = [
    { label: 'Home', href: '/' },
    { label: 'Components', to: 'components' },
    { label: 'Breadcrumbs', active: true }
];
</script>

<template>
    <Breadcrumb>
        <BreadcrumbItem v-for="item in items" v-bind="item" :key="item.label">
            {{ item.label }}
        </BreadcrumbItem>
    </Breadcrumb>
</template>
