<script lang="ts" setup>
import { useToast, useModal } from 'inkline';

const toast = useToast();
const modal = useModal();

async function showPrompt() {
    try {
        const form = await modal.prompt<{
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
</script>
<template>
    <Button @click="showPrompt">Show prompt</Button>
</template>
