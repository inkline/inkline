<script setup lang="ts">
import { useToast } from 'inkline';

const toast = useToast();

function showToast() {
    toast.show({
        title: 'Toast title',
        message: 'Toast message'
    });
}
</script>
<template>
    <Button @click="showToast">Show toast</Button>
</template>
