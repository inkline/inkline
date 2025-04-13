<script setup lang="ts">
import { useToast } from 'inkline';

const toast = useToast();

function showToast() {
    toast.show({
        title: 'Timed Toast',
        message: 'This toast will be visible for 5 seconds',
        duration: 5000
    });
}
</script>
<template>
    <Button @click="showToast">Show toast</Button>
</template>
