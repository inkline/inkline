<script setup lang="ts">
import { useToast } from 'inkline';

const toast = useToast();

function showSmallToast() {
    toast.show({
        title: 'Small Toast',
        message: 'This toast is small',
        size: 'sm'
    });
}

function showMediumToast() {
    toast.show({
        title: 'Medium Toast',
        message: 'This toast is medium',
        size: 'md'
    });
}

function showLargeToast() {
    toast.show({
        title: 'Large Toast',
        message: 'This toast is large',
        size: 'lg'
    });
}
</script>
<template>
    <Button size="sm" @click="showSmallToast">Show small toast</Button>
    <Button size="md" @click="showMediumToast">Show medium toast</Button>
    <Button size="lg" @click="showLargeToast">Show large toast</Button>
</template>
