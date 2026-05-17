<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Input v-model="value" size="sm" placeholder="Type something.." />

    <Input v-model="value" size="md" placeholder="Type something.." />

    <Input v-model="value" size="lg" placeholder="Type something.." />
</template>
