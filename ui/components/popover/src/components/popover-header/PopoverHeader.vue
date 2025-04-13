<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'PopoverHeader';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <div class="popover-header">
        <!-- @slot default Slot for popover header content -->
        <slot />
    </div>
</template>
