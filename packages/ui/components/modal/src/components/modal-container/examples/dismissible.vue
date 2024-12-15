<script lang="ts" setup>
import { useModal } from 'inkline';

const modal = useModal();

function showModal() {
    modal.show({
        header: 'Dismissible Modal',
        body: 'This modal can be dismissed by clicking the close button',
        dismissible: true
    });
}
</script>
<template>
    <Button @click="showModal">Show modal</Button>
</template>
