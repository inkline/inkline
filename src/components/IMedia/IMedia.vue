<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Slot for default media content
 * @name default
 * @kind slot
 */

const componentName = 'IMedia';

export default defineComponent({
    name: componentName
});
</script>

<template>
    <div class="media">
        <slot name="image"></slot>
        <div class="media-body">
            <slot></slot>
        </div>
    </div>
</template>