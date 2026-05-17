<script lang="ts" setup>
import { useModal } from 'inkline';

const modal = useModal();

function showSmallModal() {
    modal.show({
        header: 'Small Modal',
        body: 'This modal is small',
        footer: 'Modal footer',
        size: 'sm'
    });
}

function showMediumModal() {
    modal.show({
        header: 'Medium Modal',
        body: 'This modal is medium',
        footer: 'Modal footer',
        size: 'md'
    });
}

function showLargeModal() {
    modal.show({
        header: 'Large Modal',
        body: 'This modal is large',
        footer: 'Modal footer',
        size: 'lg'
    });
}
</script>
<template>
    <Button size="sm" @click="showSmallModal">Show small modal</Button>
    <Button size="md" @click="showMediumModal">Show medium modal</Button>
    <Button size="lg" @click="showLargeModal">Show large modal</Button>
</template>
