<script lang="ts">
import { IIcon } from '@inkline/inkline/components';

export default {
    components: {
        IIcon
    }
};
</script>
<template>
    <i-icon name="ink-check" class="_color:primary" v-bind="$attrs" />

    <i-icon name="ink-check" class="_color:secondary" v-bind="$attrs" />

    <i-icon name="ink-check" class="_color:info" v-bind="$attrs" />

    <i-icon name="ink-check" class="_color:success" v-bind="$attrs" />

    <i-icon name="ink-check" class="_color:warning" v-bind="$attrs" />

    <i-icon name="ink-check" class="_color:danger" v-bind="$attrs" />
</template>
