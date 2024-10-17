<script lang="ts" setup>
import { ref } from 'vue';

const md = ref(false);
const sm = ref(false);
const lg = ref(false);
</script>
<template>
    <Checkbox v-model="sm" size="sm">Small</Checkbox>

    <Checkbox v-model="md" size="md">Medium</Checkbox>

    <Checkbox v-model="lg" size="lg">Large</Checkbox>
</template>
