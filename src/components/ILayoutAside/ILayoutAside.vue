<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Slot for default layout aside content
 * @name default
 * @kind slot
 */

const componentName = 'ILayoutAside';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <aside class="layout-aside">
        <div class="layout-aside-children">
            <slot />
        </div>
    </aside>
</template>