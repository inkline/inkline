<script lang="ts">
import { useToast } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();

        function showToast() {
            toast.show({
                title: 'Sticky Toast',
                message: 'This toast will be visible until it is dismissed',
                duration: 0,
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
    <IButton @click="showToast">Show toast</IButton>
</template>
