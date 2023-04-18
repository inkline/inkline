<script lang="ts">
import { useToast } from '@inkline/inkline/composables';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const toastId = 'toast';
        const toast = useToast();

        function showToast() {
            toast.show({
                id: toastId,
                title: 'Controlled Toast',
                message: 'This toast will be visible until it is programmatically hidden',
                duration: 0
            });
        }

        function hideToast() {
            toast.hide({ id: toastId });
        }

        return {
            showToast,
            hideToast
        };
    }
});
</script>
<template>
    <IToastContainer />
    <IButton @click="showToast">Show toast</IButton>
    <IButton @click="hideToast">Hide toast</IButton>
</template>
