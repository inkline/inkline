<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'ModalHeader';

export default defineComponent({
    name: componentName
});
</script>
<template>
    <header class="modal-header">
        <!-- @slot default Slot for modal header content -->
        <slot />
    </header>
</template>
