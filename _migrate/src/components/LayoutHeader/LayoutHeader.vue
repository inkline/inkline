<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'LayoutHeader';

export default defineComponent({
    name: componentName,
    inheritAttrs: false
});
</script>

<template>
    <header v-bind="$attrs" class="layout-header">
        <!-- @slot default Slot for default layout header content -->
        <slot />
    </header>
</template>
