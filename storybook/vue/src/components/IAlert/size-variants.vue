<script lang="ts">
import { IAlert } from '@inkline/inkline/components';

export default {
    components: {
        IAlert
    }
};
</script>
<template>
    <i-alert size="sm" v-bind="$attrs">
        Some quick example text to build on the alert title and make up the bulk of the alert's content.
    </i-alert>

    <i-alert size="md" v-bind="$attrs">
        Some quick example text to build on the alert title and make up the bulk of the alert's content.
    </i-alert>

    <i-alert size="lg" v-bind="$attrs">
        Some quick example text to build on the alert title and make up the bulk of the alert's content.
    </i-alert>
</template>
