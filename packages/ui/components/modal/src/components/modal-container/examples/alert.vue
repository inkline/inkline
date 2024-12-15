<script lang="ts" setup>
import { useModal } from 'inkline';

const modal = useModal();

async function showAlert() {
    await modal.alert({
        title: 'Alert Title',
        message: 'This is a basic alert message. It informs the user of something important.',
        confirmButtonText: 'OK'
    });

    console.log('Alert closed');
}
</script>
<template>
    <Button @click="showAlert">Show alert</Button>
</template>
