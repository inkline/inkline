<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Textarea v-model="value" disabled placeholder="Type something.." />
</template>
