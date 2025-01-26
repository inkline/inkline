<script setup lang="ts">
import { ref } from 'vue';

const value = ref('This input is clearable.');
</script>

<template>
    <Input v-model="value" clearable placeholder="Type something.." />
</template>
