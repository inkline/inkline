<script setup lang="ts">
import { useToast } from 'inkline';

const toast = useToast();

function showToast() {
    toast.show({
        title: 'Controlled Toast',
        message: 'This toast will be visible until it is programmatically hidden',
        duration: 0
    });
}

function hideAllToasts() {
    toast.hideAll();
}
</script>
<template>
    <Button @click="showToast">Show toast</Button>
    <Button @click="hideAllToasts">Hide all toasts</Button>
</template>
