<script lang="ts" setup>
import { ref } from 'vue';

const primary = ref(false);
const secondary = ref(false);
const light = ref(false);
const dark = ref(false);
const info = ref(false);
const success = ref(false);
const warning = ref(false);
const danger = ref(false);
</script>

<template>
    <Button color="primary" @click="primary = true"> Show Primary Modal</Button>

    <Modal v-model="primary" color="primary">
        This is the modal content. Useful information goes here.
    </Modal>

    <Button color="secondary" @click="secondary = true"> Show Secondary Modal</Button>

    <Modal v-model="secondary" color="secondary">
        This is the modal content. Useful information goes here.
    </Modal>

    <Button color="light" @click="light = true"> Show Light Modal</Button>

    <Modal v-model="light" color="light">
        This is the modal content. Useful information goes here.
    </Modal>

    <Button color="dark" @click="dark = true"> Show Dark Modal</Button>

    <Modal v-model="dark" color="dark">
        This is the modal content. Useful information goes here.
    </Modal>

    <Button color="info" @click="info = true"> Show Info Modal</Button>

    <Modal v-model="info" color="info">
        This is the modal content. Useful information goes here.
    </Modal>

    <Button color="success" @click="success = true"> Show Success Modal</Button>

    <Modal v-model="success" color="success">
        This is the modal content. Useful information goes here.
    </Modal>

    <Button color="warning" @click="warning = true"> Show Warning Modal</Button>

    <Modal v-model="warning" color="warning">
        This is the modal content. Useful information goes here.
    </Modal>

    <Button color="danger" @click="danger = true"> Show Danger Modal</Button>

    <Modal v-model="danger" color="danger">
        This is the modal content. Useful information goes here.
    </Modal>
</template>
