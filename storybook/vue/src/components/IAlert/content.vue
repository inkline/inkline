<script lang="ts">
import { IAlert, IIcon } from '@inkline/inkline/components';

export default {
    components: {
        IAlert,
        IIcon
    }
};
</script>
<template>
    <i-alert v-bind="$attrs">
        <template #icon>
            <i-icon name="ink-info" size="lg" />
        </template>
        <h4 class="_margin-bottom:0">Alert Title</h4>
        <p class="_margin-top:0">
            Some quick example text to build on the alert and make up the bulk of the alert's content.
        </p>
    </i-alert>
</template>
