<script lang="ts">
import { IBadge } from '@inkline/inkline/components';

export default {
    components: {
        IBadge
    }
};
</script>
<template>
    <i-badge v-bind="$attrs" size="sm">Small</i-badge>

    <i-badge v-bind="$attrs" size="md">Medium</i-badge>

    <i-badge v-bind="$attrs" size="lg">Large</i-badge>
</template>
