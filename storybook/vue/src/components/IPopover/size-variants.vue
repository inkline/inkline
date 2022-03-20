<script lang="ts">
import { IPopover } from '@inkline/inkline/components';

export default {
    components: {
        IPopover
    }
};
</script>
<template>
    <i-popover size="sm">
        <i-button>Small Popover</i-button>
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
    
    <i-popover size="md">
        <i-button>Medium Popover</i-button>
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
    
    <i-popover size="lg">
        <i-button>Large Popover</i-button>
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
