<script lang="ts">
import { useToast } from '@inkline/inkline/composables';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();

        function showToast() {
            toast.show({
                title: 'Dismissible Toast',
                message: 'This toast can be dismissed by clicking the close button',
                dismissible: true
            });
        }

        return {
            showToast
        };
    }
});
</script>
<template>
    <IToastContainer />
    <IButton @click="showToast">Show toast</IButton>
</template>
