<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'CardImage';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <div class="card-image">
        <!-- @slot default Slot for card image content -->
        <slot />
    </div>
</template>
