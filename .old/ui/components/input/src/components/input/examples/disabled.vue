<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Input v-model="value" disabled placeholder="Type something.." />
</template>
