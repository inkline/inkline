<script lang="ts">
import { useToast } from '@inkline/inkline';
import { defineComponent } from 'vue';

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
    <Button @click="showToast">Show toast</Button>
    <Button @click="hideToast">Hide toast</Button>
</template>
