<script setup lang="ts">
import { useToast } from 'inkline';

const toastId = 'toast';
const toast = useToast();

function showToast() {
    toast.show({
        id: toastId,
        title: 'Controlled Toast',
        message: 'This toast will be visible until it is programmatically hidden',
        duration: 0
    });
}

function hideToast() {
    toast.hide({ id: toastId });
}
</script>
<template>
    <Button @click="showToast">Show toast</Button>
    <Button @click="hideToast">Hide toast</Button>
</template>
