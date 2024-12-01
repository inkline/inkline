<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <Button @click="visible = true"> Show Modal with Icon</Button>

    <Modal v-model="visible">
        <template #header> Modal Header</template>
        <template #icon>
            <Icon name="ink:info" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>
</template>
