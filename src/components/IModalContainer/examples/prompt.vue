<script lang="ts">
import { useModal, useToast } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();
        const { prompt } = useModal();

        async function showPrompt() {
            try {
                const form = await prompt<{
                    input: string;
                }>({
                    title: 'Prompt Title',
                    message: 'This prompt requires you to enter something:',
                    inputProps: {
                        placeholder: 'Enter something'
                    },
                    confirmButtonText: 'Submit',
                    cancelButtonText: 'Cancel'
                });

                toast.show({
                    title: 'Prompt result',
                    message: form.input,
                    color: 'info'
                });
            } catch (error) {
                console.log('Prompt cancelled');
            }
        }

        return {
            showPrompt
        };
    }
});
</script>
<template>
    <IButton @click="showPrompt">Show prompt</IButton>
</template>
