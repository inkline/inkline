<script lang="ts">
import { FormField, useModal, useToast } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();
        const { prompt } = useModal();

        async function showPrompt() {
            try {
                const schema = await prompt({
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
                    message: (schema.input as FormField).value,
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
