<script lang="ts" setup>
import { ref } from 'vue';

const sm = ref(false);
const md = ref(false);
const lg = ref(false);
</script>

<template>
    <Button @click="sm = true"> Show Small Modal</Button>

    <Modal v-model="sm" size="sm"> This is the modal content. Useful information goes here. </Modal>

    <Button @click="md = true"> Show Medium Modal</Button>

    <Modal v-model="md" size="md"> This is the modal content. Useful information goes here. </Modal>

    <Button @click="lg = true"> Show Large Modal</Button>

    <Modal v-model="lg" size="lg"> This is the modal content. Useful information goes here. </Modal>
</template>
