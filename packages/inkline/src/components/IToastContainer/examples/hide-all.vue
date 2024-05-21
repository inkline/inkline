<script lang="ts">
import { useToast } from '@inkline/inkline/composables';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();

        function showToast() {
            toast.show({
                title: 'Controlled Toast',
                message: 'This toast will be visible until it is programmatically hidden',
                duration: 0
            });
        }

        function hideAllToasts() {
            toast.hideAll();
        }

        return {
            showToast,
            hideAllToasts
        };
    }
});
</script>
<template>
    <IButton @click="showToast">Show toast</IButton>
    <IButton @click="hideAllToasts">Hide all toasts</IButton>
</template>
