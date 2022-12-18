<script lang="ts" setup>
import { ref } from 'vue';

const md = ref(false);
const sm = ref(false);
const lg = ref(false);
</script>
<template>
    <ICheckbox v-model="sm" size="sm">Small</ICheckbox>

    <ICheckbox v-model="md" size="md">Medium</ICheckbox>

    <ICheckbox v-model="lg" size="lg">Large</ICheckbox>
</template>
