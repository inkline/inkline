<script lang="ts">
import { IBreadcrumb } from '@inkline/inkline/components';

export default {
    components: {
        IBreadcrumb
    }
};
</script>
<template>
    <i-breadcrumb color="light">
        <i-breadcrumb-item href="/">Home</i-breadcrumb-item>
        <i-breadcrumb-item active>Light</i-breadcrumb-item>
    </i-breadcrumb>
    
    <i-breadcrumb color="dark">
        <i-breadcrumb-item href="/">Home</i-breadcrumb-item>
        <i-breadcrumb-item active>Dark</i-breadcrumb-item>
    </i-breadcrumb>
</template>
