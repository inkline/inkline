<script lang="ts" setup>
import { ref } from 'vue';

const md = ref(false);
const sm = ref(false);
const lg = ref(false);
</script>
<template>
    <i-checkbox v-model="sm" size="sm">Small</i-checkbox>

    <i-checkbox v-model="md" size="md">Medium</i-checkbox>

    <i-checkbox v-model="lg" size="lg">Large</i-checkbox>
</template>
