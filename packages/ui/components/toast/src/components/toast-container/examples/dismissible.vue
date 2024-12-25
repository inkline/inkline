<script setup lang="ts">
import { useToast } from 'inkline';

const toast = useToast();

function showToast() {
    toast.show({
        title: 'Dismissible Toast',
        message: 'This toast can be dismissed by clicking the close button',
        dismissible: true
    });
}
</script>
<template>
    <Button @click="showToast">Show toast</Button>
</template>
