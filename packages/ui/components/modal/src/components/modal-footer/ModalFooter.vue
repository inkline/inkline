<script lang="ts">
import { defineComponent } from 'vue';

const componentName = 'ModalFooter';

export default defineComponent({
    name: componentName
});
</script>
<template>
    <footer class="modal-footer">
        <!-- @slot default Slot for modal footer content -->
        <slot />
    </footer>
</template>
