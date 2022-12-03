<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'IMedia';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <div class="media">
        <!-- @slot image Slot for media image -->
        <slot name="image" />
        <div class="media-body">
            <!-- @slot default Slot for default media content -->
            <slot />
        </div>
    </div>
</template>
