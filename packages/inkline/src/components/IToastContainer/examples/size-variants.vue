<script lang="ts">
import { useToast } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();

        function showSmallToast() {
            toast.show({
                title: 'Small Toast',
                message: 'This toast is small',
                size: 'sm'
            });
        }

        function showMediumToast() {
            toast.show({
                title: 'Medium Toast',
                message: 'This toast is medium',
                size: 'md'
            });
        }

        function showLargeToast() {
            toast.show({
                title: 'Large Toast',
                message: 'This toast is large',
                size: 'lg'
            });
        }

        return {
            showSmallToast,
            showMediumToast,
            showLargeToast
        };
    }
});
</script>
<template>
    <IButton size="sm" @click="showSmallToast">Show small toast</IButton>
    <IButton size="md" @click="showMediumToast">Show medium toast</IButton>
    <IButton size="lg" @click="showLargeToast">Show large toast</IButton>
</template>
