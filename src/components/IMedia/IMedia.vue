<script lang="ts" setup>
const componentName = 'IMedia';
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
