<script lang="ts">
import { useModal } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const { alert } = useModal();

        async function showAlert() {
            await alert({
                title: 'Alert Title',
                message:
                    'This is a basic alert message. It informs the user of something important.',
                confirmButtonText: 'OK'
            });

            console.log('Alert closed');
        }

        return {
            showAlert
        };
    }
});
</script>
<template>
    <IButton @click="showAlert">Show alert</IButton>
</template>
