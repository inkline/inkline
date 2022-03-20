<script lang="ts">
import { IBreadcrumb } from '@inkline/inkline/components';

export default {
    components: {
        IBreadcrumb
    }
};
</script>
<template>
    <i-breadcrumb size="sm">
        <i-breadcrumb-item href="/">Sizes</i-breadcrumb-item>
        <i-breadcrumb-item active>Small</i-breadcrumb-item>
    </i-breadcrumb>
    
    <i-breadcrumb size="md">
        <i-breadcrumb-item href="/">Sizes</i-breadcrumb-item>
        <i-breadcrumb-item active>Medium</i-breadcrumb-item>
    </i-breadcrumb>
    
    <i-breadcrumb size="lg">
        <i-breadcrumb-item href="/">Sizes</i-breadcrumb-item>
        <i-breadcrumb-item active>Large</i-breadcrumb-item>
    </i-breadcrumb>
</template>
