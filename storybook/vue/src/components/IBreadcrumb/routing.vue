<script lang="ts">
import { IBreadcrumb, IBreadcrumbItem } from '@inkline/inkline/components';

export default {
    components: {
        IBreadcrumb,
        IBreadcrumbItem
    }
};
</script>
<template>
    <i-breadcrumb>
        <i-breadcrumb-item href="/">Home</i-breadcrumb-item>
        <i-breadcrumb-item to="/example">Library</i-breadcrumb-item>
        <i-breadcrumb-item>Example</i-breadcrumb-item>
        <i-breadcrumb-item active>Data</i-breadcrumb-item>
    </i-breadcrumb>
</template>
