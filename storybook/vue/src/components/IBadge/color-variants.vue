<script lang="ts">
import { IBadge } from '@inkline/inkline/components';

export default {
    components: {
        IBadge
    }
};
</script>
<template>
    <i-badge v-bind="$attrs" color="primary">Primary</i-badge>

    <i-badge v-bind="$attrs" color="secondary">Secondary</i-badge>

    <i-badge v-bind="$attrs" color="light">Light</i-badge>

    <i-badge v-bind="$attrs" color="dark">Dark</i-badge>

    <i-badge v-bind="$attrs" color="info">Info</i-badge>

    <i-badge v-bind="$attrs" color="success">Success</i-badge>

    <i-badge v-bind="$attrs" color="warning">Warning</i-badge>

    <i-badge v-bind="$attrs" color="danger">Danger</i-badge>
</template>
