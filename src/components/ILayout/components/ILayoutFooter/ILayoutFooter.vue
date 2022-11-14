<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Slot for default layout footer content
 * @name default
 * @kind slot
 */

const componentName = 'ILayoutFooter';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <footer class="layout-footer">
        <slot />
    </footer>
</template>