<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'ILayoutFooter';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <footer class="layout-footer">
        <!-- @slot default Slot for default layout footer content -->
        <slot />
    </footer>
</template>
