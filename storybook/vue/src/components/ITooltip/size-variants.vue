<script lang="ts">
import { ITooltip } from '@inkline/inkline/components';

export default {
    components: {
        ITooltip
    }
};
</script>
<template>
    <i-tooltip size="sm">
        <i-button>Small Tooltip</i-button>
        <template #body>Tooltip</template>
    </i-tooltip>
    
    <i-tooltip size="md">
        <i-button>Medium Tooltip</i-button>
        <template #body>Tooltip</template>
    </i-tooltip>
    
    <i-tooltip size="lg">
        <i-button>Large Tooltip</i-button>
        <template #body>Tooltip</template>
    </i-tooltip>
</template>
