<script lang="ts" setup>
const items = [
    { title: 'Home', href: '/' },
    { title: 'Components', to: 'components' },
    { title: 'Breadcrumbs', active: true }
];
</script>

<template>
    <i-breadcrumb>
        <i-breadcrumb-item v-for="item in items" v-bind="item" :key="item.title">
            {{ item.title }}
        </i-breadcrumb-item>
    </i-breadcrumb>
</template>
