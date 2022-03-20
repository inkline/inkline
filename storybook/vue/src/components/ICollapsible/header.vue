<script lang="ts">
import { ICollapsible } from '@inkline/inkline/components';

export default {
    components: {
        ICollapsible
    }
};
</script>
<template>
    <i-collapsible>
        <i-collapsible-item>
            <template #header>Item 1</template>
            Item 1 content
        </i-collapsible-item>
        <i-collapsible-item>
            <template #header>Item 2</template>
            Item 2 content
        </i-collapsible-item>
        <i-collapsible-item>
            <template #header>Item 3</template>
            Item 3 content
        </i-collapsible-item>
    </i-collapsible>
</template>
