<script lang="ts" setup>
import { useModal } from 'inkline';

const modalId = 'modal';
const modal = useModal();

function showModal() {
    modal.show({
        id: modalId,
        header: 'Controlled Modal',
        body: 'This modal will be visible for 3 seconds'
    });

    hideModal();
}

function hideModal() {
    setTimeout(() => {
        modal.hide({ id: modalId });
    }, 3000);
}
</script>
<template>
    <Button @click="showModal">Show modal</Button>
</template>
