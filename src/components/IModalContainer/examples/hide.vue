<script lang="ts">
import { useModal } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const modalId = 'modal';
        const modal = useModal();

        function showModal() {
            modal.show({
                id: modalId,
                header: 'Controlled Modal',
                body: 'This modal will be visible for 3 seconds'
            });

            hideModal();
        }

        function hideModal() {
            setTimeout(() => {
                modal.hide({ id: modalId });
            }, 3000);
        }

        return {
            showModal,
            hideModal
        };
    }
});
</script>
<template>
    <IButton @click="showModal">Show modal</IButton>
</template>
