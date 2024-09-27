<script lang="ts">
import { useToast } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();

        function showToast() {
            toast.show({
                title: 'Timed Toast',
                message: 'This toast will be visible for 5 seconds',
                duration: 5000
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
