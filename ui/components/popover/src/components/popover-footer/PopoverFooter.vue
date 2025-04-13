<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'PopoverFooter';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <div class="popover-footer">
        <!-- @slot default Slot for popover footer content -->
        <slot />
    </div>
</template>
