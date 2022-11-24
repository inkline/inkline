<script lang="ts" setup>
const componentName = 'ILayoutAside';
</script>

<template>
    <aside class="layout-aside">
        <div class="layout-aside-children">
            <!-- @slot default Slot for default layout aside content -->
            <slot />
        </div>
    </aside>
</template>
