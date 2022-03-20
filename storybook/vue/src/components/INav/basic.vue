<script lang="ts">
import { INav } from '@inkline/inkline/components';

export default {
    components: {
        INav
    }
};
</script>
<template>
    <i-nav>
        <i-nav-item href="https://inkline.io">Link</i-nav-item>
        <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
        <i-nav-item>Item</i-nav-item>
        <i-nav-item disabled>Disabled</i-nav-item>
    </i-nav>
</template>
