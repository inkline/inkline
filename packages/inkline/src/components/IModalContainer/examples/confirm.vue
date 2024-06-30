<script lang="ts">
import { useModal, useToast } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();
        const { confirm } = useModal();

        async function showConfirm() {
            const confirmed = await confirm({
                title: 'Confirm',
                message: 'Are you sure you want to delete this item?',
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel'
            });

            if (confirmed) {
                toast.show({
                    message: 'Item deleted successfully',
                    color: 'success'
                });
            }
        }

        return {
            showConfirm
        };
    }
});
</script>
<template>
    <IButton @click="showConfirm">Show confirm</IButton>
</template>
