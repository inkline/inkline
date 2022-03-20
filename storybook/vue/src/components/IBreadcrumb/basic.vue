<script lang="ts">
import { IBreadcrumb } from '@inkline/inkline/components';

export default {
    components: {
        IBreadcrumb
    }
};
</script>
<template>
    <i-breadcrumb>
        <i-breadcrumb-item>Home</i-breadcrumb-item>
        <i-breadcrumb-item active>Breadcrumbs</i-breadcrumb-item>
    </i-breadcrumb>
</template>
