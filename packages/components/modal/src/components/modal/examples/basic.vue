<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <Button @click="visible = true"> Show Modal </Button>

    <Modal v-model="visible">
        <template #header> Modal Header </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer </template>
    </Modal>
</template>
