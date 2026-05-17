<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('This input is clearable.');
</script>

<template>
    <Textarea v-model="value" clearable placeholder="Type something.." />
</template>
