<script lang="ts" setup>
import { useModal } from 'inkline';

const modal = useModal();

function showModal() {
    modal.show({
        header: 'Modal title',
        body: 'Modal body text goes here',
        footer: 'Modal footer'
    });
}
</script>
<template>
    <Button @click="showModal">Show modal</Button>
</template>
