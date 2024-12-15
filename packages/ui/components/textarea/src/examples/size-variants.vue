<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Textarea v-model="value" size="sm" placeholder="Type something.." />

    <Textarea v-model="value" size="md" placeholder="Type something.." />

    <Textarea v-model="value" size="lg" placeholder="Type something.." />
</template>
