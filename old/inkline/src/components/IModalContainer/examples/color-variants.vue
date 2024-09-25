<script lang="ts">
import { useModal } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const modal = useModal();

        function showLightModal() {
            modal.show({
                header: 'Light Modal',
                body: 'This modal is light like a feather',
                footer: 'Modal footer',
                color: 'light'
            });
        }

        function showDarkModal() {
            modal.show({
                header: 'Dark modal',
                body: 'This modal is dark like the night',
                footer: 'Modal footer',
                color: 'dark'
            });
        }

        function showInfoModal() {
            modal.show({
                header: 'Heads up!',
                body: "This modal needs your attention, but it's not super important.",
                footer: 'Modal footer',
                color: 'info'
            });
        }

        function showSuccessModal() {
            modal.show({
                header: 'Well done!',
                body: 'You successfully read this important alert message.',
                footer: 'Modal footer',
                color: 'success'
            });
        }

        function showWarningModal() {
            modal.show({
                header: 'Warning!',
                body: "Better check yourself, you're not looking too good.",
                footer: 'Modal footer',
                color: 'warning'
            });
        }

        function showDangerModal() {
            modal.show({
                header: 'Oh snap!',
                body: 'Change a few things up and try submitting again.',
                footer: 'Modal footer',
                color: 'danger'
            });
        }

        return {
            showLightModal,
            showDarkModal,
            showInfoModal,
            showSuccessModal,
            showWarningModal,
            showDangerModal
        };
    }
});
</script>
<template>
    <IButton color="light" @click="showLightModal">Show light modal</IButton>
    <IButton color="dark" @click="showDarkModal">Show dark modal</IButton>
    <IButton color="info" @click="showInfoModal">Show info modal</IButton>
    <IButton color="success" @click="showSuccessModal">Show success modal</IButton>
    <IButton color="warning" @click="showWarningModal">Show warning modal</IButton>
    <IButton color="danger" @click="showDangerModal">Show danger modal</IButton>
</template>
