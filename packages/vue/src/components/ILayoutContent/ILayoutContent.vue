<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'ILayoutContent';

export default defineComponent({
    name: componentName,
    inheritAttrs: false
});
</script>

<template>
    <section v-bind="$attrs" class="layout-content">
        <!-- @slot default Slot for default layout content children -->
        <slot />
    </section>
</template>
