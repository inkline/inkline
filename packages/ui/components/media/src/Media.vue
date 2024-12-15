<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'Media';

export default defineComponent({
    name: componentName,
    inheritAttrs: false
});
</script>

<template>
    <div v-bind="$attrs" class="media">
        <!-- @slot image Slot for media image -->
        <slot name="image" />
        <div class="media-body">
            <!-- @slot default Slot for default media content -->
            <slot />
        </div>
    </div>
</template>