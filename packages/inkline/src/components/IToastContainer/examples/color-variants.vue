<script lang="ts">
import { useToast } from '@inkline/inkline/composables';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();

        function showLightToast() {
            toast.show({
                title: 'Light Toast',
                message: 'This toast is light like a feather',
                color: 'light'
            });
        }

        function showDarkToast() {
            toast.show({
                title: 'Dark toast',
                message: 'This toast is dark like the night',
                color: 'dark'
            });
        }

        function showInfoToast() {
            toast.show({
                title: 'Heads up!',
                message: "This toast needs your attention, but it's not super important.",
                color: 'info'
            });
        }

        function showSuccessToast() {
            toast.show({
                title: 'Well done!',
                message: 'You successfully read this important alert message.',
                color: 'success'
            });
        }

        function showWarningToast() {
            toast.show({
                title: 'Warning!',
                message: "Better check yourself, you're not looking too good.",
                color: 'warning'
            });
        }

        function showDangerToast() {
            toast.show({
                title: 'Oh snap!',
                message: 'Change a few things up and try submitting again.',
                color: 'danger'
            });
        }

        return {
            showLightToast,
            showDarkToast,
            showInfoToast,
            showSuccessToast,
            showWarningToast,
            showDangerToast
        };
    }
});
</script>
<template>
    <IButton color="light" @click="showLightToast">Show light toast</IButton>
    <IButton color="dark" @click="showDarkToast">Show dark toast</IButton>
    <IButton color="info" @click="showInfoToast">Show info toast</IButton>
    <IButton color="success" @click="showSuccessToast">Show success toast</IButton>
    <IButton color="warning" @click="showWarningToast">Show warning toast</IButton>
    <IButton color="danger" @click="showDangerToast">Show danger toast</IButton>
</template>
