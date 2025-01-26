<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Input v-model="value" color="light" placeholder="Type something.." />

    <Input v-model="value" color="dark" placeholder="Type something.." />
</template>
