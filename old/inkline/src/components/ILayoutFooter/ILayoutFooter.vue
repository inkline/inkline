<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'ILayoutFooter';

export default defineComponent({
    name: componentName,
    inheritAttrs: false
});
</script>

<template>
    <footer v-bind="$attrs" class="layout-footer">
        <!-- @slot default Slot for default layout footer content -->
        <slot />
    </footer>
</template>
