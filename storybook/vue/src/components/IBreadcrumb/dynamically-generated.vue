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
        <i-breadcrumb-item v-bind="item" v-for="item in items" :key="item.title">
            {{item.title}}
        </i-breadcrumb-item>
    </i-breadcrumb>
</template>
<script src="./dynamically-generated.js" />
