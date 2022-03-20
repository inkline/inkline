<script lang="ts">
import { ITooltip } from '@inkline/inkline/components';

export default {
    components: {
        ITooltip
    }
};
</script>
<template>
    <i-tooltip>
        <i-button>Tooltip</i-button>
        <template #body>Tooltip</template>
    </i-tooltip>
</template>
