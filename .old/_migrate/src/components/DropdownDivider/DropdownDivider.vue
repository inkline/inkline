<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'DropdownDivider';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    setup() {}
});
</script>

<template>
    <div v-bind="$attrs" class="dropdown-divider" role="separator" />
</template>
