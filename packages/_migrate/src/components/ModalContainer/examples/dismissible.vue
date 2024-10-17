<script lang="ts">
import { useModal } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const modal = useModal();

        function showModal() {
            modal.show({
                header: 'Dismissible Modal',
                body: 'This modal can be dismissed by clicking the close button',
                dismissible: true
            });
        }

        return {
            showModal
        };
    }
});
</script>
<template>
    <Button @click="showModal">Show modal</Button>
</template>
