<script lang="ts">
import { IPopover } from '@inkline/inkline/components';

export default {
    components: {
        IPopover
    }
};
</script>
<template>
    <i-popover color="light">
        <i-button color="light">Light Popover</i-button>
        <template #header>
            Popover Header
        </template>
        <template #body>
            This is the popover body. Useful information goes here.
        </template>
        <template #footer>
            Popover Footer
        </template>
    </i-popover>
    
    <i-popover color="dark">
        <i-button color="dark">Dark Popover</i-button>
        <template #header>
            Popover Header
        </template>
        <template #body>
            This is the popover body. Useful information goes here.
        </template>
        <template #footer>
            Popover Footer
        </template>
    </i-popover>
    
</template>
