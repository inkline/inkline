<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Slot for default layout header content
 * @name default
 * @kind slot
 */

const componentName = 'ILayoutHeader';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <header class="layout-header">
        <slot />
    </header>
</template>