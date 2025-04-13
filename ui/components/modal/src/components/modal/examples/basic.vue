<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <Button @click="visible = true"> Show Modal</Button>

    <Modal v-model="visible"> This is the modal content. Useful information goes here. </Modal>
</template>
