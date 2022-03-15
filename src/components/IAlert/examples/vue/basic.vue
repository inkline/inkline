<script lang="ts">
import { IAlert } from '@inkline/inkline/components';

export default {
    components: {
        IAlert
    }
};
</script>
<template>
    <i-alert v-bind="$attrs">
        <template #icon>
            <i-icon name="ink-circle" />
        </template>
        <p>Heads up! This alert needs your attention, and it might be <a href="">important</a>.</p>
    </i-alert>
</template>
