<script lang="ts">
import { IIcon } from '@inkline/inkline/components';

export default {
    components: {
        IIcon
    }
};
</script>
<template>
    <i-icon name="ink-check" size="sm" v-bind="$attrs" />

    <i-icon name="ink-check" size="md" v-bind="$attrs" />

    <i-icon name="ink-check" size="lg" v-bind="$attrs" />
</template>
