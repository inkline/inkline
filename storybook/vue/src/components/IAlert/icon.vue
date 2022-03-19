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
    <i-alert color="info" v-bind="$attrs">
        <template #icon>
            <i-icon name="ink-info" />
        </template>
        <p>Some quick example text to build on the alert title and make up the bulk of the alert's content.</p>
    </i-alert>
</template>
