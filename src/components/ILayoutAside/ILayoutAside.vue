<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'ILayoutAside';

export default defineComponent({
    name: componentName,
    inheritAttrs: false
});
</script>

<template>
    <aside v-bind="$attrs" class="layout-aside">
        <div class="layout-aside-children">
            <!-- @slot default Slot for default layout aside content -->
            <slot />
        </div>
    </aside>
</template>
