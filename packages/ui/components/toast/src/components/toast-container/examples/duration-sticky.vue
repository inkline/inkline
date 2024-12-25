<script setup lang="ts">
import { useToast } from 'inkline';

const toast = useToast();

function showToast() {
    toast.show({
        title: 'Sticky Toast',
        message: 'This toast will be visible until it is dismissed',
        duration: 0,
        dismissible: true
    });
}
</script>
<template>
    <Button @click="showToast">Show toast</Button>
</template>
