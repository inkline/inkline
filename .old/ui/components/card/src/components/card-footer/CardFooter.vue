<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'CardFooter';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <div class="card-footer">
        <!-- @slot default Slot for card footer content -->
        <slot />
    </div>
</template>
