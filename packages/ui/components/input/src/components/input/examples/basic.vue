<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Input id="test" v-model="value" placeholder="Type something.." />
</template>
