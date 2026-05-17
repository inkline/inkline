<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'CardHeader';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <div class="card-header">
        <!-- @slot default Slot for card header content -->
        <slot />
    </div>
</template>
