<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('This input is readonly.');
</script>

<template>
    <Textarea v-model="value" readonly placeholder="Type something.." />
</template>
