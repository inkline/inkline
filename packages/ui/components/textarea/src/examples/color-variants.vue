<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Textarea v-model="value" color="light" placeholder="Type something.." />

    <Textarea v-model="value" color="dark" placeholder="Type something.." />
</template>
