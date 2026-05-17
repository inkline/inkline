<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <Button @click="visible = true"> Show Fullscreen Modal</Button>

    <Modal v-model="visible" fullscreen>
        <template #header> Modal Header</template>
        This is the modal content. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>
</template>
