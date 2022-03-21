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
        <i-nav-item :to="{ name: 'docs-components-nav' }" exact-active-class="-active">
            Active Router Link
        </i-nav-item>
        <i-nav-item active>
            Active Item
        </i-nav-item>
    </i-nav>
</template>
