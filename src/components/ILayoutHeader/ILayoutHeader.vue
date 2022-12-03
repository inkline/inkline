<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'ILayoutHeader';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <header class="layout-header">
        <!-- @slot default Slot for default layout header content -->
        <slot />
    </header>
</template>
